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
        code: 'export default () => {\n  let n = 1;\n  if (n === 2) {\n    return "some";\n  }\n};',
        map: '{"version":3,"mappings":"eASO;EACD,IAAIA,CAAC,GAAG,CAAC;EACT,IAAIA,CAAC,KAAK,CAAC,EAAE;IACX,OAAO,MAAM;EACf;AACF,CAAC","names":["n"],"ignoreList":[],"sources":["partial-return.test.tsx"]}',
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
        code: 'export default () => {\n  const pick = b => {\n    if (b) {\n      return "taken";\n    }\n  };\n  return [pick(true), pick(false)];\n};',
        map: '{"version":3,"mappings":"eAsBO;EACD,MAAMA,IAAI,GAAIC,CAAU,IAAI;IAC1B,IAAIA,CAAC,EAAE;MACL,OAAO,OAAO;IAChB;EACF,CAAC;EACD,OAAO,CAACD,IAAI,CAAC,IAAI,CAAC,EAAEA,IAAI,CAAC,KAAK,CAAC,CAAC;AAClC,CAAC","names":["pick","b"],"ignoreList":[],"sources":["partial-return.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
