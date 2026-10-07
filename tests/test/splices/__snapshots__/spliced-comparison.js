import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "3jdm2y7f9tpf:15:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1, $splice2, $splice3, $splice4, $splice5, $splice6, $splice7, $splice8, $splice9) => ({\n    under: $splice0() < $splice1(),\n    atMost: $splice2() <= $splice3(),\n    over: $splice4() > $splice5(),\n    between: $splice6() < $splice7() && $splice8() > $splice9()\n});\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAcO,CAAAA,QAAA,EAAAC,QAAA,EAAAC,QAAA,EAAAC,QAAA,EAAAC,QAAA,EAAAC,QAAA,EAAAC,QAAA,EAAAC,QAAA,EAAAC,QAAA,EAAAC,QAAA,MAAC;IACFC,KAAK,EAAEV,QAAA,EAAI,GAAGC,QAAA,EAAK;IACnBU,MAAM,EAAET,QAAA,EAAI,IAAIC,QAAA,EAAK;IACrBS,IAAI,EAAER,QAAA,EAAK,GAAGC,QAAA,EAAI;IAClBQ,OAAO,EAAEP,QAAA,EAAI,GAAGC,QAAA,EAAK,IAAIC,QAAA,EAAK,GAAGC,QAAA;CAClC,CAAC","names":["$splice0","$splice1","$splice2","$splice3","$splice4","$splice5","$splice6","$splice7","$splice8","$splice9","under","atMost","over","between"],"ignoreList":[],"sources":["splices/spliced-comparison.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "expression",
};
// A splice prints as an expression ending in a type, and a `<` after a type is
// where type arguments start — so a spliced value to the left of `<` is the
// one place the virtual file could stop being the program it stands for.
const low = 3;
const high = 9;
it("splicedComparison", async (t) => {
  await snapshotCase(
    t,
    "splicedComparison",
    cs.create($module0, [
      low,
      high,
      low,
      high,
      high,
      low,
      low,
      high,
      high,
      low,
    ]),
  );
});
