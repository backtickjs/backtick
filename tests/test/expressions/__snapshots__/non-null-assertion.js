import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A non-null assertion is the checker's alone, as `as` is: erased on the way
// to a bundle. `find` answers `number | undefined`; the script knows a row
// past 1 exists, and `!` says so.
it("nonNullAssertion", async (t) => {
  await snapshotCase(
    t,
    "nonNullAssertion",
    cs.create(
      "bid8r58d3fdk:12:4",
      { params: [] },
      "() => {\n    const rows = [1, 2, 3];\n    const first = rows.find((row) => row > 1);\n    return first * 10;\n}",
      '{"version":3,"file":"non-null-assertion.test.jsx","sourceRoot":"","sources":["expressions/non-null-assertion.test.tsx"],"names":[],"mappings":"AAWO;IACD,MAAM,IAAI,GAAG,CAAC,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,CAAC;IACvB,MAAM,KAAK,GAAG,IAAI,CAAC,IAAI,CAAC,CAAC,GAAG,EAAE,EAAE,CAAC,GAAG,GAAG,CAAC,CAAE,CAAC;IAE3C,OAAO,KAAK,GAAG,EAAE,CAAC;AACpB,CAAC"}',
    ),
  );
});
