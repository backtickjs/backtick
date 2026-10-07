import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal, For } from "@backtickjs/solid-js";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "18qi3scoa0mkt:19:9",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nconst web_4 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div><span>add</span><div>`), _tmpl$2 = /*#__PURE__*/ (0, web_1.template)(`<span>`);\nexports.default = ($splice0, $splice1) => {\n    const [rows, setRows] = $splice0()([]);\n    const add = row => {\n        setRows([row]);\n    };\n    const label = row => {\n        return row.label;\n    };\n    return (() => {\n        var _el$ = _tmpl$(), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling;\n        _el$2.$$click = () => add({\n            id: 1,\n            label: "one"\n        });\n        (0, web_4.insert)(_el$3, () => ($For => (0, web_3.createComponent)($For, {\n            get each() {\n                return rows();\n            },\n            children: row => (() => {\n                var _el$4 = _tmpl$2();\n                (0, web_4.insert)(_el$4, () => label(row));\n                return _el$4;\n            })()\n        }))($splice1()));\n        return _el$;\n    })();\n};\n(0, web_2.delegateEvents)(["click"]);\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;;;kBAkBY,CAAAA,QAAA,EAAAC,QAAA;IACR,MAAM,CAACC,IAAI,EAAEC,OAAO,CAAC,GAAGH,QAAA,EAAa,CAAQ,EAAE,CAAC;IAChD,MAAMI,GAAG,GAAIC,GAAQ;QACnBF,OAAO,CAAC,CAACE,GAAG,CAAC,CAAC;IAChB,CAAC;IACD,MAAMC,KAAK,GAAID,GAAQ;QACrB,OAAOA,GAAG,CAACC,KAAK;IAClB,CAAC;IACD;QAAA,IAAAC,IAAA,GAAAC,MAAA,IAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA,EAAAC,KAAA,GAAAF,KAAA,CAAAG,WAAA;QAAAH,KAAA,CAAAI,OAAA,GAEmB,MAAMT,GAAG,CAAC;YAAEU,EAAE,EAAE,CAAC;YAAER,KAAK,EAAE;SAAO,CAAC;QAAAS,gBAAA,EAAAJ,KAAA,QAE/C,CAAAK,IAAA,IAAAC,yBAAA,EAACD,IAAI;YAAA,IAACE,IAAIA;gBAAA,OAAEhB,IAAI,EAAE;YAAA;YAAAiB,QAAA,EAAId,GAAQ;gBAAA,IAAAe,KAAA,GAAAC,OAAA;gBAAAN,gBAAA,EAAAK,KAAA,QAAYd,KAAK,CAACD,GAAG,CAAC;gBAAA,OAAAe,KAAA;YAAA;SAAQ,CAAQ,EAAnEnB,QAAA,EAAI,CACP;QAAA,OAAAM,IAAA;IAAA;AAGN,CAAC","names":["$splice0","$splice1","rows","setRows","add","row","label","_el$","_tmpl$","_el$2","firstChild","_el$3","nextSibling","$$click","id","_$insert","$For","_$createComponent","each","children","_el$4","_tmpl$2"],"ignoreList":[],"sources":["components/named-type-positions.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "block",
};
async function Rows() {
  return cs.create($module0, [createSignal, For]);
}
it("Rows", async (t) => {
  await snapshotCase(t, "Rows", _jsx(Rows, {}));
});
