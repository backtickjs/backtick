import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A tag naming a parameter of an arrow in the enclosing script. The nested
// scripts sit inside the arrow's body, so the parameter reaches them through
// the holes they fill rather than as a capture of the whole script.
it("scriptBoundTagParam", async (t) => {
  await snapshotCase(
    t,
    "scriptBoundTagParam",
    cs.create(
      "3ehgcl2xwg3z1:13:4",
      {
        params: [
          {
            kind: "splice",
            value: cs.create(
              "3ehgcl2xwg3z1:16:13",
              { params: [{ kind: "capture", key: "Row$3ehgcl2xwg3z1$1" }] },
              "($0) => <$0 n={1}/>",
              '{"version":3,"file":"script-bound-tag-param.test.jsx","sourceRoot":"","sources":["captures/script-bound-tag-param.test.tsx"],"names":[],"mappings":"AAegB,QAAA,CAAC,EAAG,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,EAAG"}',
            ),
            bindings: ["Row$3ehgcl2xwg3z1$1"],
          },
          {
            kind: "splice",
            value: cs.create(
              "3ehgcl2xwg3z1:17:13",
              { params: [{ kind: "capture", key: "Row$3ehgcl2xwg3z1$1" }] },
              "($0) => <$0 n={2}/>",
              '{"version":3,"file":"script-bound-tag-param.test.jsx","sourceRoot":"","sources":["captures/script-bound-tag-param.test.tsx"],"names":[],"mappings":"AAgBgB,QAAA,CAAC,EAAG,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,EAAG"}',
            ),
            bindings: ["Row$3ehgcl2xwg3z1$1"],
          },
        ],
      },
      '($0, $1) => {\n    const twice = (Row) => (<ul>\n          {$0(Row)}\n          {$1(Row)}\n        </ul>);\n    return twice((p) => <li>{"row " + p.n}</li>);\n}',
      '{"version":3,"file":"script-bound-tag-param.test.jsx","sourceRoot":"","sources":["captures/script-bound-tag-param.test.tsx"],"names":[],"mappings":"AAYO;IACD,MAAM,KAAK,GAAG,CAAC,GAA0C,EAAE,EAAE,CAAC,CAC5D,CAAC,EAAE,CACD;UAAA,CAAC,OAAoB,CACrB;UAAA,CAAC,OAAoB,CACvB;QAAA,EAAE,EAAE,CAAC,CACN,CAAC;IACF,OAAO,KAAK,CAAC,CAAC,CAAgB,EAAE,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,MAAM,GAAG,CAAC,CAAC,CAAC,CAAC,EAAE,EAAE,CAAC,CAAC,CAAC;AAC9D,CAAC"}',
    ),
  );
});
