import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "1dqhax1do6u08:8:27",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    let n = 0;\n    n = 1;\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAO8B;IAC5B,IAAIA,CAAC,GAAG,CAAC;IACTA,CAAC,GAAG,CAAC;AACP,CAAC","names":["n"],"ignoreList":[],"sources":["control-flow/handler-object.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "block",
};
const $module1 = {
  id: "1dqhax1do6u08:13:44",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => id => {\n    $splice0();\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAY+CA,QAAA,IAACC,EAAU;IACxDD,QAAA,EAAK;AACP,CAAC","names":["$splice0","id"],"ignoreList":[],"sources":["control-flow/handler-object.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "function",
};
const $module2 = {
  id: "1dqhax1do6u08:21:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => {\n    const handlers = {\n        tap: $splice0(),\n        hold: $splice1()\n    };\n    return handlers;\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAoBO,CAAAA,QAAA,EAAAC,QAAA;IACD,MAAMC,QAAQ,GAAG;QACfC,GAAG,EAAEH,QAAA,EAAM;QACXI,IAAI,EAAEH,QAAA;KACP;IACD,OAAOC,QAAQ;AACjB,CAAC","names":["$splice0","$splice1","handlers","tap","hold"],"ignoreList":[],"sources":["control-flow/handler-object.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "block",
};
// Handlers — action arrows — are values: an object carries them, and
// storing one is not calling it.
const beep = cs.create($module0, []);
const onTap = cs.create($module1, [beep]);
it("handlerObject", async (t) => {
  await snapshotCase(t, "handlerObject", cs.create($module2, [onTap, onTap]));
});
