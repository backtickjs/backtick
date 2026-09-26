import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { snapshotCase } from "../snapshotCase.ts";
// `typeof` answers JavaScript's names, since TypeScript narrows by them: every
// kind of value a script can hold, a host's own value among them.
it("typeofTable", async (t) => {
  await snapshotCase(
    t,
    "typeofTable",
    cs.create(
      "3liitb76d9d7p:12:4",
      { params: [{ kind: "splice", value: createSignal, bindings: [] }] },
      {
        code: 'export default $0 => {\n  const count = $0()(0);\n  return [typeof undefined, typeof null, typeof true, typeof 1, typeof "a", typeof [1], typeof {\n    a: 1\n  }, typeof (n => n), typeof Math.floor, typeof count];\n};',
        map: '{"version":3,"mappings":"eAWOA,EAAA;EACD,MAAMC,KAAK,GAAGD,EAAA,EAAa,CAAC,CAAC,CAAC;EAC9B,OAAO,CACL,OAAOE,SAAS,EAChB,OAAO,IAAI,EACX,OAAO,IAAI,EACX,OAAO,CAAC,EACR,OAAO,GAAG,EACV,OAAO,CAAC,CAAC,CAAC,EACV,OAAO;IAAEC,CAAC,EAAE;EAAC,CAAE,EACf,QAASC,CAAS,IAAKA,CAAC,CAAC,EACzB,OAAOC,IAAI,CAACC,KAAK,EACjB,OAAOL,KAAK,CACb;AACH,CAAC","names":["$0","count","undefined","a","n","Math","floor"],"ignoreList":[],"sources":["typeof.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
// And narrows: a string's length, or a number doubled.
it("typeofNarrows", async (t) => {
  await snapshotCase(
    t,
    "typeofNarrows",
    cs.create(
      "3liitb76d9d7p:35:4",
      { params: [] },
      {
        code: 'export default () => {\n  const measure = v => typeof v === "string" ? v.length : v * 2;\n  return [measure("abc"), measure(4)];\n};',
        map: '{"version":3,"mappings":"eAkCO;EACD,MAAMA,OAAO,GAAIC,CAAkB,IACjC,OAAOA,CAAC,KAAK,QAAQ,GAAGA,CAAC,CAACC,MAAM,GAAGD,CAAC,GAAG,CAAC;EAC1C,OAAO,CAACD,OAAO,CAAC,KAAK,CAAC,EAAEA,OAAO,CAAC,CAAC,CAAC,CAAC;AACrC,CAAC","names":["measure","v","length"],"ignoreList":[],"sources":["typeof.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
