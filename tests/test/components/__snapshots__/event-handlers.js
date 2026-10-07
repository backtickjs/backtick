import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "1o71qih1bz0ns:16:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<form><textarea></textarea><input><button>`);\nexports.default = $splice0 => {\n    const [said, setSaid] = $splice0()("");\n    return (() => {\n        var _el$ = _tmpl$(), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling, _el$4 = _el$3.nextSibling;\n        _el$.addEventListener("submit", event => {\n            event.preventDefault();\n            setSaid(event.type + " " + event.cancelable);\n        });\n        _el$2.$$input = event => setSaid(event.currentTarget.value);\n        _el$3.$$input = event => setSaid(event.currentTarget.value);\n        _el$4.$$click = event => setSaid(event.clientX + " " + event.currentTarget.tagName);\n        (0, web_3.insert)(_el$4, said);\n        return _el$;\n    })();\n};\n(0, web_2.delegateEvents)(["input", "click"]);\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBAeOA,QAAA;IACD,MAAM,CAACC,IAAI,EAAEC,OAAO,CAAC,GAAGF,QAAA,EAAa,CAAC,EAAE,CAAC;IAEzC;QAAA,IAAAG,IAAA,GAAAC,MAAA,IAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA,EAAAC,KAAA,GAAAF,KAAA,CAAAG,WAAA,EAAAC,KAAA,GAAAF,KAAA,CAAAC,WAAA;QAAAL,IAAA,CAAAO,gBAAA,WAEeC,KAAK;YACdA,KAAK,CAACC,cAAc,EAAE;YACtBV,OAAO,CAACS,KAAK,CAACE,IAAI,GAAG,GAAG,GAAGF,KAAK,CAACG,UAAU,CAAC;QAC9C,CAAC;QAAAT,KAAA,CAAAU,OAAA,GAEmBJ,KAAK,IAAKT,OAAO,CAACS,KAAK,CAACK,aAAa,CAACC,KAAK,CAAC;QAAAV,KAAA,CAAAQ,OAAA,GAC/CJ,KAAK,IAAKT,OAAO,CAACS,KAAK,CAACK,aAAa,CAACC,KAAK,CAAC;QAAAR,KAAA,CAAAS,OAAA,GAEjDP,KAAK,IACbT,OAAO,CAACS,KAAK,CAACQ,OAAO,GAAG,GAAG,GAAGR,KAAK,CAACK,aAAa,CAACI,OAAO,CAC3D;QAAAC,gBAAA,EAAAZ,KAAA,EAECR,IAAI;QAAA,OAAAE,IAAA;IAAA;AAIb,CAAC","names":["$splice0","said","setSaid","_el$","_tmpl$","_el$2","firstChild","_el$3","nextSibling","_el$4","addEventListener","event","preventDefault","type","cancelable","$$input","currentTarget","value","$$click","clientX","tagName","_$insert"],"ignoreList":[],"sources":["components/event-handlers.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [{ kind: "splice", bindings: [] }],
  kind: "block",
};
// A handler is handed what the DOM hands it, and which event that is comes
// from the DOM: `click` is a `PointerEvent`, `input` an `InputEvent`.
//
// `currentTarget` is the element the handler is on rather than the DOM's
// opaque `EventTarget`, which is what makes reading a field's value sayable —
// the DOM expects a cast there, and this language has none.
it("eventHandlers", async (t) => {
  await snapshotCase(t, "eventHandlers", cs.create($module0, [createSignal]));
});
