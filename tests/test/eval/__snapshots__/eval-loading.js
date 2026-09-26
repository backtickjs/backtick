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
        code: 'import { template as _$template } from "solid-js/web";\nimport { insert as _$insert } from "solid-js/web";\nimport { memo as _$memo } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<div>`),\n  _tmpl$2 = /*#__PURE__*/_$template(`<span>loading\u2026`);\nexport default $0 => {\n  const held = $0()(null);\n  return (() => {\n    var _el$ = _tmpl$();\n    _$insert(_el$, (() => {\n      var _c$ = _$memo(() => held[0]() === null);\n      return () => _c$() ? _tmpl$2() : eval(held[0]());\n    })());\n    return _el$;\n  })();\n};',
        map: '{"version":3,"mappings":";;;;;eAiBOA,EAAA;EACD,MAAMC,IAAI,GAAGD,EAAA,EAAa,CAAiC,IAAI,CAAC;EAEhE;IAAA,IAAAE,IAAA,GAAAC,MAAA;IAAAC,QAAA,CAAAF,IAAA;MAAA,IAAAG,GAAA,GAAAC,MAAA,OAEKL,IAAI,CAAC,CAAC,CAAC,EAAE,KAAK,IAAI;MAAA,aAAlBI,GAAA,KAAAE,OAAA,KAGCC,IAAI,CAACP,IAAI,CAAC,CAAC,CAAC,EAA6B,CAC1C;IAAA;IAAA,OAAAC,IAAA;EAAA;AAGP,CAAC","names":["$0","held","_el$","_tmpl$","_$insert","_c$","_$memo","_tmpl$2","eval"],"ignoreList":[],"sources":["eval-loading.test.tsx"]}',
        imports: [
          {
            from: "solid-js/web",
            range: [0, 54],
            bindings: [{ name: "template", local: "_$template" }],
          },
          {
            from: "solid-js/web",
            range: [55, 105],
            bindings: [{ name: "insert", local: "_$insert" }],
          },
          {
            from: "solid-js/web",
            range: [106, 152],
            bindings: [{ name: "memo", local: "_$memo" }],
          },
        ],
        exportAt: 255,
      },
    ),
  );
});
