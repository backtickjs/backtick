import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { render, screen } from "@solidjs/testing-library";
import { evaluate } from "../evaluate.ts";
// A server component's script, run where its splice stands, as Solid runs a
// component: untracked. It reads a signal of its own while it sets up, which a
// timer it starts then writes: read where the splice stands, the write would
// build it again, with a signal never written and a timer never fired.
async function Held({ again }) {
  return cs.create(
    "3ap7ff2kahflh:13:9",
    {
      params: [
        { kind: "splice", value: createSignal, bindings: [] },
        { kind: "splice", value: again, bindings: [] },
      ],
    },
    '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<em>`);\nexports.default = ($splice0, $splice1) => {\n    const [shown, setShown] = $splice0()(false);\n    const started = window.setTimeout(() => {\n        if ($splice1()()) {\n            setShown(true);\n        }\n    }, 0);\n    const read = shown();\n    return (() => {\n        var _el$ = _tmpl$();\n        (0, web_2.insert)(_el$, "read " + read);\n        return _el$;\n    })();\n};\n}',
    '{"version":3,"file":"module.jsx","mappings":";;;;;;kBAYY,CAAAA,QAAA,EAAAC,QAAA;IACR,MAAM,CAACC,KAAK,EAAEC,QAAQ,CAAC,GAAGH,QAAA,EAAa,CAAC,KAAK,CAAC;IAE9C,MAAMI,OAAO,GAAGC,MAAM,CAACC,UAAU,CAAC;QAChC,IAAIL,QAAA,EAAM,EAAE,EAAE;YACZE,QAAQ,CAAC,IAAI,CAAC;QAChB;IACF,CAAC,EAAE,CAAC,CAAC;IAEL,MAAMI,IAAI,GAAGL,KAAK,EAAE;IACpB;QAAA,IAAAM,IAAA,GAAAC,MAAA;QAAAC,gBAAA,EAAAF,IAAA,EAAY,OAAO,GAAGD,IAAI;QAAA,OAAAC,IAAA;IAAA;AAC5B,CAAC","names":["$splice0","$splice1","shown","setShown","started","window","setTimeout","read","_el$","_tmpl$","_$insert"],"ignoreList":[],"sources":["components/server-component-builds-once.test.tsx"]}',
    ["solid-js/web"],
  );
}
const held = cs.create(
  "3ap7ff2kahflh:27:13",
  {
    params: [
      { kind: "splice", value: createSignal, bindings: [] },
      {
        kind: "splice",
        value: _jsx(Held, {
          again: cs.create(
            "3ap7ff2kahflh:35:19",
            {
              params: [
                { kind: "capture", key: "setBuilds$3ap7ff2kahflh$5" },
                { kind: "capture", key: "builds$3ap7ff2kahflh$4" },
              ],
            },
            '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($capture0, $capture1) => () => {\n    $capture0($capture1() + 1);\n    return $capture1() < 5;\n};\n}',
            '{"version":3,"file":"module.jsx","mappings":";;;kBAkCsB,CAAAA,SAAA,EAAAC,SAAA;IACRD,SAAS,CAACC,SAAM,EAAE,GAAG,CAAC,CAAC;IACvB,OAAOA,SAAM,EAAE,GAAG,CAAC;AACrB,CAAC","names":["$capture0","$capture1"],"ignoreList":[],"sources":["components/server-component-builds-once.test.tsx"]}',
            [],
          ),
        }),
        bindings: ["builds$3ap7ff2kahflh$4", "setBuilds$3ap7ff2kahflh$5"],
      },
    ],
  },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div><span></span><section>`);\nexports.default = ($splice0, $splice1) => {\n    const [builds, setBuilds] = $splice0()(0);\n    return (() => {\n        var _el$ = _tmpl$(), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling;\n        (0, web_2.insert)(_el$2, () => "builds " + builds());\n        (0, web_2.insert)(_el$3, () => $splice1(builds, setBuilds));\n        return _el$;\n    })();\n};\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;;;;kBA0BgB,CAAAA,QAAA,EAAAC,QAAA;IACd,MAAM,CAACC,MAAM,EAAEC,SAAS,CAAC,GAAGH,QAAA,EAAa,CAAC,CAAC,CAAC;IAC5C;QAAA,IAAAI,IAAA,GAAAC,MAAA,IAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA,EAAAC,KAAA,GAAAF,KAAA,CAAAG,WAAA;QAAAC,gBAAA,EAAAJ,KAAA,QAEW,SAAS,GAAGJ,MAAM,EAAE;QAAAQ,gBAAA,EAAAF,KAAA,QAEzBP,QAAA,CAAAC,MAAA,EAAAC,SAAA,CAQF;QAAA,OAAAC,IAAA;IAAA;AAGN,CAAC","names":["$splice0","$splice1","builds","setBuilds","_el$","_tmpl$","_el$2","firstChild","_el$3","nextSibling","_$insert"],"ignoreList":[],"sources":["components/server-component-builds-once.test.tsx"]}',
  ["solid-js/web"],
);
describe("a server component that reads a signal as it sets up", () => {
  it("is built once", async () => {
    render(await evaluate(() => held));
    await new Promise((settle) => setTimeout(settle, 100));
    assert.ok(screen.getByText("builds 1"));
  });
});
