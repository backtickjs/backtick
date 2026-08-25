import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { NodeKind, type Bundle } from "@backtickjs/core";
import { schema } from "@backtickjs/language-schema/schema";
import { getters, globals } from "@backtickjs/js-interpreter";
import { evaluate } from "./test-client/index.ts";

// What the reference client answers with, against what the schema says a script
// may reach. A name declared and not implemented, or implemented and not
// declared, fails here rather than at the first bundle that reaches it.

describe("builtins", () => {
  it("the client answers for every name in scope", () => {
    // Read off the schema and not off a list beside it, whether the host's lib
    // declares the name or the framework does: a name added there is checked
    // here without anything being told about it twice.
    //
    // One lookup, and nothing to unwrap: a name is whole on both sides — the
    // key the schema writes, the key this table holds, and the name the wire
    // carries are one string.
    const held = globals as unknown as Record<string, unknown>;
    for (const name of Object.keys(schema.builtins)) {
      assert.ok(name in held, `\`${name}\` is declared and not answered`);
    }
  });

  it("reads exactly the names the schema calls getters", () => {
    // The client acts on `getter` without reading the schema — nothing in its
    // table tells `length` from `trim` — so the two lists are held together
    // here. A name that starts or stops being a getter fails on this line.
    const declared = Object.entries(schema.builtins)
      .filter(([, node]) => {
        const written = node.type === "generic" ? node.expression : node;
        return written.type === "function" && written.getter === true;
      })
      .map(([name]) => name);
    assert.deepEqual([...getters].sort(), declared.sort());
  });

  it("answer with a number this language has, or not at all", () => {
    assert.throws(() => globals["Math.sqrt"](-1), /are finite/);
    assert.throws(() => globals["Math.log"](0), /are finite/);
    assert.throws(() => globals["Math.exp"](710), /are finite/);
    assert.equal(globals["Math.sqrt"](9), 3);
  });

  it("refuse an empty `Math.min`/`Math.max`", () => {
    assert.throws(() => globals["Math.min"](), /at least one number/);
    assert.throws(() => globals["Math.max"](), /at least one number/);
  });

  it("read a string as a number, or not at all", () => {
    assert.equal(globals["Number.parseInt"]("42"), 42);
    assert.equal(globals["Number.parseInt"]("42px"), 42);
    assert.equal(globals["Number.parseInt"]("ff", 16), 255);
    assert.equal(globals["Number.parseFloat"]("1.5"), 1.5);
    // `NaN` is what the host answers and not a value this language has, so the
    // name refuses rather than handing one back.
    assert.throws(() => globals["Number.parseInt"]("abc"), /read this string/);
    assert.throws(() => globals["Number.parseInt"](""), /read this string/);
    assert.throws(
      () => globals["Number.parseFloat"]("abc"),
      /read this string/,
    );
  });
});

describe("a member the schema leaves out", () => {
  // Written by hand because nothing else can reach it: the typechecker rejects
  // `padStart` where a fixture would declare one, so this is the bundle a
  // bundler that had not rejected it would have written.
  const bundle: Bundle = {
    functions: {
      "0": [
        [
          NodeKind.ArrowFunction,
          [],
          [
            NodeKind.Block,
            [
              [
                NodeKind.ReturnStatement,
                [NodeKind.PropertyAccessExpression, "abc", false, "padStart"],
              ],
            ],
          ],
        ],
      ],
    },
    root: [NodeKind.ApplyFunction, "0", []],
  };

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
