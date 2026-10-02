import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const lying = cs.create(
  "2qb372nig0g3z:11:35",
  { params: [] },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => () => "hi";\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;kBAUsC,YAAM,IAAI","names":[],"ignoreList":[],"sources":["expressions/undefined-return.test.tsx"]}',
  [],
);
it("undefinedReturn", async (t) => {
  await snapshotCase(
    t,
    "undefinedReturn",
    cs.create(
      "2qb372nig0g3z:17:4",
      { params: [{ kind: "splice", value: lying, bindings: [] }] },
      '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => {\n    const stored = $splice0();\n    const caught = $splice0()();\n    return 1;\n};\n}',
      '{"version":3,"file":"module.jsx","mappings":";;;kBAgBOA,QAAA;IACD,MAAMC,MAAM,GAAGD,QAAA,EAAM;IACrB,MAAME,MAAM,GAAGF,QAAA,EAAM,EAAE;IACvB,OAAO,CAAC;AACV,CAAC","names":["$splice0","stored","caught"],"ignoreList":[],"sources":["expressions/undefined-return.test.tsx"]}',
      [],
    ),
  );
});
