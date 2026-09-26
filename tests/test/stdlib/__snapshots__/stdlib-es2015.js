import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// The members ES2015 added that this language answers for: a search that
// finds nothing reads as `undefined`, as a read past the end does, and
// everything else is what the standard library says it is.
it("stdlibEs2015", async (t) => {
  await snapshotCase(
    t,
    "stdlibEs2015",
    cs.create(
      "s2q4937fji9l:12:4",
      { params: [] },
      {
        code: 'export default () => {\n    const xs = [3, 8, 12, 5];\n    const word = "backtick";\n    return {\n        found: xs.find((x) => x > 7),\n        missing: xs.find((x) => x > 100) === undefined,\n        at: xs.findIndex((x) => x > 7),\n        nowhere: xs.findIndex((x) => x > 100),\n        includes: word.includes("tick"),\n        startsWith: word.startsWith("back"),\n        endsWith: word.endsWith("tick", 4),\n        repeated: "ab".repeat(3),\n        codePoint: "\\u{1F600}".codePointAt(0),\n        keys: Object.keys({ a: 1, b: 2 }),\n    };\n};',
        map: '{"version":3,"file":"stdlib-es2015.test.jsx","sourceRoot":"","sources":["stdlib-es2015.test.tsx"],"names":[],"mappings":"eAWO;IACD,MAAM,EAAE,GAAG,CAAC,CAAC,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC,CAAC;IACzB,MAAM,IAAI,GAAG,UAAU,CAAC;IACxB,OAAO;QACL,KAAK,EAAE,EAAE,CAAC,IAAI,CAAC,CAAC,CAAC,EAAE,EAAE,CAAC,CAAC,GAAG,CAAC,CAAC;QAC5B,OAAO,EAAE,EAAE,CAAC,IAAI,CAAC,CAAC,CAAC,EAAE,EAAE,CAAC,CAAC,GAAG,GAAG,CAAC,KAAK,SAAS;QAC9C,EAAE,EAAE,EAAE,CAAC,SAAS,CAAC,CAAC,CAAC,EAAE,EAAE,CAAC,CAAC,GAAG,CAAC,CAAC;QAC9B,OAAO,EAAE,EAAE,CAAC,SAAS,CAAC,CAAC,CAAC,EAAE,EAAE,CAAC,CAAC,GAAG,GAAG,CAAC;QACrC,QAAQ,EAAE,IAAI,CAAC,QAAQ,CAAC,MAAM,CAAC;QAC/B,UAAU,EAAE,IAAI,CAAC,UAAU,CAAC,MAAM,CAAC;QACnC,QAAQ,EAAE,IAAI,CAAC,QAAQ,CAAC,MAAM,EAAE,CAAC,CAAC;QAClC,QAAQ,EAAE,IAAI,CAAC,MAAM,CAAC,CAAC,CAAC;QACxB,SAAS,EAAE,WAAW,CAAC,WAAW,CAAC,CAAC,CAAC;QACrC,IAAI,EAAE,MAAM,CAAC,IAAI,CAAC,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC;KAClC,CAAC;AACJ,CAAC"}',
      },
    ),
  );
});
