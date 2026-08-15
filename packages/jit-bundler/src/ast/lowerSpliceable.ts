import {
  isClientScript,
  isClientState,
  isJsxElement,
  type Spliceable,
} from "@backtickjs/cs-runtime";
import type { Ast } from "./Ast.js";
import { holeName } from "./holes.js";
import { lowerClientScript } from "./lowerClientScript.js";
import { lowerClientState } from "./lowerClientState.js";
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
  if (isClientState(value)) {
    return lowerClientState(value);
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
  // A host function has no data form. Client code is written in `cs`...`` and
  // reaches a script as a script, so a function here is the host's own.
  if (typeof value === "function") {
    throw new Error(
      "Can't splice a function: client code is written in `cs`...` and " +
        "crosses as a script.",
    );
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
