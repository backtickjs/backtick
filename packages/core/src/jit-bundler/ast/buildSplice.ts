import {
  isClient,
  isClientScript,
  type Spliceable,
} from "../../cs-runtime/index.js";
import { buildClassAsObject } from "./buildClassAsObject.js";
import { buildClientScript } from "./buildClientScript.js";
import type { AstNode } from "./nodes/AstNode.js";
import { RuntimeArray } from "./nodes/RuntimeArray.js";
import { RuntimeBoolean } from "./nodes/RuntimeBoolean.js";
import { RuntimeNull } from "./nodes/RuntimeNull.js";
import { RuntimeNumber } from "./nodes/RuntimeNumber.js";
import { RuntimeObject } from "./nodes/RuntimeObject.js";
import { RuntimeString } from "./nodes/RuntimeString.js";

export function buildSplice(value: Spliceable): AstNode {
  if (isClientScript(value)) {
    return buildClientScript(value);
  }
  if (isClient(value)) {
    return buildClassAsObject(value);
  }
  if (value === null) {
    return new RuntimeNull();
  }
  if (typeof value === "number") {
    return new RuntimeNumber(value);
  }
  if (typeof value === "boolean") {
    return new RuntimeBoolean(value);
  }
  if (typeof value === "string") {
    return new RuntimeString(value);
  }
  if (Array.isArray(value)) {
    return new RuntimeArray(value.map(buildSplice));
  }
  // Only plain objects reflect structurally. A class instance without the
  // "@backtickjs" marker would land here and half-work — own fields reflect,
  // getters silently vanish — so fail loudly instead.
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== Object.prototype && prototype !== null) {
    const name = value.constructor?.name ?? "an unknown class";
    throw new Error(
      `Can't splice this \`${name}\` instance: only plain objects and classes ` +
        'declaring the "@backtickjs" marker can be spliced into a client script.',
    );
  }
  const entries: { [key: string]: AstNode } = {};
  for (const [key, entry] of Object.entries(value)) {
    entries[key] = buildSplice(entry);
  }
  return new RuntimeObject(entries);
}
