import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { schema } from "@backtickjs/core-schema";
import { boxes, globals } from "@backtickjs/js-interpreter";

// What the reference client answers with, against what the schema says a script
// may reach. A name declared and not implemented, or implemented and not
// declared, fails here rather than at the first bundle that reaches it.

describe("boxes", () => {
  // Which interface a primitive autoboxes to is the client's own decision, so
  // it is written here as the client writes it — the schema says what each
  // interface holds and not what reaches one.
  const boxed = {
    array: "Array",
    boolean: "Boolean",
    number: "Number",
    string: "String",
  } as const;

  it("the client answers for every member a boxed interface declares", () => {
    const answered = new Map(Object.entries(boxes));
    for (const [boxes_, name] of Object.entries(boxed)) {
      const node = schema.types[name];
      assert.ok(node !== undefined, `the schema declares no \`${name}\``);
      const held = (node.type === "generic" ? node.expression : node) as {
        type: string;
        properties: Record<string, { type?: string }>;
      };
      assert.equal(
        held.type,
        "interface",
        `\`${name}\` is not an interface a client can answer for`,
      );
      const table = answered.get(boxes_) as Record<string, unknown>;
      assert.ok(table !== undefined, `nothing answers for a boxed ${boxes_}`);
      for (const [member, what] of Object.entries(held.properties)) {
        // An index signature is reached by `[]` rather than by name, so it is
        // element access's to answer and not a member of this table.
        if (what.type === "index") {
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

describe("builtins", () => {
  it("the client answers for every name in scope, and every member of one", () => {
    // Read off the schema and not off a list beside it, whether the host's lib
    // declares the name or the framework does: a name added there is checked
    // here without anything being told about it twice.
    const held = globals as unknown as Record<string, Record<string, unknown>>;
    const types = schema.types as Record<string, { type: string } | undefined>;
    for (const [name, node] of Object.entries(schema.builtins)) {
      assert.ok(name in held, `nothing answers for \`${name}\``);
      // A builtin naming an interface is reached by its members; one that is a
      // signature — `state` — is whole on its own and has none.
      const named = node.type === "ref" ? types[node.$ref] : node;
      const inner = (
        named?.type === "generic"
          ? (named as unknown as { expression: { type: string } }).expression
          : named
      ) as { type: string; properties?: Record<string, { type?: string }> };
      if (inner?.type !== "interface") {
        continue;
      }
      for (const [member, what] of Object.entries(inner.properties ?? {})) {
        // Reached by `[]` rather than by name, so it is element access's to
        // answer and not a member of this table.
        if (what.type === "index") {
          continue;
        }
        assert.ok(
          member in held[name]!,
          `\`${name}.${member}\` is declared and not answered`,
        );
      }
    }
  });

  it("answer with a number this language has, or not at all", () => {
    assert.throws(() => globals.Math.sqrt(-1), /are finite/);
    assert.throws(() => globals.Math.log(0), /are finite/);
    assert.throws(() => globals.Math.exp(710), /are finite/);
    assert.equal(globals.Math.sqrt(9), 3);
  });

  it("refuse an empty `Math.min`/`Math.max`", () => {
    assert.throws(() => globals.Math.min(), /at least one number/);
    assert.throws(() => globals.Math.max(), /at least one number/);
  });
});
