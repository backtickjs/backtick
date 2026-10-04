import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "3rwumhu91n08h:10:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => (ready, count) => {\n    if (!ready) {\n        return "waiting";\n    }\n    return !(count > 3) ? "room left" : "full";\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBASO,OAACA,KAAc,EAAEC,KAAa;IAC/B,IAAI,CAACD,KAAK,EAAE;QACV,OAAO,SAAS;IAClB;IACA,OAAO,EAAEC,KAAK,GAAG,CAAC,CAAC,GAAG,WAAW,GAAG,MAAM;AAC5C,CAAC","names":["ready","count"],"ignoreList":[],"sources":["expressions/prefix-not.test.tsx"]}',
  dependencies: [],
};
// `!` negates its operand.
it("prefixNot", async (t) => {
  await snapshotCase(t, "prefixNot", cs.create($module0, []));
});
