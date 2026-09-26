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
    {
      code: "export default ($0, $1) => {\n    let total = 0;\n    total = total + $0();\n    total = total + $1();\n    return total;\n};",
      map: '{"version":3,"file":"shadowing.test.jsx","sourceRoot":"","sources":["shadowing.test.tsx"],"names":[],"mappings":"eAMY;IACR,IAAI,KAAK,GAAG,CAAC,CAAC;IACd,KAAK,GAAG,KAAK,GAAG,IAAI,CAAC;IACrB,KAAK,GAAG,KAAK,GAAG,IAAI,CAAC;IACrB,OAAO,KAAK,CAAC;AACf,CAAC"}',
    },
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
                {
                  code: "export default ($0) => $0;",
                  map: '{"version":3,"file":"shadowing.test.jsx","sourceRoot":"","sources":["shadowing.test.tsx"],"names":[],"mappings":"eAoB8B,QAAA,EAAK"}',
                },
              ),
              100,
            ),
            bindings: ["total$3ujapqmnmm2ra$1"],
          },
        ],
      },
      {
        code: "export default ($0) => {\n    const total = 1;\n    return $0(total);\n};",
        map: '{"version":3,"file":"shadowing.test.jsx","sourceRoot":"","sources":["shadowing.test.tsx"],"names":[],"mappings":"eAkBO;IACD,MAAM,KAAK,GAAG,CAAC,CAAC;IAChB,OAAO,SAAC,CAA8B;AACxC,CAAC"}',
      },
    ),
  );
});
