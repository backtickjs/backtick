import type { Ast, AstElement, AstScript } from "../ast/Ast.js";
import type { ScriptEntry } from "./ScriptEntry.js";
import { sourceName } from "./bindingKey.js";
import { locKey } from "../locKey.js";
import type {
  Bundle,
  BundleArrowFunction,
  BundleElement,
  BundleExpression,
  BundleIdentifier,
  BundleFunctionLabel,
} from "@backtickjs/language";
import type { ExperimentalFeatures } from "../bundler.js";
import { lowerScriptBody, parameterNodes } from "./lowerScriptBody.js";
import type { ClientUnknown } from "@backtickjs/language";

// Builds the bundle `{ functions, root }` as plain data. The output
// shapes — the tables, the tagged expression forms, and their evaluation
// contract — are documented on the `Bundle` types; this file documents how
// they are derived.
//
// A captured variable is threaded, not resolved by name at the splice site: a
// fragment written in one script but spliced (via host code) into another still
// refers to the binding it was written under. Each entry receives its live
// captures as parameters, and a reference to an entry passes those captures from
// the enclosing scope. Because the compiler gives every binding a globally
// unique name, a capture is threaded under that one name the whole way down — an
// intermediate entry that binds a same-looking variable has a different unique
// name, so there is nothing to disambiguate and nothing to rename.
//
// A splice hole is filled one of two ways, chosen per entry:
//
//   - Monomorphic entry — every reference to it passes structurally identical
//     splice arguments. The arguments are inlined directly into the body (a
//     nested-script argument as a call of its entry, a runtime value as a
//     literal),
//     so the entry takes no splice parameters.
//   - Polymorphic entry — the same body (one source location) is reached with
//     differing splice arguments, as when a host helper builds a fragment from
//     its parameters and is called more than once (see the `splice-sharing`
//     fixture). Its splices can't be baked in, so each becomes a parameter
//     `$i`: the body fills the hole with `$i()` and every reference passes that
//     call's argument as a thunk. This threads splices exactly like captures,
//     just positionally.
export function buildBundle(
  ast: Ast,
  features: ExperimentalFeatures = {},
): Bundle<ClientUnknown> {
  // The `functions` table, filled as rendering reaches each script. Two scripts
  // written at one source location are one entry, so this is what makes a
  // reference to a shared script a reference to the same object — the one thing
  // the AST cannot say for itself, since it keys by node and this keys by where
  // the node was written.
  // Keyed by entry so a label is a lookup rather than a scan, and ordered by
  // insertion, which is the table order the tail emits in.
  const scripts = new Map<ScriptEntry, number>();
  const entryByLoc = new Map<string, ScriptEntry>();
  const entryFor = (script: AstScript): ScriptEntry => {
    const key = locKey(script.fileHash, script.loc);
    const existing = entryByLoc.get(key);
    if (existing !== undefined) {
      return existing;
    }
    const entry: ScriptEntry = {
      loc: script.loc,
      fileHash: script.fileHash,
      splices: Object.entries(script.splices).map(([key, splice]) => ({
        key,
        params: splice.params,
      })),
      captures: script.captures,
      body: script.expression,
    };
    entryByLoc.set(key, entry);
    scripts.set(entry, scripts.size);
    return entry;
  };
  // A binding key printed under its source name, with a numeric suffix when two
  // distinct bindings would otherwise print the same.
  //
  // Disambiguated at all because these become identifiers, and identifiers nest:
  // a hole inside a thunk puts one thunk's parameters inside another's, so two
  // bindings sharing a source name can land in one chain and the inner would
  // shadow what the outer was handed (`shadowing` nests three).
  //
  // One scope, which is the bundle root: what a drawing is written into now
  // that structure goes where it stands. A `functions` entry names inside
  // `lowerScriptBody`, from its own script — nothing out here reads those names,
  // because a call site hands an entry its arguments positionally, and its
  // captures arrive as numbered parameters rather than under a name.
  const names = new Map<string, string>();
  const used = new Set<string>();
  const displayName = (key: string): string => {
    const existing = names.get(key);
    if (existing !== undefined) {
      return existing;
    }
    const base = sourceName(key);
    let name = base;
    for (let n = 2; used.has(name); n++) {
      name = `${base}${n}`;
    }
    used.add(name);
    names.set(key, name);
    return name;
  };

  // The captures that the rendered form of a splice argument refers to in the
  // enclosing scope: whatever its target still needs, plus the captures of the
  // thunks passed for its splices, since those thunks are written inline at this
  // call site. A tree reference needs its
  // arguments; an inline element whatever its props need.
  // Memoized per argument — the IR is immutable and this fans out from `need`
  // and `treeParams`.
  // How a hole is reached. Its name is the path the function read: `$0` is the
  // parameter itself, and `$0.title` is a field of it.
  //
  // A field is *called*, where the parameter is not. What binds a field is a
  // thunk written at the tag, because a prop has to be re-read whenever what it
  // names changes, where an argument is evaluated once where it is passed.
  const holeRead = (name: string): BundleExpression => {
    const [param, prop, ...path] = name.split(".");
    if (prop === undefined) {
      return ["id", param];
    }
    // The parameter is a thunk the tag wrote, so it is called where the drawing
    // reads it: an argument is evaluated once where it is passed, and a prop has
    // to be re-read whenever what it names changes. What the call answers with
    // is an ordinary value, so the whole path off it is ordinary reads.
    let read: BundleExpression = ["()", [".", ["id", param], prop], []];
    for (const step of path) {
      read = [".", read, step];
    }
    return read;
  };

  // The parameter a hole is reached through, which is what threads out of an
  // entry hoisted from the expansion — one name, whatever it read off it.
  const holeParam = (name: string): string => {
    const dot = name.indexOf(".");
    return dot === -1 ? name : name.slice(0, dot);
  };

  const freeCapsCache = new Map<Ast, string[]>();
  const freeCaps = (value: Ast): string[] => {
    const cached = freeCapsCache.get(value);
    if (cached) {
      return cached;
    }
    const result = freeCapsImpl(value);
    freeCapsCache.set(value, result);
    return result;
  };

  const freeCapsImpl = (value: Ast): string[] => {
    switch (value.kind) {
      case "AstScript": {
        const target = entryFor(value);
        const keys = [...target.captures];
        Object.values(value.splices).forEach(({ value: arg }, index) => {
          // What the hole hands its thunk is supplied there, not by the call
          // site. Asking the hole rather than the entry is the exact question:
          // a binding the entry declares but that is not in scope at *this*
          // hole is not supplied here, so it still has to thread in.
          const supplied = new Set(passKeys(target, index));
          for (const key of freeCaps(arg)) {
            if (!supplied.has(key)) {
              keys.push(key);
            }
          }
        });
        return keys;
      }
      case "AstComponent":
        return freeCaps(value.body);
      case "AstElement":
        return Object.values(value.props).flatMap(freeCaps);
      case "AstArray":
        return value.elements.flatMap(freeCaps);
      case "AstObject":
        return Object.values(value.entries).flatMap(freeCaps);
      // An expansion's holes are bound by its own params: only what its
      // body captures beyond them threads outward.
      case "AstExpansion":
        return freeCaps(value.body).filter(
          (key) => !value.params.includes(key),
        );
      // A hole threads like a capture — a free variable the enclosing
      // expansion's parameter binds — so a script entry hoisted out of the
      // expansion receives it as a parameter instead of escaping its scope.
      case "AstHole":
        return [holeParam(value.name)];
      // A name captures nothing.
      case "AstBuiltin":
      case "AstNumber":
      case "AstString":
      case "AstBoolean":
      case "AstNull":
        return [];
    }
  };

  // The entry-declared bindings a hole feeds its thunk, so a spliced fragment
  // sees the bindings in scope at its hole even though the thunk is written at
  // the call site. The body's hole call and every thunk's parameter list read
  // this, so they agree positionally.
  //
  // Read off the entry's own source (see `spliceParams` in `resolveBindings`),
  // not off what the arguments reaching that hole in this bundle happen to
  // capture. That is what lets an entry be compiled from its script alone: a
  // second call site appearing elsewhere in a render cannot change a thunk a
  // first one already had.
  //
  // It is a superset — the bindings a fragment written there *could* name, not
  // the ones it does — because which fragment reaches a hole is a host
  // decision. A carried fragment arrives with its own captures already bound,
  // so the extra parameters are unused rather than wrong.
  const passKeys = (target: ScriptEntry, hole: number): readonly string[] =>
    target.splices[hole]?.params ?? [];

  const bodies = new Map<ScriptEntry, BundleArrowFunction>();

  // A script entry's label, either of the two things that name one (see
  // `ExperimentalFeatures.stableFunctionLabels`): where it landed in the table, or
  // where it was written. Only the second is the same across responses — a
  // table position follows the order this composition reached things — so it is
  // what a client holding an entry from an earlier response can recognize.
  const fnLabel = (target: ScriptEntry): BundleFunctionLabel =>
    features.stableFunctionLabels === true
      ? locKey(target.fileHash, target.loc)
      : String(scripts.get(target));

  // Materializes an entry's arrow node into `bodies` the first time it is
  // reached. An entry takes a `$i` parameter per splice — its holes render as
  // calls `$i()` — ahead of its environment. Nothing from a call site is
  // inlined, so the body is a function of the script's source alone.
  const materialize = (script: ScriptEntry): void => {
    if (bodies.has(script)) {
      return;
    }
    // One numbered sequence: a thunk per splice hole, then a value per capture.
    const params = [
      ...script.splices.map((splice) => splice.key),
      ...script.captures,
    ].map((_, index) => `$${index}`);
    bodies.set(script, ["=>", parameterNodes(params), lowerScriptBody(script)]);
  };

  // A fragment that is one entry whose parameters are exactly what this hole
  // passes, so calling it is what a thunk around it would have done. The lists
  // are compared rather than assumed: a hole hands over what its own entry has,
  // and a fragment wants what its own script needs, and those coincide often
  // but not always.
  const forwarding = (
    value: Ast,
    passed: readonly string[],
  ): BundleExpression | null => {
    if (value.kind !== "AstScript" || Object.keys(value.splices).length > 0) {
      return null;
    }
    const target = entryFor(value);
    const wanted = target.captures;
    if (
      wanted.length !== passed.length ||
      wanted.some((key, at) => key !== passed[at])
    ) {
      return null;
    }
    materialize(target);
    return ["fn", fnLabel(target)];
  };

  // Instantiating a tree in value position: which entry, and what to hand
  // it. A tree is applied wherever it is reached — there was once a plain call
  // for the unkeyed case and an apply for the keyed one, but the two carried
  // the same label and the same arguments and differed only in the node they were
  // written as.
  // Writes a value as the node it becomes: composition as data, which is what
  // a bundle is. A script reference is an application naming which entry and
  // what to hand it; everything else is its literal form.
  const render = (
    value: Ast,
    params: ReadonlySet<string> = new Set(),
  ): BundleExpression => {
    const child = (
      node: Ast,
      inner: ReadonlySet<string> = params,
    ): BundleExpression => render(node, inner);

    switch (value.kind) {
      case "AstScript": {
        const target = entryFor(value);
        materialize(target);
        return ["()", ["fn", fnLabel(target)], exprCallArgs(value, params)];
      }
      // An arrow over nothing, called with no props: `comp` is what calls a
      // drawing untracked.
      case "AstComponent":
        return ["comp", ["=>", [], child(value.body)], {}, null];
      case "AstElement":
        return renderElement(value, params);
      case "AstBuiltin":
        return ["bltn", value.name];
      case "AstNumber":
      case "AstString":
      case "AstBoolean":
        return value.value;
      case "AstNull":
        return null;
      // An expansion is written out as the arrow it is, its holes the
      // parameters and the call the tag wrote binding them. Compiling it to a
      // `functions` entry instead is possible — `FunctionReference` is an entry as a
      // value, and `forwarding` already emits one — and would need the
      // expansion to close over nothing. Measured, it traded an inline arrow
      // for a table entry and came out even, so it is written here.
      case "AstExpansion":
        return [
          "=>",
          parameterNodes(value.params),
          // The expansion's params extend the enclosing ones, like a nested
          // frame, so a hole threading into the body resolves by name.
          child(value.body, new Set([...params, ...value.params])),
        ];
      // A hole threads like a capture (see `freeCaps`), so it is reached the
      // same way — through the environment when the entry took it as one.
      case "AstHole":
        return holeRead(value.name);
      case "AstArray":
        // Data, and a node is an array too, so it says which it is.
        return ["arr", value.elements.map((entry) => child(entry))];
      case "AstObject": {
        // A plain data object passes through, every key of it: a node is an
        // array, so an object is never mistaken for one and the format reserves
        // no key.
        const entries: { [key: string]: BundleExpression } = {};
        for (const [key, entry] of Object.entries(value.entries)) {
          entries[key] = child(entry);
        }
        return entries;
      }
    }
  };

  // Renders a capture in JSON position: a parameter of an enclosing thunk
  // resolves by name; anything else must be a parameter of the enclosing entry.
  // At
  // the bundle root there is no enclosing instance, so a capture reaching it
  // can't be threaded from anywhere.
  const capExpr = (
    key: string,
    params: ReadonlySet<string> = new Set(),
  ): BundleIdentifier => {
    if (params.has(key)) {
      return ["id", displayName(key)];
    }
    throw new Error(
      `Can't thread the capture \`${sourceName(key)}\`: nothing encloses ` +
        "this reference to supply it. A fragment carries the bindings it was " +
        "written under, so this is also what happens when one is spliced " +
        "somewhere another `" +
        sourceName(key) +
        "` shadows it: the binding is still there, but no longer reachable by " +
        "name, and naming it anyway would mean emitting what the source " +
        "couldn't say.",
    );
  };

  // The arguments of a `#call` to a function entry, mirroring `callArgs`: for
  // one `#thunk` per splice ahead of the environment.
  const exprCallArgs = (
    ref: AstScript,
    params: ReadonlySet<string>,
  ): BundleExpression[] => {
    const target = entryFor(ref);
    const parts: BundleExpression[] = [];
    Object.values(ref.splices).forEach(({ value: arg }, index) => {
      // What the hole hands over, in the order the entry fixes: the bindings
      // bound there, then the captures it forwards on behalf of whatever is
      // nested inside it.
      const passed = [...passKeys(target, index), ...target.captures];
      // A fragment whose own parameters are exactly that list reads the hole's
      // arguments as they arrive, so it is passed as it is rather than wrapped
      // in a thunk that would only pass them along.
      const forwarded = forwarding(arg, passed);
      if (forwarded !== null) {
        parts.push(forwarded);
        return;
      }
      if (passed.length === 0) {
        parts.push(["=>", [], render(arg, params)]);
        return;
      }
      // Otherwise a thunk names them and calls the fragment with what it wants.
      const inner = new Set([...params, ...passed]);
      parts.push([
        "=>",
        parameterNodes(passed.map(displayName)),
        render(arg, inner),
      ]);
    });
    for (const key of target.captures) {
      parts.push(capExpr(key, params));
    }
    return parts;
  };

  // Renders an inline element: static structure carried as data, each prop a
  // bundle expression in the enclosing entry's scope.
  const renderElement = (
    element: AstElement,
    params: ReadonlySet<string>,
  ): BundleElement => {
    const props: { [key: string]: BundleExpression } = {};
    let children: BundleExpression = null;
    for (const [key, entry] of Object.entries(element.props)) {
      const rendered = render(entry, params);
      if (key === "children") {
        children = rendered;
        continue;
      }
      props[key] = rendered;
    }
    return ["el", element.id, props, children];
  };

  // Nothing encloses the root, so nothing it holds can capture.
  const root = render(ast);
  const functions: Record<BundleFunctionLabel, BundleArrowFunction> = {};
  // In table order, which is the order rendering first reached each script.
  for (const script of scripts.keys()) {
    const body = bodies.get(script);
    if (body !== undefined) {
      functions[fnLabel(script)] = body;
    }
  }
  // Minted here, which is the one place it can be. A bundle is a handle the
  // client owns and its brands are keys nothing can write — so what makes one
  // says so, the way a client says it when it hands a script a `State`.
  return { functions, root } as Bundle<ClientUnknown>;
}
