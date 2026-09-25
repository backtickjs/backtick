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
          "34nfn77gkxcwe:21:21",
          { params: [{ kind: "splice", value: greet, bindings: [] }] },
          () => ({
            type: "CallExpression",
            loc: {
              start: { line: 21, column: 24 },
              end: { line: 21, column: 32 },
            },
            callee: {
              type: "Splice",
              loc: {
                start: { line: 21, column: 24 },
                end: { line: 21, column: 30 },
              },
              param: 0,
            },
            arguments: [],
            optional: false,
          }),
          "$0 => $0()()",
          '{"version":3,"file":"target-builtins.test.jsx","sourceRoot":"","sources":["target-builtins.test.tsx"],"names":[],"mappings":"AAoBwB,MAAA,IAAM,EAAE,CAAA"}',
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
          "34nfn77gkxcwe:29:34",
          { params: [{ kind: "splice", value: greet, bindings: [] }] },
          () => ({
            type: "CallExpression",
            loc: {
              start: { line: 29, column: 37 },
              end: { line: 29, column: 45 },
            },
            callee: {
              type: "Splice",
              loc: {
                start: { line: 29, column: 37 },
                end: { line: 29, column: 43 },
              },
              param: 0,
            },
            arguments: [],
            optional: false,
          }),
          "$0 => $0()()",
          '{"version":3,"file":"target-builtins.test.jsx","sourceRoot":"","sources":["target-builtins.test.tsx"],"names":[],"mappings":"AA4BqC,MAAA,IAAM,EAAE,CAAA"}',
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
          "34nfn77gkxcwe:37:21",
          { params: [{ kind: "splice", value: storage, bindings: [] }] },
          () => ({
            type: "CallExpression",
            loc: {
              start: { line: 37, column: 24 },
              end: { line: 37, column: 48 },
            },
            callee: {
              type: "MemberExpression",
              loc: {
                start: { line: 37, column: 24 },
                end: { line: 37, column: 36 },
              },
              object: {
                type: "Splice",
                loc: {
                  start: { line: 37, column: 24 },
                  end: { line: 37, column: 32 },
                },
                param: 0,
              },
              property: {
                type: "Identifier",
                loc: {
                  start: { line: 37, column: 33 },
                  end: { line: 37, column: 36 },
                },
                name: "get",
              },
              computed: false,
              optional: false,
            },
            arguments: [
              {
                type: "Literal",
                loc: {
                  start: { line: 37, column: 37 },
                  end: { line: 37, column: 47 },
                },
                value: "greeting",
              },
            ],
            optional: false,
          }),
          '$0 => $0().get("greeting")',
          '{"version":3,"file":"target-builtins.test.jsx","sourceRoot":"","sources":["target-builtins.test.tsx"],"names":[],"mappings":"AAoCwB,MAAA,IAAQ,CAAC,GAAG,CAAC,UAAU,CAAC,CAAA"}',
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
