import {
  type ClientScript,
  isClientScript,
  isJsxElement,
  type JsxElement,
} from "@backtickjs/core";
import { isClientImport, type Spliceable } from "@backtickjs/core";

import { expandFunction, type FunctionExpansions } from "./expandFunction.js";
import {
  type ElementExpansions,
  expandJsxElement,
} from "./expandJsxElement.js";
import { type Hole, holeOf, type HostParam } from "./holes.js";
import { bindingsOf, capturesOf } from "./params.js";
import { sourceName } from "./bindingKey.js";
import {
  array,
  arrow,
  call,
  createNames,
  imported,
  jsxElement,
  literal,
  member,
  object,
  componentElement,
  thunk,
  undefinedValue,
} from "../print/code.js";
import type { Names } from "../print/code.js";

/**
 * A bundle as it is built, before it is printed: each script it declares
 * under its label, in the order rendering first reached it, and the root, as
 * code; and what they import.
 */
export interface BundleTree {
  readonly scripts: readonly (readonly [string, ClientScript])[];
  readonly expansions: readonly (readonly [string, string])[];
  readonly root: string;
  readonly names: Names;
}

// Names a binding may not take: what strict code cannot bind. Every name the
// bundle introduces starts with `$`, which a script cannot bind, so none of
// those can meet a binding.
const RESERVED = ["arguments", "await", "eval", "yield"];

// What an expansion's declaration takes from where it is referenced: an
// argument of an enclosing expansion, or the key of a binding an enclosing
// thunk was handed.
type Capture = HostParam | string;

// A host function as the bundle declares it: `$expn` and its number, what a
// reference hands it, and its code.
//
// Curried, captures then arguments, where a script takes both in one list: a
// script reference is a call answering the script's value, but a function's
// is the function itself, which the client calls later with arguments of its
// own. So a reference fixes the captures and leaves the arguments open, with
// no parameter of its own to name, and so none to shadow.
interface Declaration {
  readonly label: string;
  readonly captures: readonly Capture[];
  readonly code: string;
}

// The expansion whose declaration is being written: its own parameters, and
// what it captures, each at the position the body first reached it.
interface Frame {
  readonly own: ReadonlySet<HostParam>;
  readonly captures: Map<Capture, number>;
}

// What encloses a value being rendered: the bindings the thunks around it were
// handed, and the declaration it is written into, if one.
interface Scope {
  readonly bindings: ReadonlySet<string>;
  readonly frame?: Frame;
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
export async function buildBundle(value: Spliceable): Promise<BundleTree> {
  const names = createNames();
  const functionExpansions: FunctionExpansions = new WeakMap();
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
    const existing = scriptById.get(script.id);
    if (existing !== undefined) {
      return existing;
    }
    scriptById.set(script.id, script);
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

  // What a declaration names a capture: `$capture` and where it stands, the
  // capture recorded the first time the body reaches it.
  const captureName = (frame: Frame, capture: Capture): string => {
    let at = frame.captures.get(capture);
    if (at === undefined) {
      at = frame.captures.size;
      frame.captures.set(capture, at);
    }
    return `$capture${at}`;
  };

  // An argument of an expansion, read where the value stands: its own
  // parameter inside its declaration, and a capture inside any other.
  const paramRead = (param: HostParam, scope: Scope): string => {
    if (scope.frame === undefined) {
      throw new Error(
        "Can't splice an argument of a host function outside the function: " +
          "it stands for a value only a call on the client supplies.",
      );
    }
    return scope.frame.own.has(param)
      ? param.name
      : captureName(scope.frame, param);
  };

  // How a hole is reached: its parameter, then each member read off it, read
  // where the drawing reads it.
  const holeRead = (hole: Hole, scope: Scope): string => {
    let read = paramRead(hole.param, scope);
    for (const step of hole.path) {
      read = member(read, step);
    }
    return read;
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
    bindingsOf(target.metadata.params[hole]);

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
      value.metadata.params.some((param) => param.kind !== "capture")
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

  // Each host function's label, taken when rendering first reaches it, so an
  // outer function is numbered before those its body reaches; and its
  // declaration, once its body is written. A body is written in a scope of its
  // own, so it reads its own arguments as its parameters and everything else it
  // reaches as a capture, wherever it is referenced from.
  const labels = new Map<object, string>();
  const declarations = new Map<string, Declaration>();
  const declareExpansion = async (
    value: (...args: never[]) => unknown,
  ): Promise<Declaration> => {
    const known = labels.get(value);
    if (known !== undefined) {
      const declaration = declarations.get(known);
      // Labelled but not yet written: its body reached it again.
      if (declaration === undefined) {
        throw new Error(
          "Can't splice a host function that answers with itself: its " +
            "expansion would never end.",
        );
      }
      return declaration;
    }
    const expansion = await expandFunction(value, functionExpansions);
    const label = `$expn${labels.size}`;
    labels.set(value, label);
    const frame: Frame = {
      own: new Set(expansion.params),
      captures: new Map(),
    };
    const body = arrow(
      expansion.params.map((param) => param.name),
      await render(expansion.returned, { bindings: new Set(), frame }),
    );
    // Always taking its captures first, even none, so every reference is a
    // call.
    const captures = [...frame.captures.keys()];
    const code = arrow(
      captures.map((_, at) => `$capture${at}`),
      body,
    );
    const declaration = { label, captures, code };
    declarations.set(label, declaration);
    return declaration;
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
    // A hole sentinel a host function stored somewhere in what it answered: the
    // client argument it stands for has no value until the client runs, so it
    // is a reference to the enclosing expansion's parameter.
    const hole = holeOf(value);
    if (hole !== undefined) {
      return holeRead(hole, scope);
    }
    if (isClientScript(value)) {
      const target = scriptFor(value);
      declare(target);
      return call(labelOf(target), await exprCallArgs(value, scope));
    }
    if (isJsxElement(value)) {
      return renderJsx(value, scope);
    }
    if (isClientImport(value)) {
      return imported(names, value.from, value.name);
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
    // A host function has no data form — client code is written in `cs`...` and
    // reaches a script as a script — so it is expanded rather than carried, and
    // declared as the arrow it is: its holes the parameters, and the call the
    // tag wrote binding them. A reference hands it what it captures.
    if (typeof value === "function") {
      const declaration = await declareExpansion(value);
      return call(
        declaration.label,
        declaration.captures.map((capture) =>
          typeof capture === "string"
            ? capExpr(capture, scope)
            : paramRead(capture, scope),
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
    // Inside a declaration, a binding the body doesn't bind itself is the
    // reference's to hand over.
    if (scope.frame !== undefined) {
      return captureName(scope.frame, key);
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
    const splices = ref.metadata.params.flatMap((param) =>
      param.kind === "capture" ? [] : [param],
    );
    for (const [index, { kind, value: arg }] of splices.entries()) {
      // A tag is handed over as the value it names, as its script reads it.
      if (kind === "tag") {
        parts.push(await render(arg, scope));
        continue;
      }
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
      const inner = {
        bindings: new Set([...scope.bindings, ...passed]),
        frame: scope.frame,
      };
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
      const expansion = await expandJsxElement(jsx, type, elementExpansions);
      // A script is what runs on the client; an element it drew instead has no
      // setup of its own to guard.
      return isClientScript(expansion)
        ? componentElement(names, await render(expansion, scope))
        : render(expansion, scope);
    }
    const written: [string, string][] = [];
    let children: string[] = [];
    // The adapter's JSX runtime hands over the props JSX wrote, an object.
    const props = jsx.props as { readonly [key: string]: unknown };
    for (const [key, entry] of Object.entries(props)) {
      if (entry === undefined) {
        continue;
      }
      if (key !== "children") {
        written.push([key, await renderProp(jsx, key, entry, scope)]);
        continue;
      }
      // Each child its own: an array is several, and `null` is none.
      const each = Array.isArray(entry) ? entry : entry === null ? [] : [entry];
      children = [];
      for (const child of each) {
        children.push(await renderProp(jsx, key, child, scope));
      }
    }
    // A component a client module provides is written as a tag of its import.
    const tag = isClientImport(type)
      ? imported(names, type.from, type.name)
      : type;
    return jsxElement(tag, written, children);
  };

  // A prop, as an expression in the enclosing script's scope.
  const renderProp = async (
    jsx: JsxElement,
    key: string,
    value: unknown,
    scope: Scope,
  ): Promise<string> => {
    try {
      return await render(value as Spliceable, scope);
    } catch (cause) {
      // A component runs while its props render, so what surfaces here may
      // be the app's own failure rather than a value that cannot cross — and
      // app code may throw anything, not only an error.
      const said = cause instanceof Error ? cause.message : String(cause);
      const tag = isClientImport(jsx.type) ? jsx.type.name : jsx.type;
      throw new Error(`In the \`${key}\` prop of <${String(tag)} />: ${said}`, {
        cause,
      });
    }
  };

  // Nothing encloses the root, so nothing it holds can capture.
  const root = await render(value as Spliceable);
  // In table order, which is the order rendering first reached each script.
  const scripts: (readonly [string, ClientScript])[] = [];
  for (const script of numbers.keys()) {
    if (declared.has(script)) {
      scripts.push([labelOf(script), script]);
    }
  }
  // In label order, which is the order rendering first reached each.
  const expansions = [...labels.values()].map(
    (label) => [label, declarations.get(label)!.code] as const,
  );
  return { scripts, expansions, root, names };
}
