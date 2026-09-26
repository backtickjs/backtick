import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A splice prints as an expression ending in a type, and a `<` after a type is
// where type arguments start — so a spliced value to the left of `<` is the
// one place the virtual file could stop being the program it stands for.
const low = 3;
const high = 9;
it("splicedComparison", async (t) => {
  await snapshotCase(
    t,
    "splicedComparison",
    cs.create(
      "3jdm2y7f9tpf:15:4",
      {
        params: [
          { kind: "splice", value: low, bindings: [] },
          { kind: "splice", value: high, bindings: [] },
        ],
      },
      {
        code: "export default ($0, $1) => ({\n    under: $0() < $1(),\n    atMost: $0() <= $1(),\n    over: $1() > $0(),\n    between: $0() < $1() && $1() > $0(),\n});",
        map: '{"version":3,"file":"spliced-comparison.test.jsx","sourceRoot":"","sources":["spliced-comparison.test.tsx"],"names":[],"mappings":"eAcO,YAAA,CAAC;IACF,KAAK,EAAE,IAAI,GAAG,IAAK;IACnB,MAAM,EAAE,IAAI,IAAI,IAAK;IACrB,IAAI,EAAE,IAAK,GAAG,IAAI;IAClB,OAAO,EAAE,IAAI,GAAG,IAAK,IAAI,IAAK,GAAG,IAAI;CACtC,CAAC"}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
