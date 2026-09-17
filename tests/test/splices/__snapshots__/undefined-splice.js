import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { bundler } from "@backtickjs/bundler";
import { evaluate } from "@backtickjs/web-testing";
// A spliced `undefined` crosses as the bundle's `undef` node, since JSON has
// no form for it: dropped from an object and turned into `null` in an array.
describe("a spliced undefined", () => {
  it("arrives as undefined", async () => {
    const nothing = undefined;
    assert.equal(
      await evaluate(
        cs.create(
          [12, 33, 12, 45],
          {
            version: "0.0.0",
            filePath: "splices/undefined-splice.test.tsx",
            fileHash: "v2dgxvkd8042",
            splices: { $nothing: { value: nothing, params: [] } },
            captures: [],
          },
          () => ({
            kind: "splice",
            loc: [12, 36, 12, 44],
            key: "$nothing",
          }),
        ),
      ),
      undefined,
    );
  });
  it("keeps its key in an object", async () => {
    const data = { missing: undefined, kept: 1 };
    const arrived = await evaluate(
      cs.create(
        [17, 36, 17, 45],
        {
          version: "0.0.0",
          filePath: "splices/undefined-splice.test.tsx",
          fileHash: "v2dgxvkd8042",
          splices: { $data: { value: data, params: [] } },
          captures: [],
        },
        () => ({
          kind: "splice",
          loc: [17, 39, 17, 44],
          key: "$data",
        }),
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
          [24, 37, 24, 46],
          {
            version: "0.0.0",
            filePath: "splices/undefined-splice.test.tsx",
            fileHash: "v2dgxvkd8042",
            splices: { $data: { value: data, params: [] } },
            captures: [],
          },
          () => ({
            kind: "splice",
            loc: [24, 40, 24, 45],
            key: "$data",
          }),
        ),
      ),
      [1, undefined, 3],
    );
  });
  it("is written as an undef node", async () => {
    const bundle = await bundler.run([undefined]);
    assert.deepEqual(bundle.root, ["arr", [["undef"]]]);
  });
});
