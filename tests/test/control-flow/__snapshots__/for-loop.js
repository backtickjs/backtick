import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `i++` is not an operator in a client script, so the update is an
// assignment.
it("forLoop", async (t) => {
  await snapshotCase(
    t,
    "forLoop",
    cs.create(
      "1z8sn9rs7fbwb:11:4",
      { params: [] },
      {
        code: "export default () => {\n  let total = 0;\n  for (let i = 0; i < 5; i = i + 1) {\n    total = total + i;\n  }\n  return total;\n};",
        map: '{"version":3,"mappings":"eAUO;EACD,IAAIA,KAAK,GAAG,CAAC;EACb,KAAK,IAAIC,CAAC,GAAG,CAAC,EAAEA,CAAC,GAAG,CAAC,EAAEA,CAAC,GAAGA,CAAC,GAAG,CAAC,EAAE;IAChCD,KAAK,GAAGA,KAAK,GAAGC,CAAC;EACnB;EACA,OAAOD,KAAK;AACd,CAAC","names":["total","i"],"ignoreList":[],"sources":["for-loop.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
