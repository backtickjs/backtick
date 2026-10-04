import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "2jjdjdr7m395y:9:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => {\n    const x = 0;\n    return $splice0(x);\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAQOA,QAAA;IACD,MAAMC,CAAC,GAAG,CAAC;IACX,OAAOD,QAAA,CAAAC,CAAA,CAAQ;AACjB,CAAC","names":["$splice0","x"],"ignoreList":[],"sources":["captures/nested-scripts.test.tsx"]}',
  dependencies: [],
};
const $module1 = {
  id: "2jjdjdr7m395y:11:15",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $capture0 => $capture0;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAUkBA,SAAA,IAAAA,SAAC","names":["$capture0"],"ignoreList":[],"sources":["captures/nested-scripts.test.tsx"]}',
  dependencies: [],
};
it("nestedScripts", async (t) => {
  await snapshotCase(
    t,
    "nestedScripts",
    cs.create($module0, [
      {
        kind: "splice",
        value: cs.create($module1, [
          { kind: "capture", key: "x$2jjdjdr7m395y$0" },
        ]),
        bindings: ["x$2jjdjdr7m395y$0"],
      },
    ]),
  );
});
