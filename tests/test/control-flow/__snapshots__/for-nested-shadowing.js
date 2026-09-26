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
        code: 'export default () => {\n    let out = "";\n    for (let i = 0; i < 2; i = i + 1) {\n        const i = "-";\n        for (let j = 0; j < 2; j = j + 1) {\n            out = out + i + j;\n        }\n    }\n    return out;\n};',
        map: '{"version":3,"file":"for-nested-shadowing.test.jsx","sourceRoot":"","sources":["control-flow/for-nested-shadowing.test.tsx"],"names":[],"mappings":"eAWO;IACD,IAAI,GAAG,GAAG,EAAE,CAAC;IACb,KAAK,IAAI,CAAC,GAAG,CAAC,EAAE,CAAC,GAAG,CAAC,EAAE,CAAC,GAAG,CAAC,GAAG,CAAC,EAAE,CAAC;QACjC,MAAM,CAAC,GAAG,GAAG,CAAC;QACd,KAAK,IAAI,CAAC,GAAG,CAAC,EAAE,CAAC,GAAG,CAAC,EAAE,CAAC,GAAG,CAAC,GAAG,CAAC,EAAE,CAAC;YACjC,GAAG,GAAG,GAAG,GAAG,CAAC,GAAG,CAAC,CAAC;QACpB,CAAC;IACH,CAAC;IACD,OAAO,GAAG,CAAC;AACb,CAAC"}',
      },
    ),
  );
});
