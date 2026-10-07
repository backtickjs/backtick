import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "163oncfaq7kkj:9:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    const greeting = "Hello";\n    return greeting.concat(", ", "World").toUpperCase();\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAQO;IACD,MAAMA,QAAQ,GAAG,OAAO;IACxB,OAAOA,QAAQ,CAACC,MAAM,CAAC,IAAI,EAAE,OAAO,CAAC,CAACC,WAAW,EAAE;AACrD,CAAC","names":["greeting","concat","toUpperCase"],"ignoreList":[],"sources":["expressions/method-call.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "block",
};
it("methodCall", async (t) => {
  await snapshotCase(t, "methodCall", cs.create($module0, []));
});
