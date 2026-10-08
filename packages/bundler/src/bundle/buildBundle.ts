import {
  type ClientModule,
  type ClientScript,
  isClientImport,
  isClientScript,
  isJsxElement,
  type JsxElement,
} from "@backtickjs/core";

import { expandJsxElement } from "./expandJsxElement.js";
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
} from "../print/code.js";
import type { Names } from "../print/code.js";

/**
 * A bundle as it is built, before it is printed: each script's module it
 * declares under its label, in the order rendering first reached it, and the
 * root, as code; and what they import.
 */
export interface BundleTree {
  readonly modules: readonly (readonly [string, ClientModule])[];
  // The functions the bundle makes once, each under its label, in the order
  // they're finished: after what they read.
  readonly constants: readonly (readonly [string, string])[];
  readonly root: string;
  readonly names: Names;
}

// Names a binding may not take: what strict code cannot bind. Every name the
// bundle introduces starts with `$`, which a script cannot bind, so none of
// those can meet a binding.
const RESERVED = ["arguments", "await", "eval", "yield"];

// What encloses a value being rendered: the bindings the thunks around it were
// handed, and those read through it, as `capExpr` resolves them, which the
// scopes a hole opens inside it share.
interface Scope {
  readonly bindings: ReadonlySet<string>;
  readonly read: Set<string>;
}

const rootScope = (): Scope => ({ bindings: new Set(), read: new Set() });

// Builds the bundle, its modules, constants and root, as code.
//
// Each script is declared once, as its compiled code under a label `$cs<n>`,
// and called wherever it is used. Its code takes a parameter per splice — a
// hole reads `$splice<i>(…)`, handing it the hole's bindings — then per
// capture, so it is a function of the script's source alone: every call
// passes its own splice arguments, as thunks, and nothing from a call site is
// inlined.
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
  value: unknown,
  packageVersions: Readonly<Record<string, string>>,
): Promise<BundleTree> {
  const names = createNames(packageVersions);
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
  // shadow what the outer was handed (`shadowing` nests three). A script's own
  // names are the compiler's: a call hands it its arguments by position.
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

  // A script's label: `$cs` and its number.
  const labelOf = (target: ClientScript): string =>
    `$cs${numbers.get(target)!}`;

  // Every function the bundle writes is a closure: a function script, and the
  // thunk a splice is handed over as. One whose code reads nothing of the
  // scope it's written in, beyond its own parameters, is the same function
  // wherever it's written, so the bundle makes it once, as a constant, and
  // the same code anywhere else is that constant: a client component keeps
  // its identity across renders, and a value spliced at every level of a deep
  // composition is written once per level, not once per path. Making a
  // function runs nothing, so sharing one isn't observable; everything is
  // still rendered where it stands.
  const constants: (readonly [string, string])[] = [];
  const byCode = new Map<string, string>();
  // `write` renders a closure's code in a scope that records what it reads:
  // a constant's label if it read nothing of `scope` beyond `own`, its
  // parameters, or else the code, written where it's used.
  const closure = async (
    scope: Scope,
    own: readonly string[],
    write: (inner: Scope) => Promise<string>,
    name: string,
  ): Promise<string> => {
    const read = new Set<string>();
    const code = await write({
      bindings: new Set([...scope.bindings, ...own]),
      read,
    });
    const outside = [...read].filter(
      (key) => !own.includes(key) && scope.bindings.has(key),
    );
    if (outside.length > 0) {
      outside.forEach((key) => scope.read.add(key));
      return code;
    }
    let label = byCode.get(code);
    if (label === undefined) {
      label = `${name}${constants.length}`;
      byCode.set(code, label);
      constants.push([label, code]);
    }
    return label;
  };

  // Writes a value as the code it becomes: composition as data, which is what
  // a bundle is. A script reference is a call naming which script and
  // what to hand it; everything else is its literal form. Rendered in order,
  // one value after the other, so the table follows the order rendering first
  // reached each script.
  // The objects rendering is inside of now. One it meets again contains
  // itself, which written out would never end. A value used in two places
  // isn't one: it's left before it's met again.
  const path = new Set<object>();
  const render = async (
    value: unknown,
    scope: Scope = rootScope(),
  ): Promise<string> => {
    if (typeof value !== "object" || value === null) {
      return renderValue(value, scope);
    }
    if (path.has(value)) {
      throw new Error(
        "Can't splice a value that contains itself: a bundle writes each " +
          "value out in full, so a cycle never ends. Break the cycle before " +
          "splicing it.",
      );
    }
    path.add(value);
    try {
      return await renderValue(value, scope);
    } finally {
      path.delete(value);
    }
  };
  const renderValue = async (value: unknown, scope: Scope): Promise<string> => {
    if (isClientScript(value)) {
      const target = scriptFor(value);
      if (target.module.kind !== "function") {
        return call(labelOf(target), await exprCallArgs(value, scope));
      }
      return closure(
        scope,
        [],
        async (inner) =>
          call(labelOf(target), await exprCallArgs(value, inner)),
        "$function",
      );
    }
    if (isJsxElement(value)) {
      return renderJsx(value, scope);
    }
    if (isClientImport(value)) {
      return imported(names, value);
    }
    if (
      value === null ||
      value === undefined ||
      typeof value === "number" ||
      typeof value === "bigint" ||
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
      const { name } = value;
      throw new Error(
        (name === ""
          ? "Can't splice a host function"
          : `Can't splice the host function \`${name}\``) +
          ": it's host code, and only runs on the host. Write a client " +
          "function as a script instead: cs`(n: number) => ...`. If it's a " +
          "server component, draw it with a tag in a braced splice: " +
          `\`{\${<${/^[A-Z]/.test(name) ? name : "Name"} />}}\`.`,
      );
    }
    if (typeof value !== "object") {
      throw new Error(
        "Can't splice a symbol: a bundle can't write one that is the same " +
          "symbol on the client. Splice a string, and make the symbol from it " +
          "in a script: cs`Symbol.for($key)`.",
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

  // A capture, by the name an enclosing thunk was handed it under, recorded as
  // read. At the bundle root nothing encloses it, so a capture reaching there
  // can't be threaded from anywhere.
  const capExpr = (key: string, scope: Scope): string => {
    if (scope.bindings.has(key)) {
      scope.read.add(key);
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

  // The arguments of a call of a script: a thunk per splice, then its
  // captures.
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
      // A thunk taking them, the splice rendered inside it.
      parts.push(
        await closure(
          scope,
          passed,
          async (inner) =>
            arrow(passed.map(displayName), await render(arg, inner)),
          "$thunk",
        ),
      );
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
      return render(await expandJsxElement(jsx, type), scope);
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
  const root = await render(value);
  // In table order, which is the order rendering first reached each script.
  const modules = [...numbers.keys()].map(
    (script) => [labelOf(script), script.module] as const,
  );
  return { modules, constants, root, names };
}
