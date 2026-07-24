import {
  isClientObject,
  isClientScript,
  isJsxElement,
  type Spliceable,
} from "@backtickjs/cs-runtime";
import type { Ast } from "./Ast.js";
import { expandClientConstructor } from "./expandClientConstructor.js";
import { holeName } from "./holes.js";
import { lowerClientObject } from "./lowerClientObject.js";
import { lowerClientScript } from "./lowerClientScript.js";
import { expandJsxElement } from "./expandJsxElement.js";

export async function lowerSpliceable(
  value: Spliceable,
  // The kind of position being lowered
  position: "ClientUnknown" | "ClientValue",
): Promise<Ast> {
  // A hole sentinel a constructor stored somewhere in its result: the
  // client argument it stands for has no value until the client runs, so it
  // serializes as a reference to the enclosing expansion's parameter.
  const hole = holeName(value);
  if (hole !== undefined) {
    return { kind: "AstHole", name: hole };
  }
  if (isClientScript(value)) {
    // Backstop for untyped callers
    if (position === "ClientValue" && value.metadata.kind === "action") {
      throw new Error(
        "Can't bundle an action `Client<void>` as data. " +
          "Use a callback `Client<() => void>` instead.",
      );
    }
    return lowerClientScript(value);
  }
  if (isJsxElement(value)) {
    return expandJsxElement(value);
  }
  if (isClientObject(value)) {
    return lowerClientObject(value);
  }
  if (value === null) {
    return { kind: "AstNull" };
  }
  if (typeof value === "number") {
    return { kind: "AstNumber", value };
  }
  if (typeof value === "boolean") {
    return { kind: "AstBoolean", value };
  }
  if (typeof value === "string") {
    return { kind: "AstString", value };
  }
  if (Array.isArray(value)) {
    return {
      kind: "AstArray",
      elements: await Promise.all(
        value.map((element) => lowerSpliceable(element, "ClientValue")),
      ),
    };
  }
  // A spliced class lowers to its expansion — a function of its declared
  // constructor parameters — wherever it appears, so a construction (or a
  // local holding the class) just calls the slot's value.
  if (typeof value === "function") {
    return expandClientConstructor(value);
  }
  // Only plain objects reflect structurally. A class instance without the
  // "@backtickjs" marker would land here and half-work — own fields reflect,
  // getters silently vanish — so fail loudly instead.
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== Object.prototype && prototype !== null) {
    const name = value.constructor?.name ?? "an unknown class";
    throw new Error(
      `Can't splice this \`${name}\` instance: only plain objects and classes ` +
        'declaring the `"@backtickjs": "ClientObject"` marker can be spliced ' +
        "into a client script.",
    );
  }
  const entries: { [key: string]: Ast } = Object.fromEntries(
    await Promise.all(
      Object.entries(value).map(async ([key, entry]) => [
        key,
        await lowerSpliceable(entry, "ClientValue"),
      ]),
    ),
  );
  return { kind: "AstObject", entries };
}
