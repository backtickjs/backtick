import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import type { ClientValue } from "@backtickjs/core";
import { createBuiltin } from "@backtickjs/platform-sdk";
import { evaluate } from "@backtickjs/web-testing";

// What a client answers for beside the language's own names, and what it may
// not: a member the schema leaves out, and a name a client adds.

// Names an SDK or an app adds, as its generated code declares them.
const greet = createBuiltin<() => string>("greet");
const storage = createBuiltin<{ get: (key: string) => string | null }>(
  "storage",
);

const answersGreet = (name: string) =>
  name === "greet" ? () => "hello" : undefined;

describe("a member the schema leaves out", () => {
  it("is a name this language has no meaning for", async () => {
    // Not absent, and not the host's: reading it as null would let a bundle ask
    // for a member the schema left out and carry on, and the client answers
    // every name a value has — so nothing answering is the whole answer.
    await assert.rejects(
      // @ts-expect-error: the schema leaves `padStart` out
      evaluate(cs.lift(cs.const(cs.receiver("abc").padStart))),
      /a string has no `padStart` in this language/,
    );
  });
});

describe("a name a target answers for", () => {
  // What an SDK or an app adds: a whole name, reached by splicing the value
  // `createBuiltin` made, which lands on the wire as the same node `Math.floor`
  // does.
  it("is answered by the function its target handed over", async () => {
    assert.equal(
      await evaluate(cs.lift(cs.const((cs.splice((greet)) satisfies typeof cs.ClientUnknown)())), { builtinOf: answersGreet }),
      "hello",
    );
  });

  it("is not answered by a client whose target added nothing", async () => {
    // The language's list is every client's floor, and a name beyond it is a
    // name that target never offered — so a bundle built against one client
    // says so on another rather than reading as absent.
    await assert.rejects(evaluate(cs.lift(cs.const((cs.splice((greet)) satisfies typeof cs.ClientUnknown)()))), /unknown builtin greet/);
  });

  it("holds what a target handed over, whatever kind of value that is", async () => {
    // Grouping is done by the value a name holds rather than by a dot in the
    // name: `$storage.get(…)` is a member read on a plain object this answered
    // with, which is the same path a cell's `read` is reached by.
    const held = { greeting: "hei" } as Record<string, string>;
    assert.equal(
      await evaluate(cs.lift(cs.const(cs.receiver((cs.splice((storage)) satisfies typeof cs.ClientUnknown)).get("greeting"))), {
        builtinOf: (name) =>
          name === "storage"
            ? { get: (key: ClientValue) => held[key as string] ?? null }
            : undefined,
      }),
      "hei",
    );
  });

  it("may lengthen the language's list and never edit it", async () => {
    // The language's names are read first, so a target naming one is never
    // reached: redefining `Math.floor` would be one client answering a bundle
    // differently from every other.
    assert.equal(
      await evaluate(cs.lift(cs.const(cs.receiver(Math).floor(2.7))), {
        builtinOf: (name) => (name === "Math.floor" ? () => 0 : undefined),
      }),
      2,
    );
  });

  it("may not add a member to a kind of value", async () => {
    // A member of a string is the language's, so a target naming one adds a
    // whole name nothing reads: `"abc".padStart` still finds nothing.
    await assert.rejects(
      // @ts-expect-error: the schema leaves `padStart` out
      evaluate(cs.lift(cs.const(cs.receiver("abc").padStart)), {
        builtinOf: (name) =>
          name === "string.padStart" ? (self: ClientValue) => self : undefined,
      }),
      /a string has no `padStart` in this language/,
    );
  });
});
