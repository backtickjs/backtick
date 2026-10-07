import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal, For } from "@backtickjs/solid-js";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "2n9yrqajtgjuu:20:9",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nconst web_4 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div><ul class=rows>`), _tmpl$2 = /*#__PURE__*/ (0, web_1.template)(`<li>`);\nexports.default = ($splice0, $splice1) => {\n    const build = from => {\n        return Array.from({\n            length: 3\n        }, (_, at) => {\n            return {\n                id: from + at,\n                label: $splice0()("row " + (from + at))\n            };\n        });\n    };\n    const [held, setHeld] = $splice0()(build(1));\n    return (() => {\n        var _el$ = _tmpl$(), _el$2 = _el$.firstChild;\n        (0, web_4.insert)(_el$2, () => ($For => (0, web_3.createComponent)($For, {\n            get each() {\n                return held();\n            },\n            children: row => (() => {\n                var _el$3 = _tmpl$2();\n                _el$3.$$click = () => row.label[1]("pressed");\n                (0, web_4.insert)(_el$3, () => row.label[0]());\n                return _el$3;\n            })()\n        }))($splice1()));\n        return _el$;\n    })();\n};\n(0, web_2.delegateEvents)(["click"]);\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;;;kBAmBY,CAAAA,QAAA,EAAAC,QAAA;IACR,MAAMC,KAAK,GAAIC,IAAY;QACzB,OAAOC,KAAK,CAACD,IAAI,CAAC;YAAEE,MAAM,EAAE;SAAG,EAAE,CAACC,CAAC,EAAEC,EAAE;YACrC,OAAO;gBAAEC,EAAE,EAAEL,IAAI,GAAGI,EAAE;gBAAEE,KAAK,EAAET,QAAA,EAAa,CAAC,MAAM,IAAIG,IAAI,GAAGI,EAAE,CAAC;aAAG;QACtE,CAAC,CAAC;IACJ,CAAC;IAED,MAAM,CAACG,IAAI,EAAEC,OAAO,CAAC,GAAGX,QAAA,EAAa,CAACE,KAAK,CAAC,CAAC,CAAC,CAAC;IAE/C;QAAA,IAAAU,IAAA,GAAAC,MAAA,IAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA;QAAAC,gBAAA,EAAAF,KAAA,QAGM,CAAAG,IAAA,IAAAC,yBAAA,EAACD,IAAI;YAAA,IAACE,IAAIA;gBAAA,OAAET,IAAI,EAAE;YAAA;YAAAU,QAAA,EACdC,GAAQ;gBAAA,IAAAC,KAAA,GAAAC,OAAA;gBAAAD,KAAA,CAAAE,OAAA,GACK,MAAMH,GAAG,CAACZ,KAAK,CAAC,CAAC,CAAC,CAAC,SAAS,CAAC;gBAAAO,gBAAA,EAAAM,KAAA,QAAGD,GAAG,CAACZ,KAAK,CAAC,CAAC,CAAC,EAAE;gBAAA,OAAAa,KAAA;YAAA;SAC5D,CACI,EAJNrB,QAAA,EAAI,CAKP;QAAA,OAAAW,IAAA;IAAA;AAGN,CAAC","names":["$splice0","$splice1","build","from","Array","length","_","at","id","label","held","setHeld","_el$","_tmpl$","_el$2","firstChild","_$insert","$For","_$createComponent","each","children","row","_el$3","_tmpl$2","$$click"],"ignoreList":[],"sources":["state/member-state.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "block",
};
// A list whose members carry storage of their own: `build` declares a signal per
// row, and the signal the list reads holds those signals along with the rows.
// A press writes into one row's signal, so only what read it runs again —
// the array is the array it was, and no other row moves.
//
// What a signal starts at is the other half of this: the initial is a call
// here, not data, which is what a signal declared where it is evaluated allows.
async function MemberRows() {
  return cs.create($module0, [createSignal, For]);
}
it("MemberRows", async (t) => {
  await snapshotCase(t, "MemberRows", _jsx(MemberRows, {}));
});
