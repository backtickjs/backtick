import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "2qb372nig0g3z:11:35",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => () => "hi";\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAUsC,YAAM,IAAI","names":[],"ignoreList":[],"sources":["expressions/undefined-return.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "function",
};
const $module1 = {
  id: "2qb372nig0g3z:17:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => {\n    const stored = $splice0();\n    const caught = $splice1()();\n    return 1;\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAgBO,CAAAA,QAAA,EAAAC,QAAA;IACD,MAAMC,MAAM,GAAGF,QAAA,EAAM;IACrB,MAAMG,MAAM,GAAGF,QAAA,EAAM,EAAE;IACvB,OAAO,CAAC;AACV,CAAC","names":["$splice0","$splice1","stored","caught"],"ignoreList":[],"sources":["expressions/undefined-return.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "block",
};
const lying = cs.create($module0, []);
it("undefinedReturn", async (t) => {
  await snapshotCase(t, "undefinedReturn", cs.create($module1, [lying, lying]));
});
