import { type ClientScript, isClientScript } from "@backtickjs/client-script";
import {
  type Client,
  type ClientUnknown,
  isBuiltin,
  type Spliceable,
} from "@backtickjs/platform-sdk";
import { isJsxElement, type JsxElement } from "@backtickjs/ui-platform-sdk";
import { expandFunction } from "./expandFunction.js";
import { expandJsxElement } from "./expandJsxElement.js";
import { holeName } from "./holes.js";
import type { ScriptEntry } from "./ScriptEntry.js";
import { sourceName } from "./bindingKey.js";
import { locKey } from "../locKey.js";
import type * as ES from "estree";
import type { ExperimentalFeatures } from "../bundler.js";
import {
  arrow,
  binding,
  builtin,
  call,
  createNames,
  identifier,
  jsxComponent,
  jsxElement,
  label,
  literal,
  member,
  nullLiteral,
  objectKey,
  property,
  thunk,
  undefinedValue,
} from "../estree.js";
import type { Names } from "../estree.js";
import { lowerScriptBody } from "./lowerScriptBody.js";

/**
 * A bundle as it is built, before it is printed: each `functions` entry under
 * its label, in the order rendering first reached it, and the root. What they
 * name is registered in `names` and settled when the bundle is printed.
 */
export interface BundleTree {
  readonly functions: readonly (readonly [
    string,
    ES.ArrowFunctionExpression,
  ])[];
  readonly root: ES.Expression;
  readonly names: Names;
}

// The parsed body for each distinct source location. Two scripts at the same
// location — a script inside a host function, instantiated with different
// splices at different call sites — share one parse.
const parsedByLoc = new Map<string, ES.Expression | ES.BlockStatement>();

// Builds the bundle `{ functions, root }` as ESTree, and documents how it is
// derived.
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
export async function buildBundle<T extends ClientUnknown>(
  value: Spliceable<T>,
  features: ExperimentalFeatures = {},
): Promise<BundleTree> {
  const names = createNames();
  // The `functions` table, filled as rendering reaches each script. Two scripts
  // written at one source location are one entry, so this is what makes a
  // reference to a shared script a reference to the same object.
  // Keyed by entry so a label is a lookup rather than a scan, and ordered by
  // insertion, which is the table order the tail emits in.
  const scripts = new Map<ScriptEntry, number>();
  const entryByLoc = new Map<string, ScriptEntry>();
  const entryFor = (script: ClientScript): ScriptEntry => {
    const key = locKey(script.metadata.fileHash, script.loc);
    const existing = entryByLoc.get(key);
    if (existing !== undefined) {
      return existing;
    }
    let body = parsedByLoc.get(key);
    if (body === undefined) {
      body = script.body();
      parsedByLoc.set(key, body);
    }
    const entry: ScriptEntry = {
      loc: script.loc,
      fileHash: script.metadata.fileHash,
      splices: Object.entries(script.metadata.splices).map(
        ([key, splice]) => ({ key, params: splice.params }),
      ),
      captures: script.metadata.captures,
      body,
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
  // that structure goes where it stands. A `functions` entry's names are the
  // compiler's, from its own script — nothing out here reads those names,
  // because a call site hands an entry its arguments positionally, and its
  // captures arrive as numbered parameters rather than under a name.
  const displayed = new Map<string, string>();
  const used = new Set<string>();
  const displayName = (key: string): string => {
    const existing = displayed.get(key);
    if (existing !== undefined) {
      return existing;
    }
    const base = sourceName(key);
    let name = base;
    for (let n = 2; used.has(name); n++) {
      name = `${base}${n}`;
    }
    used.add(name);
    displayed.set(key, name);
    return name;
  };

  // How a hole is reached. Its name is the path the function read: `$0` is the
  // parameter itself, and `$0.title` is a field of it, read where the drawing
  // reads it.
  const holeRead = (name: string): ES.Expression => {
    const [param, ...path] = name.split(".");
    let read: ES.Expression = binding(names, param!);
    for (const step of path) {
      read = member(read, step, false);
    }
    return read;
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

  const bodies = new Map<ScriptEntry, ES.ArrowFunctionExpression>();

  // A script entry's label, either of the two things that name one (see
  // `ExperimentalFeatures.stableFunctionLabels`): where it landed in the table, or
  // where it was written. Only the second is the same across responses — a
  // table position follows the order this composition reached things — so it is
  // what a client holding an entry from an earlier response can recognize.
  const fnLabel = (target: ScriptEntry): string =>
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
    bodies.set(
      script,
      arrow(
        params.map((param) => identifier(param)),
        lowerScriptBody(script),
      ),
    );
  };

  // A fragment that is one entry whose parameters are exactly what this hole
  // passes, so calling it is what a thunk around it would have done. The lists
  // are compared rather than assumed: a hole hands over what its own entry has,
  // and a fragment wants what its own script needs, and those coincide often
  // but not always.
  const forwarding = (
    value: Spliceable,
    passed: readonly string[],
  ): ES.Expression | null => {
    if (
      !isClientScript(value) ||
      Object.keys(value.metadata.splices).length > 0
    ) {
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
    return label(names, fnLabel(target));
  };

  // Writes a value as the node it becomes: composition as data, which is what
  // a bundle is. A script reference is an application naming which entry and
  // what to hand it; everything else is its literal form. Rendered in order,
  // one value after the other, so the table follows the order rendering first
  // reached each script.
  const render = async (
    value: Spliceable,
    params: ReadonlySet<string> = new Set(),
  ): Promise<ES.Expression> => {
    // A hole sentinel a host function stored somewhere in what it answered: the
    // client argument it stands for has no value until the client runs, so it
    // is a reference to the enclosing expansion's parameter.
    const hole = holeName(value);
    if (hole !== undefined) {
      return holeRead(hole);
    }
    if (isClientScript(value)) {
      const target = entryFor(value);
      materialize(target);
      return call(
        label(names, fnLabel(target)),
        await exprCallArgs(value, params),
      );
    }
    if (isJsxElement(value)) {
      return renderJsx(value, params);
    }
    if (isBuiltin(value)) {
      return builtin(names, value.name);
    }
    if (value === null) {
      return nullLiteral();
    }
    // Checked by name, since everything past here reads the value as an object.
    if (value === undefined) {
      return undefinedValue();
    }
    if (
      typeof value === "number" ||
      typeof value === "string" ||
      typeof value === "boolean"
    ) {
      return literal(value);
    }
    if (Array.isArray(value)) {
      const elements: ES.Expression[] = [];
      for (const element of value) {
        elements.push(await render(element, params));
      }
      return { type: "ArrayExpression", elements };
    }
    // A host function has no data form — client code is written in `cs`...` and
    // reaches a script as a script — so it is expanded rather than carried, and
    // written out as the arrow it is: its holes the parameters, and the call
    // the tag wrote binding them.
    if (typeof value === "function") {
      const expansion = await expandFunction(
        value as (...args: Client<never>[]) => unknown,
      );
      return arrow(
        expansion.params.map((param) => binding(names, param)),
        // The expansion's params extend the enclosing ones, like a nested
        // frame, so a hole threading into the body resolves by name.
        await render(
          expansion.returned,
          new Set([...params, ...expansion.params]),
        ),
      );
    }
    // Only plain objects cross structurally. A class instance would land here
    // and half-work — own fields reflect, getters and methods silently vanish —
    // so fail loudly instead. An object with behaviour is built by a client
    // function: `state` for what it holds, arrows for what may be done to it.
    const prototype = Object.getPrototypeOf(value);
    if (prototype !== Object.prototype && prototype !== null) {
      const name = value.constructor?.name ?? "an unknown class";
      throw new Error(
        `Can't splice this \`${name}\` instance: only plain objects cross into ` +
          "a client script. Build one with a client function instead.",
      );
    }
    const properties: ES.Property[] = [];
    for (const [key, entry] of Object.entries(value)) {
      properties.push(property(objectKey(key), await render(entry, params)));
    }
    return { type: "ObjectExpression", properties };
  };

  // Renders a capture in JSON position: a parameter of an enclosing thunk
  // resolves by name; anything else must be a parameter of the enclosing entry.
  // At
  // the bundle root there is no enclosing instance, so a capture reaching it
  // can't be threaded from anywhere.
  const capExpr = (
    key: string,
    params: ReadonlySet<string> = new Set(),
  ): ES.Identifier => {
    if (params.has(key)) {
      return binding(names, displayName(key));
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
  const exprCallArgs = async (
    ref: ClientScript,
    params: ReadonlySet<string>,
  ): Promise<ES.Expression[]> => {
    const target = entryFor(ref);
    const parts: ES.Expression[] = [];
    const splices = Object.values(ref.metadata.splices);
    for (const [index, { value: arg }] of splices.entries()) {
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
        continue;
      }
      if (passed.length === 0) {
        parts.push(thunk(await render(arg, params)));
        continue;
      }
      // Otherwise a thunk names them and calls the fragment with what it wants.
      const inner = new Set([...params, ...passed]);
      parts.push(
        arrow(
          passed.map((key) => binding(names, displayName(key))),
          await render(arg, inner),
        ),
      );
    }
    for (const key of target.captures) {
      parts.push(capExpr(key, params));
    }
    return parts;
  };

  // A tag. A component runs on the host and what it drew stands where the tag
  // stood; an element is its own name, each prop an expression in the
  // enclosing entry's scope.
  //
  // A prop that is `undefined` is left out, as JSX and TypeScript's optional
  // props read it: a component forwarding an optional prop it wasn't given
  // writes nothing.
  const renderJsx = async (
    jsx: JsxElement,
    params: ReadonlySet<string>,
  ): Promise<ES.Expression> => {
    const type = jsx.type;
    if (typeof type !== "string") {
      const drawn = await expandJsxElement(jsx, type);
      // A script is what runs on the client; an element it drew instead has no
      // setup of its own to guard. An arrow over nothing, called with no props:
      // `comp` is what calls a drawing untracked.
      return isClientScript(drawn)
        ? jsxComponent(names, thunk(await render(drawn, params)), [], null)
        : render(drawn, params);
    }
    const written: [string, ES.Expression][] = [];
    let children: ES.Expression | null = null;
    for (const [key, entry] of Object.entries(jsx.props)) {
      if (entry === undefined) {
        continue;
      }
      let rendered: ES.Expression;
      try {
        rendered = await render(entry as Spliceable, params);
      } catch (cause) {
        // A component runs while its props render, so what surfaces here may
        // be the app's own failure rather than a value that cannot cross — and
        // app code may throw anything, not only an error.
        const said = cause instanceof Error ? cause.message : String(cause);
        throw new Error(`In the \`${key}\` prop of <${type} />: ${said}`, {
          cause,
        });
      }
      if (key === "children") {
        children = rendered;
        continue;
      }
      written.push([key, rendered]);
    }
    return jsxElement(names, type, written, children);
  };

  // Nothing encloses the root, so nothing it holds can capture.
  const root = await render(value as Spliceable);
  // In table order, which is the order rendering first reached each script.
  const functions: (readonly [string, ES.ArrowFunctionExpression])[] = [];
  for (const script of scripts.keys()) {
    const body = bodies.get(script);
    if (body !== undefined) {
      functions.push([fnLabel(script), body]);
    }
  }
  return { functions, root, names };
}
