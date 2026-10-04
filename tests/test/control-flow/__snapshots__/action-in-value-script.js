import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "1zk77nyjrl50d:7:41",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    const x = 1;\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAM4C;IAC1C,MAAMA,CAAC,GAAG,CAAC;AACb,CAAC","names":["x"],"ignoreList":[],"sources":["control-flow/action-in-value-script.test.tsx"]}',
  dependencies: [],
};
const $module1 = {
  id: "1zk77nyjrl50d:11:33",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => () => {\n    let n = 0;\n    n = 1;\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAUoC;IAClC,IAAIA,CAAC,GAAG,CAAC;IACTA,CAAC,GAAG,CAAC;AACP,CAAC","names":["n"],"ignoreList":[],"sources":["control-flow/action-in-value-script.test.tsx"]}',
  dependencies: [],
};
const $module2 = {
  id: "1zk77nyjrl50d:20:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => b => {\n    let n = 0;\n    $splice0();\n    if (b) {\n        $splice1()();\n        n = 1;\n    }\n    return n;\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAmBO,CAAAA,QAAA,EAAAC,QAAA,KAACC,CAAU;IACZ,IAAIC,CAAC,GAAG,CAAC;IACTH,QAAA,EAAmB;IACnB,IAAIE,CAAC,EAAE;QACLD,QAAA,EAAK,EAAE;QACPE,CAAC,GAAG,CAAC;IACP;IACA,OAAOA,CAAC;AACV,CAAC","names":["$splice0","$splice1","b","n"],"ignoreList":[],"sources":["control-flow/action-in-value-script.test.tsx"]}',
  dependencies: [],
};
// A script that returns a value may still run an action.
const valueScriptEffects = cs.create($module0, []);
const ping = cs.create($module1, []);
it("actionInValueScript", async (t) => {
  await snapshotCase(
    t,
    "actionInValueScript",
    cs.create($module2, [
      { kind: "splice", value: valueScriptEffects, bindings: [] },
      { kind: "splice", value: ping, bindings: [] },
    ]),
  );
});
