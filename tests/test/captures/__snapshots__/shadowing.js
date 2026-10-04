import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "3ujapqmnmm2ra:7:9",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => {\n    let total = 0;\n    total = total + $splice0();\n    total = total + $splice1();\n    return total;\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAMY,CAAAA,QAAA,EAAAC,QAAA;IACR,IAAIC,KAAK,GAAG,CAAC;IACbA,KAAK,GAAGA,KAAK,GAAGF,QAAA,EAAI;IACpBE,KAAK,GAAGA,KAAK,GAAGD,QAAA,EAAI;IACpB,OAAOC,KAAK;AACd,CAAC","names":["$splice0","$splice1","total"],"ignoreList":[],"sources":["captures/shadowing.test.tsx"]}',
  dependencies: [],
};
const $module1 = {
  id: "3ujapqmnmm2ra:19:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => {\n    const total = 1;\n    return $splice0(total);\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAkBOA,QAAA;IACD,MAAMC,KAAK,GAAG,CAAC;IACf,OAAOD,QAAA,CAAAC,KAAA,CAA8B;AACvC,CAAC","names":["$splice0","total"],"ignoreList":[],"sources":["captures/shadowing.test.tsx"]}',
  dependencies: [],
};
const $module2 = {
  id: "3ujapqmnmm2ra:21:27",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $capture0 => $capture0;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAoB8BA,SAAA,IAAAA,SAAK","names":["$capture0"],"ignoreList":[],"sources":["captures/shadowing.test.tsx"]}',
  dependencies: [],
};
function addOwnTotal(lhs, rhs) {
  return cs.create($module0, [
    { kind: "splice", value: lhs, bindings: [] },
    { kind: "splice", value: rhs, bindings: [] },
  ]);
}
it("shadowing", async (t) => {
  await snapshotCase(
    t,
    "shadowing",
    cs.create($module1, [
      {
        kind: "splice",
        value: addOwnTotal(
          cs.create($module2, [
            { kind: "capture", key: "total$3ujapqmnmm2ra$1" },
          ]),
          100,
        ),
        bindings: ["total$3ujapqmnmm2ra$1"],
      },
    ]),
  );
});
