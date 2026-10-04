import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "3liitb76d9d7p:12:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => {\n    const count = $splice0()(0);\n    return [typeof undefined, typeof null, typeof true, typeof 1, typeof "a", typeof [1], typeof {\n            a: 1\n        }, typeof (n => n), typeof Math.floor, typeof count];\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAWOA,QAAA;IACD,MAAMC,KAAK,GAAGD,QAAA,EAAa,CAAC,CAAC,CAAC;IAC9B,OAAO,CACL,OAAOE,SAAS,EAChB,OAAO,IAAI,EACX,OAAO,IAAI,EACX,OAAO,CAAC,EACR,OAAO,GAAG,EACV,OAAO,CAAC,CAAC,CAAC,EACV,OAAO;YAAEC,CAAC,EAAE;SAAG,EACf,QAASC,CAAS,IAAKA,CAAC,CAAC,EACzB,OAAOC,IAAI,CAACC,KAAK,EACjB,OAAOL,KAAK,CACb;AACH,CAAC","names":["$splice0","count","undefined","a","n","Math","floor"],"ignoreList":[],"sources":["expressions/typeof.test.tsx"]}',
  dependencies: [],
};
const $module1 = {
  id: "3liitb76d9d7p:35:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    const measure = v => typeof v === "string" ? v.length : v * 2;\n    return [measure("abc"), measure(4)];\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAkCO;IACD,MAAMA,OAAO,GAAIC,CAAkB,IACjC,OAAOA,CAAC,KAAK,QAAQ,GAAGA,CAAC,CAACC,MAAM,GAAGD,CAAC,GAAG,CAAC;IAC1C,OAAO,CAACD,OAAO,CAAC,KAAK,CAAC,EAAEA,OAAO,CAAC,CAAC,CAAC,CAAC;AACrC,CAAC","names":["measure","v","length"],"ignoreList":[],"sources":["expressions/typeof.test.tsx"]}',
  dependencies: [],
};
// `typeof` answers JavaScript's names, since TypeScript narrows by them: every
// kind of value a script can hold, a host's own value among them.
it("typeofTable", async (t) => {
  await snapshotCase(
    t,
    "typeofTable",
    cs.create($module0, [
      { kind: "splice", value: createSignal, bindings: [] },
    ]),
  );
});
// And narrows: a string's length, or a number doubled.
it("typeofNarrows", async (t) => {
  await snapshotCase(t, "typeofNarrows", cs.create($module1, []));
});
