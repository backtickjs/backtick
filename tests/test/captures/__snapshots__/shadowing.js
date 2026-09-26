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
    "($splice0, $splice1) => {\n    let total = 0;\n    total = total + $splice0();\n    total = total + $splice1();\n    return total;\n}",
    '{"version":3,"file":"shadowing.test.jsx","sourceRoot":"","sources":["captures/shadowing.test.tsx"],"names":[],"mappings":"AAMY;IACR,IAAI,KAAK,GAAG,CAAC,CAAC;IACd,KAAK,GAAG,KAAK,GAAG,UAAI,CAAC;IACrB,KAAK,GAAG,KAAK,GAAG,UAAI,CAAC;IACrB,OAAO,KAAK,CAAC;AACf,CAAC"}',
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
                "($capture0) => $capture0",
                '{"version":3,"file":"shadowing.test.jsx","sourceRoot":"","sources":["captures/shadowing.test.tsx"],"names":[],"mappings":"AAoB8B,eAAA,SAAK"}',
              ),
              100,
            ),
            bindings: ["total$3ujapqmnmm2ra$1"],
          },
        ],
      },
      "($splice0) => {\n    const total = 1;\n    return $splice0(total);\n}",
      '{"version":3,"file":"shadowing.test.jsx","sourceRoot":"","sources":["captures/shadowing.test.tsx"],"names":[],"mappings":"AAkBO;IACD,MAAM,KAAK,GAAG,CAAC,CAAC;IAChB,OAAO,eAAC,CAA8B;AACxC,CAAC"}',
    ),
  );
});
