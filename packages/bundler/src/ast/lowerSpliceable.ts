import { isClientScript } from "@backtickjs/boundary";
import { isElement } from "@backtickjs/boundary";
import { isBuiltin, type Client, type Spliceable } from "@backtickjs/boundary";
import type { Ast } from "./Ast.js";
import { holeName } from "./holes.js";
import { lowerClientScript } from "./lowerClientScript.js";
import { expandFunction } from "./expandFunction.js";
import { expandElement } from "./expandElement.js";

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
  if (isElement(value)) {
    return expandElement(value);
  }
  if (isBuiltin(value)) {
    return { kind: "AstBuiltin", name: value.name };
  }
  if (value === null) {
    return { kind: "AstNull" };
  }
  // The language has no `undefined`: a key nobody wrote reads as absent, and
  // nothing on the wire says otherwise. Refused by name, since everything past
  // here reads the value as an object.
  if (value === undefined) {
    throw new Error(
      "Can't splice `undefined`: this language has no such value. " +
        "Use `null` for nothing.",
    );
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
  // A host function has no data form — client code is written in `cs`...` and
  // reaches a script as a script — so it is expanded rather than carried: run
  // against a hole per parameter, and what it answered is what crosses. A
  // component is one of these, and a tag naming it is a call.
  if (typeof value === "function") {
    return expandFunction(value as (...args: Client<never>[]) => unknown);
  }
  // Only plain objects cross structurally. A class instance would land here
  // and half-work — own fields reflect, getters and methods silently vanish —
  // so fail loudly instead. An object with behaviour is built by a client
  // function: `state` for what it holds, arrows for what may be done to it.
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== Object.prototype && prototype !== null) {
    const name = value.constructor?.name ?? "an unknown class";
    throw new Error(
      `Can't splice this \`${name}\` instance: only plain objects cross into ` +
        "a client script. Build one with a client function instead.",
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
