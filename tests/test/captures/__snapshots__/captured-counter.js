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
        code: "export default () => {\n    let count = 0;\n    const bump = () => {\n        count = count + 1;\n        return count;\n    };\n    return bump() + bump();\n};",
        map: '{"version":3,"file":"captured-counter.test.jsx","sourceRoot":"","sources":["captured-counter.test.tsx"],"names":[],"mappings":"eAUO;IACD,IAAI,KAAK,GAAG,CAAC,CAAC;IACd,MAAM,IAAI,GAAG,GAAG,EAAE;QAChB,KAAK,GAAG,KAAK,GAAG,CAAC,CAAC;QAClB,OAAO,KAAK,CAAC;IACf,CAAC,CAAC;IACF,OAAO,IAAI,EAAE,GAAG,IAAI,EAAE,CAAC;AACzB,CAAC"}',
      },
    ),
  );
});
