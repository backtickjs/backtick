import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A builtin is a value, not only a callee. The compiler folds `Math.floor`
// into one whole name the client answers — there is no `Math` for a read to
// yield — and that name stands wherever a value does: bound to a variable,
// and handed to something that calls it.
//
// The `math` case reads `Math.PI` as a value too, but a constant is the easy
// half of this. What a builtin *function* is read as has to arrive callable.
it("builtinAsValue", async (t) => {
  await snapshotCase(
    t,
    "builtinAsValue",
    cs.create(
      "1n7k5w76rpsyr:16:4",
      { params: [] },
      {
        code: "export default () => {\n    const floor = Math.floor;\n    const apply = (f, n) => f(n);\n    return floor(3.5) + apply(Math.ceil, 3.5);\n};",
        map: '{"version":3,"file":"builtin-as-value.test.jsx","sourceRoot":"","sources":["builtin-as-value.test.tsx"],"names":[],"mappings":"eAeO;IACD,MAAM,KAAK,GAAG,IAAI,CAAC,KAAK,CAAC;IACzB,MAAM,KAAK,GAAG,CAAC,CAAwB,EAAE,CAAS,EAAE,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;IAC5D,OAAO,KAAK,CAAC,GAAG,CAAC,GAAG,KAAK,CAAC,IAAI,CAAC,IAAI,EAAE,GAAG,CAAC,CAAC;AAC5C,CAAC"}',
      },
    ),
  );
});
