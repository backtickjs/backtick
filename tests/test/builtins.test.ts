import type { Bundle, ClientUnknown, ClientValue } from "@backtickjs/core";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { evaluate } from "@backtickjs/test-vm";

// What a client answers for beside the language's own names, and what it may
// not: a member the schema leaves out, and a name a client adds.

describe("a member the schema leaves out", () => {
  // Written by hand because nothing else can reach it: the typechecker rejects
  // `padStart` where a fixture would declare one, so this is the bundle a
  // bundler that had not rejected it would have written.
  const bundle = {
    functions: {
      "0": ["=>", [], ["{}", [["return", [".", "abc", "padStart"]]]]],
    },
    root: ["()", ["fn", "0"], []],
  } as unknown as Bundle<ClientUnknown>;

  it("is a name this language has no meaning for", () => {
    // Not absent, and not the host's: reading it as null would let a bundle ask
    // for a member the schema left out and carry on, and the flat table holds
    // every name a value has — so nothing answering is the whole answer.
    assert.throws(
      () => evaluate(bundle),
      /a string has no `padStart` in this language/,
    );
  });
});

describe("a name a target answers for", () => {
  // What an SDK or an app adds: a whole name, reached by splicing the value it
  // is imported as, which lands on the wire as the same node `Math.floor` does.
  // The bundle a schema's generated `createBuiltin("greet")` would be spliced
  // into, written by hand because no schema here declares the name.
  const bundle = {
    functions: {
      "0": ["=>", [], ["{}", [["return", ["()", ["bltn", "greet"], []]]]]],
    },
    root: ["()", ["fn", "0"], []],
  } as unknown as Bundle<ClientUnknown>;

  it("is answered by the table its target handed over", () => {
    assert.equal(
      evaluate(bundle, { builtins: { greet: () => "hello" } }),
      "hello",
    );
  });

  it("is not answered by a client whose target added nothing", () => {
    // The language's list is every client's floor, and a name beyond it is a
    // name that target never offered — so a bundle built against one client
    // says so on another rather than reading as absent.
    assert.throws(() => evaluate(bundle), /unknown builtin greet/);
  });

  it("holds what a target handed over, whatever kind of value that is", () => {
    // Grouping is done by the value a name holds rather than by a dot in the
    // name: `$storage.get(…)` is a member read on a plain object this answered
    // with, which is the same path a cell's `read` is reached by.
    const held = {
      functions: {
        "0": [
          "=>",
          [],
          [
            "{}",
            [
              [
                "return",
                ["()", [".", ["bltn", "storage"], "get"], ["greeting"]],
              ],
            ],
          ],
        ],
      },
      root: ["()", ["fn", "0"], []],
    } as unknown as Bundle<ClientUnknown>;
    const storage = { greeting: "hei" } as Record<string, string>;
    assert.equal(
      evaluate(held, {
        builtins: {
          storage: {
            get: (key: ClientValue) => storage[key as string] ?? null,
          },
        },
      }),
      "hei",
    );
  });

  it("may lengthen the language's list and never edit it", () => {
    // The language's names are read first, so a target naming one is never
    // reached: redefining `Math.floor` would be one client answering a bundle
    // differently from every other.
    const floored = {
      functions: {},
      root: ["()", ["bltn", "Math.floor"], [2.7]],
    } as unknown as Bundle<ClientUnknown>;
    assert.equal(evaluate(floored, { builtins: { "Math.floor": () => 0 } }), 2);
  });

  it("may not add a member to a kind of value", () => {
    // A member of a string is the language's, so a table naming one adds a
    // whole name nothing reads: `"abc".padStart` still finds nothing.
    const padded = {
      functions: {
        "0": ["=>", [], ["{}", [["return", [".", "abc", "padStart"]]]]],
      },
      root: ["()", ["fn", "0"], []],
    } as unknown as Bundle<ClientUnknown>;
    assert.throws(
      () =>
        evaluate(padded, {
          builtins: { "string.padStart": (self) => self },
        }),
      /a string has no `padStart` in this language/,
    );
  });
});
