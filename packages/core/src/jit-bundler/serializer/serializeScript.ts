import { AstArray } from "../ast/nodes/AstArray.js";
import { AstBoolean } from "../ast/nodes/AstBoolean.js";
import { AstElement } from "../ast/nodes/AstElement.js";
import type { AstNode } from "../ast/nodes/AstNode.js";
import { AstNull } from "../ast/nodes/AstNull.js";
import { AstNumber } from "../ast/nodes/AstNumber.js";
import { AstObject } from "../ast/nodes/AstObject.js";
import { AstScript } from "../ast/nodes/AstScript.js";
import { AstScriptArray } from "../ast/nodes/AstScriptArray.js";
import { AstScriptArrow } from "../ast/nodes/AstScriptArrow.js";
import { AstScriptAssignment } from "../ast/nodes/AstScriptAssignment.js";
import { AstScriptBinop } from "../ast/nodes/AstScriptBinop.js";
import { AstScriptBlock } from "../ast/nodes/AstScriptBlock.js";
import { AstScriptBoolean } from "../ast/nodes/AstScriptBoolean.js";
import { AstScriptCall } from "../ast/nodes/AstScriptCall.js";
import { AstScriptIdentifier } from "../ast/nodes/AstScriptIdentifier.js";
import { AstScriptIf } from "../ast/nodes/AstScriptIf.js";
import { AstScriptNull } from "../ast/nodes/AstScriptNull.js";
import { AstScriptNumber } from "../ast/nodes/AstScriptNumber.js";
import { AstScriptObject } from "../ast/nodes/AstScriptObject.js";
import { AstScriptPropertyAccess } from "../ast/nodes/AstScriptPropertyAccess.js";
import { AstScriptReturn } from "../ast/nodes/AstScriptReturn.js";
import { AstScriptSplice } from "../ast/nodes/AstScriptSplice.js";
import { AstScriptString } from "../ast/nodes/AstScriptString.js";
import { AstScriptVariableDeclaration } from "../ast/nodes/AstScriptVariableDeclaration.js";
import { AstString } from "../ast/nodes/AstString.js";
import {
  serializeArray,
  serializeObject,
  serializePrimitive,
} from "./literals.js";

// Fills a splice hole in a script body with the value passed for that position.
export type RenderSplice = (index: number) => string;

// Maps a binding key to the name it is printed under (see `displayName` in
// `buildBundle`).
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
  if (node instanceof AstScriptArray || node instanceof AstArray) {
    return serializeArray(node.elements, s);
  }
  if (node instanceof AstScriptArrow) {
    const params = node.params
      .map((param) => mangle(param.bindingKey))
      .join(", ");
    return `(${params}) => ${s(node.body)}`;
  }
  if (node instanceof AstScriptAssignment) {
    return `${s(node.name)} = ${s(node.expression)};`;
  }
  if (node instanceof AstScriptBinop) {
    return `${s(node.lhs)} ${node.operator} ${s(node.rhs)}`;
  }
  if (node instanceof AstScriptBlock) {
    return serializeBlock(node.statements, renderSplice, mangle);
  }
  if (node instanceof AstScriptBoolean || node instanceof AstBoolean) {
    return serializePrimitive(node.value);
  }
  if (node instanceof AstScriptCall) {
    return `${s(node.callee)}(${node.args.map(s).join(", ")})`;
  }
  if (node instanceof AstScript) {
    return `cs\`${s(node.expression)}\``;
  }
  if (node instanceof AstScriptIdentifier) {
    return mangle(node.bindingKey);
  }
  if (node instanceof AstElement) {
    // An element reaches the bundle as a splice value and lowers into the tree
    // table (see `buildIr`); a parsed script body never contains one.
    throw new Error("A JSX element can't appear in a script body.");
  }
  if (node instanceof AstScriptIf) {
    const head = `if (${s(node.condition)}) ${s(node.consequent)}`;
    return node.alternate === null ? head : `${head} else ${s(node.alternate)}`;
  }
  if (node instanceof AstScriptNull || node instanceof AstNull) {
    return serializePrimitive(null);
  }
  if (node instanceof AstScriptNumber || node instanceof AstNumber) {
    return serializePrimitive(node.value);
  }
  if (node instanceof AstScriptObject || node instanceof AstObject) {
    return serializeObject(node.entries, s);
  }
  if (node instanceof AstScriptPropertyAccess) {
    return `${s(node.expression)}.${node.name}`;
  }
  if (node instanceof AstScriptReturn) {
    return `return ${s(node.expression)};`;
  }
  if (node instanceof AstScriptSplice) {
    return renderSplice(node.index);
  }
  if (node instanceof AstScriptString || node instanceof AstString) {
    return serializePrimitive(node.value);
  }
  if (node instanceof AstScriptVariableDeclaration) {
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
