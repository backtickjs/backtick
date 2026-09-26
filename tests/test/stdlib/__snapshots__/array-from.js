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
        code: 'export default () => {\n    const doubled = Array.from({ length: 4 }, (_, index) => index * 2);\n    const empty = Array.from({ length: 0 }, (_, index) => index);\n    const absent = Array.from({ length: 2 }, (value, index) => value === undefined ? index : -1);\n    return doubled.join(",") + "|" + empty.length + "|" + absent.join(",");\n};',
        map: '{"version":3,"file":"array-from.test.jsx","sourceRoot":"","sources":["stdlib/array-from.test.tsx"],"names":[],"mappings":"eAeO;IACD,MAAM,OAAO,GAAG,KAAK,CAAC,IAAI,CAAC,EAAE,MAAM,EAAE,CAAC,EAAE,EAAE,CAAC,CAAC,EAAE,KAAK,EAAE,EAAE,CAAC,KAAK,GAAG,CAAC,CAAC,CAAC;IACnE,MAAM,KAAK,GAAG,KAAK,CAAC,IAAI,CAAC,EAAE,MAAM,EAAE,CAAC,EAAE,EAAE,CAAC,CAAC,EAAE,KAAK,EAAE,EAAE,CAAC,KAAK,CAAC,CAAC;IAC7D,MAAM,MAAM,GAAG,KAAK,CAAC,IAAI,CAAC,EAAE,MAAM,EAAE,CAAC,EAAE,EAAE,CAAC,KAAK,EAAE,KAAK,EAAE,EAAE,CACxD,KAAK,KAAK,SAAS,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CACjC,CAAC;IACF,OAAO,OAAO,CAAC,IAAI,CAAC,GAAG,CAAC,GAAG,GAAG,GAAG,KAAK,CAAC,MAAM,GAAG,GAAG,GAAG,MAAM,CAAC,IAAI,CAAC,GAAG,CAAC,CAAC;AACzE,CAAC"}',
      },
    ),
  );
});
