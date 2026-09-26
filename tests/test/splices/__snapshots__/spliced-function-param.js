import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A function is never spliceable — it can't cross the host/client boundary
// as data — but an annotation can still name a function type: the parameter
// receives a client-born function (here, a spliced script), already client
// currency, and passes through the annotation untouched.
it("splicedFunctionParam", async (t) => {
  await snapshotCase(
    t,
    "splicedFunctionParam",
    cs.create(
      "yz0kiroonaez:13:4",
      {
        params: [
          {
            kind: "splice",
            value: cs.create(
              "yz0kiroonaez:15:21",
              { params: [] },
              {
                code: "export default () => () => 2;",
                map: '{"version":3,"mappings":"eAcwB,YAAM,CAAC","names":[],"ignoreList":[],"sources":["spliced-function-param.test.tsx"]}',
                imports: [],
                exportAt: 0,
              },
            ),
            bindings: [],
          },
        ],
      },
      {
        code: "export default $0 => {\n  const apply = f => f() + 1;\n  return apply($0());\n};",
        map: '{"version":3,"mappings":"eAYOA,EAAA;EACD,MAAMC,KAAK,GAAIC,CAAe,IAAKA,CAAC,EAAE,GAAG,CAAC;EAC1C,OAAOD,KAAK,CAACD,EAAA,EAAC,CAAc;AAC9B,CAAC","names":["$0","apply","f"],"ignoreList":[],"sources":["spliced-function-param.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
