import {
  type Client,
  type ClientObject,
  type ClientUnknown,
  isClientObject,
  isClientScript,
  isClientUIElement,
  type Spliceable,
} from "../../cs-runtime/index.js";
import type { Ast, AstExpansion } from "./Ast.js";
import { createHole, holeName } from "./holes.js";
import { lowerClientObject } from "./lowerClientObject.js";
import { lowerClientScript } from "./lowerClientScript.js";
import { lowerClientUIElement } from "./lowerClientUIElement.js";

// The call side of `ClientObjectConstructor`: that type's `never[]`
// parameters accept any concrete class but let nothing be passed, so the
// expansion casts to this hole-taking form to invoke the constructor.
type ConstructibleClass = new (
  ...args: Client<ClientUnknown>[]
) => ClientObject;

// One expansion per class, ever: a constructor sees only opaque holes —
// never the client's live argument values — so its expansion is a function
// of the class alone. (This bakes in the constructor purity the holes
// already enforce: one reading *mutable host* state at expansion time would
// get its first expansion replayed.) Sharing the node also dedups
// downstream: the IR interns one entry per expansion node however many
// instances construct the class.
const expansionByClass = new WeakMap<ConstructibleClass, AstExpansion>();

// A spliced class expands to a function with holes: the constructor runs
// once with one opaque hole per declared parameter (`length`), and the
// spliceable it returns lowers into the expansion's body — the class itself
// never leaves the host. A construction compiles as a plain call of the
// slot, binding the client's argument values to the holes when it runs.
function expandClass(splicedClass: ConstructibleClass): AstExpansion {
  let expansion = expansionByClass.get(splicedClass);
  if (expansion === undefined) {
    const params = Array.from(
      { length: splicedClass.length },
      (_, position) => `$${position}`,
    );
    expansion = {
      kind: "AstExpansion",
      params,
      body: lowerSpliceable(new splicedClass(...params.map(createHole))),
    };
    expansionByClass.set(splicedClass, expansion);
  }
  return expansion;
}

export function lowerSpliceable(value: Spliceable): Ast {
  // A hole sentinel a constructor stored somewhere in its result: the
  // client argument it stands for has no value until the client runs, so it
  // serializes as a reference to the enclosing expansion's parameter.
  const hole = holeName(value);
  if (hole !== undefined) {
    return { kind: "AstHole", name: hole };
  }
  if (isClientScript(value)) {
    return lowerClientScript(value);
  }
  if (isClientUIElement(value)) {
    return lowerClientUIElement(value);
  }
  if (isClientObject(value)) {
    return lowerClientObject(value);
  }
  if (value === null) {
    return { kind: "AstNull" };
  }
  if (typeof value === "number") {
    return { kind: "AstNumber", value };
  }
  if (typeof value === "boolean") {
    return { kind: "AstBoolean", value };
  }
  if (typeof value === "string") {
    return { kind: "AstString", value };
  }
  if (Array.isArray(value)) {
    return { kind: "AstArray", elements: value.map(lowerSpliceable) };
  }
  // A spliced class lowers to its expansion — a function of its declared
  // constructor parameters — wherever it appears, so a construction (or a
  // local holding the class) just calls the slot's value.
  if (typeof value === "function") {
    return expandClass(value as ConstructibleClass);
  }
  // Only plain objects reflect structurally. A class instance without the
  // "@backtickjs" marker would land here and half-work — own fields reflect,
  // getters silently vanish — so fail loudly instead.
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== Object.prototype && prototype !== null) {
    const name = value.constructor?.name ?? "an unknown class";
    throw new Error(
      `Can't splice this \`${name}\` instance: only plain objects and classes ` +
        'declaring the `"@backtickjs": "ClientObject"` marker can be spliced ' +
        "into a client script.",
    );
  }
  const entries: { [key: string]: Ast } = {};
  for (const [key, entry] of Object.entries(value)) {
    entries[key] = lowerSpliceable(entry);
  }
  return { kind: "AstObject", entries };
}
