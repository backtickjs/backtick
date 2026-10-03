import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal, For } from "@backtickjs/solid-js";
import { snapshotCase } from "../snapshotCase.ts";
async function Rows() {
  return cs.create(
    "1stjcbjgwgnjt:19:9",
    {
      params: [
        { kind: "splice", value: createSignal, bindings: [] },
        { kind: "tag", value: For },
      ],
    },
    '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nconst web_4 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div><span>add</span><div>`), _tmpl$2 = /*#__PURE__*/ (0, web_1.template)(`<span>`);\nexports.default = ($splice0, $tag1) => {\n    const [rows, setRows] = $splice0()([]);\n    const add = row => {\n        setRows([row]);\n    };\n    const label = row => {\n        return row.label;\n    };\n    return (() => {\n        var _el$ = _tmpl$(), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling;\n        _el$2.$$click = () => add({\n            id: 1,\n            label: "one"\n        });\n        (0, web_3.insert)(_el$3, (0, web_4.createComponent)($tag1, {\n            get each() {\n                return rows();\n            },\n            children: row => (() => {\n                var _el$4 = _tmpl$2();\n                (0, web_3.insert)(_el$4, () => label(row));\n                return _el$4;\n            })()\n        }));\n        return _el$;\n    })();\n};\n(0, web_2.delegateEvents)(["click"]);\n}',
    '{"version":3,"file":"module.jsx","mappings":";;;;;;;;kBAkBY,CAAAA,QAAA,EAAAC,KAAA;IACR,MAAM,CAACC,IAAI,EAAEC,OAAO,CAAC,GAAGH,QAAA,EAAa,CAAQ,EAAE,CAAC;IAChD,MAAMI,GAAG,GAAIC,GAAQ;QACnBF,OAAO,CAAC,CAACE,GAAG,CAAC,CAAC;IAChB,CAAC;IACD,MAAMC,KAAK,GAAID,GAAQ;QACrB,OAAOA,GAAG,CAACC,KAAK;IAClB,CAAC;IACD;QAAA,IAAAC,IAAA,GAAAC,MAAA,IAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA,EAAAC,KAAA,GAAAF,KAAA,CAAAG,WAAA;QAAAH,KAAA,CAAAI,OAAA,GAEmB,MAAMT,GAAG,CAAC;YAAEU,EAAE,EAAE,CAAC;YAAER,KAAK,EAAE;SAAO,CAAC;QAAAS,gBAAA,EAAAJ,KAAA,EAAAK,yBAAA,EAE9Cf,KAAG;YAAA,IAACgB,IAAIA;gBAAA,OAAEf,IAAI,EAAE;YAAA;YAAAgB,QAAA,EAAIb,GAAQ;gBAAA,IAAAc,KAAA,GAAAC,OAAA;gBAAAL,gBAAA,EAAAI,KAAA,QAAYb,KAAK,CAACD,GAAG,CAAC;gBAAA,OAAAc,KAAA;YAAA;SAAQ;QAAA,OAAAZ,IAAA;IAAA;AAInE,CAAC","names":["$splice0","$tag1","rows","setRows","add","row","label","_el$","_tmpl$","_el$2","firstChild","_el$3","nextSibling","$$click","id","_$insert","_$createComponent","each","children","_el$4","_tmpl$2"],"ignoreList":[],"sources":["components/named-type-positions.test.tsx"]}',
    ["solid-js/web"],
  );
}
it("Rows", async (t) => {
  await snapshotCase(t, "Rows", _jsx(Rows, {}));
});
