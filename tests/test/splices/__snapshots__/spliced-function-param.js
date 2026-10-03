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
              '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => () => 2;\n}',
              '{"version":3,"file":"module.jsx","mappings":";;;kBAcwB,YAAM,CAAC","names":[],"ignoreList":[],"sources":["splices/spliced-function-param.test.tsx"]}',
              [],
            ),
            bindings: [],
          },
        ],
      },
      '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => {\n    const apply = f => f() + 1;\n    return apply($splice0());\n};\n}',
      '{"version":3,"file":"module.jsx","mappings":";;;kBAYOA,QAAA;IACD,MAAMC,KAAK,GAAIC,CAAe,IAAKA,CAAC,EAAE,GAAG,CAAC;IAC1C,OAAOD,KAAK,CAACD,QAAA,EAAc,CAAC;AAC9B,CAAC","names":["$splice0","apply","f"],"ignoreList":[],"sources":["splices/spliced-function-param.test.tsx"]}',
      [],
    ),
  );
});
