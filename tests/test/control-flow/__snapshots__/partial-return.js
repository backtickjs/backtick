import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A value body that falls off the end completes with `undefined`.
it("partialReturnScript", async (t) => {
  await snapshotCase(
    t,
    "partialReturnScript",
    cs.create(
      "x79h35ggz599:10:4",
      { params: [] },
      {
        code: 'export default () => {\n    let n = 1;\n    if (n === 2) {\n        return "some";\n    }\n};',
        map: '{"version":3,"file":"partial-return.test.jsx","sourceRoot":"","sources":["partial-return.test.tsx"],"names":[],"mappings":"eASO;IACD,IAAI,CAAC,GAAG,CAAC,CAAC;IACV,IAAI,CAAC,KAAK,CAAC,EAAE,CAAC;QACZ,OAAO,MAAM,CAAC;IAChB,CAAC;AACH,CAAC"}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
it("partialReturnArrow", async (t) => {
  await snapshotCase(
    t,
    "partialReturnArrow",
    cs.create(
      "x79h35ggz599:23:4",
      { params: [] },
      {
        code: 'export default () => {\n    const pick = (b) => {\n        if (b) {\n            return "taken";\n        }\n    };\n    return [pick(true), pick(false)];\n};',
        map: '{"version":3,"file":"partial-return.test.jsx","sourceRoot":"","sources":["partial-return.test.tsx"],"names":[],"mappings":"eAsBO;IACD,MAAM,IAAI,GAAG,CAAC,CAAU,EAAE,EAAE;QAC1B,IAAI,CAAC,EAAE,CAAC;YACN,OAAO,OAAO,CAAC;QACjB,CAAC;IACH,CAAC,CAAC;IACF,OAAO,CAAC,IAAI,CAAC,IAAI,CAAC,EAAE,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC;AACnC,CAAC"}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
