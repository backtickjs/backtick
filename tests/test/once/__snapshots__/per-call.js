import { it } from "node:test";
import { cs, once } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "3p4p5eqzxilt5:9:14",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => ({\n    label: "box"\n});\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAQiB,OAAC;IAAEA,KAAK,EAAE;CAAO,CAAC","names":["label"],"ignoreList":[],"sources":["once/per-call.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "expression",
};
const $module1 = {
  id: "3p4p5eqzxilt5:16:35",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1, $splice2, $splice3) => [$splice0() === $splice1(), $splice2() === $splice3()];\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAesC,CAAAA,QAAA,EAAAC,QAAA,EAAAC,QAAA,EAAAC,QAAA,MAACH,QAAA,EAAE,KAAKC,QAAA,EAAE,EAAEC,QAAA,EAAE,KAAKC,QAAA,EAAE,CAAC","names":["$splice0","$splice1","$splice2","$splice3"],"ignoreList":[],"sources":["once/per-call.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "expression",
};
// Each call of `once` is one value, as each call of a host function that
// makes an object is one object: two calls make two, and one spliced twice is
// one. Two values of one script are two constants of one module.
function box() {
  return once(cs.create($module0, []));
}
const a = box();
const b = box();
it("perCall", async (t) => {
  await snapshotCase(t, "perCall", cs.create($module1, [a, a, a, b]));
});
