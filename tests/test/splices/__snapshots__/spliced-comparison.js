import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "3jdm2y7f9tpf:15:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => ({\n    under: $splice0() < $splice1(),\n    atMost: $splice0() <= $splice1(),\n    over: $splice1() > $splice0(),\n    between: $splice0() < $splice1() && $splice1() > $splice0()\n});\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAcO,CAAAA,QAAA,EAAAC,QAAA,MAAC;IACFC,KAAK,EAAEF,QAAA,EAAI,GAAGC,QAAA,EAAK;IACnBE,MAAM,EAAEH,QAAA,EAAI,IAAIC,QAAA,EAAK;IACrBG,IAAI,EAAEH,QAAA,EAAK,GAAGD,QAAA,EAAI;IAClBK,OAAO,EAAEL,QAAA,EAAI,GAAGC,QAAA,EAAK,IAAIA,QAAA,EAAK,GAAGD,QAAA;CAClC,CAAC","names":["$splice0","$splice1","under","atMost","over","between"],"ignoreList":[],"sources":["splices/spliced-comparison.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
};
// A splice prints as an expression ending in a type, and a `<` after a type is
// where type arguments start — so a spliced value to the left of `<` is the
// one place the virtual file could stop being the program it stands for.
const low = 3;
const high = 9;
it("splicedComparison", async (t) => {
  await snapshotCase(t, "splicedComparison", cs.create($module0, [low, high]));
});
