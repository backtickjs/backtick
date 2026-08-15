import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { GLOBAL_NAMES, schema } from "@backtickjs/cs-runtime";
import { boxes, globals } from "@backtickjs/js-interpreter";

// What the reference client answers with, against what the schema says a script
// may reach.
//
// The interpreter's table used to be the only list there was. Now the schema
// says it, and this is what holds the two together: a name declared and not
// implemented, or implemented and not declared, fails here rather than at the
// first bundle that reaches it.

/** The members a global's class declares, by the name a script reaches it by. */
function declared(): Map<string, string[]> {
  const members = new Map<string, string[]>();
  for (const [name, node] of Object.entries(schema.globals)) {
    const held = node.type === "ref" ? (schema.types[node.$ref] ?? node) : node;
    assert.equal(
      held.type,
      "class",
      `\`${name}\` is a global whose type the schema does not declare`,
    );
    members.set(name, Object.keys((held as { members: object }).members));
  }
  return members;
}

describe("boxes", () => {
  // What a member access on a primitive reaches. The schema says which class a
  // value autoboxes to; this holds the client to answering every member of it,
  // the way the globals test holds it to `Math`.
  it("the client answers for every member a boxed class declares", () => {
    const answered = new Map(Object.entries(boxes));
    for (const [name, node] of Object.entries(schema.types)) {
      const held = node.type === "generic" ? node.expression : node;
      if (held.type !== "class" || held.boxes === undefined) {
        continue;
      }
      const held_ = held as { boxes: string; members: Record<string, unknown> };
      const table = answered.get(held_.boxes) as Record<string, unknown>;
      assert.ok(
        table !== undefined,
        `nothing answers for a boxed ${held_.boxes}`,
      );
      for (const [member, node] of Object.entries(held_.members)) {
        // An index signature is reached by `[]` rather than by name, so it is
        // element access's to answer and not a member of this table.
        if ((node as { type?: string }).type === "index") {
          continue;
        }
        assert.ok(
          member in table,
          `\`${name}.${member}\` is declared and not answered`,
        );
      }
    }
  });
});

describe("globals", () => {
  it("answer with a number this language has, or not at all", () => {
    // `NaN` and `Infinity` are not values a script can write, so they are not
    // values a client may answer with. A domain error and an overflow are the
    // same refusal.
    assert.throws(
      () => globals.Math.sqrt(-1),
      /numbers \s*are finite|are finite/,
    );
    assert.throws(() => globals.Math.log(0), /are finite/);
    assert.throws(() => globals.Math.asin(2), /are finite/);
    assert.throws(() => globals.Math.exp(710), /are finite/);
    assert.throws(() => globals.Math.atanh(1), /are finite/);
    assert.throws(() => globals.Math.fround(1e39), /are finite/);
    assert.throws(() => globals.Math.pow(0, -1), /are finite/);
    // And the ones that cannot fail, do not.
    assert.equal(globals.Math.sqrt(9), 3);
    assert.equal(globals.Math.log(1), 0);
  });

  it("refuse an empty `Math.min`/`Math.max`", () => {
    // The standard library answers ±`Infinity`, which is not a value this
    // language has. The signature admits the call, so the client is what says
    // no — the way `Array.from` refuses a source it cannot count.
    assert.throws(() => globals.Math.min(), /at least one number/);
    assert.throws(() => globals.Math.max(), /at least one number/);
  });

  it("the client answers for every global the schema declares", () => {
    assert.deepEqual(Object.keys(globals).sort(), [...GLOBAL_NAMES].sort());
  });

  it("and for every member of one", () => {
    const answered = new Map(Object.entries(globals));
    for (const [name, members] of declared()) {
      const held = answered.get(name) as Record<string, unknown>;
      for (const member of members) {
        assert.ok(
          member in held,
          `\`${name}.${member}\` is declared and not answered`,
        );
      }
    }
  });
});
