import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { bundler } from "@backtickjs/bundler";
import { draw } from "@backtickjs/solid-js/testing";
import { createRoot } from "solid-js";
// A spliced `undefined` crosses as the bundle's `undef` node, since JSON has
// no form for it: dropped from an object and turned into `null` in an array.
describe("a spliced undefined", () => {
  it("arrives as undefined", async () => {
    const nothing = undefined;
    assert.equal(
      createRoot(
        await draw(
          cs.create(
            "2mut7ohvbpsgi:13:39",
            { params: [{ kind: "splice", value: nothing, bindings: [] }] },
            "($splice0) => $splice0()",
            '{"version":3,"file":"undefined-splice.test.jsx","sourceRoot":"","sources":["splices/undefined-splice.test.tsx"],"names":[],"mappings":"AAY0C,cAAA,UAAQ"}',
          ),
        ),
      ),
      undefined,
    );
  });
  it("keeps its key in an object", async () => {
    const data = { missing: undefined, kept: 1 };
    const arrived = createRoot(
      await draw(
        cs.create(
          "2mut7ohvbpsgi:18:42",
          { params: [{ kind: "splice", value: data, bindings: [] }] },
          "($splice0) => $splice0()",
          '{"version":3,"file":"undefined-splice.test.jsx","sourceRoot":"","sources":["splices/undefined-splice.test.tsx"],"names":[],"mappings":"AAiB6C,cAAA,UAAK"}',
        ),
      ),
    );
    assert.deepEqual(arrived, { missing: undefined, kept: 1 });
    assert.ok("missing" in arrived);
  });
  it("stays undefined in an array", async () => {
    const data = [1, undefined, 3];
    assert.deepEqual(
      createRoot(
        await draw(
          cs.create(
            "2mut7ohvbpsgi:25:43",
            { params: [{ kind: "splice", value: data, bindings: [] }] },
            "($splice0) => $splice0()",
            '{"version":3,"file":"undefined-splice.test.jsx","sourceRoot":"","sources":["splices/undefined-splice.test.tsx"],"names":[],"mappings":"AAwB8C,cAAA,UAAK"}',
          ),
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
