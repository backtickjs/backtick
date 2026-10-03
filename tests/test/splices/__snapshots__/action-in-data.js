import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// An action may sit in data like any script: it runs where the container is
// built, and its slot holds what it evaluated to, which is nothing.
const action = cs.create(
  "1es21es7404j7:7:15",
  { params: [] },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    const x = 1;\n};\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;kBAMkB;IAChB,MAAMA,CAAC,GAAG,CAAC;AACb,CAAC","names":["x"],"ignoreList":[],"sources":["splices/action-in-data.test.tsx"]}',
  [],
);
it("actionInData", async (t) => {
  await snapshotCase(
    t,
    "actionInData",
    cs.create(
      "1es21es7404j7:15:4",
      {
        params: [
          { kind: "splice", value: [action], bindings: [] },
          { kind: "splice", value: { press: action }, bindings: [] },
        ],
      },
      '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => {\n    const list = $splice0();\n    const map = $splice1();\n    return list.length + Object.keys(map).length;\n};\n}',
      '{"version":3,"file":"module.jsx","mappings":";;;kBAcO,CAAAA,QAAA,EAAAC,QAAA;IACD,MAAMC,IAAI,GAAGF,QAAA,EAAW;IACxB,MAAMG,GAAG,GAAGF,QAAA,EAAoB;IAChC,OAAOC,IAAI,CAACE,MAAM,GAAGC,MAAM,CAACC,IAAI,CAACH,GAAG,CAAC,CAACC,MAAM;AAC9C,CAAC","names":["$splice0","$splice1","list","map","length","Object","keys"],"ignoreList":[],"sources":["splices/action-in-data.test.tsx"]}',
      [],
    ),
  );
});
