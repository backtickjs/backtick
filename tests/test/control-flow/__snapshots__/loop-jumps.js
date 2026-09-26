import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `continue` runs the update before the next turn — a loop that skipped it
// would never end — and each jump means the loop it is written in, the inner
// one here.
it("loopJumps", async (t) => {
  await snapshotCase(
    t,
    "loopJumps",
    cs.create(
      "28bjtc1esuow3:12:4",
      { params: [] },
      {
        code: 'export default () => {\n  let out = "";\n  for (let i = 0; i < 5; i = i + 1) {\n    if (i === 1) {\n      continue;\n    }\n    while (true) {\n      out = out + i;\n      break;\n    }\n    if (i === 3) {\n      break;\n    }\n  }\n  return out;\n};',
        map: '{"version":3,"mappings":"eAWO;EACD,IAAIA,GAAG,GAAG,EAAE;EACZ,KAAK,IAAIC,CAAC,GAAG,CAAC,EAAEA,CAAC,GAAG,CAAC,EAAEA,CAAC,GAAGA,CAAC,GAAG,CAAC,EAAE;IAChC,IAAIA,CAAC,KAAK,CAAC,EAAE;MACX;IACF;IACA,OAAO,IAAI,EAAE;MACXD,GAAG,GAAGA,GAAG,GAAGC,CAAC;MACb;IACF;IACA,IAAIA,CAAC,KAAK,CAAC,EAAE;MACX;IACF;EACF;EACA,OAAOD,GAAG;AACZ,CAAC","names":["out","i"],"ignoreList":[],"sources":["loop-jumps.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
