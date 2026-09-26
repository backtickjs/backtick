import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { bundler } from "@backtickjs/bundler";
import { evaluate } from "@backtickjs/solid-js/testing";
// A spliced `undefined` crosses as the bundle's `undef` node, since JSON has
// no form for it: dropped from an object and turned into `null` in an array.
describe("a spliced undefined", () => {
  it("arrives as undefined", async () => {
    const nothing = undefined;
    assert.equal(
      await evaluate(
        cs.create(
          "geei6gdr1y20:12:32",
          { params: [{ kind: "splice", value: nothing, bindings: [] }] },
          "($splice0) => $splice0()",
          '{"version":3,"file":"undefined-splice.test.jsx","sourceRoot":"","sources":["splices/undefined-splice.test.tsx"],"names":[],"mappings":"AAWmC,cAAA,UAAQ"}',
        ),
      ),
      undefined,
    );
  });
  it("keeps its key in an object", async () => {
    const data = { missing: undefined, kept: 1 };
    const arrived = await evaluate(
      cs.create(
        "geei6gdr1y20:17:35",
        { params: [{ kind: "splice", value: data, bindings: [] }] },
        "($splice0) => $splice0()",
        '{"version":3,"file":"undefined-splice.test.jsx","sourceRoot":"","sources":["splices/undefined-splice.test.tsx"],"names":[],"mappings":"AAgBsC,cAAA,UAAK"}',
      ),
    );
    assert.deepEqual(arrived, { missing: undefined, kept: 1 });
    assert.ok("missing" in arrived);
  });
  it("stays undefined in an array", async () => {
    const data = [1, undefined, 3];
    assert.deepEqual(
      await evaluate(
        cs.create(
          "geei6gdr1y20:24:36",
          { params: [{ kind: "splice", value: data, bindings: [] }] },
          "($splice0) => $splice0()",
          '{"version":3,"file":"undefined-splice.test.jsx","sourceRoot":"","sources":["splices/undefined-splice.test.tsx"],"names":[],"mappings":"AAuBuC,cAAA,UAAK"}',
        ),
      ),
      [1, undefined, 3],
    );
  });
  it("is written as `void 0`", async () => {
    const { code } = await bundler.run([undefined]);
    assert.match(code, /\[void 0\]/);
  });
});
