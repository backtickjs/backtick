import {
  isClient,
  isClientScript,
  isJSXElement,
  type Spliceable,
} from "../../cs-runtime/index.js";
import { buildAstScript } from "./buildAstScript.js";
import { buildClassAsObject } from "./buildClassAsObject.js";
import { buildJSXElement } from "./buildJSXElement.js";
import { AstArray } from "./nodes/AstArray.js";
import { AstBoolean } from "./nodes/AstBoolean.js";
import type { AstRoot } from "./nodes/AstNode.js";
import { AstNull } from "./nodes/AstNull.js";
import { AstNumber } from "./nodes/AstNumber.js";
import { AstObject } from "./nodes/AstObject.js";
import { AstString } from "./nodes/AstString.js";

export function buildAst(value: Spliceable): AstRoot {
  if (isClientScript(value)) {
    return buildAstScript(value);
  }
  if (isJSXElement(value)) {
    return buildJSXElement(value);
  }
  if (isClient(value)) {
    return buildClassAsObject(value);
  }
  if (value === null) {
    return new AstNull();
  }
  if (typeof value === "number") {
    return new AstNumber(value);
  }
  if (typeof value === "boolean") {
    return new AstBoolean(value);
  }
  if (typeof value === "string") {
    return new AstString(value);
  }
  if (Array.isArray(value)) {
    return new AstArray(value.map(buildAst));
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
  const entries: { [key: string]: AstRoot } = {};
  for (const [key, entry] of Object.entries(value)) {
    entries[key] = buildAst(entry);
  }
  return new AstObject(entries);
}
