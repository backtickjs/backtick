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
      "() => {\n    let last = () => 0;\n    for (let i = 0; i < 3; i = i + 1) {\n        last = () => i;\n    }\n    return last();\n}",
      '{"version":3,"file":"for-per-turn-binding.test.jsx","sourceRoot":"","sources":["control-flow/for-per-turn-binding.test.tsx"],"names":[],"mappings":"AAWO;IACD,IAAI,IAAI,GAAiB,GAAG,EAAE,CAAC,CAAC,CAAC;IACjC,KAAK,IAAI,CAAC,GAAG,CAAC,EAAE,CAAC,GAAG,CAAC,EAAE,CAAC,GAAG,CAAC,GAAG,CAAC,EAAE,CAAC;QACjC,IAAI,GAAG,GAAG,EAAE,CAAC,CAAC,CAAC;IACjB,CAAC;IACD,OAAO,IAAI,EAAE,CAAC;AAChB,CAAC"}',
    ),
  );
});
