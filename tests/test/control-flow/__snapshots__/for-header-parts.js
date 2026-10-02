import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// Every part of the header is optional: this one declares nothing and updates
// nothing, leaving both to the block around it and the body.
it("forHeaderParts", async (t) => {
  await snapshotCase(
    t,
    "forHeaderParts",
    cs.create(
      "2espgmzktnj99:11:4",
      { params: [] },
      '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    let i = 0;\n    let seen = "";\n    for (; i < 3;) {\n        seen = seen + i;\n        i = i + 1;\n    }\n    return seen;\n};\n}',
      '{"version":3,"file":"module.jsx","mappings":";;;kBAUO;IACD,IAAIA,CAAC,GAAG,CAAC;IACT,IAAIC,IAAI,GAAG,EAAE;IACb,OAAOD,CAAC,GAAG,CAAC,GAAI;QACdC,IAAI,GAAGA,IAAI,GAAGD,CAAC;QACfA,CAAC,GAAGA,CAAC,GAAG,CAAC;IACX;IACA,OAAOC,IAAI;AACb,CAAC","names":["i","seen"],"ignoreList":[],"sources":["control-flow/for-header-parts.test.tsx"]}',
      [],
    ),
  );
});
