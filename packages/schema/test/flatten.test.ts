import assert from "node:assert/strict";
import { describe, it } from "node:test";
// The built output, which is what a project generates against.
import { Type, flatten } from "../dist/index.js";
import type { Schema } from "../dist/index.js";

// One namespace over the three records. A name is what two ends negotiate over,
// so what a schema owes is one entry per name — which it can only be if a name
// means one thing whichever record wrote it down.

/** A schema with nothing under it, which is what every case here builds on. */
function schema(of: Partial<Schema>): Schema {
  return {
    package: "@backtickjs/test",
    namespace: "Test",
    extends: [],
    types: {},
    elements: {},
    builtins: {},
    ...of,
  };
}

describe("flatten", () => {
  it("holds what a schema and its bases declare", () => {
    const base = schema({ types: { Widget: Type.String() } });
    const held = flatten(
      schema({ extends: [base], builtins: { draw: Type.String() } }),
    );
    assert.deepEqual(Object.keys(held.types), ["Widget"]);
    assert.deepEqual(Object.keys(held.builtins), ["draw"]);
  });

  it("refuses a name two records declare", () => {
    assert.throws(
      () =>
        flatten(
          schema({
            types: { Widget: Type.String() },
            builtins: { Widget: Type.String() },
          }),
        ),
      /`Widget` is declared as a type and as a builtin/,
    );
  });

  it("refuses a name two records declare across a chain", () => {
    // The pun this ended: a name meaning a type below and a builtin above is
    // still one name on the wire, and neither end can say which was meant.
    const base = schema({ types: { Math: Type.String() } });
    assert.throws(
      () =>
        flatten(schema({ extends: [base], builtins: { Math: Type.String() } })),
      /`Math` is declared as a type and as a builtin/,
    );
  });

  it("refuses a name a base already declares", () => {
    const base = schema({ elements: { list: Type.Interface([], {}) } });
    assert.throws(
      () =>
        flatten(
          schema({
            extends: [base],
            elements: { list: Type.Interface([], {}) },
          }),
        ),
      /a schema it extends already declares the element `list`/,
    );
  });

  it("takes a schema reached twice once", () => {
    // A diamond is two paths to one declaration, which is not two declarations.
    const base = schema({ types: { Widget: Type.String() } });
    const left = schema({ extends: [base] });
    const right = schema({ extends: [base] });
    const held = flatten(schema({ extends: [left, right] }));
    assert.deepEqual(Object.keys(held.types), ["Widget"]);
  });
});
