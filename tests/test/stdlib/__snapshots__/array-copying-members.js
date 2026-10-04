import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "1o1nlczam5nsr:13:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    const rows = [3, 1, 2];\n    const sorted = rows.toSorted((a, b) => a - b);\n    const reversed = rows.toReversed();\n    const spliced = rows.toSpliced(1, 1);\n    const inserted = rows.toSpliced(1, 0, 9);\n    return sorted.join(",") + "|" + reversed.join(",") + "|" + spliced.join(",") + "|" + inserted.join(",") + "|" + rows.join(",");\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAYO;IACD,MAAMA,IAAI,GAAG,CAAC,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC;IACtB,MAAMC,MAAM,GAAGD,IAAI,CAACE,QAAQ,CAAC,CAACC,CAAC,EAAEC,CAAC,KAAKD,CAAC,GAAGC,CAAC,CAAC;IAC7C,MAAMC,QAAQ,GAAGL,IAAI,CAACM,UAAU,EAAE;IAClC,MAAMC,OAAO,GAAGP,IAAI,CAACQ,SAAS,CAAC,CAAC,EAAE,CAAC,CAAC;IACpC,MAAMC,QAAQ,GAAGT,IAAI,CAACQ,SAAS,CAAC,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC;IACxC,OACEP,MAAM,CAACS,IAAI,CAAC,GAAG,CAAC,GAChB,GAAG,GACHL,QAAQ,CAACK,IAAI,CAAC,GAAG,CAAC,GAClB,GAAG,GACHH,OAAO,CAACG,IAAI,CAAC,GAAG,CAAC,GACjB,GAAG,GACHD,QAAQ,CAACC,IAAI,CAAC,GAAG,CAAC,GAClB,GAAG,GACHV,IAAI,CAACU,IAAI,CAAC,GAAG,CAAC;AAElB,CAAC","names":["rows","sorted","toSorted","a","b","reversed","toReversed","spliced","toSpliced","inserted","join"],"ignoreList":[],"sources":["stdlib/array-copying-members.test.tsx"]}',
  dependencies: [],
};
// The copying members: each answers with a new array and leaves the one it
// was given alone, which is what lets an array be a value here. `sort`,
// `reverse` and `splice` — the ones that write into the array instead — are
// absent.
it("arrayCopyingMembers", async (t) => {
  await snapshotCase(t, "arrayCopyingMembers", cs.create($module0, []));
});
