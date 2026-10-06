import {
  type ClientModule,
  type ClientScript,
  isClientScript,
  isJsxElement,
  type JsxElement,
} from "@backtickjs/core";
import { isClientImport, type Spliceable } from "@backtickjs/core";

import {
  type ElementExpansions,
  expandJsxElement,
} from "./expandJsxElement.js";
import { bindingsOf, capturesOf } from "./params.js";
import { sourceName } from "./bindingKey.js";
import {
  array,
  arrow,
  call,
  createNames,
  imported,
  literal,
  object,
  thunk,
  undefinedValue,
} from "../print/code.js";
import type { Names } from "../print/code.js";

/**
 * A bundle as it is built, before it is printed: each script's module it
 * declares under its label, in the order rendering first reached it, and the
 * root, as code; and what they import.
 */
export interface BundleTree {
  readonly modules: readonly (readonly [string, ClientModule])[];
  readonly root: string;
  readonly names: Names;
}

// Names a binding may not take: what strict code cannot bind. Every name the
// bundle introduces starts with `$`, which a script cannot bind, so none of
// those can meet a binding.
const RESERVED = ["arguments", "await", "eval", "yield"];

// What encloses a value being rendered: the bindings the thunks around it were
// handed.
interface Scope {
  readonly bindings: ReadonlySet<string>;
}

const rootScope: Scope = { bindings: new Set() };

// Builds the bundle `{ scripts, root }` as code, and documents how it is
// derived.
//
// Each script is declared once, as its compiled code under a label `$cs<n>`,
// and called wherever it is used. Its code takes a parameter per splice —
// a hole reads `$splice<i>()` — then per tag and per capture, so it is a function of the
// script's source alone: every call passes its own splice arguments, as
// thunks, and nothing from a call site is inlined.
//
// A captured variable is threaded, not resolved by name at the splice site: a
// fragment written in one script but spliced (via host code) into another still
// refers to the binding it was written under. Each script receives its live
// captures as parameters, and a call of it passes those captures from the
// enclosing scope. Because the compiler gives every binding a globally unique
// name, a capture is threaded under that one name the whole way down — an
// intermediate script that binds a same-looking variable has a different
// unique name, so there is nothing to disambiguate and nothing to rename.
export async function buildBundle(
  value: Spliceable,
  packageVersions: Readonly<Record<string, string>>,
): Promise<BundleTree> {
  const names = createNames(packageVersions);
  const elementExpansions: ElementExpansions = new WeakMap();
  // Each script's number, in the order rendering first reaches it. Two
  // scripts written at one source location are one declaration, so the first
  // script with an id stands for all of them, and a reference to a shared
  // script is a reference to the same object. Keyed by that script so a label
  // is a lookup rather than a scan, and ordered by insertion, which is the
  // order the tail declares them in.
  const numbers = new Map<ClientScript, number>();
  const scriptById = new Map<string, ClientScript>();
  const scriptFor = (script: ClientScript): ClientScript => {
    const existing = scriptById.get(script.module.id);
    if (existing !== undefined) {
      return existing;
    }
    scriptById.set(script.module.id, script);
    numbers.set(script, numbers.size);
    return script;
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
  // that structure goes where it stands. A declared script's names are the
  // compiler's, from its own source — nothing out here reads those names,
  // because a call hands a script its arguments positionally, and its
  // captures arrive as numbered parameters rather than under a name.
  const displayed = new Map<string, string>();
  const used = new Set<string>(RESERVED);
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

  // The script-declared bindings a hole feeds its thunk, so a spliced fragment
  // sees the bindings in scope at its hole even though the thunk is written at
  // the call site. The body's hole call and every thunk's parameter list read
  // this, so they agree positionally.
  //
  // Read off the script's own source (see `splices` in `resolveBindings`),
  // not off what the arguments reaching that hole in this bundle happen to
  // capture. That is what lets a script be compiled from its source alone: a
  // second call site appearing elsewhere in a render cannot change a thunk a
  // first one already had.
  //
  // It is a superset — the bindings a fragment written there *could* name, not
  // the ones it does — because which fragment reaches a hole is a host
  // decision. A carried fragment arrives with its own captures already bound,
  // so the extra parameters are unused rather than wrong.
  const passKeys = (target: ClientScript, hole: number): readonly string[] =>
    bindingsOf(target.module.params[hole]);

  // The scripts the bundle declares: those a reference calls or passes, not
  // every one looked up on the way.
  const declared = new Set<ClientScript>();

  // A declared script's label: `$cs` and its number.
  const labelOf = (target: ClientScript): string =>
    `$cs${numbers.get(target)!}`;

  const declare = (script: ClientScript): void => {
    declared.add(script);
  };

  // A fragment that is one script whose parameters are exactly what this hole
  // passes, so calling it is what a thunk around it would have done. The lists
  // are compared rather than assumed: a hole hands over what its own script has,
  // and a fragment wants what its own script needs, and those coincide often
  // but not always.
  const forwarding = (
    value: Spliceable,
    passed: readonly string[],
  ): string | null => {
    if (
      !isClientScript(value) ||
      value.module.params.some((param) => param.kind !== "capture")
    ) {
      return null;
    }
    const target = scriptFor(value);
    const wanted = capturesOf(target);
    if (
      wanted.length !== passed.length ||
      wanted.some((key, at) => key !== passed[at])
    ) {
      return null;
    }
    declare(target);
    return labelOf(target);
  };

  // Writes a value as the code it becomes: composition as data, which is what
  // a bundle is. A script reference is a call naming which script and
  // what to hand it; everything else is its literal form. Rendered in order,
  // one value after the other, so the table follows the order rendering first
  // reached each script.
  const render = async (
    value: Spliceable,
    scope: Scope = rootScope,
  ): Promise<string> => {
    if (isClientScript(value)) {
      const target = scriptFor(value);
      declare(target);
      return call(labelOf(target), await exprCallArgs(value, scope));
    }
    if (isJsxElement(value)) {
      return renderJsx(value, scope);
    }
    if (isClientImport(value)) {
      return imported(names, value);
    }
    if (value === null) {
      return literal(null);
    }
    // Checked by name, since everything past here reads the value as an object.
    if (value === undefined) {
      return undefinedValue;
    }
    if (
      typeof value === "number" ||
      typeof value === "string" ||
      typeof value === "boolean"
    ) {
      return literal(value);
    }
    if (Array.isArray(value)) {
      const elements: string[] = [];
      for (const element of value) {
        elements.push(await render(element, scope));
      }
      return array(elements);
    }
    // A host function is host code, which never reaches the client: client
    // code is written in a script, and reaches another as one.
    // A server component among them, written as a tag: `<$Rule />`.
    if (typeof value === "function") {
      const { name } = value as (...args: never) => unknown;
      throw new Error(
        (name === ""
          ? "Can't splice a host function"
          : `Can't splice the host function \`${name}\``) +
          ": it's host code, and only runs on the host. Write a client " +
          "function as a script instead: cs`(n: number) => ...`; a server " +
          `component is drawn in a braced splice: \`{\${<${name || "Name"} />}}\`.`,
      );
    }
    // Only plain objects cross structurally. A class instance would land here
    // and half-work — own fields would cross, getters and methods silently
    // vanish — so fail loudly instead. An object with behaviour is built by a
    // client function: `state` for what it holds, arrows for what may be done
    // to it.
    const prototype = Object.getPrototypeOf(value);
    if (prototype !== Object.prototype && prototype !== null) {
      const name = value.constructor?.name ?? "an unknown class";
      throw new Error(
        `Can't splice this \`${name}\` instance: only plain objects cross into ` +
          "a client script. Build one with a client function instead.",
      );
    }
    const entries: [string, string][] = [];
    for (const [key, entry] of Object.entries(value)) {
      entries.push([key, await render(entry, scope)]);
    }
    return object(entries);
  };

  // Renders a capture in JSON position: a parameter of an enclosing thunk
  // resolves by name; anything else must be a parameter of the enclosing script.
  // At
  // the bundle root there is no enclosing instance, so a capture reaching it
  // can't be threaded from anywhere.
  const capExpr = (key: string, scope: Scope): string => {
    if (scope.bindings.has(key)) {
      return displayName(key);
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

  // The arguments of a call of a declared script: for
  // one `#thunk` per splice ahead of the environment.
  const exprCallArgs = async (
    ref: ClientScript,
    scope: Scope,
  ): Promise<string[]> => {
    const target = scriptFor(ref);
    const parts: string[] = [];
    // The splices lead the parameters, one `arg` each.
    for (const [index, arg] of ref.args.entries()) {
      // What the hole hands over, in the order the script fixes: the bindings
      // bound there, then the captures it forwards on behalf of whatever is
      // nested inside it.
      const passed = [...passKeys(target, index), ...capturesOf(target)];
      // A fragment whose own parameters are exactly that list reads the hole's
      // arguments as they arrive, so it is passed as it is rather than wrapped
      // in a thunk that would only pass them along.
      const forwarded = forwarding(arg, passed);
      if (forwarded !== null) {
        parts.push(forwarded);
        continue;
      }
      if (passed.length === 0) {
        parts.push(thunk(await render(arg, scope)));
        continue;
      }
      // Otherwise a thunk names them and calls the fragment with what it wants.
      const inner = { bindings: new Set([...scope.bindings, ...passed]) };
      parts.push(arrow(passed.map(displayName), await render(arg, inner)));
    }
    for (const key of capturesOf(target)) {
      parts.push(capExpr(key, scope));
    }
    return parts;
  };

  // A tag. A component runs on the host and what it drew stands where the tag
  // stood; an element is its own name, each prop an expression in the
  // enclosing script's scope.
  //
  // A prop that is `undefined` is left out, as JSX and TypeScript's optional
  // props read it: a component forwarding an optional prop it wasn't given
  // writes nothing.
  const renderJsx = async (jsx: JsxElement, scope: Scope): Promise<string> => {
    const type = jsx.type;
    if (typeof type === "function" && !isClientImport(type)) {
      return render(
        await expandJsxElement(jsx, type, elementExpansions),
        scope,
      );
    }
    // An element and a client component (an import, or a script answering
    // one) are client code, so on the host they can't be tags: they are tags
    // in a script.
    if (typeof type === "string") {
      throw new Error(
        `\`<${type}>\` is drawn by the client, so it belongs in a script: ` +
          `cs\`<${type}>…</${type}>\`.`,
      );
    }
    const tag = isClientImport(type) ? `\`<${type.name}>\`` : "A script";
    throw new Error(
      `${tag} is a client component, so it can't be a tag on the host. ` +
        "Use it as a tag in a script.",
    );
  };

  // Nothing encloses the root, so nothing it holds can capture.
  const root = await render(value as Spliceable);
  // In table order, which is the order rendering first reached each script.
  const modules: (readonly [string, ClientModule])[] = [];
  for (const script of numbers.keys()) {
    if (declared.has(script)) {
      modules.push([labelOf(script), script.module]);
    }
  }
  return { modules, root, names };
}
