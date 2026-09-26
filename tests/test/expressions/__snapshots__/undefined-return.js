import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const lying = cs.create(
  "2qb372nig0g3z:11:35",
  { params: [] },
  {
    code: 'export default () => () => "hi";',
    map: '{"version":3,"mappings":"eAUsC,YAAM,IAAI","names":[],"ignoreList":[],"sources":["undefined-return.test.tsx"]}',
    imports: [],
    exportAt: 0,
  },
);
it("undefinedReturn", async (t) => {
  await snapshotCase(
    t,
    "undefinedReturn",
    cs.create(
      "2qb372nig0g3z:17:4",
      { params: [{ kind: "splice", value: lying, bindings: [] }] },
      {
        code: "export default $0 => {\n  const stored = $0();\n  const caught = $0()();\n  return 1;\n};",
        map: '{"version":3,"mappings":"eAgBOA,EAAA;EACD,MAAMC,MAAM,GAAGD,EAAA,EAAM;EACrB,MAAME,MAAM,GAAGF,EAAA,EAAM,EAAE;EACvB,OAAO,CAAC;AACV,CAAC","names":["$0","stored","caught"],"ignoreList":[],"sources":["undefined-return.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
