import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { snapshotCase } from "../snapshotCase.ts";
// What a signal holds is the initial widened, so a second value of the same
// kind goes in after it. Each write is the assertion — every one is an error
// the moment `$createSignal` reads its initial narrowly.
//
// A function is the one initial that does not widen on its own: what an arrow
// answers with widens only against a contextual type. Written out, the type
// argument is the contextual type — `$createSignal<() => number>` holds a
// function answering with any number rather than only the one it was built
// from. Solid's setter calls a function it is handed, so storing one wraps it.
//
// `Stepper` covers a number, and `Swatch` a numeric enum handed to a function
// typed as it.
var Tone;
(function (Tone) {
  Tone["Warm"] = "warm";
  Tone["Cool"] = "cool";
})(Tone || (Tone = {}));
async function Widened() {
  return cs.create(
    "2y9ue12ubdzr3:24:9",
    {
      params: [
        { kind: "splice", value: createSignal, bindings: [] },
        { kind: "splice", value: Tone.Warm, bindings: [] },
        { kind: "splice", value: Tone.Cool, bindings: [] },
      ],
    },
    '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<span>`);\nexports.default = ($splice0, $splice1, $splice2) => {\n    const flag = $splice0()(true);\n    const tone = $splice0()($splice1());\n    const step = $splice0()(() => 0);\n    return (() => {\n        var _el$ = _tmpl$();\n        _el$.$$click = () => {\n            flag[1](false);\n            tone[1]($splice2());\n            step[1](() => () => 1);\n        };\n        (0, web_3.insert)(_el$, () => flag[0]() + " " + tone[0]() + " " + step[0]()());\n        return _el$;\n    })();\n};\n(0, web_2.delegateEvents)(["click"]);\n}',
    '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBAuBY,CAAAA,QAAA,EAAAC,QAAA,EAAAC,QAAA;IACR,MAAMC,IAAI,GAAGH,QAAA,EAAa,CAAC,IAAI,CAAC;IAChC,MAAMI,IAAI,GAAGJ,QAAA,EAAa,CAACC,QAAA,EAAC,CAAY;IACxC,MAAMI,IAAI,GAAGL,QAAA,EAAa,CAAe,MAAM,CAAC,CAAC;IACjD;QAAA,IAAAM,IAAA,GAAAC,MAAA;QAAAD,IAAA,CAAAE,OAAA,GAEa;YACPL,IAAI,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC;YACdC,IAAI,CAAC,CAAC,CAAC,CAACF,QAAA,EAAC,CAAY;YACrBG,IAAI,CAAC,CAAC,CAAC,CAAC,MAAM,MAAM,CAAC,CAAC;QACxB,CAAC;QAAAI,gBAAA,EAAAH,IAAA,QAEAH,IAAI,CAAC,CAAC,CAAC,EAAE,GAAG,GAAG,GAAGC,IAAI,CAAC,CAAC,CAAC,EAAE,GAAG,GAAG,GAAGC,IAAI,CAAC,CAAC,CAAC,EAAE,EAAE;QAAA,OAAAC,IAAA;IAAA;AAGtD,CAAC","names":["$splice0","$splice1","$splice2","flag","tone","step","_el$","_tmpl$","$$click","_$insert"],"ignoreList":[],"sources":["state/state-widening.test.tsx"]}',
    ["solid-js/web"],
  );
}
it("Widened", async (t) => {
  await snapshotCase(t, "Widened", _jsx(Widened, {}));
});
