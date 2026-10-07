import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "2s7xqailmdcpa:11:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    let count = 0;\n    const bump = () => {\n        count = count + 1;\n        return count;\n    };\n    return bump() + bump();\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAUO;IACD,IAAIA,KAAK,GAAG,CAAC;IACb,MAAMC,IAAI,GAAGA,GAAA;QACXD,KAAK,GAAGA,KAAK,GAAG,CAAC;QACjB,OAAOA,KAAK;IACd,CAAC;IACD,OAAOC,IAAI,EAAE,GAAGA,IAAI,EAAE;AACxB,CAAC","names":["count","bump"],"ignoreList":[],"sources":["captures/captured-counter.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "block",
};
// Within one script, an arrow assigns an enclosing binding freely — the
// frames live and die together in a single evaluation.
it("capturedCounter", async (t) => {
  await snapshotCase(t, "capturedCounter", cs.create($module0, []));
});
