import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { snapshotCase } from "../snapshotCase.ts";
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
    cs.create(
      "39eg5n9do9wwo:28:4",
      {
        params: [
          { kind: "splice", value: createSignal, bindings: [] },
          { kind: "splice", value: five, bindings: [] },
          { kind: "splice", value: Color.Red, bindings: [] },
          { kind: "splice", value: Color.Blue, bindings: [] },
        ],
      },
      {
        code: "export default ($0, $1, $2, $3) => {\n  const n = $0()($1());\n  n[1](6);\n  const c = $0()($2());\n  c[1]($3());\n};",
        map: '{"version":3,"mappings":"eA2BO,CAAAA,EAAA,EAAAC,EAAA,EAAAC,EAAA,EAAAC,EAAA;EACD,MAAMC,CAAC,GAAGJ,EAAA,EAAa,CAACC,EAAA,EAAK,CAAC;EAC9BG,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;EACP,MAAMC,CAAC,GAAGL,EAAA,EAAa,CAACE,EAAA,EAAC,CAAY;EACrCG,CAAC,CAAC,CAAC,CAAC,CAACF,EAAA,EAAC,CAAa;AACrB,CAAC","names":["$0","$1","$2","$3","n","c"],"ignoreList":[],"sources":["spliced-literal-widens.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
