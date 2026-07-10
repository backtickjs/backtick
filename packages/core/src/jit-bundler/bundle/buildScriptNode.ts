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
import type { BundleNode } from "./nodes/Bundle.js";

// Fills a splice hole in a script body with the node passed for that position.
export type RenderSplice = (index: number) => BundleNode;

// Maps a binding key to the name it is printed under (see `displayName` in
// `buildBundle`).
export type Mangle = (key: string) => string;

// Lowers a script's AST body to a wire `BundleNode` tree: splice holes are
// filled by `renderSplice` (with the arguments passed to the script), and
// every binding key is printed under its `mangle`d display name — the source
// name, disambiguated only where needed — so a captured variable's reference
// and the parameter that receives it still line up.
export function buildScriptNode(
  node: AstNode,
  renderSplice: RenderSplice,
  mangle: Mangle,
): BundleNode {
  const s = (child: AstNode): BundleNode =>
    buildScriptNode(child, renderSplice, mangle);
  if (node instanceof AstScriptArray || node instanceof AstArray) {
    return { kind: "array", elements: node.elements.map(s) };
  }
  if (node instanceof AstScriptArrow) {
    return {
      kind: "arrow",
      params: node.params.map((param) => mangle(param.bindingKey)),
      body: s(node.body),
    };
  }
  if (node instanceof AstScriptAssignment) {
    return {
      kind: "assignment",
      name: targetName(node.name, mangle),
      expression: s(node.expression),
    };
  }
  if (node instanceof AstScriptBinop) {
    return {
      kind: "binop",
      operator: node.operator,
      left: s(node.lhs),
      right: s(node.rhs),
    };
  }
  if (node instanceof AstScriptBlock) {
    return { kind: "block", statements: node.statements.map(s) };
  }
  if (node instanceof AstScriptBoolean || node instanceof AstBoolean) {
    return { kind: "value", value: node.value };
  }
  if (node instanceof AstScriptCall) {
    return { kind: "call", callee: s(node.callee), args: node.args.map(s) };
  }
  if (node instanceof AstScript) {
    // `buildIr` hoists every nested script into the function table; a script
    // reaches a body only as a splice argument, rendered as an entry call.
    throw new Error("A nested script can't appear in a script body.");
  }
  if (node instanceof AstScriptIdentifier) {
    return { kind: "identifier", name: mangle(node.bindingKey) };
  }
  if (node instanceof AstElement) {
    // An element reaches the bundle as a splice value and lowers into the
    // tree table (see `buildIr`); a parsed script body never contains one.
    throw new Error("A JSX element can't appear in a script body.");
  }
  if (node instanceof AstScriptIf) {
    return {
      kind: "if",
      condition: s(node.condition),
      consequent: s(node.consequent),
      alternate: node.alternate === null ? null : s(node.alternate),
    };
  }
  if (node instanceof AstScriptNull || node instanceof AstNull) {
    return { kind: "value", value: null };
  }
  if (node instanceof AstScriptNumber || node instanceof AstNumber) {
    return { kind: "value", value: node.value };
  }
  if (node instanceof AstScriptObject || node instanceof AstObject) {
    const entries: { [key: string]: BundleNode } = {};
    for (const [key, value] of Object.entries(node.entries)) {
      entries[key] = s(value);
    }
    return { kind: "object", entries };
  }
  if (node instanceof AstScriptPropertyAccess) {
    return { kind: "property", object: s(node.expression), name: node.name };
  }
  if (node instanceof AstScriptReturn) {
    return { kind: "return", expression: s(node.expression) };
  }
  if (node instanceof AstScriptSplice) {
    return renderSplice(node.index);
  }
  if (node instanceof AstScriptString || node instanceof AstString) {
    return { kind: "value", value: node.value };
  }
  if (node instanceof AstScriptVariableDeclaration) {
    return {
      kind: "declaration",
      keyword: node.keyword,
      name: targetName(node.name, mangle),
      expression: s(node.expression),
    };
  }
  const unhandled: never = node;
  throw new Error(`Unhandled AST node: ${JSON.stringify(unhandled)}`);
}

// A declaration or assignment target, flattened to its display name — the
// compiler only produces identifier targets.
function targetName(node: AstNode, mangle: Mangle): string {
  if (node instanceof AstScriptIdentifier) {
    return mangle(node.bindingKey);
  }
  throw new Error("A binding target must be an identifier.");
}
