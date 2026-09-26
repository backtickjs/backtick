import { it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `typeof` answers JavaScript's names, since TypeScript narrows by them: every
// kind of value a script can hold, a host's own value among them.
it("typeofTable", async (t) => {
  await snapshotCase(
    t,
    "typeofTable",
    cs.create(
      "1jdryi4es12ui:11:4",
      { params: [{ kind: "splice", value: state, bindings: [] }] },
      {
        code: 'export default ($0) => {\n    const count = $0()(0);\n    return [\n        typeof undefined,\n        typeof null,\n        typeof true,\n        typeof 1,\n        typeof "a",\n        typeof [1],\n        typeof { a: 1 },\n        typeof ((n) => n),\n        typeof Math.floor,\n        typeof count,\n    ];\n};',
        map: '{"version":3,"file":"typeof.test.jsx","sourceRoot":"","sources":["typeof.test.tsx"],"names":[],"mappings":"eAUO;IACD,MAAM,KAAK,GAAG,IAAM,CAAC,CAAC,CAAC,CAAC;IACxB,OAAO;QACL,OAAO,SAAS;QAChB,OAAO,IAAI;QACX,OAAO,IAAI;QACX,OAAO,CAAC;QACR,OAAO,GAAG;QACV,OAAO,CAAC,CAAC,CAAC;QACV,OAAO,EAAE,CAAC,EAAE,CAAC,EAAE;QACf,OAAO,CAAC,CAAC,CAAS,EAAE,EAAE,CAAC,CAAC,CAAC;QACzB,OAAO,IAAI,CAAC,KAAK;QACjB,OAAO,KAAK;KACb,CAAC;AACJ,CAAC"}',
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
      "1jdryi4es12ui:34:4",
      { params: [] },
      {
        code: 'export default () => {\n    const measure = (v) => typeof v === "string" ? v.length : v * 2;\n    return [measure("abc"), measure(4)];\n};',
        map: '{"version":3,"file":"typeof.test.jsx","sourceRoot":"","sources":["typeof.test.tsx"],"names":[],"mappings":"eAiCO;IACD,MAAM,OAAO,GAAG,CAAC,CAAkB,EAAE,EAAE,CACrC,OAAO,CAAC,KAAK,QAAQ,CAAC,CAAC,CAAC,CAAC,CAAC,MAAM,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC;IAC3C,OAAO,CAAC,OAAO,CAAC,KAAK,CAAC,EAAE,OAAO,CAAC,CAAC,CAAC,CAAC,CAAC;AACtC,CAAC"}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
