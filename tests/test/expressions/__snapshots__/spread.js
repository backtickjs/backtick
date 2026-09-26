import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `...xs` where an element goes: it has no value of its own, it contributes
// however many the array it spreads has. An empty one contributes nothing, a
// list may hold several, and what it spreads is an ordinary expression.
it("spread", async (t) => {
  await snapshotCase(
    t,
    "spread",
    cs.create(
      "umu4jsb4aovz:12:4",
      { params: [] },
      {
        code: 'export default () => {\n    const front = [1, 2];\n    const back = [3];\n    const none = [];\n    const all = [0, ...front, ...none, ...back, 4];\n    const twice = [...all, ...all];\n    return all.join(",") + "|" + twice.length;\n};',
        map: '{"version":3,"file":"spread.test.jsx","sourceRoot":"","sources":["spread.test.tsx"],"names":[],"mappings":"eAWO;IACD,MAAM,KAAK,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC;IACrB,MAAM,IAAI,GAAG,CAAC,CAAC,CAAC,CAAC;IACjB,MAAM,IAAI,GAAa,EAAE,CAAC;IAC1B,MAAM,GAAG,GAAG,CAAC,CAAC,EAAE,GAAG,KAAK,EAAE,GAAG,IAAI,EAAE,GAAG,IAAI,EAAE,CAAC,CAAC,CAAC;IAC/C,MAAM,KAAK,GAAG,CAAC,GAAG,GAAG,EAAE,GAAG,GAAG,CAAC,CAAC;IAC/B,OAAO,GAAG,CAAC,IAAI,CAAC,GAAG,CAAC,GAAG,GAAG,GAAG,KAAK,CAAC,MAAM,CAAC;AAC5C,CAAC"}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
