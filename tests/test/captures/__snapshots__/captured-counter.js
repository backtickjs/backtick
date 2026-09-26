import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// Within one script, an arrow assigns an enclosing binding freely — the
// frames live and die together in a single evaluation.
it("capturedCounter", async (t) => {
  await snapshotCase(
    t,
    "capturedCounter",
    cs.create(
      "2s7xqailmdcpa:11:4",
      { params: [] },
      {
        code: "export default () => {\n  let count = 0;\n  const bump = () => {\n    count = count + 1;\n    return count;\n  };\n  return bump() + bump();\n};",
        map: '{"version":3,"mappings":"eAUO;EACD,IAAIA,KAAK,GAAG,CAAC;EACb,MAAMC,IAAI,GAAGA,CAAA,KAAK;IAChBD,KAAK,GAAGA,KAAK,GAAG,CAAC;IACjB,OAAOA,KAAK;EACd,CAAC;EACD,OAAOC,IAAI,EAAE,GAAGA,IAAI,EAAE;AACxB,CAAC","names":["count","bump"],"ignoreList":[],"sources":["captured-counter.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
