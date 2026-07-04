import type { Client, Spliceable } from "../cs-runtime/index.js";
import { AstArray } from "./ast/AstArray.js";
import { AstAssignment } from "./ast/AstAssignment.js";
import { AstBinop } from "./ast/AstBinop.js";
import { AstBlock } from "./ast/AstBlock.js";
import { AstBoolean } from "./ast/AstBoolean.js";
import { AstCall } from "./ast/AstCall.js";
import { AstClientScript } from "./ast/AstClientScript.js";
import { AstIdentifier } from "./ast/AstIdentifier.js";
import { AstIf } from "./ast/AstIf.js";
import type { AstNode } from "./ast/AstNode.js";
import { AstNew } from "./ast/AstNew.js";
import { AstNull } from "./ast/AstNull.js";
import { AstNumber } from "./ast/AstNumber.js";
import { AstObject } from "./ast/AstObject.js";
import { AstPropertyAccess } from "./ast/AstPropertyAccess.js";
import { AstReturn } from "./ast/AstReturn.js";
import { AstSplice } from "./ast/AstSplice.js";
import { AstString } from "./ast/AstString.js";
import { AstThis } from "./ast/AstThis.js";
import { buildAst } from "./buildAst.js";

// Renders any AST node to its debug string. Children are rendered recursively;
// splices carry raw runtime values, which are rendered by `printValue`.
export function printAst(node: AstNode): string {
  if (node instanceof AstArray) {
    return `[${node.elements.map(printAst).join(", ")}]`;
  }
  if (node instanceof AstAssignment) {
    return `${printAst(node.name)} = ${printAst(node.expression)};`;
  }
  if (node instanceof AstBinop) {
    return `${printAst(node.lhs)} ${node.operator} ${printAst(node.rhs)}`;
  }
  if (node instanceof AstBlock) {
    return printBlock(node.statements);
  }
  if (node instanceof AstBoolean) {
    return node.value ? "true" : "false";
  }
  if (node instanceof AstCall) {
    return `${printAst(node.callee)}(${node.args.map(printAst).join(", ")})`;
  }
  if (node instanceof AstClientScript) {
    return `cs\`${printAst(node.expression)}\``;
  }
  if (node instanceof AstIdentifier) {
    return node.name;
  }
  if (node instanceof AstIf) {
    const head = `if (${printAst(node.condition)}) ${printAst(node.consequent)}`;
    return node.alternate === null
      ? head
      : `${head} else ${printAst(node.alternate)}`;
  }
  if (node instanceof AstNew) {
    return `new ${printAst(node.callee)}(${node.args.map(printAst).join(", ")})`;
  }
  if (node instanceof AstNull) {
    return "null";
  }
  if (node instanceof AstNumber) {
    return node.value.toString();
  }
  if (node instanceof AstObject) {
    return printObject(node.entries);
  }
  if (node instanceof AstPropertyAccess) {
    if (node.expression instanceof AstThis) {
      return `this.${node.name}`;
    }
    return `${printAst(node.expression)}.${node.name}`;
  }
  if (node instanceof AstReturn) {
    return `return ${printAst(node.expression)};`;
  }
  if (node instanceof AstSplice) {
    return `\${${printValue(node.expression)}}`;
  }
  if (node instanceof AstThis) {
    return printValue(node.instance);
  }
  if (node instanceof AstString) {
    return `"${node.value}"`;
  }
  throw new Error(`Unhandled AST node: ${JSON.stringify(node)}`);
}

function printBlock(statements: readonly AstNode[]): string {
  if (statements.length === 0) {
    return "{}";
  }
  const body = statements
    .map((statement) =>
      printAst(statement)
        .split("\n")
        .map((line) => (line.length > 0 ? `  ${line}` : line))
        .join("\n"),
    )
    .join("\n");
  return `{\n${body}\n}`;
}

function printObject(entries: Readonly<Record<string, AstNode>>): string {
  const body = Object.entries(entries)
    .map(([key, value]) => `${key}: ${printAst(value)}`)
    .join(", ");
  return `({${body}})`;
}

// Renders a raw runtime splice value: a primitive, a nested client script
// (expanded through the AST), or an array/object of either.
function printValue(value: Spliceable): string {
  if (value == null) {
    return "null";
  }
  if (typeof value === "number") {
    return value.toString();
  }
  if (typeof value === "boolean") {
    return value ? "true" : "false";
  }
  if (typeof value === "string") {
    return `"${value}"`;
  }
  if (Array.isArray(value)) {
    return `[${value.map(printValue).join(", ")}]`;
  }
  if ("$$type" in value && "visit" in value) {
    return printAst(buildAst(value as Client<unknown>));
  }
  const body = Object.entries(value)
    .map(([key, item]) => `${key}: ${printValue(item)}`)
    .join(", ");
  return `({${body}})`;
}
