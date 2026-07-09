import type { AstNode } from "../ast/nodes/AstNode.js";
import { RuntimeArray } from "../ast/nodes/RuntimeArray.js";
import { RuntimeBoolean } from "../ast/nodes/RuntimeBoolean.js";
import { RuntimeNull } from "../ast/nodes/RuntimeNull.js";
import { RuntimeNumber } from "../ast/nodes/RuntimeNumber.js";
import { RuntimeObject } from "../ast/nodes/RuntimeObject.js";
import { RuntimeString } from "../ast/nodes/RuntimeString.js";
import { SourceArray } from "../ast/nodes/SourceArray.js";
import { SourceArrow } from "../ast/nodes/SourceArrow.js";
import { SourceAssignment } from "../ast/nodes/SourceAssignment.js";
import { SourceBinop } from "../ast/nodes/SourceBinop.js";
import { SourceBlock } from "../ast/nodes/SourceBlock.js";
import { SourceBoolean } from "../ast/nodes/SourceBoolean.js";
import { SourceCall } from "../ast/nodes/SourceCall.js";
import { SourceClientScript } from "../ast/nodes/SourceClientScript.js";
import { SourceIdentifier } from "../ast/nodes/SourceIdentifier.js";
import { SourceIf } from "../ast/nodes/SourceIf.js";
import { SourceNull } from "../ast/nodes/SourceNull.js";
import { SourceNumber } from "../ast/nodes/SourceNumber.js";
import { SourceObject } from "../ast/nodes/SourceObject.js";
import { SourcePropertyAccess } from "../ast/nodes/SourcePropertyAccess.js";
import { SourceReturn } from "../ast/nodes/SourceReturn.js";
import { SourceSplice } from "../ast/nodes/SourceSplice.js";
import { SourceString } from "../ast/nodes/SourceString.js";
import { SourceVariableDeclaration } from "../ast/nodes/SourceVariableDeclaration.js";
import {
  serializeArray,
  serializeObject,
  serializePrimitive,
} from "./literals.js";

// Fills a splice hole in a script body with the value passed for that position.
export type RenderSplice = (index: number) => string;

// Maps a binding key to the name it is printed under (see `displayName` in
// `serializeBundle`).
export type Mangle = (key: string) => string;

// Renders a client script's AST body to a single-line JavaScript expression,
// formatted for embedding: blocks stay on one line and splice holes are filled
// by `renderSplice` (with the arguments passed to the script). Every binding
// key is printed under its `mangle`d display name — the source name,
// disambiguated only where needed — and a captured variable is received as a
// parameter under that same name, so the reference and its parameter still
// line up.
export function serializeScript(
  node: AstNode,
  renderSplice: RenderSplice,
  mangle: Mangle,
): string {
  const s = (child: AstNode): string =>
    serializeScript(child, renderSplice, mangle);
  if (node instanceof SourceArray || node instanceof RuntimeArray) {
    return serializeArray(node.elements, s);
  }
  if (node instanceof SourceArrow) {
    const params = node.params
      .map((param) => mangle(param.bindingKey))
      .join(", ");
    return `(${params}) => ${s(node.body)}`;
  }
  if (node instanceof SourceAssignment) {
    return `${s(node.name)} = ${s(node.expression)};`;
  }
  if (node instanceof SourceBinop) {
    return `${s(node.lhs)} ${node.operator} ${s(node.rhs)}`;
  }
  if (node instanceof SourceBlock) {
    return serializeBlock(node.statements, renderSplice, mangle);
  }
  if (node instanceof SourceBoolean || node instanceof RuntimeBoolean) {
    return serializePrimitive(node.value);
  }
  if (node instanceof SourceCall) {
    return `${s(node.callee)}(${node.args.map(s).join(", ")})`;
  }
  if (node instanceof SourceClientScript) {
    return `cs\`${s(node.expression)}\``;
  }
  if (node instanceof SourceIdentifier) {
    return mangle(node.bindingKey);
  }
  if (node instanceof SourceIf) {
    const head = `if (${s(node.condition)}) ${s(node.consequent)}`;
    return node.alternate === null ? head : `${head} else ${s(node.alternate)}`;
  }
  if (node instanceof SourceNull || node instanceof RuntimeNull) {
    return serializePrimitive(null);
  }
  if (node instanceof SourceNumber || node instanceof RuntimeNumber) {
    return serializePrimitive(node.value);
  }
  if (node instanceof SourceObject || node instanceof RuntimeObject) {
    return serializeObject(node.entries, s);
  }
  if (node instanceof SourcePropertyAccess) {
    return `${s(node.expression)}.${node.name}`;
  }
  if (node instanceof SourceReturn) {
    return `return ${s(node.expression)};`;
  }
  if (node instanceof SourceSplice) {
    return renderSplice(node.index);
  }
  if (node instanceof SourceString || node instanceof RuntimeString) {
    return serializePrimitive(node.value);
  }
  if (node instanceof SourceVariableDeclaration) {
    return `${node.keyword} ${s(node.name)} = ${s(node.expression)};`;
  }
  const unhandled: never = node;
  throw new Error(`Unhandled AST node: ${JSON.stringify(unhandled)}`);
}

// A block on a single line: `{ a; b; }`. Statements already carry their own
// terminators, so they are simply joined by spaces.
function serializeBlock(
  statements: readonly AstNode[],
  renderSplice: RenderSplice,
  mangle: Mangle,
): string {
  if (statements.length === 0) {
    return "{}";
  }
  const body = statements
    .map((statement) => serializeScript(statement, renderSplice, mangle))
    .join(" ");
  return `{ ${body} }`;
}
