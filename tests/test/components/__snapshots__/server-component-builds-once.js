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
    "lsxk313cjdhj:13:9",
    {
      params: [
        { kind: "splice", value: createSignal, bindings: [] },
        { kind: "splice", value: again, bindings: [] },
      ],
    },
    '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<em>`);\nexports.default = ($splice0, $splice1) => {\n    const shown = $splice0()(false);\n    const started = window.setTimeout(() => {\n        if ($splice1()()) {\n            shown[1](true);\n        }\n    }, 0);\n    const read = shown[0]();\n    return (() => {\n        var _el$ = _tmpl$();\n        (0, web_2.insert)(_el$, "read " + read);\n        return _el$;\n    })();\n};\n}',
    '{"version":3,"file":"module.jsx","mappings":";;;;;;kBAYY,CAAAA,QAAA,EAAAC,QAAA;IACR,MAAMC,KAAK,GAAGF,QAAA,EAAa,CAAC,KAAK,CAAC;IAElC,MAAMG,OAAO,GAAGC,MAAM,CAACC,UAAU,CAAC;QAChC,IAAIJ,QAAA,EAAM,EAAE,EAAE;YACZC,KAAK,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC;QAChB;IACF,CAAC,EAAE,CAAC,CAAC;IAEL,MAAMI,IAAI,GAAGJ,KAAK,CAAC,CAAC,CAAC,EAAE;IACvB;QAAA,IAAAK,IAAA,GAAAC,MAAA;QAAAC,gBAAA,EAAAF,IAAA,EAAY,OAAO,GAAGD,IAAI;QAAA,OAAAC,IAAA;IAAA;AAC5B,CAAC","names":["$splice0","$splice1","shown","started","window","setTimeout","read","_el$","_tmpl$","_$insert"],"ignoreList":[],"sources":["components/server-component-builds-once.test.tsx"]}',
    ["solid-js/web"],
  );
}
const held = cs.create(
  "lsxk313cjdhj:27:13",
  {
    params: [
      { kind: "splice", value: createSignal, bindings: [] },
      {
        kind: "splice",
        value: _jsx(Held, {
          again: cs.create(
            "lsxk313cjdhj:35:19",
            { params: [{ kind: "capture", key: "builds$lsxk313cjdhj$3" }] },
            '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $capture0 => () => {\n    $capture0[1]($capture0[0]() + 1);\n    return $capture0[0]() < 5;\n};\n}',
            '{"version":3,"file":"module.jsx","mappings":";;;kBAkCsBA,SAAA;IACRA,SAAM,CAAC,CAAC,CAAC,CAACA,SAAM,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC;IAC1B,OAAOA,SAAM,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC;AACxB,CAAC","names":["$capture0"],"ignoreList":[],"sources":["components/server-component-builds-once.test.tsx"]}',
            [],
          ),
        }),
        bindings: ["builds$lsxk313cjdhj$3"],
      },
    ],
  },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div><span></span><section>`);\nexports.default = ($splice0, $splice1) => {\n    const builds = $splice0()(0);\n    return (() => {\n        var _el$ = _tmpl$(), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling;\n        (0, web_2.insert)(_el$2, () => "builds " + builds[0]());\n        (0, web_2.insert)(_el$3, () => $splice1(builds));\n        return _el$;\n    })();\n};\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;;;;kBA0BgB,CAAAA,QAAA,EAAAC,QAAA;IACd,MAAMC,MAAM,GAAGF,QAAA,EAAa,CAAC,CAAC,CAAC;IAC/B;QAAA,IAAAG,IAAA,GAAAC,MAAA,IAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA,EAAAC,KAAA,GAAAF,KAAA,CAAAG,WAAA;QAAAC,gBAAA,EAAAJ,KAAA,QAEW,SAAS,GAAGH,MAAM,CAAC,CAAC,CAAC,EAAE;QAAAO,gBAAA,EAAAF,KAAA,QAE5BN,QAAA,CAAAC,MAAA,CAQF;QAAA,OAAAC,IAAA;IAAA;AAGN,CAAC","names":["$splice0","$splice1","builds","_el$","_tmpl$","_el$2","firstChild","_el$3","nextSibling","_$insert"],"ignoreList":[],"sources":["components/server-component-builds-once.test.tsx"]}',
  ["solid-js/web"],
);
describe("a server component that reads a signal as it sets up", () => {
  it("is built once", async () => {
    render(await evaluate(() => held));
    await new Promise((settle) => setTimeout(settle, 100));
    assert.ok(screen.getByText("builds 1"));
  });
});
