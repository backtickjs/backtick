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
      {
        code: 'export default () => {\n    let i = 0;\n    let seen = "";\n    for (; i < 3;) {\n        seen = seen + i;\n        i = i + 1;\n    }\n    return seen;\n};',
        map: '{"version":3,"file":"for-header-parts.test.jsx","sourceRoot":"","sources":["control-flow/for-header-parts.test.tsx"],"names":[],"mappings":"eAUO;IACD,IAAI,CAAC,GAAG,CAAC,CAAC;IACV,IAAI,IAAI,GAAG,EAAE,CAAC;IACd,OAAO,CAAC,GAAG,CAAC,GAAI,CAAC;QACf,IAAI,GAAG,IAAI,GAAG,CAAC,CAAC;QAChB,CAAC,GAAG,CAAC,GAAG,CAAC,CAAC;IACZ,CAAC;IACD,OAAO,IAAI,CAAC;AACd,CAAC"}',
      },
    ),
  );
});
