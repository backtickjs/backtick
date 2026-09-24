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
          { start: { line: 12, column: 32 }, end: { line: 12, column: 44 } },
          {
            version: "0.0.0",
            filePath: "splices/undefined-splice.test.tsx",
            fileHash: "3f9luoncz9vrv",
            splices: { $nothing: { value: nothing, params: [] } },
            captures: [],
          },
          () => ({
            type: "Splice",
            loc: {
              start: { line: 12, column: 35 },
              end: { line: 12, column: 43 },
            },
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
        { start: { line: 17, column: 35 }, end: { line: 17, column: 44 } },
        {
          version: "0.0.0",
          filePath: "splices/undefined-splice.test.tsx",
          fileHash: "3f9luoncz9vrv",
          splices: { $data: { value: data, params: [] } },
          captures: [],
        },
        () => ({
          type: "Splice",
          loc: {
            start: { line: 17, column: 38 },
            end: { line: 17, column: 43 },
          },
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
          { start: { line: 24, column: 36 }, end: { line: 24, column: 45 } },
          {
            version: "0.0.0",
            filePath: "splices/undefined-splice.test.tsx",
            fileHash: "3f9luoncz9vrv",
            splices: { $data: { value: data, params: [] } },
            captures: [],
          },
          () => ({
            type: "Splice",
            loc: {
              start: { line: 24, column: 39 },
              end: { line: 24, column: 44 },
            },
            key: "$data",
          }),
        ),
      ),
      [1, undefined, 3],
    );
  });
  it("is written as `void 0`", async () => {
    const code = await bundler.run([undefined]);
    assert.match(code, /\[void 0\]/);
  });
});
