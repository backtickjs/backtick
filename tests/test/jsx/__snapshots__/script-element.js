import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "2q1v1u7r59ezx:11:9",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nconst web_4 = require("solid-js/web");\nconst web_5 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div><span></span><span style=font-size:8px>fixed</span><span>held`), _tmpl$2 = /*#__PURE__*/ (0, web_1.template)(`<div style=padding:0>`);\nexports.default = $splice0 => {\n    const [label, setLabel] = $splice0()("hi");\n    const row = size => {\n        const css = "font-size: " + size + "px";\n        const press = () => setLabel("held");\n        return (() => {\n            var _el$ = _tmpl$(), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling, _el$4 = _el$3.nextSibling;\n            _el$2.$$click = () => setLabel("pressed");\n            (0, web_5.insert)(_el$2, label);\n            _el$4.$$click = press;\n            (0, web_4.effect)(_p$ => {\n                var _v$ = css, _v$2 = css, _v$3 = css;\n                _p$.e = (0, web_3.style)(_el$, _v$, _p$.e);\n                _p$.t = (0, web_3.style)(_el$2, _v$2, _p$.t);\n                _p$.a = (0, web_3.style)(_el$4, _v$3, _p$.a);\n                return _p$;\n            }, {\n                e: undefined,\n                t: undefined,\n                a: undefined\n            });\n            return _el$;\n        })();\n    };\n    return (() => {\n        var _el$5 = _tmpl$2();\n        (0, web_5.insert)(_el$5, () => row(12));\n        return _el$5;\n    })();\n};\n(0, web_2.delegateEvents)(["click"]);\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;;;;kBAUYA,QAAA;IACR,MAAM,CAACC,KAAK,EAAEC,QAAQ,CAAC,GAAGF,QAAA,EAAa,CAAC,IAAI,CAAC;IAI7C,MAAMG,GAAG,GAAIC,IAAY;QACvB,MAAMC,GAAG,GAAG,aAAa,GAAGD,IAAI,GAAG,IAAI;QACvC,MAAME,KAAK,GAAGA,GAAA,GAAMJ,QAAQ,CAAC,MAAM,CAAC;QACpC;YAAA,IAAAK,IAAA,GAAAC,MAAA,IAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA,EAAAC,KAAA,GAAAF,KAAA,CAAAG,WAAA,EAAAC,KAAA,GAAAF,KAAA,CAAAC,WAAA;YAAAH,KAAA,CAAAK,OAAA,GAE+B,MAAMZ,QAAQ,CAAC,SAAS,CAAC;YAAAa,gBAAA,EAAAN,KAAA,EACjDR,KAAK;YAAAY,KAAA,CAAAC,OAAA,GAGmBR,KAAK;YAAAU,gBAAA,EAAAC,GAAA;gBAAA,IAAAC,GAAA,GALtBb,GAAG,EAAAc,IAAA,GACAd,GAAG,EAAAe,IAAA,GAIHf,GAAG;gBAAAY,GAAA,CAAAI,CAAA,GAAAC,eAAA,EAAAf,IAAA,EAAAW,GAAA,EAAAD,GAAA,CAAAI,CAAA;gBAAAJ,GAAA,CAAAM,CAAA,GAAAD,eAAA,EAAAb,KAAA,EAAAU,IAAA,EAAAF,GAAA,CAAAM,CAAA;gBAAAN,GAAA,CAAAO,CAAA,GAAAF,eAAA,EAAAT,KAAA,EAAAO,IAAA,EAAAH,GAAA,CAAAO,CAAA;gBAAA,OAAAP,GAAA;YAAA;gBAAAI,CAAA,EAAAI,SAAA;gBAAAF,CAAA,EAAAE,SAAA;gBAAAD,CAAA,EAAAC;aAAA;YAAA,OAAAlB,IAAA;QAAA;IAKtB,CAAC;IAED;QAAA,IAAAmB,KAAA,GAAAC,OAAA;QAAAZ,gBAAA,EAAAW,KAAA,QAAgCvB,GAAG,CAAC,EAAE,CAAC;QAAA,OAAAuB,KAAA;IAAA;AACzC,CAAC","names":["$splice0","label","setLabel","row","size","css","press","_el$","_tmpl$","_el$2","firstChild","_el$3","nextSibling","_el$4","$$click","_$insert","_$effect","_p$","_v$","_v$2","_v$3","e","_$style","t","a","undefined","_el$5","_tmpl$2"],"ignoreList":[],"sources":["jsx/script-element.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [{ kind: "splice", bindings: [] }],
};
// An element a script writes, rather than one the host wrote and the script
// spliced in. What it lowers to is the node a tree entry builds, so the two
// spellings draw the same thing — the difference is where the element is
// written, not what it is.
async function Card() {
  return cs.create($module0, [createSignal]);
}
it("Card", async (t) => {
  await snapshotCase(t, "Card", _jsx(Card, {}));
});
