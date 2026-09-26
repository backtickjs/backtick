import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// An object's values in key order, and whether it holds a key: the check a
// script would otherwise write as `Object.keys(o).includes(k)`.
it("objectValues", async (t) => {
  await snapshotCase(
    t,
    "objectValues",
    cs.create(
      "1lmwvcf4zc2ir:11:4",
      { params: [] },
      {
        code: 'export default () => {\n  const prices = {\n    apple: 1,\n    pear: 2\n  };\n  return {\n    values: Object.values(prices),\n    holds: [Object.hasOwn(prices, "pear"), Object.hasOwn(prices, "plum")]\n  };\n};',
        map: '{"version":3,"mappings":"eAUO;EACD,MAAMA,MAAM,GAAG;IAAEC,KAAK,EAAE,CAAC;IAAEC,IAAI,EAAE;EAAC,CAAE;EACpC,OAAO;IACLC,MAAM,EAAEC,MAAM,CAACD,MAAM,CAACH,MAAM,CAAC;IAC7BK,KAAK,EAAE,CAACD,MAAM,CAACE,MAAM,CAACN,MAAM,EAAE,MAAM,CAAC,EAAEI,MAAM,CAACE,MAAM,CAACN,MAAM,EAAE,MAAM,CAAC;GACrE;AACH,CAAC","names":["prices","apple","pear","values","Object","holds","hasOwn"],"ignoreList":[],"sources":["object-values.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
