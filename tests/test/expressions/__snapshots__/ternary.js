import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `?:` evaluates only the taken branch, and its condition narrows like an
// `if`'s.
const pick = cs.create(
  "uekyc2sf8mzc:7:13",
  { params: [] },
  "() => (n) => {\n    return n === null ? 0 : n + 1;\n}",
  '{"version":3,"file":"ternary.test.jsx","sourceRoot":"","sources":["expressions/ternary.test.tsx"],"names":[],"mappings":"AAMgB,MAAA,CAAC,CAAgB,EAAE,EAAE;IACnC,OAAO,CAAC,KAAK,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC;AAChC,CAAC"}',
);
it("ternary", async (t) => {
  await snapshotCase(
    t,
    "ternary",
    cs.create(
      "uekyc2sf8mzc:15:4",
      { params: [{ kind: "splice", value: pick, bindings: [] }] },
      "($0) => ({\n    absent: $0()(null),\n    present: $0()(4),\n})",
      '{"version":3,"file":"ternary.test.jsx","sourceRoot":"","sources":["expressions/ternary.test.tsx"],"names":[],"mappings":"AAcO,QAAA,CAAC;IACF,MAAM,EAAE,IAAK,CAAC,IAAI,CAAC;IACnB,OAAO,EAAE,IAAK,CAAC,CAAC,CAAC;CAClB,CAAC"}',
    ),
  );
});
