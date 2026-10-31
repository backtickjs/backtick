import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { applyEdits } from "../src/function/applyEdits.ts";

describe("a change's edits", () => {
  it("apply in order, each on the last's result", () => {
    assert.deepEqual(
      applyEdits("one two", [
        { old_str: "one", new_str: "three" },
        { old_str: "three two", new_str: "four" },
      ]),
      { code: "four" },
    );
  });

  it("take new_str literally", () => {
    assert.deepEqual(
      applyEdits("price", [{ old_str: "price", new_str: "$& $1" }]),
      { code: "$& $1" },
    );
  });

  it("name the first edit with no match", () => {
    assert.deepEqual(
      applyEdits("one two", [
        { old_str: "one", new_str: "three" },
        { old_str: "one", new_str: "four" },
      ]),
      {
        error:
          "Nothing was saved: edit 2 has no match for old_str. Check the text, or get_app for the latest, and try again.",
      },
    );
  });

  it("name an edit that matches more than once", () => {
    assert.deepEqual(applyEdits("a a", [{ old_str: "a", new_str: "b" }]), {
      error:
        "Nothing was saved: edit 1's old_str matches 2 places. Include more of the text around it, so it matches once.",
    });
  });
});
