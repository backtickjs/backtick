import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { bundler } from "@backtickjs/bundler";
import { evaluate } from "../evaluate.ts";
import { createRoot } from "@backtickjs/solid-js";
// A spliced `undefined` crosses as the bundle's `undef` node, since JSON has
// no form for it: dropped from an object and turned into `null` in an array.
describe("a spliced undefined", () => {
  it("arrives as undefined", async () => {
    const nothing = undefined;
    assert.equal(
      await evaluate(
        cs.create(
          "1gqec5to0h2dd:13:32",
          {
            params: [
              { kind: "splice", value: createRoot, bindings: [] },
              { kind: "splice", value: nothing, bindings: [] },
            ],
          },
          "($splice0, $splice1) => $splice0()(() => $splice1())",
          '{"version":3,"file":"undefined-splice.test.jsx","sourceRoot":"","sources":["splices/undefined-splice.test.tsx"],"names":[],"mappings":"AAYmC,wBAAA,UAAW,CAAC,GAAG,EAAE,CAAC,UAAQ,CAAC"}',
        ),
      ),
      undefined,
    );
  });
  it("keeps its key in an object", async () => {
    const data = { missing: undefined, kept: 1 };
    const arrived = await evaluate(
      cs.create(
        "1gqec5to0h2dd:18:35",
        {
          params: [
            { kind: "splice", value: createRoot, bindings: [] },
            { kind: "splice", value: data, bindings: [] },
          ],
        },
        "($splice0, $splice1) => $splice0()(() => $splice1())",
        '{"version":3,"file":"undefined-splice.test.jsx","sourceRoot":"","sources":["splices/undefined-splice.test.tsx"],"names":[],"mappings":"AAiBsC,wBAAA,UAAW,CAAC,GAAG,EAAE,CAAC,UAAK,CAAC"}',
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
          "1gqec5to0h2dd:25:36",
          {
            params: [
              { kind: "splice", value: createRoot, bindings: [] },
              { kind: "splice", value: data, bindings: [] },
            ],
          },
          "($splice0, $splice1) => $splice0()(() => $splice1())",
          '{"version":3,"file":"undefined-splice.test.jsx","sourceRoot":"","sources":["splices/undefined-splice.test.tsx"],"names":[],"mappings":"AAwBuC,wBAAA,UAAW,CAAC,GAAG,EAAE,CAAC,UAAK,CAAC"}',
        ),
      ),
      [1, undefined, 3],
    );
  });
  it("is written as `void 0`", async () => {
    const bundle = await bundler.build({ input: [undefined], external: {} });
    const { code } = bundle.generate({ format: "es" });
    assert.match(code, /\[void 0\]/);
  });
});
