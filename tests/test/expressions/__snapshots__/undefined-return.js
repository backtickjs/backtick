import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const lying = cs.create(
  "2qb372nig0g3z:11:35",
  { params: [] },
  '() => () => "hi"',
  '{"version":3,"file":"undefined-return.test.jsx","sourceRoot":"","sources":["expressions/undefined-return.test.tsx"],"names":[],"mappings":"AAUsC,MAAA,GAAG,EAAE,CAAC,IAAI"}',
);
it("undefinedReturn", async (t) => {
  await snapshotCase(
    t,
    "undefinedReturn",
    cs.create(
      "2qb372nig0g3z:17:4",
      { params: [{ kind: "splice", value: lying, bindings: [] }] },
      "($splice0) => {\n    const stored = $splice0();\n    const caught = $splice0()();\n    return 1;\n}",
      '{"version":3,"file":"undefined-return.test.jsx","sourceRoot":"","sources":["expressions/undefined-return.test.tsx"],"names":[],"mappings":"AAgBO;IACD,MAAM,MAAM,GAAG,UAAM,CAAC;IACtB,MAAM,MAAM,GAAG,UAAM,EAAE,CAAC;IACxB,OAAO,CAAC,CAAC;AACX,CAAC"}',
    ),
  );
});
