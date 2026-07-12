import {
  isClientElement,
  isClientObject,
  isClientScript,
  type Spliceable,
} from "../../cs-runtime/index.js";
import type { Ast } from "./Ast.js";
import { buildAstScript } from "./buildAstScript.js";
import { buildClassAsObject } from "./buildClassAsObject.js";
import { buildJSXElement } from "./buildJSXElement.js";

export function buildAst(value: Spliceable): Ast {
  if (isClientScript(value)) {
    return buildAstScript(value);
  }
  if (isClientElement(value)) {
    return buildJSXElement(value);
  }
  if (isClientObject(value)) {
    return buildClassAsObject(value);
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
    return { kind: "AstArray", elements: value.map(buildAst) };
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
    entries[key] = buildAst(entry);
  }
  return { kind: "AstObject", entries };
}
