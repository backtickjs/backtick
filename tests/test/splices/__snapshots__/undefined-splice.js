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
          { params: [{ kind: "splice", value: nothing, bindings: [] }] },
          () => ({
            type: "Splice",
            loc: {
              start: { line: 12, column: 35 },
              end: { line: 12, column: 43 },
            },
            param: 0,
          }),
          "export default ($0) => $0();",
          '{"version":3,"file":"undefined-splice.test.jsx","sourceRoot":"","sources":["undefined-splice.test.tsx"],"names":[],"mappings":"eAWmC,QAAA,IAAQ"}',
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
        { params: [{ kind: "splice", value: data, bindings: [] }] },
        () => ({
          type: "Splice",
          loc: {
            start: { line: 17, column: 38 },
            end: { line: 17, column: 43 },
          },
          param: 0,
        }),
        "export default ($0) => $0();",
        '{"version":3,"file":"undefined-splice.test.jsx","sourceRoot":"","sources":["undefined-splice.test.tsx"],"names":[],"mappings":"eAgBsC,QAAA,IAAK"}',
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
          { params: [{ kind: "splice", value: data, bindings: [] }] },
          () => ({
            type: "Splice",
            loc: {
              start: { line: 24, column: 39 },
              end: { line: 24, column: 44 },
            },
            param: 0,
          }),
          "export default ($0) => $0();",
          '{"version":3,"file":"undefined-splice.test.jsx","sourceRoot":"","sources":["undefined-splice.test.tsx"],"names":[],"mappings":"eAuBuC,QAAA,IAAK"}',
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
