import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// The key is an expression, which is the point: a loop reaches every element
// without one script per position.
it("arrayIndex", async (t) => {
  await snapshotCase(
    t,
    "arrayIndex",
    cs.create(
      "2nqckix5uoswz:11:4",
      { params: [] },
      '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    const coins = [5, 31, 7];\n    let total = 0;\n    for (let i = 0; i < coins.length; i = i + 1) {\n        total = total + coins[i];\n    }\n    return total;\n};\n}',
      '{"version":3,"file":"module.jsx","mappings":";;;kBAUO;IACD,MAAMA,KAAK,GAAG,CAAC,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;IACxB,IAAIC,KAAK,GAAG,CAAC;IACb,KAAK,IAAIC,CAAC,GAAG,CAAC,EAAEA,CAAC,GAAGF,KAAK,CAACG,MAAM,EAAED,CAAC,GAAGA,CAAC,GAAG,CAAC,EAAE;QAC3CD,KAAK,GAAGA,KAAK,GAAGD,KAAK,CAACE,CAAC,CAAC;IAC1B;IACA,OAAOD,KAAK;AACd,CAAC","names":["coins","total","i","length"],"ignoreList":[],"sources":["stdlib/array-index.test.tsx"]}',
      [],
    ),
  );
});
