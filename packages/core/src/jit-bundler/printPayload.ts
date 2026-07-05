import { IrArray } from "./ir/IrArray.js";
import { IrBoolean } from "./ir/IrBoolean.js";
import { IrFunctionRef } from "./ir/IrFunctionRef.js";
import { IrNull } from "./ir/IrNull.js";
import { IrNumber } from "./ir/IrNumber.js";
import { IrObject } from "./ir/IrObject.js";
import { IrString } from "./ir/IrString.js";
import type { IrValue } from "./ir/IrValue.js";
import type { Payload } from "./Payload.js";
import { printAst } from "./printAst.js";

// Renders a payload to its debug string: the function table (one line per
// entry, splices shown as `${...}` holes in each body) followed by the root
// reference into that table.
export function printPayload(payload: Payload): string {
  const table = payload.functions
    .map(
      (fn, index) =>
        `${index}: (${fn.freeVars.join(", ")}) => ${printAst(fn.body)}`,
    )
    .map(indent)
    .join("\n");
  const functions =
    payload.functions.length === 0
      ? "functions {}"
      : `functions {\n${table}\n}`;
  return `${functions}\nroot ${printIr(payload.root)}`;
}

function printIr(value: IrValue): string {
  if (value instanceof IrFunctionRef) {
    return `#${value.index}(${value.args.map(printIr).join(", ")})`;
  }
  if (value instanceof IrArray) {
    return `[${value.elements.map(printIr).join(", ")}]`;
  }
  if (value instanceof IrObject) {
    const body = Object.entries(value.entries)
      .map(([key, entry]) => `${key}: ${printIr(entry)}`)
      .join(", ");
    return `({${body}})`;
  }
  if (value instanceof IrNumber) {
    return value.value.toString();
  }
  if (value instanceof IrString) {
    return `"${value.value}"`;
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

function indent(text: string): string {
  return text
    .split("\n")
    .map((line) => (line.length > 0 ? `  ${line}` : line))
    .join("\n");
}
