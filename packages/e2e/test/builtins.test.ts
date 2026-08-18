import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { schema } from "@backtickjs/core-schema";
import { boxes, globals } from "@backtickjs/js-interpreter";

// What the reference client answers with, against what the schema says a script
// may reach. A name declared and not implemented, or implemented and not
// declared, fails here rather than at the first bundle that reaches it.

describe("boxes", () => {
  // Which table a primitive autoboxes to is the client's own decision, so the
  // four are named here as the client names them. What each one holds is the
  // schema's, read off the whole names under that prefix.
  const boxed = ["array", "boolean", "number", "string"];

  it("the client answers for every member a boxed value declares", () => {
    const answered = boxes as unknown as Record<
      string,
      Record<string, unknown>
    >;
    for (const name of Object.keys(schema.builtins)) {
      const at = name.indexOf(".");
      const prefix = name.slice(0, at);
      if (!boxed.includes(prefix)) {
        continue;
      }
      assert.ok(
        name.slice(at + 1) in answered[prefix],
        `\`${name}\` is declared and not answered`,
      );
    }
  });
});

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
});
