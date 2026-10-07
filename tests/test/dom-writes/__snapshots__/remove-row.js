import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal, For } from "@backtickjs/solid-js";
import { render, screen } from "@solidjs/testing-library";
import { userEvent } from "@testing-library/user-event";
import { watchWrites } from "./writes.ts";
import { evaluate } from "../evaluate.ts";
const $module0 = {
  id: "2r1mvcff9n0yh:14:9",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nconst web_4 = require("solid-js/web");\nconst web_5 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<table><tbody>`), _tmpl$2 = /*#__PURE__*/ (0, web_1.template)(`<tr><td><button>`);\nexports.default = ($splice0, $splice1) => {\n    const [ids, setIds] = $splice0()([1, 2, 3, 4, 5]);\n    return (() => {\n        var _el$ = _tmpl$(), _el$2 = _el$.firstChild;\n        (0, web_5.insert)(_el$2, () => ($For => (0, web_4.createComponent)($For, {\n            get each() {\n                return ids();\n            },\n            children: id => (() => {\n                var _el$3 = _tmpl$2(), _el$4 = _el$3.firstChild, _el$5 = _el$4.firstChild;\n                (0, web_3.setAttribute)(_el$3, "id", "row-" + id);\n                _el$5.$$click = () => setIds(ids().filter(each => each !== id));\n                (0, web_5.insert)(_el$5, "remove " + id);\n                return _el$3;\n            })()\n        }))($splice1()));\n        return _el$;\n    })();\n};\n(0, web_2.delegateEvents)(["click"]);\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;;;;kBAaY,CAAAA,QAAA,EAAAC,QAAA;IACR,MAAM,CAACC,GAAG,EAAEC,MAAM,CAAC,GAAGH,QAAA,EAAa,CAAW,CAAC,CAAC,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,CAAC;IAC9D;QAAA,IAAAI,IAAA,GAAAC,MAAA,IAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA;QAAAC,gBAAA,EAAAF,KAAA,QAGM,CAAAG,IAAA,IAAAC,yBAAA,EAACD,IAAI;YAAA,IAACE,IAAIA;gBAAA,OAAET,GAAG,EAAE;YAAA;YAAAU,QAAA,EACbC,EAAU;gBAAA,IAAAC,KAAA,GAAAC,OAAA,IAAAC,KAAA,GAAAF,KAAA,CAAAP,UAAA,EAAAU,KAAA,GAAAD,KAAA,CAAAT,UAAA;gBAAAW,sBAAA,EAAAJ,KAAA,QACF,MAAM,GAAGD,EAAE;gBAAAI,KAAA,CAAAE,OAAA,GAGJ,MAAMhB,MAAM,CAACD,GAAG,EAAE,CAACkB,MAAM,CAAET,IAAI,IAAKA,IAAI,KAAKE,EAAE,CAAC,CAAC;gBAAAL,gBAAA,EAAAS,KAAA,EAEzD,SAAS,GAAGJ,EAAE;gBAAA,OAAAC,KAAA;YAAA;SAItB,CACI,EAZNb,QAAA,EAAI,CAaP;QAAA,OAAAG,IAAA;IAAA;AAGN,CAAC","names":["$splice0","$splice1","ids","setIds","_el$","_tmpl$","_el$2","firstChild","_$insert","$For","_$createComponent","each","children","id","_el$3","_tmpl$2","_el$4","_el$5","_$setAttribute","$$click","filter"],"ignoreList":[],"sources":["dom-writes/remove-row.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "block",
};
// js-framework-benchmark's "remove row": one row in the middle goes. The rows
// after it close up by staying where they are, so what is written is the one
// removal.
async function RemovableRows() {
  return cs.create($module0, [createSignal, For]);
}
it("a removal takes out the one row", async () => {
  const { container } = render(await evaluate(() => _jsx(RemovableRows, {})));
  const written = watchWrites(container);
  await userEvent.click(screen.getByRole("button", { name: "remove 3" }));
  assert.deepEqual(written(), ["tbody − tr#row-3"]);
});
