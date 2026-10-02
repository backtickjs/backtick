import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// Handlers — action arrows — are values: an object carries them, and
// storing one is not calling it.
const beep = cs.create(
  "1dqhax1do6u08:8:27",
  { params: [] },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    let n = 0;\n    n = 1;\n};\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;kBAO8B;IAC5B,IAAIA,CAAC,GAAG,CAAC;IACTA,CAAC,GAAG,CAAC;AACP,CAAC","names":["n"],"ignoreList":[],"sources":["control-flow/handler-object.test.tsx"]}',
  [],
);
const onTap = cs.create(
  "1dqhax1do6u08:13:44",
  { params: [{ kind: "splice", value: beep, bindings: [] }] },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => id => {\n    $splice0();\n};\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;kBAY+CA,QAAA,IAACC,EAAU;IACxDD,QAAA,EAAK;AACP,CAAC","names":["$splice0","id"],"ignoreList":[],"sources":["control-flow/handler-object.test.tsx"]}',
  [],
);
it("handlerObject", async (t) => {
  await snapshotCase(
    t,
    "handlerObject",
    cs.create(
      "1dqhax1do6u08:21:4",
      { params: [{ kind: "splice", value: onTap, bindings: [] }] },
      '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => {\n    const handlers = {\n        tap: $splice0(),\n        hold: $splice0()\n    };\n    return handlers;\n};\n}',
      '{"version":3,"file":"module.jsx","mappings":";;;kBAoBOA,QAAA;IACD,MAAMC,QAAQ,GAAG;QACfC,GAAG,EAAEF,QAAA,EAAM;QACXG,IAAI,EAAEH,QAAA;KACP;IACD,OAAOC,QAAQ;AACjB,CAAC","names":["$splice0","handlers","tap","hold"],"ignoreList":[],"sources":["control-flow/handler-object.test.tsx"]}',
      [],
    ),
  );
});
