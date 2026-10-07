import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "x79h35ggz599:10:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    let n = 1;\n    if (n === 2) {\n        return "some";\n    }\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBASO;IACD,IAAIA,CAAC,GAAG,CAAC;IACT,IAAIA,CAAC,KAAK,CAAC,EAAE;QACX,OAAO,MAAM;IACf;AACF,CAAC","names":["n"],"ignoreList":[],"sources":["control-flow/partial-return.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "block",
};
const $module1 = {
  id: "x79h35ggz599:23:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    const pick = b => {\n        if (b) {\n            return "taken";\n        }\n    };\n    return [pick(true), pick(false)];\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAsBO;IACD,MAAMA,IAAI,GAAIC,CAAU;QACtB,IAAIA,CAAC,EAAE;YACL,OAAO,OAAO;QAChB;IACF,CAAC;IACD,OAAO,CAACD,IAAI,CAAC,IAAI,CAAC,EAAEA,IAAI,CAAC,KAAK,CAAC,CAAC;AAClC,CAAC","names":["pick","b"],"ignoreList":[],"sources":["control-flow/partial-return.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "block",
};
// A value body that falls off the end completes with `undefined`.
it("partialReturnScript", async (t) => {
  await snapshotCase(t, "partialReturnScript", cs.create($module0, []));
});
it("partialReturnArrow", async (t) => {
  await snapshotCase(t, "partialReturnArrow", cs.create($module1, []));
});
