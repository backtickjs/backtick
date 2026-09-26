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
        code: 'export default () => (ready, count) => {\n    if (!ready) {\n        return "waiting";\n    }\n    return !(count > 3) ? "room left" : "full";\n};',
        map: '{"version":3,"file":"prefix-not.test.jsx","sourceRoot":"","sources":["prefix-not.test.tsx"],"names":[],"mappings":"eASO,MAAA,CAAC,KAAc,EAAE,KAAa,EAAE,EAAE;IACnC,IAAI,CAAC,KAAK,EAAE,CAAC;QACX,OAAO,SAAS,CAAC;IACnB,CAAC;IACD,OAAO,CAAC,CAAC,KAAK,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,WAAW,CAAC,CAAC,CAAC,MAAM,CAAC;AAC7C,CAAC"}',
      },
    ),
  );
});
