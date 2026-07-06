import type { AstNode } from "./nodes/AstNode.js";
import { RuntimeArray } from "./nodes/RuntimeArray.js";
import { RuntimeBoolean } from "./nodes/RuntimeBoolean.js";
import { RuntimeNull } from "./nodes/RuntimeNull.js";
import { RuntimeNumber } from "./nodes/RuntimeNumber.js";
import { RuntimeObject } from "./nodes/RuntimeObject.js";
import { RuntimeString } from "./nodes/RuntimeString.js";
import { SourceArray } from "./nodes/SourceArray.js";
import { SourceArrow } from "./nodes/SourceArrow.js";
import { SourceAssignment } from "./nodes/SourceAssignment.js";
import { SourceBinop } from "./nodes/SourceBinop.js";
import { SourceBlock } from "./nodes/SourceBlock.js";
import { SourceBoolean } from "./nodes/SourceBoolean.js";
import { SourceCall } from "./nodes/SourceCall.js";
import { SourceClientScript } from "./nodes/SourceClientScript.js";
import { SourceIdentifier } from "./nodes/SourceIdentifier.js";
import { SourceIf } from "./nodes/SourceIf.js";
import { SourceNull } from "./nodes/SourceNull.js";
import { SourceNumber } from "./nodes/SourceNumber.js";
import { SourceObject } from "./nodes/SourceObject.js";
import { SourcePropertyAccess } from "./nodes/SourcePropertyAccess.js";
import { SourceReturn } from "./nodes/SourceReturn.js";
import { SourceSplice } from "./nodes/SourceSplice.js";
import { SourceString } from "./nodes/SourceString.js";
import { SourceVariableDeclaration } from "./nodes/SourceVariableDeclaration.js";

// Renders any AST node to its debug string. Children are rendered recursively;
// splices carry raw runtime values, which are rendered by `printValue`.
export function printAst(node: AstNode): string {
  if (node instanceof SourceArray) {
    return `[${node.elements.map(printAst).join(", ")}]`;
  }
  if (node instanceof SourceArrow) {
    return `(${node.params.join(", ")}) => ${printAst(node.body)}`;
  }
  if (node instanceof SourceAssignment) {
    return `${printAst(node.name)} = ${printAst(node.expression)};`;
  }
  if (node instanceof SourceBinop) {
    return `${printAst(node.lhs)} ${node.operator} ${printAst(node.rhs)}`;
  }
  if (node instanceof SourceBlock) {
    return printBlock(node.statements);
  }
  if (node instanceof SourceBoolean) {
    return node.value ? "true" : "false";
  }
  if (node instanceof SourceCall) {
    return `${printAst(node.callee)}(${node.args.map(printAst).join(", ")})`;
  }
  if (node instanceof SourceClientScript) {
    return `cs\`${printAst(node.expression)}\``;
  }
  if (node instanceof SourceIdentifier) {
    return node.name;
  }
  if (node instanceof SourceIf) {
    const head = `if (${printAst(node.condition)}) ${printAst(node.consequent)}`;
    return node.alternate === null
      ? head
      : `${head} else ${printAst(node.alternate)}`;
  }
  if (node instanceof SourceNull) {
    return "null";
  }
  if (node instanceof SourceNumber) {
    return node.value.toString();
  }
  if (node instanceof SourceObject) {
    return printObject(node.entries);
  }
  if (node instanceof SourcePropertyAccess) {
    return `${printAst(node.expression)}.${node.name}`;
  }
  if (node instanceof SourceReturn) {
    return `return ${printAst(node.expression)};`;
  }
  if (node instanceof SourceSplice) {
    return `\${...}`;
  }
  if (node instanceof SourceString) {
    return `"${node.value}"`;
  }
  if (node instanceof SourceVariableDeclaration) {
    return `${node.keyword} ${printAst(node.name)} = ${printAst(node.expression)};`;
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
  const unhandled: never = node;
  throw new Error(`Unhandled AST node: ${JSON.stringify(unhandled)}`);
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
