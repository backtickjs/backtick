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
      code: "export default ($0, $1) => {\n  let total = 0;\n  total = total + $0();\n  total = total + $1();\n  return total;\n};",
      map: '{"version":3,"mappings":"eAMY,CAAAA,EAAA,EAAAC,EAAA;EACR,IAAIC,KAAK,GAAG,CAAC;EACbA,KAAK,GAAGA,KAAK,GAAGF,EAAA,EAAI;EACpBE,KAAK,GAAGA,KAAK,GAAGD,EAAA,EAAI;EACpB,OAAOC,KAAK;AACd,CAAC","names":["$0","$1","total"],"ignoreList":[],"sources":["shadowing.test.tsx"]}',
      imports: [],
      exportAt: 0,
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
                  code: "export default $0 => $0;",
                  map: '{"version":3,"mappings":"eAoB8BA,EAAA,IAAAA,EAAK","names":["$0"],"ignoreList":[],"sources":["shadowing.test.tsx"]}',
                  imports: [],
                  exportAt: 0,
                },
              ),
              100,
            ),
            bindings: ["total$3ujapqmnmm2ra$1"],
          },
        ],
      },
      {
        code: "export default $0 => {\n  const total = 1;\n  return $0(total);\n};",
        map: '{"version":3,"mappings":"eAkBOA,EAAA;EACD,MAAMC,KAAK,GAAG,CAAC;EACf,OAAOD,EAAA,CAAAC,KAAA,CAAC;AACV,CAAC","names":["$0","total"],"ignoreList":[],"sources":["shadowing.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
