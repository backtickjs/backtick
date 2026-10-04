import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "3ucocch4sr77y:14:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => count => {\n    const floor = -1;\n    const step = -count;\n    return floor + step + -2;\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAaO,MAACA,KAAa;IACf,MAAMC,KAAK,GAAG,CAAC,CAAC;IAChB,MAAMC,IAAI,GAAG,CAACF,KAAK;IACnB,OAAOC,KAAK,GAAGC,IAAI,GAAG,CAAC,CAAC;AAC1B,CAAC","names":["count","floor","step"],"ignoreList":[],"sources":["expressions/negation.test.tsx"]}',
  dependencies: [],
};
const $module1 = {
  id: "3ucocch4sr77y:27:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    return 1 / -0;\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA0BO;IACD,OAAO,CAAC,GAAG,CAAC,CAAC;AACf,CAAC","names":[],"ignoreList":[],"sources":["expressions/negation.test.tsx"]}',
  dependencies: [],
};
// A negative literal is written as one, and reaches the wire as one: `-1` is
// a prefix operator on `1` in TypeScript's AST and in this one, and a number
// on the wire, where every literal carries itself.
//
// Negating something computed is the same operator with nothing to fold.
it("negation", async (t) => {
  await snapshotCase(t, "negation", cs.create($module0, []));
});
// `-0` stays a negation on the wire: JSON writes the number `-0` as `0`.
it("negativeZero", async (t) => {
  await snapshotCase(t, "negativeZero", cs.create($module1, []));
});
