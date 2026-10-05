import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal, For } from "@backtickjs/solid-js";
import { render, screen } from "@solidjs/testing-library";
import { snapshotCase } from "../snapshotCase.ts";
import { settled } from "./dom.ts";
import { evaluate } from "../evaluate.ts";
const $module0 = {
  id: "17esee640arqb:20:20",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<em>`);\nexports.default = ($splice0, $splice1, $splice2) => props => {\n    const [items, setItems] = $splice0()([]);\n    const started = window.setTimeout(() => {\n        if (props.more()) {\n            setItems($splice1());\n        }\n    }, 0);\n    return ($For => (0, web_3.createComponent)($For, {\n        get each() {\n            return items();\n        },\n        children: item => (() => {\n            var _el$ = _tmpl$();\n            (0, web_2.insert)(_el$, item);\n            return _el$;\n        })()\n    }))($splice2());\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBAmBuB,CAAAA,QAAA,EAAAC,QAAA,EAAAC,QAAA,KAACC,KAA8B;IACpD,MAAM,CAACC,KAAK,EAAEC,QAAQ,CAAC,GAAGL,QAAA,EAAa,CAAW,EAAE,CAAC;IAErD,MAAMM,OAAO,GAAGC,MAAM,CAACC,UAAU,CAAC;QAChC,IAAIL,KAAK,CAACM,IAAI,EAAE,EAAE;YAChBJ,QAAQ,CAACJ,QAAA,EAAY,CAAC;QACxB;IACF,CAAC,EAAE,CAAC,CAAC;IAEL,OAAO,CAAAS,IAAA,IAAAC,yBAAA,EAACD,IAAI;QAAA,IAACE,IAAIA;YAAA,OAAER,KAAK,EAAE;QAAA;QAAAS,QAAA,EAAIC,IAAY;YAAA,IAAAC,IAAA,GAAAC,MAAA;YAAAC,gBAAA,EAAAF,IAAA,EAAUD,IAAI;YAAA,OAAAC,IAAA;QAAA;KAAM,CAAQ,EAA9Db,QAAA,EAAI,CAA0D;AACxE,CAAC","names":["$splice0","$splice1","$splice2","props","items","setItems","started","window","setTimeout","more","$For","_$createComponent","each","children","item","_el$","_tmpl$","_$insert"],"ignoreList":[],"sources":["render/for-builds-once.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
};
const $module1 = {
  id: "17esee640arqb:32:22",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div><span>`);\nexports.default = ($splice0, $splice1) => {\n    const [asked, setAsked] = $splice0()(0);\n    return (() => {\n        var _el$ = _tmpl$(), _el$2 = _el$.firstChild;\n        (0, web_3.insert)(_el$2, () => "asked " + asked());\n        (0, web_3.insert)(_el$, () => ($WaitingList => (0, web_2.createComponent)($WaitingList, {\n            more: () => {\n                setAsked(asked() + 1);\n                return asked() < 5;\n            }\n        }))($splice1()), null);\n        return _el$;\n    })();\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBA+ByB,CAAAA,QAAA,EAAAC,QAAA;IACvB,MAAM,CAACC,KAAK,EAAEC,QAAQ,CAAC,GAAGH,QAAA,EAAa,CAAC,CAAC,CAAC;IAE1C;QAAA,IAAAI,IAAA,GAAAC,MAAA,IAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA;QAAAC,gBAAA,EAAAF,KAAA,QAEW,QAAQ,GAAGJ,KAAK,EAAE;QAAAM,gBAAA,EAAAJ,IAAA,QACzB,CAAAK,YAAA,IAAAC,yBAAA,EAACD,YAAY;YACXE,IAAI,EAAEA,GAAA;gBACJR,QAAQ,CAACD,KAAK,EAAE,GAAG,CAAC,CAAC;gBACrB,OAAOA,KAAK,EAAE,GAAG,CAAC;YACpB;SAAC,CACD,EALDD,QAAA,EAAY,CAMf;QAAA,OAAAG,IAAA;IAAA;AAEJ,CAAC","names":["$splice0","$splice1","asked","setAsked","_el$","_tmpl$","_el$2","firstChild","_$insert","$WaitingList","_$createComponent","more"],"ignoreList":[],"sources":["render/for-builds-once.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
};
// The same claim as `evaluateBuildsOnce`, with no bundle in it.
//
// A component is built once, however what it drew changes afterwards. `<For />`
// answers with a way of asking, the way a drawn bundle does, so if the fault
// were the drawn bundle's this would be untouched — and it is not.
//
// `asked` is the page's, so it survives a rebuild and counts them, and it ends
// one: once it stops saying yes, nothing is written and nothing runs again.
const answerItems = ["one", "two"];
const WaitingList = cs.create($module0, [createSignal, answerItems, For]);
const forBuildsOnce = cs.create($module1, [createSignal, WaitingList]);
it("forBuildsOnce", async (t) => {
  await snapshotCase(t, "forBuildsOnce", forBuildsOnce);
});
describe("a component that draws a list", () => {
  // The same claim with no bundle in it: `<For />` answers with a way of asking
  // too, so a fault in what draws a bundle would leave this alone.
  it("is built once, and draws what arrives", async () => {
    const { container } = render(await evaluate(() => forBuildsOnce));
    assert.ok(screen.getByText("asked 0"));
    await settled();
    assert.equal(container.querySelectorAll("em").length, 2);
    assert.ok(
      screen.queryByText("asked 1"),
      "the component was built again for what it drew",
    );
  });
});
