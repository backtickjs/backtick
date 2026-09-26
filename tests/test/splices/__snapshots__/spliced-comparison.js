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
      "($splice0, $splice1) => ({\n    under: $splice0() < $splice1(),\n    atMost: $splice0() <= $splice1(),\n    over: $splice1() > $splice0(),\n    between: $splice0() < $splice1() && $splice1() > $splice0(),\n})",
      '{"version":3,"file":"spliced-comparison.test.jsx","sourceRoot":"","sources":["splices/spliced-comparison.test.tsx"],"names":[],"mappings":"AAcO,wBAAA,CAAC;IACF,KAAK,EAAE,UAAI,GAAG,UAAK;IACnB,MAAM,EAAE,UAAI,IAAI,UAAK;IACrB,IAAI,EAAE,UAAK,GAAG,UAAI;IAClB,OAAO,EAAE,UAAI,GAAG,UAAK,IAAI,UAAK,GAAG,UAAI;CACtC,CAAC"}',
    ),
  );
});
