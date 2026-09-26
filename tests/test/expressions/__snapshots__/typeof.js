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
      '($splice0) => {\n    const count = $splice0()(0);\n    return [\n        typeof undefined,\n        typeof null,\n        typeof true,\n        typeof 1,\n        typeof "a",\n        typeof [1],\n        typeof { a: 1 },\n        typeof ((n) => n),\n        typeof Math.floor,\n        typeof count,\n    ];\n}',
      '{"version":3,"file":"typeof.test.jsx","sourceRoot":"","sources":["expressions/typeof.test.tsx"],"names":[],"mappings":"AAWO;IACD,MAAM,KAAK,GAAG,UAAa,CAAC,CAAC,CAAC,CAAC;IAC/B,OAAO;QACL,OAAO,SAAS;QAChB,OAAO,IAAI;QACX,OAAO,IAAI;QACX,OAAO,CAAC;QACR,OAAO,GAAG;QACV,OAAO,CAAC,CAAC,CAAC;QACV,OAAO,EAAE,CAAC,EAAE,CAAC,EAAE;QACf,OAAO,CAAC,CAAC,CAAS,EAAE,EAAE,CAAC,CAAC,CAAC;QACzB,OAAO,IAAI,CAAC,KAAK;QACjB,OAAO,KAAK;KACb,CAAC;AACJ,CAAC"}',
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
      '() => {\n    const measure = (v) => typeof v === "string" ? v.length : v * 2;\n    return [measure("abc"), measure(4)];\n}',
      '{"version":3,"file":"typeof.test.jsx","sourceRoot":"","sources":["expressions/typeof.test.tsx"],"names":[],"mappings":"AAkCO;IACD,MAAM,OAAO,GAAG,CAAC,CAAkB,EAAE,EAAE,CACrC,OAAO,CAAC,KAAK,QAAQ,CAAC,CAAC,CAAC,CAAC,CAAC,MAAM,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC;IAC3C,OAAO,CAAC,OAAO,CAAC,KAAK,CAAC,EAAE,OAAO,CAAC,CAAC,CAAC,CAAC,CAAC;AACtC,CAAC"}',
    ),
  );
});
