import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal, For } from "@backtickjs/solid-js";
import { render, screen } from "@solidjs/testing-library";
import { userEvent } from "@testing-library/user-event";
import { watchWrites } from "./writes.ts";
import { evaluate } from "../evaluate.ts";
// js-framework-benchmark's "partial update": every other row's label grows,
// and each label is a signal of its own. Writing one is a write to that row's
// text, and nothing else: no row is rebuilt, and no other row hears of it.
async function Labels() {
  return cs.create(
    "2gmqev1zv5x1m:15:9",
    {
      params: [
        { kind: "splice", value: createSignal, bindings: [] },
        { kind: "tag", value: For },
      ],
    },
    '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nconst web_4 = require("solid-js/web");\nconst web_5 = require("solid-js/web");\nconst web_6 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div><button>update</button><table><tbody>`), _tmpl$2 = /*#__PURE__*/ (0, web_1.template)(`<tr><td>`);\nexports.default = ($splice0, $tag1) => {\n    const rows = [1, 2, 3, 4].map(id => ({\n        id: id,\n        label: $splice0()("row " + id)\n    }));\n    const update = () => {\n        for (let index = 0; index < rows.length; index = index + 2) {\n            const label = rows[index].label;\n            label[1](label[0]() + " !!!");\n        }\n    };\n    return (() => {\n        var _el$ = _tmpl$(), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling, _el$4 = _el$3.firstChild;\n        _el$2.$$click = update;\n        (0, web_5.insert)(_el$4, (0, web_6.createComponent)($tag1, {\n            each: rows,\n            children: row => (() => {\n                var _el$5 = _tmpl$2(), _el$6 = _el$5.firstChild;\n                (0, web_5.insert)(_el$6, () => row.label[0]());\n                (0, web_4.effect)(() => (0, web_3.setAttribute)(_el$5, "id", "row-" + row.id));\n                return _el$5;\n            })()\n        }));\n        return _el$;\n    })();\n};\n(0, web_2.delegateEvents)(["click"]);\n}',
    '{"version":3,"file":"module.jsx","mappings":";;;;;;;;;;kBAcY,CAAAA,QAAA,EAAAC,KAAA;IACR,MAAMC,IAAI,GAAG,CAAC,CAAC,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,CAACC,GAAG,CAAEC,EAAU,KAAM;QAC7CA,EAAE,EAAEA,EAAE;QACNC,KAAK,EAAEL,QAAA,EAAa,CAAC,MAAM,GAAGI,EAAE;KACjC,CAAC,CAAC;IACH,MAAME,MAAM,GAAGA,GAAA;QACb,KAAK,IAAIC,KAAK,GAAG,CAAC,EAAEA,KAAK,GAAGL,IAAI,CAACM,MAAM,EAAED,KAAK,GAAGA,KAAK,GAAG,CAAC,EAAE;YAC1D,MAAMF,KAAK,GAAGH,IAAI,CAACK,KAAK,CAAC,CAACF,KAAK;YAC/BA,KAAK,CAAC,CAAC,CAAC,CAACA,KAAK,CAAC,CAAC,CAAC,EAAE,GAAG,MAAM,CAAC;QAC/B;IACF,CAAC;IACD;QAAA,IAAAI,IAAA,GAAAC,MAAA,IAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA,EAAAC,KAAA,GAAAF,KAAA,CAAAG,WAAA,EAAAC,KAAA,GAAAF,KAAA,CAAAD,UAAA;QAAAD,KAAA,CAAAK,OAAA,GAEqBV,MAAM;QAAAW,gBAAA,EAAAF,KAAA,EAAAG,yBAAA,EAGlBjB,KAAG;YAACkB,IAAI,EAAEjB,IAAI;YAAAkB,QAAA,EACXC,GAA0C;gBAAA,IAAAC,KAAA,GAAAC,OAAA,IAAAC,KAAA,GAAAF,KAAA,CAAAV,UAAA;gBAAAK,gBAAA,EAAAO,KAAA,QAEnCH,GAAG,CAAChB,KAAK,CAAC,CAAC,CAAC,EAAE;gBAAAoB,gBAAA,QAAAC,sBAAA,EAAAJ,KAAA,QADb,MAAM,GAAGD,GAAG,CAACjB,EAAE;gBAAA,OAAAkB,KAAA;YAAA;SAGxB;QAAA,OAAAb,IAAA;IAAA;AAMb,CAAC","names":["$splice0","$tag1","rows","map","id","label","update","index","length","_el$","_tmpl$","_el$2","firstChild","_el$3","nextSibling","_el$4","$$click","_$insert","_$createComponent","each","children","row","_el$5","_tmpl$2","_el$6","_$effect","_$setAttribute"],"ignoreList":[],"sources":["dom-writes/partial-update.test.tsx"]}',
    ["solid-js/web"],
  );
}
it("a label written changes that label's text and nothing else", async () => {
  const { container } = render(await evaluate(() => _jsx(Labels, {})));
  const written = watchWrites(container);
  await userEvent.click(screen.getByRole("button", { name: "update" }));
  assert.deepEqual(written(), [
    'text: "row 1" → "row 1 !!!"',
    'text: "row 3" → "row 3 !!!"',
  ]);
});
