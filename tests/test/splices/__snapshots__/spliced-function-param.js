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
              "() => () => 2",
              '{"version":3,"file":"spliced-function-param.test.jsx","sourceRoot":"","sources":["splices/spliced-function-param.test.tsx"],"names":[],"mappings":"AAcwB,MAAA,GAAG,EAAE,CAAC,CAAC"}',
            ),
            bindings: [],
          },
        ],
      },
      "($splice0) => {\n    const apply = (f) => f() + 1;\n    return apply($splice0());\n}",
      '{"version":3,"file":"spliced-function-param.test.jsx","sourceRoot":"","sources":["splices/spliced-function-param.test.tsx"],"names":[],"mappings":"AAYO;IACD,MAAM,KAAK,GAAG,CAAC,CAAe,EAAE,EAAE,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC;IAC3C,OAAO,KAAK,CAAC,UAAC,CAAc,CAAC;AAC/B,CAAC"}',
    ),
  );
});
