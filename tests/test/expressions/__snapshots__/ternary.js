import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `?:` evaluates only the taken branch, and its condition narrows like an
// `if`'s.
const pick = cs.create(
  "uekyc2sf8mzc:7:13",
  { params: [] },
  {
    code: "export default () => (n) => {\n    return n === null ? 0 : n + 1;\n};",
    map: '{"version":3,"file":"ternary.test.jsx","sourceRoot":"","sources":["ternary.test.tsx"],"names":[],"mappings":"eAMgB,MAAA,CAAC,CAAgB,EAAE,EAAE;IACnC,OAAO,CAAC,KAAK,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC;AAChC,CAAC"}',
    imports: [],
    exportAt: 0,
  },
);
it("ternary", async (t) => {
  await snapshotCase(
    t,
    "ternary",
    cs.create(
      "uekyc2sf8mzc:15:4",
      { params: [{ kind: "splice", value: pick, bindings: [] }] },
      {
        code: "export default ($0) => ({\n    absent: $0()(null),\n    present: $0()(4),\n});",
        map: '{"version":3,"file":"ternary.test.jsx","sourceRoot":"","sources":["ternary.test.tsx"],"names":[],"mappings":"eAcO,QAAA,CAAC;IACF,MAAM,EAAE,IAAK,CAAC,IAAI,CAAC;IACnB,OAAO,EAAE,IAAK,CAAC,CAAC,CAAC;CAClB,CAAC"}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
