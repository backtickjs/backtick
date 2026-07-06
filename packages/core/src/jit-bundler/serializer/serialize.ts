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
import { IrArray } from "../ir/nodes/IrArray.js";
import { IrBoolean } from "../ir/nodes/IrBoolean.js";
import { IrCall } from "../ir/nodes/IrCall.js";
import { IrNull } from "../ir/nodes/IrNull.js";
import { IrNumber } from "../ir/nodes/IrNumber.js";
import { IrObject } from "../ir/nodes/IrObject.js";
import { IrString } from "../ir/nodes/IrString.js";
import type { IrValue } from "../ir/nodes/IrValue.js";
import type { IrPayload } from "../ir/Payload.js";

// Fills a splice hole in a script body with the value passed for that position.
type RenderSplice = (index: number) => string;

// Serializes a payload to a JSON envelope `{ functions, root }`. `functions`
// maps each label (`#fi`) to its source as an arrow `(captures) => body`,
// where the parameters are the entry's captured variables and every splice hole
// is inlined in place — a nested-script argument as a call `#fj(...)`, a
// runtime-value argument as a literal. A reference to an entry passes that
// entry's captured variables by name, so `root` is the entrypoint call
// `#fi(...)` and a captured `x` flows in as `#fj(x)` from the scope that binds
// it.
//
// Because splice arguments are inlined into the callee's body, an entry is
// rendered with the arguments from the first call that reaches it; this assumes
// a shared entry is always called with the same arguments (true whenever a
// distinct script's splices are constant, as with the compiler's output today).
export function serializePayload(payload: IrPayload): string {
  const bodies = new Map<number, string>();

  // Renders a reference to an entry as `#ftarget(captures)`, materializing the
  // target's inlined body into `bodies` the first time it is reached. The
  // captured variables are passed by name from the referencing scope.
  function renderCall(call: IrCall): string {
    const fn = payload.functions[call.target];
    if (!bodies.has(call.target)) {
      bodies.set(call.target, ""); // reserve the slot to break reference cycles
      const body = serializeScript(fn.body, (index) =>
        renderValue(call.args[index]),
      );
      bodies.set(call.target, `(${fn.captures.join(", ")}) => ${body}`);
    }
    return `#f${call.target}(${fn.captures.join(", ")})`;
  }

  // Renders an IR value as a JavaScript expression: a call becomes `#ftarget()`,
  // every other value its literal form.
  function renderValue(value: IrValue): string {
    if (value instanceof IrCall) {
      return renderCall(value);
    }
    if (value instanceof IrArray) {
      return `[${value.elements.map(renderValue).join(", ")}]`;
    }
    if (value instanceof IrObject) {
      const entries = Object.entries(value.entries).map(
        ([key, entry]) => `${key}: ${renderValue(entry)}`,
      );
      return entries.length === 0 ? "{}" : `{ ${entries.join(", ")} }`;
    }
    if (value instanceof IrNumber) {
      return value.value.toString();
    }
    if (value instanceof IrString) {
      return JSON.stringify(value.value);
    }
    if (value instanceof IrBoolean) {
      return value.value ? "true" : "false";
    }
    if (value instanceof IrNull) {
      return "null";
    }
    const unhandled: never = value;
    throw new Error(`Unhandled IR node: ${JSON.stringify(unhandled)}`);
  }

  const root = renderCall(payload.root);
  const functions: Record<string, string> = {};
  for (const index of [...bodies.keys()].sort((a, b) => a - b)) {
    functions[`#f${index}`] = bodies.get(index) ?? "";
  }
  return JSON.stringify({ functions, root }, null, 2);
}

// Renders a client script's AST body to a single-line JavaScript expression.
// Mirrors `printAst`, but formats for embedding: blocks stay on one line and
// splice holes are filled by `renderSplice` (with the arguments passed to the
// script) rather than shown as `${...}` placeholders.
export function serializeScript(
  node: AstNode,
  renderSplice: RenderSplice,
): string {
  const s = (child: AstNode): string => serializeScript(child, renderSplice);
  if (node instanceof SourceArray) {
    return `[${node.elements.map(s).join(", ")}]`;
  }
  if (node instanceof SourceArrow) {
    return `(${node.params.join(", ")}) => ${s(node.body)}`;
  }
  if (node instanceof SourceAssignment) {
    return `${s(node.name)} = ${s(node.expression)};`;
  }
  if (node instanceof SourceBinop) {
    return `${s(node.lhs)} ${node.operator} ${s(node.rhs)}`;
  }
  if (node instanceof SourceBlock) {
    return serializeBlock(node.statements, s);
  }
  if (node instanceof SourceBoolean) {
    return node.value ? "true" : "false";
  }
  if (node instanceof SourceCall) {
    return `${s(node.callee)}(${node.args.map(s).join(", ")})`;
  }
  if (node instanceof SourceClientScript) {
    return `cs\`${s(node.expression)}\``;
  }
  if (node instanceof SourceIdentifier) {
    return node.name;
  }
  if (node instanceof SourceIf) {
    const head = `if (${s(node.condition)}) ${s(node.consequent)}`;
    return node.alternate === null ? head : `${head} else ${s(node.alternate)}`;
  }
  if (node instanceof SourceNull) {
    return "null";
  }
  if (node instanceof SourceNumber) {
    return node.value.toString();
  }
  if (node instanceof SourceObject) {
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
  if (node instanceof SourceString) {
    return `"${node.value}"`;
  }
  if (node instanceof SourceVariableDeclaration) {
    return `${node.keyword} ${s(node.name)} = ${s(node.expression)};`;
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
    return `[${node.elements.map(s).join(", ")}]`;
  }
  if (node instanceof RuntimeObject) {
    return serializeObject(node.entries, s);
  }
  const unhandled: never = node;
  throw new Error(`Unhandled AST node: ${JSON.stringify(unhandled)}`);
}

// A block on a single line: `{ a; b; }`. Statements already carry their own
// terminators, so they are simply joined by spaces.
function serializeBlock(
  statements: readonly AstNode[],
  s: (node: AstNode) => string,
): string {
  if (statements.length === 0) {
    return "{}";
  }
  return `{ ${statements.map(s).join(" ")} }`;
}

// An object literal wrapped in parentheses so it reads as an expression.
function serializeObject(
  entries: Readonly<Record<string, AstNode>>,
  s: (node: AstNode) => string,
): string {
  const body = Object.entries(entries)
    .map(([key, value]) => `${key}: ${s(value)}`)
    .join(", ");
  return `({${body}})`;
}
