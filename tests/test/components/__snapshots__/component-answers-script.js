import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { snapshotCase } from "../snapshotCase.ts";
// A component whose whole body is client code answers with the script rather
// than a drawing the host made: it declares its own storage and draws from it,
// and there is nothing left for the host to build.
//
// Expanded in value position, which is what admits it: a script that draws
// answers with what it drew, where an action answers with nothing and would
// draw nothing.
async function Panel() {
  return cs.create(
    "3t9qtypqc1fe7:14:9",
    { params: [{ kind: "splice", value: createSignal, bindings: [] }] },
    {
      code: 'import { template as _$template } from "solid-js/web";\nimport { insert as _$insert } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<em>`);\nexport default $0 => {\n  const n = $0()(2);\n  return (() => {\n    var _el$ = _tmpl$();\n    _$insert(_el$, () => n[0]());\n    return _el$;\n  })();\n};',
      map: '{"version":3,"mappings":";;;eAaYA,EAAA;EACR,MAAMC,CAAC,GAAGD,EAAA,EAAa,CAAC,CAAC,CAAC;EAC1B;IAAA,IAAAE,IAAA,GAAAC,MAAA;IAAAC,QAAA,CAAAF,IAAA,QAAYD,CAAC,CAAC,CAAC,CAAC,EAAE;IAAA,OAAAC,IAAA;EAAA;AACpB,CAAC","names":["$0","n","_el$","_tmpl$","_$insert"],"ignoreList":[],"sources":["component-answers-script.test.tsx"]}',
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
      ],
      exportAt: 152,
    },
  );
}
it("componentAnswersScript", async (t) => {
  await snapshotCase(
    t,
    "componentAnswersScript",
    _jsx("div", { children: _jsx(Panel, {}) }),
  );
});
