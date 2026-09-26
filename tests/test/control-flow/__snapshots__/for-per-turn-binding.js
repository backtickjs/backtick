import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// Each turn of a `for` gets its own copy of the header binding, so the arrow
// built on the last turn reads 2 — the value that turn had — and not the 3
// the loop stopped at.
it("forPerTurnBinding", async (t) => {
  await snapshotCase(
    t,
    "forPerTurnBinding",
    cs.create(
      "2s6lhx8c4k6ow:12:4",
      { params: [] },
      {
        code: "export default () => {\n  let last = () => 0;\n  for (let i = 0; i < 3; i = i + 1) {\n    last = () => i;\n  }\n  return last();\n};",
        map: '{"version":3,"mappings":"eAWO;EACD,IAAIA,IAAI,GAAiBA,CAAA,KAAM,CAAC;EAChC,KAAK,IAAIC,CAAC,GAAG,CAAC,EAAEA,CAAC,GAAG,CAAC,EAAEA,CAAC,GAAGA,CAAC,GAAG,CAAC,EAAE;IAChCD,IAAI,GAAGA,CAAA,KAAMC,CAAC;EAChB;EACA,OAAOD,IAAI,EAAE;AACf,CAAC","names":["last","i"],"ignoreList":[],"sources":["for-per-turn-binding.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
