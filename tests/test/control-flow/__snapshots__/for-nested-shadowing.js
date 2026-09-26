import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// Nested headers reusing a name, and a body that shadows the header's own:
// the update still means the header's binding, because names resolve to their
// binding before anything is lowered.
it("forNestedShadowing", async (t) => {
  await snapshotCase(
    t,
    "forNestedShadowing",
    cs.create(
      "lj6vk8127ex6:12:4",
      { params: [] },
      {
        code: 'export default () => {\n  let out = "";\n  for (let i = 0; i < 2; i = i + 1) {\n    const i = "-";\n    for (let j = 0; j < 2; j = j + 1) {\n      out = out + i + j;\n    }\n  }\n  return out;\n};',
        map: '{"version":3,"mappings":"eAWO;EACD,IAAIA,GAAG,GAAG,EAAE;EACZ,KAAK,IAAIC,CAAC,GAAG,CAAC,EAAEA,CAAC,GAAG,CAAC,EAAEA,CAAC,GAAGA,CAAC,GAAG,CAAC,EAAE;IAChC,MAAMA,CAAC,GAAG,GAAG;IACb,KAAK,IAAIC,CAAC,GAAG,CAAC,EAAEA,CAAC,GAAG,CAAC,EAAEA,CAAC,GAAGA,CAAC,GAAG,CAAC,EAAE;MAChCF,GAAG,GAAGA,GAAG,GAAGC,CAAC,GAAGC,CAAC;IACnB;EACF;EACA,OAAOF,GAAG;AACZ,CAAC","names":["out","i","j"],"ignoreList":[],"sources":["for-nested-shadowing.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
