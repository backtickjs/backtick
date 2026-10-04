import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "2ias6y3c2j9wa:24:9",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<span>`);\nexports.default = ($splice0, $splice1, $splice2) => {\n    const [flag, setFlag] = $splice0()(true);\n    const [tone, setTone] = $splice0()($splice1());\n    const [step, setStep] = $splice0()(() => 0);\n    return (() => {\n        var _el$ = _tmpl$();\n        _el$.$$click = () => {\n            setFlag(false);\n            setTone($splice2());\n            setStep(() => () => 1);\n        };\n        (0, web_3.insert)(_el$, () => flag() + " " + tone() + " " + step()());\n        return _el$;\n    })();\n};\n(0, web_2.delegateEvents)(["click"]);\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBAuBY,CAAAA,QAAA,EAAAC,QAAA,EAAAC,QAAA;IACR,MAAM,CAACC,IAAI,EAAEC,OAAO,CAAC,GAAGJ,QAAA,EAAa,CAAC,IAAI,CAAC;IAC3C,MAAM,CAACK,IAAI,EAAEC,OAAO,CAAC,GAAGN,QAAA,EAAa,CAACC,QAAA,EAAY,CAAC;IACnD,MAAM,CAACM,IAAI,EAAEC,OAAO,CAAC,GAAGR,QAAA,EAAa,CAAe,MAAM,CAAC,CAAC;IAC5D;QAAA,IAAAS,IAAA,GAAAC,MAAA;QAAAD,IAAA,CAAAE,OAAA,GAEa;YACPP,OAAO,CAAC,KAAK,CAAC;YACdE,OAAO,CAACJ,QAAA,EAAY,CAAC;YACrBM,OAAO,CAAC,MAAM,MAAM,CAAC,CAAC;QACxB,CAAC;QAAAI,gBAAA,EAAAH,IAAA,QAEAN,IAAI,EAAE,GAAG,GAAG,GAAGE,IAAI,EAAE,GAAG,GAAG,GAAGE,IAAI,EAAE,EAAE;QAAA,OAAAE,IAAA;IAAA;AAG7C,CAAC","names":["$splice0","$splice1","$splice2","flag","setFlag","tone","setTone","step","setStep","_el$","_tmpl$","$$click","_$insert"],"ignoreList":[],"sources":["state/state-widening.test.tsx"]}',
  dependencies: ["solid-js/web"],
};
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
  return cs.create($module0, [
    { kind: "splice", value: createSignal, bindings: [] },
    { kind: "splice", value: Tone.Warm, bindings: [] },
    { kind: "splice", value: Tone.Cool, bindings: [] },
  ]);
}
it("Widened", async (t) => {
  await snapshotCase(t, "Widened", _jsx(Widened, {}));
});
