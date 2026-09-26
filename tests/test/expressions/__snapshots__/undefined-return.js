import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const lying = cs.create(
  "2qb372nig0g3z:11:35",
  { params: [] },
  {
    code: 'export default () => () => "hi";',
    map: '{"version":3,"file":"undefined-return.test.jsx","sourceRoot":"","sources":["undefined-return.test.tsx"],"names":[],"mappings":"eAUsC,MAAA,GAAG,EAAE,CAAC,IAAI"}',
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
        code: "export default ($0) => {\n    const stored = $0();\n    const caught = $0()();\n    return 1;\n};",
        map: '{"version":3,"file":"undefined-return.test.jsx","sourceRoot":"","sources":["undefined-return.test.tsx"],"names":[],"mappings":"eAgBO;IACD,MAAM,MAAM,GAAG,IAAM,CAAC;IACtB,MAAM,MAAM,GAAG,IAAM,EAAE,CAAC;IACxB,OAAO,CAAC,CAAC;AACX,CAAC"}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
