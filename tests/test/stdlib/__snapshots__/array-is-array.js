import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// Any value may be asked about, and only an array answers true: a string has
// a length and indexes, and is still not one.
it("arrayIsArray", async (t) => {
  await snapshotCase(
    t,
    "arrayIsArray",
    cs.create(
      "311zee6pw10s9:11:4",
      { params: [] },
      {
        code: 'export default () => {\n    return [\n        Array.isArray([]),\n        Array.isArray([1, 2]),\n        Array.isArray("ab"),\n        Array.isArray({ length: 0 }),\n        Array.isArray(null),\n    ];\n};',
        map: '{"version":3,"file":"array-is-array.test.jsx","sourceRoot":"","sources":["array-is-array.test.tsx"],"names":[],"mappings":"eAUO;IACD,OAAO;QACL,KAAK,CAAC,OAAO,CAAC,EAAE,CAAC;QACjB,KAAK,CAAC,OAAO,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC;QACrB,KAAK,CAAC,OAAO,CAAC,IAAI,CAAC;QACnB,KAAK,CAAC,OAAO,CAAC,EAAE,MAAM,EAAE,CAAC,EAAE,CAAC;QAC5B,KAAK,CAAC,OAAO,CAAC,IAAI,CAAC;KACpB,CAAC;AACJ,CAAC"}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
