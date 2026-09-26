import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `null` written in the script itself — bare, compared against, and as an
// argument — as opposed to a spliced host `null` (see `runtime-values.ts`).
const orDash = cs.create(
  "2nnj6ebvkk8vj:7:57",
  { params: [] },
  {
    code: 'export default () => value => {\n  if (value === null) {\n    return "-";\n  }\n  return value;\n};',
    map: '{"version":3,"mappings":"eAM4D,MAC1DA,KAAoB,IAClB;EACF,IAAIA,KAAK,KAAK,IAAI,EAAE;IAClB,OAAO,GAAG;EACZ;EACA,OAAOA,KAAK;AACd,CAAC","names":["value"],"ignoreList":[],"sources":["null-literal.test.tsx"]}',
    imports: [],
    exportAt: 0,
  },
);
it("nullLiteral", async (t) => {
  await snapshotCase(
    t,
    "nullLiteral",
    cs.create(
      "2nnj6ebvkk8vj:20:4",
      { params: [{ kind: "splice", value: orDash, bindings: [] }] },
      {
        code: 'export default $0 => ({\n  missing: $0()(null),\n  present: $0()("hi"),\n  bare: null\n});',
        map: '{"version":3,"mappings":"eAmBOA,EAAA,KAAC;EACFC,OAAO,EAAED,EAAA,EAAO,CAAC,IAAI,CAAC;EACtBE,OAAO,EAAEF,EAAA,EAAO,CAAC,IAAI,CAAC;EACtBG,IAAI,EAAE;CACP,CAAC","names":["$0","missing","present","bare"],"ignoreList":[],"sources":["null-literal.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
