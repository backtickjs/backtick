import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `?:` evaluates only the taken branch, and its condition narrows like an
// `if`'s.
const pick = cs.create(
  "uekyc2sf8mzc:7:13",
  { params: [] },
  {
    code: "export default () => n => {\n  return n === null ? 0 : n + 1;\n};",
    map: '{"version":3,"mappings":"eAMgB,MAACA,CAAgB,IAAI;EACnC,OAAOA,CAAC,KAAK,IAAI,GAAG,CAAC,GAAGA,CAAC,GAAG,CAAC;AAC/B,CAAC","names":["n"],"ignoreList":[],"sources":["ternary.test.tsx"]}',
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
        code: "export default $0 => ({\n  absent: $0()(null),\n  present: $0()(4)\n});",
        map: '{"version":3,"mappings":"eAcOA,EAAA,KAAC;EACFC,MAAM,EAAED,EAAA,EAAK,CAAC,IAAI,CAAC;EACnBE,OAAO,EAAEF,EAAA,EAAK,CAAC,CAAC;CACjB,CAAC","names":["$0","absent","present"],"ignoreList":[],"sources":["ternary.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
