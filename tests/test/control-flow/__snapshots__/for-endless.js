import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `for (;;)` has no condition, so `break` is the only way out.
it("forEndless", async (t) => {
  await snapshotCase(
    t,
    "forEndless",
    cs.create(
      "3voddrkfnxnd9:10:4",
      { params: [] },
      '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    let i = 0;\n    for (;;) {\n        if (i === 4) {\n            break;\n        }\n        i = i + 1;\n    }\n    return i;\n};\n}',
      '{"version":3,"file":"module.jsx","mappings":";;;kBASO;IACD,IAAIA,CAAC,GAAG,CAAC;IACT,SAAS;QACP,IAAIA,CAAC,KAAK,CAAC,EAAE;YACX;QACF;QACAA,CAAC,GAAGA,CAAC,GAAG,CAAC;IACX;IACA,OAAOA,CAAC;AACV,CAAC","names":["i"],"ignoreList":[],"sources":["control-flow/for-endless.test.tsx"]}',
      [],
    ),
  );
});
