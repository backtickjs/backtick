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
        code: 'export default () => {\n  const xs = [3, 8, 12, 5];\n  const word = "backtick";\n  return {\n    found: xs.find(x => x > 7),\n    missing: xs.find(x => x > 100) === undefined,\n    at: xs.findIndex(x => x > 7),\n    nowhere: xs.findIndex(x => x > 100),\n    includes: word.includes("tick"),\n    startsWith: word.startsWith("back"),\n    endsWith: word.endsWith("tick", 4),\n    repeated: "ab".repeat(3),\n    codePoint: "\\u{1F600}".codePointAt(0),\n    keys: Object.keys({\n      a: 1,\n      b: 2\n    })\n  };\n};',
        map: '{"version":3,"mappings":"eAWO;EACD,MAAMA,EAAE,GAAG,CAAC,CAAC,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;EACxB,MAAMC,IAAI,GAAG,UAAU;EACvB,OAAO;IACLC,KAAK,EAAEF,EAAE,CAACG,IAAI,CAAEC,CAAC,IAAKA,CAAC,GAAG,CAAC,CAAC;IAC5BC,OAAO,EAAEL,EAAE,CAACG,IAAI,CAAEC,CAAC,IAAKA,CAAC,GAAG,GAAG,CAAC,KAAKE,SAAS;IAC9CC,EAAE,EAAEP,EAAE,CAACQ,SAAS,CAAEJ,CAAC,IAAKA,CAAC,GAAG,CAAC,CAAC;IAC9BK,OAAO,EAAET,EAAE,CAACQ,SAAS,CAAEJ,CAAC,IAAKA,CAAC,GAAG,GAAG,CAAC;IACrCM,QAAQ,EAAET,IAAI,CAACS,QAAQ,CAAC,MAAM,CAAC;IAC/BC,UAAU,EAAEV,IAAI,CAACU,UAAU,CAAC,MAAM,CAAC;IACnCC,QAAQ,EAAEX,IAAI,CAACW,QAAQ,CAAC,MAAM,EAAE,CAAC,CAAC;IAClCC,QAAQ,EAAE,IAAI,CAACC,MAAM,CAAC,CAAC,CAAC;IACxBC,SAAS,EAAE,WAAW,CAACC,WAAW,CAAC,CAAC,CAAC;IACrCC,IAAI,EAAEC,MAAM,CAACD,IAAI,CAAC;MAAEE,CAAC,EAAE,CAAC;MAAEC,CAAC,EAAE;IAAC,CAAE;GACjC;AACH,CAAC","names":["xs","word","found","find","x","missing","undefined","at","findIndex","nowhere","includes","startsWith","endsWith","repeated","repeat","codePoint","codePointAt","keys","Object","a","b"],"ignoreList":[],"sources":["stdlib-es2015.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
