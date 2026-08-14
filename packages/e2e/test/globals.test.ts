import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { GLOBAL_NAMES, schema } from "@backtickjs/cs-runtime";
import { globals } from "@backtickjs/js-interpreter";

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

describe("globals", () => {
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
