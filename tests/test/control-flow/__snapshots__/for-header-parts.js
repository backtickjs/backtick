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
        code: 'export default () => {\n  let i = 0;\n  let seen = "";\n  for (; i < 3;) {\n    seen = seen + i;\n    i = i + 1;\n  }\n  return seen;\n};',
        map: '{"version":3,"mappings":"eAUO;EACD,IAAIA,CAAC,GAAG,CAAC;EACT,IAAIC,IAAI,GAAG,EAAE;EACb,OAAOD,CAAC,GAAG,CAAC,GAAI;IACdC,IAAI,GAAGA,IAAI,GAAGD,CAAC;IACfA,CAAC,GAAGA,CAAC,GAAG,CAAC;EACX;EACA,OAAOC,IAAI;AACb,CAAC","names":["i","seen"],"ignoreList":[],"sources":["for-header-parts.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
