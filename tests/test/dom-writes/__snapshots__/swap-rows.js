import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal, For } from "@backtickjs/solid-js";
import { render, screen } from "@solidjs/testing-library";
import { userEvent } from "@testing-library/user-event";
import { watchWrites } from "./writes.ts";
import { evaluate } from "../evaluate.ts";
// js-framework-benchmark's "swap rows": the second row and the second-to-last
// change places. The rows between them stay where they are, so what moves is
// the two rows and nothing else.
async function SwappableRows() {
  return cs.create(
    "10vdsgxrprktf:14:9",
    {
      params: [
        { kind: "splice", value: createSignal, bindings: [] },
        { kind: "tag", value: For },
      ],
    },
    '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nconst web_4 = require("solid-js/web");\nconst web_5 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div><button>swap</button><table><tbody>`), _tmpl$2 = /*#__PURE__*/ (0, web_1.template)(`<tr><td>`);\nexports.default = ($splice0, $tag1) => {\n    const [ids, setIds] = $splice0()([1, 2, 3, 4, 5]);\n    const swap = () => {\n        const held = ids();\n        setIds(held.with(1, held[3]).with(3, held[1]));\n    };\n    return (() => {\n        var _el$ = _tmpl$(), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling, _el$4 = _el$3.firstChild;\n        _el$2.$$click = swap;\n        (0, web_4.insert)(_el$4, (0, web_5.createComponent)($tag1, {\n            get each() {\n                return ids();\n            },\n            children: id => (() => {\n                var _el$5 = _tmpl$2(), _el$6 = _el$5.firstChild;\n                (0, web_3.setAttribute)(_el$5, "id", "row-" + id);\n                (0, web_4.insert)(_el$6, "row " + id);\n                return _el$5;\n            })()\n        }));\n        return _el$;\n    })();\n};\n(0, web_2.delegateEvents)(["click"]);\n}',
    '{"version":3,"file":"module.jsx","mappings":";;;;;;;;;kBAaY,CAAAA,QAAA,EAAAC,KAAA;IACR,MAAM,CAACC,GAAG,EAAEC,MAAM,CAAC,GAAGH,QAAA,EAAa,CAAW,CAAC,CAAC,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,CAAC;IAC9D,MAAMI,IAAI,GAAGA,GAAA;QACX,MAAMC,IAAI,GAAGH,GAAG,EAAE;QAClBC,MAAM,CAACE,IAAI,CAACC,IAAI,CAAC,CAAC,EAAED,IAAI,CAAC,CAAC,CAAC,CAAC,CAACC,IAAI,CAAC,CAAC,EAAED,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC;IAChD,CAAC;IACD;QAAA,IAAAE,IAAA,GAAAC,MAAA,IAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA,EAAAC,KAAA,GAAAF,KAAA,CAAAG,WAAA,EAAAC,KAAA,GAAAF,KAAA,CAAAD,UAAA;QAAAD,KAAA,CAAAK,OAAA,GAEqBV,IAAI;QAAAW,gBAAA,EAAAF,KAAA,EAAAG,yBAAA,EAGhBf,KAAI;YAAA,IAACgB,IAAIA;gBAAA,OAAEf,GAAG,EAAE;YAAA;YAAAgB,QAAA,EACbC,EAAU;gBAAA,IAAAC,KAAA,GAAAC,OAAA,IAAAC,KAAA,GAAAF,KAAA,CAAAV,UAAA;gBAAAa,sBAAA,EAAAH,KAAA,QACF,MAAM,GAAGD,EAAE;gBAAAJ,gBAAA,EAAAO,KAAA,EACZ,MAAM,GAAGH,EAAE;gBAAA,OAAAC,KAAA;YAAA;SAEnB;QAAA,OAAAb,IAAA;IAAA;AAMb,CAAC","names":["$splice0","$tag1","ids","setIds","swap","held","with","_el$","_tmpl$","_el$2","firstChild","_el$3","nextSibling","_el$4","$$click","_$insert","_$createComponent","each","children","id","_el$5","_tmpl$2","_el$6","_$setAttribute"],"ignoreList":[],"sources":["dom-writes/swap-rows.test.tsx"]}',
    ["solid-js/web"],
  );
}
it("a swap moves the two rows it swapped", async () => {
  const { container } = render(await evaluate(() => _jsx(SwappableRows, {})));
  const written = watchWrites(container);
  await userEvent.click(screen.getByRole("button", { name: "swap" }));
  // Each move is the row leaving where it was and arriving where it goes.
  assert.deepEqual(written(), [
    "tbody − tr#row-4",
    "tbody + tr#row-4 before tr#row-3",
    "tbody − tr#row-2",
    "tbody + tr#row-2 before tr#row-5",
  ]);
});
