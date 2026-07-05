import { printAst } from "../ast/printAst.js";
import { IrArray } from "../ir/nodes/IrArray.js";
import { IrBoolean } from "../ir/nodes/IrBoolean.js";
import { IrCall } from "../ir/nodes/IrCall.js";
import { IrNull } from "../ir/nodes/IrNull.js";
import { IrNumber } from "../ir/nodes/IrNumber.js";
import { IrObject } from "../ir/nodes/IrObject.js";
import { IrString } from "../ir/nodes/IrString.js";
import type { IrValue } from "../ir/nodes/IrValue.js";
import type { IrPayload } from "../ir/Payload.js";

// Serializes a payload to a JSON string. The envelope holds the function table
// (each entry carries its arity, its captured variables, and its body rendered
// as source with splices shown as `${...}` holes) alongside the root call into
// that table. Values are encoded as a discriminated union so calls, arrays, and
// objects stay unambiguous when the payload is re-parsed.
export function serialize(payload: IrPayload): string {
  const json = {
    functions: payload.functions.map((fn) => ({
      arity: fn.arity,
      captures: fn.captures,
      body: printAst(fn.body),
    })),
    root: encodeValue(payload.root),
  };
  return JSON.stringify(json, null, 2);
}

function encodeValue(value: IrValue): unknown {
  if (value instanceof IrCall) {
    return {
      kind: "call",
      target: value.target,
      args: value.args.map(encodeValue),
    };
  }
  if (value instanceof IrArray) {
    return { kind: "array", elements: value.elements.map(encodeValue) };
  }
  if (value instanceof IrObject) {
    const entries = Object.fromEntries(
      Object.entries(value.entries).map(([key, entry]) => [
        key,
        encodeValue(entry),
      ]),
    );
    return { kind: "object", entries };
  }
  if (value instanceof IrNumber) {
    return { kind: "number", value: value.value };
  }
  if (value instanceof IrString) {
    return { kind: "string", value: value.value };
  }
  if (value instanceof IrBoolean) {
    return { kind: "boolean", value: value.value };
  }
  if (value instanceof IrNull) {
    return { kind: "null" };
  }
  const unhandled: never = value;
  throw new Error(`Unhandled IR node: ${JSON.stringify(unhandled)}`);
}
