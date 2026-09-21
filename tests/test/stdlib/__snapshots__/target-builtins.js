import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createBuiltin } from "@backtickjs/platform-sdk";
import { evaluate } from "@backtickjs/web-testing";
// What a client answers for beside the language's own names, and what it may
// not: a member the schema leaves out, and a name a client adds.
// Names an SDK or an app adds, as its generated code declares them.
const greet = createBuiltin("greet");
const storage = createBuiltin("storage");
const answersGreet = (name) => (name === "greet" ? () => "hello" : undefined);
describe("a member the schema leaves out", () => {
  it("is a name this language has no meaning for", async () => {
    // Not absent, and not the host's: reading it as null would let a bundle ask
    // for a member the schema left out and carry on, and the client answers
    // every name a value has — so nothing answering is the whole answer.
    await assert.rejects(
      // @ts-expect-error: the schema leaves `normalize` out
      evaluate(
        cs.create(
          [27, 16, 27, 35],
          {
            version: "0.0.0",
            filePath: "stdlib/target-builtins.test.tsx",
            fileHash: "20tgf6g4m3c3u",
            splices: {},
            captures: [],
          },
          () => ({
            kind: ".",
            loc: [27, 19, 27, 34],
            expression: {
              kind: "string",
              loc: [27, 19, 27, 24],
              text: "abc",
            },
            name: "normalize",
          }),
        ),
      ),
      /a string has no `normalize` in this language/,
    );
  });
});
describe("a name a target answers for", () => {
  // What an SDK or an app adds: a whole name, reached by splicing the value
  // `createBuiltin` made, which lands on the wire as the same node `Math.floor`
  // does.
  it("is answered by the function its target handed over", async () => {
    assert.equal(
      await evaluate(
        cs.create(
          [39, 22, 39, 34],
          {
            version: "0.0.0",
            filePath: "stdlib/target-builtins.test.tsx",
            fileHash: "20tgf6g4m3c3u",
            splices: { $greet: { value: greet, params: [] } },
            captures: [],
          },
          () => ({
            kind: "()",
            loc: [39, 25, 39, 33],
            expression: {
              kind: "splice",
              loc: [39, 25, 39, 31],
              key: "$greet",
            },
            arguments: [],
          }),
        ),
        { builtinOf: answersGreet },
      ),
      "hello",
    );
  });
  it("is not answered by a client whose target added nothing", async () => {
    // The language's list is every client's floor, and a name beyond it is a
    // name that target never offered — so a bundle built against one client
    // says so on another rather than reading as absent.
    await assert.rejects(
      evaluate(
        cs.create(
          [48, 35, 48, 47],
          {
            version: "0.0.0",
            filePath: "stdlib/target-builtins.test.tsx",
            fileHash: "20tgf6g4m3c3u",
            splices: { $greet: { value: greet, params: [] } },
            captures: [],
          },
          () => ({
            kind: "()",
            loc: [48, 38, 48, 46],
            expression: {
              kind: "splice",
              loc: [48, 38, 48, 44],
              key: "$greet",
            },
            arguments: [],
          }),
        ),
      ),
      /unknown builtin greet/,
    );
  });
  it("holds what a target handed over, whatever kind of value that is", async () => {
    // Grouping is done by the value a name holds rather than by a dot in the
    // name: `$storage.get(…)` is a member read on a plain object this answered
    // with, which is the same path a cell's `read` is reached by.
    const held = { greeting: "hei" };
    assert.equal(
      await evaluate(
        cs.create(
          [57, 22, 57, 50],
          {
            version: "0.0.0",
            filePath: "stdlib/target-builtins.test.tsx",
            fileHash: "20tgf6g4m3c3u",
            splices: { $storage: { value: storage, params: [] } },
            captures: [],
          },
          () => ({
            kind: "()",
            loc: [57, 25, 57, 49],
            expression: {
              kind: ".",
              loc: [57, 25, 57, 37],
              expression: {
                kind: "splice",
                loc: [57, 25, 57, 33],
                key: "$storage",
              },
              name: "get",
            },
            arguments: [
              {
                kind: "string",
                loc: [57, 38, 57, 48],
                text: "greeting",
              },
            ],
          }),
        ),
        {
          builtinOf: (name) =>
            name === "storage"
              ? { get: (key) => held[key] ?? null }
              : undefined,
        },
      ),
      "hei",
    );
  });
  it("may lengthen the language's list and never edit it", async () => {
    // The language's names are read first, so a target naming one is never
    // reached: redefining `Math.floor` would be one client answering a bundle
    // differently from every other.
    assert.equal(
      await evaluate(
        cs.create(
          [72, 22, 72, 41],
          {
            version: "0.0.0",
            filePath: "stdlib/target-builtins.test.tsx",
            fileHash: "20tgf6g4m3c3u",
            splices: {},
            captures: [],
          },
          () => ({
            kind: "()",
            loc: [72, 25, 72, 40],
            expression: {
              kind: "bltn",
              loc: [72, 25, 72, 35],
              name: "Math.floor",
            },
            arguments: [
              {
                kind: "number",
                loc: [72, 36, 72, 39],
                value: 2.7,
              },
            ],
          }),
        ),
        {
          builtinOf: (name) => (name === "Math.floor" ? () => 0 : undefined),
        },
      ),
      2,
    );
  });
  it("may not add a member to a kind of value", async () => {
    // A member of a string is the language's, so a target naming one adds a
    // whole name nothing reads: `"abc".normalize` still finds nothing.
    await assert.rejects(
      // @ts-expect-error: the schema leaves `normalize` out
      evaluate(
        cs.create(
          [84, 16, 84, 35],
          {
            version: "0.0.0",
            filePath: "stdlib/target-builtins.test.tsx",
            fileHash: "20tgf6g4m3c3u",
            splices: {},
            captures: [],
          },
          () => ({
            kind: ".",
            loc: [84, 19, 84, 34],
            expression: {
              kind: "string",
              loc: [84, 19, 84, 24],
              text: "abc",
            },
            name: "normalize",
          }),
        ),
        {
          builtinOf: (name) =>
            name === "string.normalize" ? (self) => self : undefined,
        },
      ),
      /a string has no `normalize` in this language/,
    );
  });
});
