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
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nconst web_4 = require("solid-js/web");\nconst web_5 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<table><tbody>`), _tmpl$2 = /*#__PURE__*/ (0, web_1.template)(`<tr><td><button>`);\nexports.default = ($splice0, $tag1) => {\n    const [ids, setIds] = $splice0()([1, 2, 3, 4, 5]);\n    return (() => {\n        var _el$ = _tmpl$(), _el$2 = _el$.firstChild;\n        (0, web_4.insert)(_el$2, (0, web_5.createComponent)($tag1, {\n            get each() {\n                return ids();\n            },\n            children: id => (() => {\n                var _el$3 = _tmpl$2(), _el$4 = _el$3.firstChild, _el$5 = _el$4.firstChild;\n                (0, web_3.setAttribute)(_el$3, "id", "row-" + id);\n                _el$5.$$click = () => setIds(ids().filter(each => each !== id));\n                (0, web_4.insert)(_el$5, "remove " + id);\n                return _el$3;\n            })()\n        }));\n        return _el$;\n    })();\n};\n(0, web_2.delegateEvents)(["click"]);\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;;;;kBAaY,CAAAA,QAAA,EAAAC,KAAA;IACR,MAAM,CAACC,GAAG,EAAEC,MAAM,CAAC,GAAGH,QAAA,EAAa,CAAW,CAAC,CAAC,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,CAAC;IAC9D;QAAA,IAAAI,IAAA,GAAAC,MAAA,IAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA;QAAAC,gBAAA,EAAAF,KAAA,EAAAG,yBAAA,EAGOR,KAAI;YAAA,IAACS,IAAIA;gBAAA,OAAER,GAAG,EAAE;YAAA;YAAAS,QAAA,EACbC,EAAU;gBAAA,IAAAC,KAAA,GAAAC,OAAA,IAAAC,KAAA,GAAAF,KAAA,CAAAN,UAAA,EAAAS,KAAA,GAAAD,KAAA,CAAAR,UAAA;gBAAAU,sBAAA,EAAAJ,KAAA,QACF,MAAM,GAAGD,EAAE;gBAAAI,KAAA,CAAAE,OAAA,GAGJ,MAAMf,MAAM,CAACD,GAAG,EAAE,CAACiB,MAAM,CAAET,IAAI,IAAKA,IAAI,KAAKE,EAAE,CAAC,CAAC;gBAAAJ,gBAAA,EAAAQ,KAAA,EAEzD,SAAS,GAAGJ,EAAE;gBAAA,OAAAC,KAAA;YAAA;SAItB;QAAA,OAAAT,IAAA;IAAA;AAKX,CAAC","names":["$splice0","$tag1","ids","setIds","_el$","_tmpl$","_el$2","firstChild","_$insert","_$createComponent","each","children","id","_el$3","_tmpl$2","_el$4","_el$5","_$setAttribute","$$click","filter"],"ignoreList":[],"sources":["dom-writes/remove-row.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [{ kind: "splice", bindings: [] }, { kind: "tag" }],
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
