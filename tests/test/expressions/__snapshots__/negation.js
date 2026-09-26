import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A negative literal is written as one, and reaches the wire as one: `-1` is
// a prefix operator on `1` in TypeScript's AST and in this one, and a number
// on the wire, where every literal carries itself.
//
// Negating something computed is the same operator with nothing to fold.
it("negation", async (t) => {
  await snapshotCase(
    t,
    "negation",
    cs.create(
      "3ucocch4sr77y:14:4",
      { params: [] },
      {
        code: "export default () => (count) => {\n    const floor = -1;\n    const step = -count;\n    return floor + step + -2;\n};",
        map: '{"version":3,"file":"negation.test.jsx","sourceRoot":"","sources":["expressions/negation.test.tsx"],"names":[],"mappings":"eAaO,MAAA,CAAC,KAAa,EAAE,EAAE;IACnB,MAAM,KAAK,GAAG,CAAC,CAAC,CAAC;IACjB,MAAM,IAAI,GAAG,CAAC,KAAK,CAAC;IACpB,OAAO,KAAK,GAAG,IAAI,GAAG,CAAC,CAAC,CAAC;AAC3B,CAAC"}',
      },
    ),
  );
});
// `-0` stays a negation on the wire: JSON writes the number `-0` as `0`.
it("negativeZero", async (t) => {
  await snapshotCase(
    t,
    "negativeZero",
    cs.create(
      "3ucocch4sr77y:27:4",
      { params: [] },
      {
        code: "export default () => {\n    return 1 / -0;\n};",
        map: '{"version":3,"file":"negation.test.jsx","sourceRoot":"","sources":["expressions/negation.test.tsx"],"names":[],"mappings":"eA0BO;IACD,OAAO,CAAC,GAAG,CAAC,CAAC,CAAC;AAChB,CAAC"}',
      },
    ),
  );
});
