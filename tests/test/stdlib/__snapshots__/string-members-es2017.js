import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// The string members after ES2015 that read a string without changing
// anything: padding, trimming one end, reading by position, and replacing
// every occurrence.
it("stringMembersEs2017", async (t) => {
  await snapshotCase(
    t,
    "stringMembersEs2017",
    cs.create(
      "376ffut9l2xr3:12:4",
      { params: [] },
      {
        code: 'export default () => {\n    const word = "ab";\n    return {\n        padded: word.padStart(4) + "|" + word.padEnd(5, "-="),\n        trimmed: "  x  ".trimStart() + "|" + "  x  ".trimEnd() + "|",\n        at: [word.at(0), word.at(-1), word.at(5)],\n        replaced: "a.b.c".replaceAll(".", "/"),\n        replacedBy: "a.b".replaceAll(".", (found, offset) => "" + offset),\n    };\n};',
        map: '{"version":3,"file":"string-members-es2017.test.jsx","sourceRoot":"","sources":["stdlib/string-members-es2017.test.tsx"],"names":[],"mappings":"eAWO;IACD,MAAM,IAAI,GAAG,IAAI,CAAC;IAClB,OAAO;QACL,MAAM,EAAE,IAAI,CAAC,QAAQ,CAAC,CAAC,CAAC,GAAG,GAAG,GAAG,IAAI,CAAC,MAAM,CAAC,CAAC,EAAE,IAAI,CAAC;QACrD,OAAO,EAAE,OAAO,CAAC,SAAS,EAAE,GAAG,GAAG,GAAG,OAAO,CAAC,OAAO,EAAE,GAAG,GAAG;QAC5D,EAAE,EAAE,CAAC,IAAI,CAAC,EAAE,CAAC,CAAC,CAAC,EAAE,IAAI,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC,EAAE,IAAI,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC;QACzC,QAAQ,EAAE,OAAO,CAAC,UAAU,CAAC,GAAG,EAAE,GAAG,CAAC;QACtC,UAAU,EAAE,KAAK,CAAC,UAAU,CAAC,GAAG,EAAE,CAAC,KAAK,EAAE,MAAM,EAAE,EAAE,CAAC,EAAE,GAAG,MAAM,CAAC;KAClE,CAAC;AACJ,CAAC"}',
      },
    ),
  );
});
