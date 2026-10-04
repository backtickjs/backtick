import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "2s6lhx8c4k6ow:12:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    let last = () => 0;\n    for (let i = 0; i < 3; i = i + 1) {\n        last = () => i;\n    }\n    return last();\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAWO;IACD,IAAIA,IAAI,GAAiBA,GAAA,GAAM,CAAC;IAChC,KAAK,IAAIC,CAAC,GAAG,CAAC,EAAEA,CAAC,GAAG,CAAC,EAAEA,CAAC,GAAGA,CAAC,GAAG,CAAC,EAAE;QAChCD,IAAI,GAAGA,GAAA,GAAMC,CAAC;IAChB;IACA,OAAOD,IAAI,EAAE;AACf,CAAC","names":["last","i"],"ignoreList":[],"sources":["control-flow/for-per-turn-binding.test.tsx"]}',
  dependencies: [],
};
// Each turn of a `for` gets its own copy of the header binding, so the arrow
// built on the last turn reads 2 — the value that turn had — and not the 3
// the loop stopped at.
it("forPerTurnBinding", async (t) => {
  await snapshotCase(t, "forPerTurnBinding", cs.create($module0, []));
});
