import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { bundler } from "@backtickjs/bundler";
import { evaluate } from "../evaluate.ts";
import { createRoot } from "@backtickjs/solid-js";
const $module0 = {
  id: "1gqec5to0h2dd:13:32",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => $splice0()(() => $splice1());\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAYmC,CAAAA,QAAA,EAAAC,QAAA,KAAAD,QAAA,EAAW,CAAC,MAAMC,QAAA,EAAQ,CAAC","names":["$splice0","$splice1"],"ignoreList":[],"sources":["splices/undefined-splice.test.tsx"]}',
  dependencies: [],
};
const $module1 = {
  id: "1gqec5to0h2dd:18:35",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => $splice0()(() => $splice1());\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAiBsC,CAAAA,QAAA,EAAAC,QAAA,KAAAD,QAAA,EAAW,CAAC,MAAMC,QAAA,EAAK,CAAC","names":["$splice0","$splice1"],"ignoreList":[],"sources":["splices/undefined-splice.test.tsx"]}',
  dependencies: [],
};
const $module2 = {
  id: "1gqec5to0h2dd:25:36",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => $splice0()(() => $splice1());\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAwBuC,CAAAA,QAAA,EAAAC,QAAA,KAAAD,QAAA,EAAW,CAAC,MAAMC,QAAA,EAAK,CAAC","names":["$splice0","$splice1"],"ignoreList":[],"sources":["splices/undefined-splice.test.tsx"]}',
  dependencies: [],
};
// A spliced `undefined` crosses as the bundle's `undef` node, since JSON has
// no form for it: dropped from an object and turned into `null` in an array.
describe("a spliced undefined", () => {
  it("arrives as undefined", async () => {
    const nothing = undefined;
    assert.equal(
      await evaluate(
        cs.create($module0, [
          { kind: "splice", value: createRoot, bindings: [] },
          { kind: "splice", value: nothing, bindings: [] },
        ]),
      ),
      undefined,
    );
  });
  it("keeps its key in an object", async () => {
    const data = { missing: undefined, kept: 1 };
    const arrived = await evaluate(
      cs.create($module1, [
        { kind: "splice", value: createRoot, bindings: [] },
        { kind: "splice", value: data, bindings: [] },
      ]),
    );
    assert.deepEqual(arrived, { missing: undefined, kept: 1 });
    assert.ok("missing" in arrived);
  });
  it("stays undefined in an array", async () => {
    const data = [1, undefined, 3];
    assert.deepEqual(
      await evaluate(
        cs.create($module2, [
          { kind: "splice", value: createRoot, bindings: [] },
          { kind: "splice", value: data, bindings: [] },
        ]),
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
