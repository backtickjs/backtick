import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "1n7k5w76rpsyr:16:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    const floor = Math.floor;\n    const apply = (f, n) => f(n);\n    return floor(3.5) + apply(Math.ceil, 3.5);\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAeO;IACD,MAAMA,KAAK,GAAGC,IAAI,CAACD,KAAK;IACxB,MAAME,KAAK,GAAGA,CAACC,CAAwB,EAAEC,CAAS,KAAKD,CAAC,CAACC,CAAC,CAAC;IAC3D,OAAOJ,KAAK,CAAC,GAAG,CAAC,GAAGE,KAAK,CAACD,IAAI,CAACI,IAAI,EAAE,GAAG,CAAC;AAC3C,CAAC","names":["floor","Math","apply","f","n","ceil"],"ignoreList":[],"sources":["stdlib/builtin-as-value.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "block",
};
// A builtin is a value, not only a callee. The compiler folds `Math.floor`
// into one whole name the client answers — there is no `Math` for a read to
// yield — and that name stands wherever a value does: bound to a variable,
// and handed to something that calls it.
//
// The `math` case reads `Math.PI` as a value too, but a constant is the easy
// half of this. What a builtin *function* is read as has to arrive callable.
it("builtinAsValue", async (t) => {
  await snapshotCase(t, "builtinAsValue", cs.create($module0, []));
});
