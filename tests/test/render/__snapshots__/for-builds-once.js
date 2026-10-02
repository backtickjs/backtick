import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal, For } from "@backtickjs/solid-js";
import { render, screen } from "@solidjs/testing-library";
import { snapshotCase } from "../snapshotCase.ts";
import { settled } from "./dom.ts";
import { evaluate } from "../evaluate.ts";
// The same claim as `evaluateBuildsOnce`, with no bundle in it.
//
// A component is built once, however what it drew changes afterwards. `<For />`
// answers with a way of asking, the way a drawn bundle does, so if the fault
// were the drawn bundle's this would be untouched — and it is not.
//
// `asked` is the page's, so it survives a rebuild and counts them, and it ends
// one: once it stops saying yes, nothing is written and nothing runs again.
const answerItems = ["one", "two"];
const WaitingList = cs.create(
  "3mqkkm2axxnw5:20:20",
  {
    params: [
      { kind: "splice", value: createSignal, bindings: [] },
      { kind: "splice", value: answerItems, bindings: [] },
      { kind: "tag", value: For },
    ],
  },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<em>`);\nexports.default = ($splice0, $splice1, $tag2) => props => {\n    const items = $splice0()([]);\n    const started = window.setTimeout(() => {\n        if (props.more()) {\n            items[1]($splice1());\n        }\n    }, 0);\n    return (0, web_3.createComponent)($tag2, {\n        get each() {\n            return items[0]();\n        },\n        children: item => (() => {\n            var _el$ = _tmpl$();\n            (0, web_2.insert)(_el$, item);\n            return _el$;\n        })()\n    });\n};\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBAmBuB,CAAAA,QAAA,EAAAC,QAAA,EAAAC,KAAA,KAACC,KAA8B;IACpD,MAAMC,KAAK,GAAGJ,QAAA,EAAa,CAAW,EAAE,CAAC;IAEzC,MAAMK,OAAO,GAAGC,MAAM,CAACC,UAAU,CAAC;QAChC,IAAIJ,KAAK,CAACK,IAAI,EAAE,EAAE;YAChBJ,KAAK,CAAC,CAAC,CAAC,CAACH,QAAA,EAAY,CAAC;QACxB;IACF,CAAC,EAAE,CAAC,CAAC;IAEL,OAAAQ,yBAAA,EAAQP,KAAG;QAAA,IAACQ,IAAIA;YAAA,OAAEN,KAAK,CAAC,CAAC,CAAC,EAAE;QAAA;QAAAO,QAAA,EAAIC,IAAY;YAAA,IAAAC,IAAA,GAAAC,MAAA;YAAAC,gBAAA,EAAAF,IAAA,EAAUD,IAAI;YAAA,OAAAC,IAAA;QAAA;KAAM;AAClE,CAAC","names":["$splice0","$splice1","$tag2","props","items","started","window","setTimeout","more","_$createComponent","each","children","item","_el$","_tmpl$","_$insert"],"ignoreList":[],"sources":["render/for-builds-once.test.tsx"]}',
  ["solid-js/web"],
);
const forBuildsOnce = cs.create(
  "3mqkkm2axxnw5:32:22",
  {
    params: [
      { kind: "splice", value: createSignal, bindings: [] },
      { kind: "tag", value: WaitingList },
    ],
  },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div><span>`);\nexports.default = ($splice0, $tag1) => {\n    const asked = $splice0()(0);\n    return (() => {\n        var _el$ = _tmpl$(), _el$2 = _el$.firstChild;\n        (0, web_3.insert)(_el$2, () => "asked " + asked[0]());\n        (0, web_3.insert)(_el$, (0, web_2.createComponent)($tag1, {\n            more: () => {\n                asked[1](asked[0]() + 1);\n                return asked[0]() < 5;\n            }\n        }), null);\n        return _el$;\n    })();\n};\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBA+ByB,CAAAA,QAAA,EAAAC,KAAA;IACvB,MAAMC,KAAK,GAAGF,QAAA,EAAa,CAAC,CAAC,CAAC;IAE9B;QAAA,IAAAG,IAAA,GAAAC,MAAA,IAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA;QAAAC,gBAAA,EAAAF,KAAA,QAEW,QAAQ,GAAGH,KAAK,CAAC,CAAC,CAAC,EAAE;QAAAK,gBAAA,EAAAJ,IAAA,EAAAK,yBAAA,EAC3BP,KAAW;YACVQ,IAAI,EAAEA,GAAA;gBACJP,KAAK,CAAC,CAAC,CAAC,CAACA,KAAK,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC;gBACxB,OAAOA,KAAK,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC;YACvB;SAAC;QAAA,OAAAC,IAAA;IAAA;AAIT,CAAC","names":["$splice0","$tag1","asked","_el$","_tmpl$","_el$2","firstChild","_$insert","_$createComponent","more"],"ignoreList":[],"sources":["render/for-builds-once.test.tsx"]}',
  ["solid-js/web"],
);
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
