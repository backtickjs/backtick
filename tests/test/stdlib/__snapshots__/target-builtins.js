import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createBuiltin } from "@backtickjs/platform-sdk";
import { evaluate } from "@backtickjs/web-testing";
// What a client defines beside the web's globals: a name an app adds.
// Names an SDK or an app adds, as its generated code declares them.
const greet = createBuiltin("greet");
const storage = createBuiltin("storage");
describe("a global an app defines", () => {
  // What an SDK or an app adds: a name, reached by splicing the value
  // `createBuiltin` made, which a bundle reads as the global of that name.
  it("is what the client defined under that name", async () => {
    assert.equal(
      await evaluate(
        cs.create(
          [21, 22, 21, 34],
          {
            version: "0.0.0",
            filePath: "stdlib/target-builtins.test.tsx",
            fileHash: "34nfn77gkxcwe",
            splices: { $greet: { value: greet, params: [] } },
            captures: [],
          },
          () => ({
            kind: "()",
            loc: [21, 25, 21, 33],
            expression: {
              kind: "splice",
              loc: [21, 25, 21, 31],
              key: "$greet",
            },
            arguments: [],
          }),
        ),
        { globals: { greet: () => "hello" } },
      ),
      "hello",
    );
  });
  it("is not defined by a client that did not define it", async () => {
    // A bundle built against one client says so on another rather than
    // reading as absent, as a name nothing defined does in JavaScript.
    await assert.rejects(
      evaluate(
        cs.create(
          [29, 35, 29, 47],
          {
            version: "0.0.0",
            filePath: "stdlib/target-builtins.test.tsx",
            fileHash: "34nfn77gkxcwe",
            splices: { $greet: { value: greet, params: [] } },
            captures: [],
          },
          () => ({
            kind: "()",
            loc: [29, 38, 29, 46],
            expression: {
              kind: "splice",
              loc: [29, 38, 29, 44],
              key: "$greet",
            },
            arguments: [],
          }),
        ),
      ),
      /greet is not defined/,
    );
  });
  it("holds what the client defined, whatever kind of value that is", async () => {
    // Grouping is done by the value a name holds rather than by a dot in the
    // name: `$storage.get(…)` is a member read on a plain object.
    const held = { greeting: "hei" };
    assert.equal(
      await evaluate(
        cs.create(
          [37, 22, 37, 50],
          {
            version: "0.0.0",
            filePath: "stdlib/target-builtins.test.tsx",
            fileHash: "34nfn77gkxcwe",
            splices: { $storage: { value: storage, params: [] } },
            captures: [],
          },
          () => ({
            kind: "()",
            loc: [37, 25, 37, 49],
            expression: {
              kind: ".",
              loc: [37, 25, 37, 37],
              expression: {
                kind: "splice",
                loc: [37, 25, 37, 33],
                key: "$storage",
              },
              name: "get",
            },
            arguments: [
              {
                kind: "string",
                loc: [37, 38, 37, 48],
                text: "greeting",
              },
            ],
          }),
        ),
        {
          globals: {
            storage: { get: (key) => held[key] ?? null },
          },
        },
      ),
      "hei",
    );
  });
});
