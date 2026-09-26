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
        code: 'export default () => {\n    const rows = [3, 1, 2];\n    const sorted = rows.toSorted((a, b) => a - b);\n    const reversed = rows.toReversed();\n    const spliced = rows.toSpliced(1, 1);\n    const inserted = rows.toSpliced(1, 0, 9);\n    return (sorted.join(",") +\n        "|" +\n        reversed.join(",") +\n        "|" +\n        spliced.join(",") +\n        "|" +\n        inserted.join(",") +\n        "|" +\n        rows.join(","));\n};',
        map: '{"version":3,"file":"array-copying-members.test.jsx","sourceRoot":"","sources":["stdlib/array-copying-members.test.tsx"],"names":[],"mappings":"eAYO;IACD,MAAM,IAAI,GAAG,CAAC,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,CAAC;IACvB,MAAM,MAAM,GAAG,IAAI,CAAC,QAAQ,CAAC,CAAC,CAAC,EAAE,CAAC,EAAE,EAAE,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC;IAC9C,MAAM,QAAQ,GAAG,IAAI,CAAC,UAAU,EAAE,CAAC;IACnC,MAAM,OAAO,GAAG,IAAI,CAAC,SAAS,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC;IACrC,MAAM,QAAQ,GAAG,IAAI,CAAC,SAAS,CAAC,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,CAAC;IACzC,OAAO,CACL,MAAM,CAAC,IAAI,CAAC,GAAG,CAAC;QAChB,GAAG;QACH,QAAQ,CAAC,IAAI,CAAC,GAAG,CAAC;QAClB,GAAG;QACH,OAAO,CAAC,IAAI,CAAC,GAAG,CAAC;QACjB,GAAG;QACH,QAAQ,CAAC,IAAI,CAAC,GAAG,CAAC;QAClB,GAAG;QACH,IAAI,CAAC,IAAI,CAAC,GAAG,CAAC,CACf,CAAC;AACJ,CAAC"}',
      },
    ),
  );
});
