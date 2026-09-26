import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A key computed while the script runs. A literal that holds one is
// `Object.fromEntries` over its pairs, as one a spread runs through is: its
// key has no text to ship as data. Keys are evaluated in order, and a later
// one wins in the place the first took.
it("computedKey", async (t) => {
  await snapshotCase(
    t,
    "computedKey",
    cs.create(
      "27b2r7injyzq0:13:4",
      { params: [] },
      {
        code: 'export default () => {\n    const base = { a: 1, b: 2 };\n    const name = "b";\n    return {\n        ...base,\n        [name]: 9,\n        ["c" + "d"]: 3,\n        a: 4,\n    };\n};',
        map: '{"version":3,"file":"computed-key.test.jsx","sourceRoot":"","sources":["computed-key.test.tsx"],"names":[],"mappings":"eAYO;IACD,MAAM,IAAI,GAAG,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC;IAC5B,MAAM,IAAI,GAAG,GAAG,CAAC;IACjB,OAAO;QACL,GAAG,IAAI;QACP,CAAC,IAAI,CAAC,EAAE,CAAC;QACT,CAAC,GAAG,GAAG,GAAG,CAAC,EAAE,CAAC;QACd,CAAC,EAAE,CAAC;KACL,CAAC;AACJ,CAAC"}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
