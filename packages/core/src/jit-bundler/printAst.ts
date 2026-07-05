import { AstArray } from "./ast/AstArray.js";
import { AstArrow } from "./ast/AstArrow.js";
import { AstAssignment } from "./ast/AstAssignment.js";
import { AstBinop } from "./ast/AstBinop.js";
import { AstBlock } from "./ast/AstBlock.js";
import { AstBoolean } from "./ast/AstBoolean.js";
import { AstCall } from "./ast/AstCall.js";
import { AstClientScript } from "./ast/AstClientScript.js";
import { AstIdentifier } from "./ast/AstIdentifier.js";
import { AstIf } from "./ast/AstIf.js";
import type { AstNode } from "./ast/AstNode.js";
import { AstNull } from "./ast/AstNull.js";
import { AstNumber } from "./ast/AstNumber.js";
import { AstObject } from "./ast/AstObject.js";
import { AstPropertyAccess } from "./ast/AstPropertyAccess.js";
import { AstReturn } from "./ast/AstReturn.js";
import { AstSplice } from "./ast/AstSplice.js";
import { AstString } from "./ast/AstString.js";
import { RuntimeArray } from "./ast/RuntimeArray.js";
import { RuntimeBoolean } from "./ast/RuntimeBoolean.js";
import { RuntimeNull } from "./ast/RuntimeNull.js";
import { RuntimeNumber } from "./ast/RuntimeNumber.js";
import { RuntimeObject } from "./ast/RuntimeObject.js";
import { RuntimeString } from "./ast/RuntimeString.js";

// Renders any AST node to its debug string. Children are rendered recursively;
// splices carry raw runtime values, which are rendered by `printValue`.
export function printAst(node: AstNode): string {
  if (node instanceof AstArray) {
    return `[${node.elements.map(printAst).join(", ")}]`;
  }
  if (node instanceof AstArrow) {
    return `(${node.params.join(", ")}) => ${printAst(node.body)}`;
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
    return `${printAst(node.expression)}.${node.name}`;
  }
  if (node instanceof AstReturn) {
    return `return ${printAst(node.expression)};`;
  }
  if (node instanceof AstSplice) {
    return `\${...}`;
  }
  if (node instanceof AstString) {
    return `"${node.value}"`;
  }
  if (node instanceof RuntimeNull) {
    return "null";
  }
  if (node instanceof RuntimeNumber) {
    return node.value.toString();
  }
  if (node instanceof RuntimeBoolean) {
    return node.value ? "true" : "false";
  }
  if (node instanceof RuntimeString) {
    return `"${node.value}"`;
  }
  if (node instanceof RuntimeArray) {
    return `[${node.elements.map(printAst).join(", ")}]`;
  }
  if (node instanceof RuntimeObject) {
    return printObject(node.entries);
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
