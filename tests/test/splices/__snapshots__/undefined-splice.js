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
          "3f9luoncz9vrv:12:32",
          {
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
          "$0 => $0()",
          '{"version":3,"file":"undefined-splice.test.jsx","sourceRoot":"","sources":["undefined-splice.test.tsx"],"names":[],"mappings":"AAWmC,MAAA,IAAQ,CAAA"}',
        ),
      ),
      undefined,
    );
  });
  it("keeps its key in an object", async () => {
    const data = { missing: undefined, kept: 1 };
    const arrived = await evaluate(
      cs.create(
        "3f9luoncz9vrv:17:35",
        { splices: { $data: { value: data, params: [] } }, captures: [] },
        () => ({
          type: "Splice",
          loc: {
            start: { line: 17, column: 38 },
            end: { line: 17, column: 43 },
          },
          key: "$data",
        }),
        "$0 => $0()",
        '{"version":3,"file":"undefined-splice.test.jsx","sourceRoot":"","sources":["undefined-splice.test.tsx"],"names":[],"mappings":"AAgBsC,MAAA,IAAK,CAAA"}',
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
          "3f9luoncz9vrv:24:36",
          { splices: { $data: { value: data, params: [] } }, captures: [] },
          () => ({
            type: "Splice",
            loc: {
              start: { line: 24, column: 39 },
              end: { line: 24, column: 44 },
            },
            key: "$data",
          }),
          "$0 => $0()",
          '{"version":3,"file":"undefined-splice.test.jsx","sourceRoot":"","sources":["undefined-splice.test.tsx"],"names":[],"mappings":"AAuBuC,MAAA,IAAK,CAAA"}',
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
