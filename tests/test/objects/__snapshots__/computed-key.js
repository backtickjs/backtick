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
        code: 'export default () => {\n  const base = {\n    a: 1,\n    b: 2\n  };\n  const name = "b";\n  return {\n    ...base,\n    [name]: 9,\n    ["c" + "d"]: 3,\n    a: 4\n  };\n};',
        map: '{"version":3,"mappings":"eAYO;EACD,MAAMA,IAAI,GAAG;IAAEC,CAAC,EAAE,CAAC;IAAEC,CAAC,EAAE;EAAC,CAAE;EAC3B,MAAMC,IAAI,GAAG,GAAG;EAChB,OAAO;IACL,GAAGH,IAAI;IACP,CAACG,IAAI,GAAG,CAAC;IACT,CAAC,GAAG,GAAG,GAAG,GAAG,CAAC;IACdF,CAAC,EAAE;GACJ;AACH,CAAC","names":["base","a","b","name"],"ignoreList":[],"sources":["computed-key.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
