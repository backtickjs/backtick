import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { snapshotCase } from "../snapshotCase.ts";
// A bundle a page does not have yet, and what stands in until it does.
//
// Both reads are where they stand, inside the drawing: that is what makes the
// condition follow the signal. Reading it once into a `const` would narrow the
// type and freeze the drawing — the script body runs once, so the loading
// state would never resolve. So the second read is asserted instead, which
// the condition beside it is what makes true.
it("evalLoading", async (t) => {
  await snapshotCase(
    t,
    "evalLoading",
    cs.create(
      "1wu0udf0e3xe4:18:4",
      { params: [{ kind: "splice", value: createSignal, bindings: [] }] },
      {
        code: "export default ($0) => {\n    const held = $0()(null);\n    return (<div>\n          {held[0]() === null ? (<span>loading\u2026</span>) : (eval(held[0]()))}\n        </div>);\n};",
        map: '{"version":3,"file":"eval-loading.test.jsx","sourceRoot":"","sources":["eval-loading.test.tsx"],"names":[],"mappings":"eAiBO;IACD,MAAM,IAAI,GAAG,IAAa,CAAiC,IAAI,CAAC,CAAC;IAEjE,OAAO,CACL,CAAC,GAAG,CACF;UAAA,CAAC,IAAI,CAAC,CAAC,CAAC,EAAE,KAAK,IAAI,CAAC,CAAC,CAAC,CACpB,CAAC,IAAI,CAAC,QAAQ,EAAE,IAAI,CAAC,CACtB,CAAC,CAAC,CAAC,CACF,IAAI,CAAC,IAAI,CAAC,CAAC,CAAC,EAA6B,CAAC,CAC3C,CACH;QAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
      },
    ),
  );
});
