import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `reduce` takes its initial value, where the standard library lets it be
// left out: without one the first call is handed an element rather than an
// accumulator, and an empty array has nothing to hand it at all. Naming it is
// what makes the empty case an answer rather than a throw.
it("arrayReduce", async (t) => {
  await snapshotCase(
    t,
    "arrayReduce",
    cs.create(
      "32uyy4dbi2509:13:4",
      { params: [] },
      {
        code: 'export default () => {\n    const prices = [4.5, 3.25, 2];\n    const total = prices.reduce((sum, price) => sum + price, 0);\n    const names = ["a", "b", "c"];\n    const joined = names.reduce((all, one, index) => all + index + one, "");\n    const empty = [];\n    return (total.toFixed(2) +\n        "|" +\n        joined +\n        "|" +\n        empty.reduce((sum, one) => sum + one, 0));\n};',
        map: '{"version":3,"file":"array-reduce.test.jsx","sourceRoot":"","sources":["array-reduce.test.tsx"],"names":[],"mappings":"eAYO;IACD,MAAM,MAAM,GAAG,CAAC,GAAG,EAAE,IAAI,EAAE,CAAC,CAAC,CAAC;IAC9B,MAAM,KAAK,GAAG,MAAM,CAAC,MAAM,CAAC,CAAC,GAAG,EAAE,KAAK,EAAE,EAAE,CAAC,GAAG,GAAG,KAAK,EAAE,CAAC,CAAC,CAAC;IAC5D,MAAM,KAAK,GAAG,CAAC,GAAG,EAAE,GAAG,EAAE,GAAG,CAAC,CAAC;IAC9B,MAAM,MAAM,GAAG,KAAK,CAAC,MAAM,CAAC,CAAC,GAAG,EAAE,GAAG,EAAE,KAAK,EAAE,EAAE,CAAC,GAAG,GAAG,KAAK,GAAG,GAAG,EAAE,EAAE,CAAC,CAAC;IACxE,MAAM,KAAK,GAAa,EAAE,CAAC;IAC3B,OAAO,CACL,KAAK,CAAC,OAAO,CAAC,CAAC,CAAC;QAChB,GAAG;QACH,MAAM;QACN,GAAG;QACH,KAAK,CAAC,MAAM,CAAC,CAAC,GAAG,EAAE,GAAG,EAAE,EAAE,CAAC,GAAG,GAAG,GAAG,EAAE,CAAC,CAAC,CACzC,CAAC;AACJ,CAAC"}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
