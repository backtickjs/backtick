import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `!` negates its operand.
it("prefixNot", async (t) => {
  await snapshotCase(
    t,
    "prefixNot",
    cs.create(
      "3rwumhu91n08h:10:4",
      { params: [] },
      {
        code: 'export default () => (ready, count) => {\n  if (!ready) {\n    return "waiting";\n  }\n  return !(count > 3) ? "room left" : "full";\n};',
        map: '{"version":3,"mappings":"eASO,OAACA,KAAc,EAAEC,KAAa,KAAI;EACnC,IAAI,CAACD,KAAK,EAAE;IACV,OAAO,SAAS;EAClB;EACA,OAAO,EAAEC,KAAK,GAAG,CAAC,CAAC,GAAG,WAAW,GAAG,MAAM;AAC5C,CAAC","names":["ready","count"],"ignoreList":[],"sources":["prefix-not.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
