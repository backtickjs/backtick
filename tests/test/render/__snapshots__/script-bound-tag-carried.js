import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { render, screen } from "@solidjs/testing-library";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
import { evaluate } from "../evaluate.ts";
// A host component whose script declares its own `Badge`, and draws what it was
// handed beside it.
async function Panel(props) {
  return cs.create(
    "1lcdaamjc0iij:15:9",
    { params: [{ kind: "splice", value: props, bindings: [] }] },
    '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<i>`), _tmpl$2 = /*#__PURE__*/ (0, web_1.template)(`<section>`);\nexports.default = $splice0 => {\n    const Badge = p => (() => {\n        var _el$ = _tmpl$();\n        (0, web_3.insert)(_el$, () => "panel " + p.n);\n        return _el$;\n    })();\n    return (() => {\n        var _el$2 = _tmpl$2();\n        (0, web_3.insert)(_el$2, (0, web_2.createComponent)(Badge, {\n            n: 0\n        }), null);\n        (0, web_3.insert)(_el$2, () => $splice0().body, null);\n        return _el$2;\n    })();\n};\n}',
    '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBAcYA,QAAA;IACR,MAAMC,KAAK,GAAIC,CAAgB;QAAA,IAAAC,IAAA,GAAAC,MAAA;QAAAC,gBAAA,EAAAF,IAAA,QAAS,QAAQ,GAAGD,CAAC,CAACI,CAAC;QAAA,OAAAH,IAAA;IAAA,IAAK;IAC3D;QAAA,IAAAI,KAAA,GAAAC,OAAA;QAAAH,gBAAA,EAAAE,KAAA,EAAAE,yBAAA,EAEKR,KAAK;YAACK,CAAC,EAAE;SAAC;QAAAD,gBAAA,EAAAE,KAAA,QACVP,QAAA,EAAM,CAACU,IAAI;QAAA,OAAAH,KAAA;IAAA;AAGlB,CAAC","names":["$splice0","Badge","p","_el$","_tmpl$","_$insert","n","_el$2","_tmpl$2","_$createComponent","body"],"ignoreList":[],"sources":["render/script-bound-tag-carried.test.tsx"]}',
    ["solid-js/web"],
  );
}
// A script handed to `Panel` as a prop, naming a function the script around it
// holds. It lands inside `Panel`'s script, whose own `Badge` is in scope there
// — and still calls the one it was written under, since that is the binding it
// carries. The tag holds children too, read through the same record.
const scriptBoundTagCarried = cs.create(
  "1lcdaamjc0iij:30:30",
  {
    params: [
      { kind: "splice", value: createSignal, bindings: [] },
      {
        kind: "splice",
        value: _jsx(Panel, {
          body: cs.create(
            "1lcdaamjc0iij:44:18",
            {
              params: [
                { kind: "capture", key: "Badge$1lcdaamjc0iij$3" },
                { kind: "capture", key: "count$1lcdaamjc0iij$2" },
              ],
            },
            '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<u>`);\nexports.default = ($capture0, $capture1) => (0, web_2.createComponent)($capture0, {\n    get n() {\n        return $capture1[0]();\n    },\n    get children() {\n        var _el$ = _tmpl$();\n        (0, web_3.insert)(_el$, () => "kid " + $capture1[0]());\n        return _el$;\n    }\n});\n}',
            '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBA2CqB,CAAAA,SAAA,EAAAC,SAAA,KAAAC,yBAAA,EAACF,SAAK;IAAA,IAACG,CAACA;QAAA,OAAEF,SAAK,CAAC,CAAC,CAAC,EAAE;IAAA;IAAA,IAAAG;QAAA,IAAAC,IAAA,GAAAC,MAAA;QAAAC,gBAAA,EAAAF,IAAA,QACvB,MAAM,GAAGJ,SAAK,CAAC,CAAC,CAAC,EAAE;QAAA,OAAAI,IAAA;IAAA;CAAA,CACjB","names":["$capture0","$capture1","_$createComponent","n","children","_el$","_tmpl$","_$insert"],"ignoreList":[],"sources":["render/script-bound-tag-carried.test.tsx"]}',
            ["solid-js/web"],
          ),
        }),
        bindings: ["count$1lcdaamjc0iij$2", "Badge$1lcdaamjc0iij$3"],
      },
    ],
  },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<b>`), _tmpl$2 = /*#__PURE__*/ (0, web_1.template)(`<div><button>more`);\nexports.default = ($splice0, $splice1) => {\n    const count = $splice0()(0);\n    const Badge = p => (() => {\n        var _el$ = _tmpl$();\n        (0, web_3.insert)(_el$, () => "outer " + p.n, null);\n        (0, web_3.insert)(_el$, () => p.children, null);\n        return _el$;\n    })();\n    return (() => {\n        var _el$2 = _tmpl$2(), _el$3 = _el$2.firstChild;\n        (0, web_3.insert)(_el$2, () => $splice1(count, Badge), _el$3);\n        _el$3.$$click = () => count[1](count[0]() + 1);\n        return _el$2;\n    })();\n};\n(0, web_2.delegateEvents)(["click"]);\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBA6BiC,CAAAA,QAAA,EAAAC,QAAA;IAC/B,MAAMC,KAAK,GAAGF,QAAA,EAAa,CAAC,CAAC,CAAC;IAC9B,MAAMG,KAAK,GAAIC,CAAuC;QAAA,IAAAC,IAAA,GAAAC,MAAA;QAAAC,gBAAA,EAAAF,IAAA,QAEjD,QAAQ,GAAGD,CAAC,CAACI,CAAC;QAAAD,gBAAA,EAAAF,IAAA,QACdD,CAAC,CAACK,QAAQ;QAAA,OAAAJ,IAAA;IAAA,IAEd;IAED;QAAA,IAAAK,KAAA,GAAAC,OAAA,IAAAC,KAAA,GAAAF,KAAA,CAAAG,UAAA;QAAAN,gBAAA,EAAAG,KAAA,QAGMT,QAAA,CAAAC,KAAA,EAAAC,KAAA,CAOF,EAAAS,KAAA;QAAAA,KAAA,CAAAE,OAAA,GACiB,MAAMZ,KAAK,CAAC,CAAC,CAAC,CAACA,KAAK,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC;QAAA,OAAAQ,KAAA;IAAA;AAGrD,CAAC","names":["$splice0","$splice1","count","Badge","p","_el$","_tmpl$","_$insert","n","children","_el$2","_tmpl$2","_el$3","firstChild","$$click"],"ignoreList":[],"sources":["render/script-bound-tag-carried.test.tsx"]}',
  ["solid-js/web"],
);
it("scriptBoundTagCarried", async (t) => {
  await snapshotCase(t, "scriptBoundTagCarried", scriptBoundTagCarried);
});
describe("a tag naming a function the script holds", () => {
  it("calls the one it was written under, drawn where another is in scope", async () => {
    render(await evaluate(() => scriptBoundTagCarried));
    const panel = screen.getByText("panel 0");
    const badge = screen.getByText("outer 0");
    assert.equal(badge.tagName.toLowerCase(), "b");
    await userEvent.click(screen.getByRole("button", { name: "more" }));
    assert.equal(screen.getByText("outer 1"), badge, "the same <b>");
    assert.ok(screen.getByText("kid 1"));
    assert.equal(
      screen.getByText("panel 0"),
      panel,
      "the panel's own, untouched",
    );
  });
});
