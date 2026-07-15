import {
  isClientObject,
  isClientScript,
  isClientUIElement,
  type Spliceable,
} from "../../cs-runtime/index.js";
import type { Ast } from "./Ast.js";
import { holeName } from "./holes.js";
import { lowerClientObject } from "./lowerClientObject.js";
import { lowerClientScript } from "./lowerClientScript.js";
import { lowerClientUIElement } from "./lowerClientUIElement.js";

export function lowerSpliceable(value: Spliceable): Ast {
  // A hole sentinel a macro's `expand` stored somewhere in its result: the
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
