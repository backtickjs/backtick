import type { AstNode } from "./ast/AstNode.js";
import { RuntimeArray } from "./ast/RuntimeArray.js";
import { RuntimeBoolean } from "./ast/RuntimeBoolean.js";
import { RuntimeNull } from "./ast/RuntimeNull.js";
import { RuntimeNumber } from "./ast/RuntimeNumber.js";
import { RuntimeObject } from "./ast/RuntimeObject.js";
import { RuntimeString } from "./ast/RuntimeString.js";
import { SourceArray } from "./ast/SourceArray.js";
import { SourceArrow } from "./ast/SourceArrow.js";
import { SourceAssignment } from "./ast/SourceAssignment.js";
import { SourceBinop } from "./ast/SourceBinop.js";
import { SourceBlock } from "./ast/SourceBlock.js";
import { SourceBoolean } from "./ast/SourceBoolean.js";
import { SourceCall } from "./ast/SourceCall.js";
import { SourceClientScript } from "./ast/SourceClientScript.js";
import { SourceIdentifier } from "./ast/SourceIdentifier.js";
import { SourceIf } from "./ast/SourceIf.js";
import { SourceNull } from "./ast/SourceNull.js";
import { SourceNumber } from "./ast/SourceNumber.js";
import { SourceObject } from "./ast/SourceObject.js";
import { SourcePropertyAccess } from "./ast/SourcePropertyAccess.js";
import { SourceReturn } from "./ast/SourceReturn.js";
import { SourceSplice } from "./ast/SourceSplice.js";
import { SourceString } from "./ast/SourceString.js";

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
