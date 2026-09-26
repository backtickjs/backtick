import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// The one thing the language cannot do for itself: produce a sequence of a
// given length. Everything else about an array is a transformation of one
// that already exists.
//
// The mapper's first argument is always `undefined` — the standard library
// passes the element it found, and against a `{ length }` source there is
// none. `null` would mean the source held one and it was null.
it("arrayFrom", async (t) => {
  await snapshotCase(
    t,
    "arrayFrom",
    cs.create(
      "3pi2uzl7sovgc:16:4",
      { params: [] },
      {
        code: 'export default () => {\n  const doubled = Array.from({\n    length: 4\n  }, (_, index) => index * 2);\n  const empty = Array.from({\n    length: 0\n  }, (_, index) => index);\n  const absent = Array.from({\n    length: 2\n  }, (value, index) => value === undefined ? index : -1);\n  return doubled.join(",") + "|" + empty.length + "|" + absent.join(",");\n};',
        map: '{"version":3,"mappings":"eAeO;EACD,MAAMA,OAAO,GAAGC,KAAK,CAACC,IAAI,CAAC;IAAEC,MAAM,EAAE;EAAC,CAAE,EAAE,CAACC,CAAC,EAAEC,KAAK,KAAKA,KAAK,GAAG,CAAC,CAAC;EAClE,MAAMC,KAAK,GAAGL,KAAK,CAACC,IAAI,CAAC;IAAEC,MAAM,EAAE;EAAC,CAAE,EAAE,CAACC,CAAC,EAAEC,KAAK,KAAKA,KAAK,CAAC;EAC5D,MAAME,MAAM,GAAGN,KAAK,CAACC,IAAI,CAAC;IAAEC,MAAM,EAAE;EAAC,CAAE,EAAE,CAACK,KAAK,EAAEH,KAAK,KACpDG,KAAK,KAAKC,SAAS,GAAGJ,KAAK,GAAG,CAAC,CAAC,CACjC;EACD,OAAOL,OAAO,CAACU,IAAI,CAAC,GAAG,CAAC,GAAG,GAAG,GAAGJ,KAAK,CAACH,MAAM,GAAG,GAAG,GAAGI,MAAM,CAACG,IAAI,CAAC,GAAG,CAAC;AACxE,CAAC","names":["doubled","Array","from","length","_","index","empty","absent","value","undefined","join"],"ignoreList":[],"sources":["array-from.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
