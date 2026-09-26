import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// The copying members: each answers with a new array and leaves the one it
// was given alone, which is what lets an array be a value here. `sort`,
// `reverse` and `splice` — the ones that write into the array instead — are
// absent.
it("arrayCopyingMembers", async (t) => {
  await snapshotCase(
    t,
    "arrayCopyingMembers",
    cs.create(
      "1o1nlczam5nsr:13:4",
      { params: [] },
      {
        code: 'export default () => {\n  const rows = [3, 1, 2];\n  const sorted = rows.toSorted((a, b) => a - b);\n  const reversed = rows.toReversed();\n  const spliced = rows.toSpliced(1, 1);\n  const inserted = rows.toSpliced(1, 0, 9);\n  return sorted.join(",") + "|" + reversed.join(",") + "|" + spliced.join(",") + "|" + inserted.join(",") + "|" + rows.join(",");\n};',
        map: '{"version":3,"mappings":"eAYO;EACD,MAAMA,IAAI,GAAG,CAAC,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC;EACtB,MAAMC,MAAM,GAAGD,IAAI,CAACE,QAAQ,CAAC,CAACC,CAAC,EAAEC,CAAC,KAAKD,CAAC,GAAGC,CAAC,CAAC;EAC7C,MAAMC,QAAQ,GAAGL,IAAI,CAACM,UAAU,EAAE;EAClC,MAAMC,OAAO,GAAGP,IAAI,CAACQ,SAAS,CAAC,CAAC,EAAE,CAAC,CAAC;EACpC,MAAMC,QAAQ,GAAGT,IAAI,CAACQ,SAAS,CAAC,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC;EACxC,OACEP,MAAM,CAACS,IAAI,CAAC,GAAG,CAAC,GAChB,GAAG,GACHL,QAAQ,CAACK,IAAI,CAAC,GAAG,CAAC,GAClB,GAAG,GACHH,OAAO,CAACG,IAAI,CAAC,GAAG,CAAC,GACjB,GAAG,GACHD,QAAQ,CAACC,IAAI,CAAC,GAAG,CAAC,GAClB,GAAG,GACHV,IAAI,CAACU,IAAI,CAAC,GAAG,CAAC;AAElB,CAAC","names":["rows","sorted","toSorted","a","b","reversed","toReversed","spliced","toSpliced","inserted","join"],"ignoreList":[],"sources":["array-copying-members.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
