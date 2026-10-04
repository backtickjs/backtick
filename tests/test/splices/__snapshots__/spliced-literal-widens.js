import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "2z8p56bmxvsx1:28:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1, $splice2, $splice3) => {\n    const [n, setN] = $splice0()($splice1());\n    setN(6);\n    const [c, setC] = $splice0()($splice2());\n    setC($splice3());\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA2BO,CAAAA,QAAA,EAAAC,QAAA,EAAAC,QAAA,EAAAC,QAAA;IACD,MAAM,CAACC,CAAC,EAAEC,IAAI,CAAC,GAAGL,QAAA,EAAa,CAACC,QAAA,EAAK,CAAC;IACtCI,IAAI,CAAC,CAAC,CAAC;IACP,MAAM,CAACC,CAAC,EAAEC,IAAI,CAAC,GAAGP,QAAA,EAAa,CAACE,QAAA,EAAY,CAAC;IAC7CK,IAAI,CAACJ,QAAA,EAAa,CAAC;AACrB,CAAC","names":["$splice0","$splice1","$splice2","$splice3","n","setN","c","setC"],"ignoreList":[],"sources":["splices/spliced-literal-widens.test.tsx"]}',
  dependencies: [],
};
// What a splice hands over keeps the width the host gave it.
//
// `const five = 5` has the literal type `5`, and an enum member has its own, so
// a signal built from either would take no other value if the splice retyped what
// it crossed. It does not: `cs.splice` reads its argument unbound, leaving the
// binding to decide the width — `number` for the one, `Color` for the other.
//
// The writes are the assertion, each an error the moment a bound comes back to
// `cs.splice`. An action, so a write is what the script is for: in one that
// returns a value they would be side effects as well, and that error would
// stand beside the one under test.
var Color;
(function (Color) {
  Color[(Color["Red"] = 0)] = "Red";
  Color[(Color["Blue"] = 1)] = "Blue";
})(Color || (Color = {}));
const five = 5;
it("splicedLiteralWidens", async (t) => {
  await snapshotCase(
    t,
    "splicedLiteralWidens",
    cs.create($module0, [
      { kind: "splice", value: createSignal, bindings: [] },
      { kind: "splice", value: five, bindings: [] },
      { kind: "splice", value: Color.Red, bindings: [] },
      { kind: "splice", value: Color.Blue, bindings: [] },
    ]),
  );
});
