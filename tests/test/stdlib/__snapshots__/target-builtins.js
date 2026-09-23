import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createBuiltin } from "@backtickjs/platform-sdk";
import { evaluate } from "@backtickjs/web-testing";
// What a client answers for beside the ECMAScript globals: a name a target
// adds.
// Names an SDK or an app adds, as its generated code declares them.
const greet = createBuiltin("greet");
const storage = createBuiltin("storage");
const answersGreet = (name) => (name === "greet" ? () => "hello" : undefined);
describe("a name a target answers for", () => {
  // What an SDK or an app adds: a whole name, reached by splicing the value
  // `createBuiltin` made, which lands on the wire as the same node `Math`
  // does.
  it("is answered by the function its target handed over", async () => {
    assert.equal(
      await evaluate(
        cs.create(
          [26, 22, 26, 34],
          {
            version: "0.0.0",
            filePath: "stdlib/target-builtins.test.tsx",
            fileHash: "2kb7nxcl47bpi",
            splices: { $greet: { value: greet, params: [] } },
            captures: [],
          },
          () => ({
            kind: "()",
            loc: [26, 25, 26, 33],
            expression: {
              kind: "splice",
              loc: [26, 25, 26, 31],
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
          [35, 35, 35, 47],
          {
            version: "0.0.0",
            filePath: "stdlib/target-builtins.test.tsx",
            fileHash: "2kb7nxcl47bpi",
            splices: { $greet: { value: greet, params: [] } },
            captures: [],
          },
          () => ({
            kind: "()",
            loc: [35, 38, 35, 46],
            expression: {
              kind: "splice",
              loc: [35, 38, 35, 44],
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
          [44, 22, 44, 50],
          {
            version: "0.0.0",
            filePath: "stdlib/target-builtins.test.tsx",
            fileHash: "2kb7nxcl47bpi",
            splices: { $storage: { value: storage, params: [] } },
            captures: [],
          },
          () => ({
            kind: "()",
            loc: [44, 25, 44, 49],
            expression: {
              kind: ".",
              loc: [44, 25, 44, 37],
              expression: {
                kind: "splice",
                loc: [44, 25, 44, 33],
                key: "$storage",
              },
              name: "get",
            },
            arguments: [
              {
                kind: "string",
                loc: [44, 38, 44, 48],
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
});
