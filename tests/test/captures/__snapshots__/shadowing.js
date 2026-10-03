import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
function addOwnTotal(lhs, rhs) {
  return cs.create(
    "3ujapqmnmm2ra:7:9",
    {
      params: [
        { kind: "splice", value: lhs, bindings: [] },
        { kind: "splice", value: rhs, bindings: [] },
      ],
    },
    '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => {\n    let total = 0;\n    total = total + $splice0();\n    total = total + $splice1();\n    return total;\n};\n}',
    '{"version":3,"file":"module.jsx","mappings":";;;kBAMY,CAAAA,QAAA,EAAAC,QAAA;IACR,IAAIC,KAAK,GAAG,CAAC;IACbA,KAAK,GAAGA,KAAK,GAAGF,QAAA,EAAI;IACpBE,KAAK,GAAGA,KAAK,GAAGD,QAAA,EAAI;IACpB,OAAOC,KAAK;AACd,CAAC","names":["$splice0","$splice1","total"],"ignoreList":[],"sources":["captures/shadowing.test.tsx"]}',
    [],
  );
}
it("shadowing", async (t) => {
  await snapshotCase(
    t,
    "shadowing",
    cs.create(
      "3ujapqmnmm2ra:19:4",
      {
        params: [
          {
            kind: "splice",
            value: addOwnTotal(
              cs.create(
                "3ujapqmnmm2ra:21:27",
                { params: [{ kind: "capture", key: "total$3ujapqmnmm2ra$1" }] },
                '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $capture0 => $capture0;\n}',
                '{"version":3,"file":"module.jsx","mappings":";;;kBAoB8BA,SAAA,IAAAA,SAAK","names":["$capture0"],"ignoreList":[],"sources":["captures/shadowing.test.tsx"]}',
                [],
              ),
              100,
            ),
            bindings: ["total$3ujapqmnmm2ra$1"],
          },
        ],
      },
      '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => {\n    const total = 1;\n    return $splice0(total);\n};\n}',
      '{"version":3,"file":"module.jsx","mappings":";;;kBAkBOA,QAAA;IACD,MAAMC,KAAK,GAAG,CAAC;IACf,OAAOD,QAAA,CAAAC,KAAA,CAA8B;AACvC,CAAC","names":["$splice0","total"],"ignoreList":[],"sources":["captures/shadowing.test.tsx"]}',
      [],
    ),
  );
});
