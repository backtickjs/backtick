import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal, For } from "@backtickjs/solid-js";
import { render, screen } from "@solidjs/testing-library";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
import { evaluate } from "../evaluate.ts";
const $module0 = {
  id: "1durge4hv8o7p:13:30",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<b>`), _tmpl$2 = /*#__PURE__*/ (0, web_1.template)(`<div><button>more`);\nexports.default = ($splice0, $splice1, $splice2, $splice3, $splice4) => {\n    const [count, setCount] = $splice0()(0);\n    const Badge = props => (() => {\n        var _el$ = _tmpl$();\n        (0, web_3.insert)(_el$, () => "n " + props.n);\n        return _el$;\n    })();\n    return (() => {\n        var _el$2 = _tmpl$2(), _el$3 = _el$2.firstChild;\n        (0, web_3.insert)(_el$2, () => $splice1(count, Badge), _el$3);\n        (0, web_3.insert)(_el$2, () => $splice2(count, Badge), _el$3);\n        (0, web_3.insert)(_el$2, () => $splice3(count, Badge), _el$3);\n        (0, web_3.insert)(_el$2, () => $splice4(count, Badge), _el$3);\n        _el$3.$$click = () => setCount(count() + 1);\n        return _el$2;\n    })();\n};\n(0, web_2.delegateEvents)(["click"]);\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBAYiC,CAAAA,QAAA,EAAAC,QAAA,EAAAC,QAAA,EAAAC,QAAA,EAAAC,QAAA;IAC/B,MAAM,CAACC,KAAK,EAAEC,QAAQ,CAAC,GAAGN,QAAA,EAAa,CAAC,CAAC,CAAC;IAC1C,MAAMO,KAAK,GAAIC,KAAoB;QAAA,IAAAC,IAAA,GAAAC,MAAA;QAAAC,gBAAA,EAAAF,IAAA,QAAS,IAAI,GAAGD,KAAK,CAACI,CAAC;QAAA,OAAAH,IAAA;IAAA,IAAK;IAE/D;QAAA,IAAAI,KAAA,GAAAC,OAAA,IAAAC,KAAA,GAAAF,KAAA,CAAAG,UAAA;QAAAL,gBAAA,EAAAE,KAAA,QAEKZ,QAAA,CAAAI,KAAA,EAAAE,KAAA,CAA4B,EAAAQ,KAAA;QAAAJ,gBAAA,EAAAE,KAAA,QAE3BX,QAAA,CAAAG,KAAA,EAAAE,KAAA,CAIF,EAAAQ,KAAA;QAAAJ,gBAAA,EAAAE,KAAA,QACCV,QAAA,CAAAE,KAAA,EAAAE,KAAA,CAA+D,EAAAQ,KAAA;QAAAJ,gBAAA,EAAAE,KAAA,QAE9DT,QAAA,CAAAC,KAAA,EAAAE,KAAA,CAGF,EAAAQ,KAAA;QAAAA,KAAA,CAAAE,OAAA,GACiB,MAAMX,QAAQ,CAACD,KAAK,EAAE,GAAG,CAAC,CAAC;QAAA,OAAAQ,KAAA;IAAA;AAGlD,CAAC","names":["$splice0","$splice1","$splice2","$splice3","$splice4","count","setCount","Badge","props","_el$","_tmpl$","_$insert","n","_el$2","_tmpl$2","_el$3","firstChild","$$click"],"ignoreList":[],"sources":["render/script-bound-tag-capture.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [
    { kind: "splice", bindings: [] },
    {
      kind: "splice",
      bindings: ["count$1durge4hv8o7p$0", "Badge$1durge4hv8o7p$2"],
    },
    {
      kind: "splice",
      bindings: ["count$1durge4hv8o7p$0", "Badge$1durge4hv8o7p$2"],
    },
    {
      kind: "splice",
      bindings: ["count$1durge4hv8o7p$0", "Badge$1durge4hv8o7p$2"],
    },
    {
      kind: "splice",
      bindings: ["count$1durge4hv8o7p$0", "Badge$1durge4hv8o7p$2"],
    },
  ],
};
const $module1 = {
  id: "1durge4hv8o7p:19:9",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nexports.default = ($capture0, $capture1) => (0, web_1.createComponent)($capture0, {\n    get n() {\n        return $capture1();\n    }\n});\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;kBAkBY,CAAAA,SAAA,EAAAC,SAAA,KAAAC,yBAAA,EAACF,SAAK;IAAA,IAACG,CAACA;QAAA,OAAEF,SAAK,EAAE;IAAA;CAAA,CAAI","names":["$capture0","$capture1","_$createComponent","n"],"ignoreList":[],"sources":["render/script-bound-tag-capture.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [
    { kind: "capture", key: "Badge$1durge4hv8o7p$2" },
    { kind: "capture", key: "count$1durge4hv8o7p$0" },
  ],
};
const $module2 = {
  id: "1durge4hv8o7p:21:10",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $capture1, $capture2) => {\n    const skipped = 10;\n    return $splice0($capture1, $capture2);\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAoBa,CAAAA,QAAA,EAAAC,SAAA,EAAAC,SAAA;IACH,MAAMC,OAAO,GAAG,EAAE;IAClB,OAAOH,QAAA,CAAAC,SAAA,EAAAC,SAAA,CAAkC;AAC3C,CAAC","names":["$splice0","$capture1","$capture2","skipped"],"ignoreList":[],"sources":["render/script-bound-tag-capture.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "capture", key: "Badge$1durge4hv8o7p$2" },
    { kind: "capture", key: "count$1durge4hv8o7p$0" },
  ],
};
const $module3 = {
  id: "1durge4hv8o7p:23:19",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nexports.default = ($capture0, $capture1) => (0, web_1.createComponent)($capture0, {\n    get n() {\n        return $capture1() + 100;\n    }\n});\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;kBAsBsB,CAAAA,SAAA,EAAAC,SAAA,KAAAC,yBAAA,EAACF,SAAK;IAAA,IAACG,CAACA;QAAA,OAAEF,SAAK,EAAE,GAAG,GAAG;IAAA;CAAA,CAAI","names":["$capture0","$capture1","_$createComponent","n"],"ignoreList":[],"sources":["render/script-bound-tag-capture.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [
    { kind: "capture", key: "Badge$1durge4hv8o7p$2" },
    { kind: "capture", key: "count$1durge4hv8o7p$0" },
  ],
};
const $module4 = {
  id: "1durge4hv8o7p:26:9",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<section>`);\nexports.default = ($splice0, $capture1, $capture2) => (() => {\n    var _el$ = _tmpl$();\n    (0, web_2.insert)(_el$, () => $splice0($capture1, $capture2));\n    return _el$;\n})();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;kBAyBY,CAAAA,QAAA,EAAAC,SAAA,EAAAC,SAAA;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,gBAAA,EAAAF,IAAA,QAAUH,QAAA,CAAAC,SAAA,EAAAC,SAAA,CAAmC;IAAA,OAAAC,IAAA;AAAA,IAAW","names":["$splice0","$capture1","$capture2","_el$","_tmpl$","_$insert"],"ignoreList":[],"sources":["render/script-bound-tag-capture.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "capture", key: "Badge$1durge4hv8o7p$2" },
    { kind: "capture", key: "count$1durge4hv8o7p$0" },
  ],
};
const $module5 = {
  id: "1durge4hv8o7p:26:24",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nexports.default = ($capture0, $capture1) => (0, web_1.createComponent)($capture0, {\n    get n() {\n        return $capture1() + 1000;\n    }\n});\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;kBAyB2B,CAAAA,SAAA,EAAAC,SAAA,KAAAC,yBAAA,EAACF,SAAK;IAAA,IAACG,CAACA;QAAA,OAAEF,SAAK,EAAE,GAAG,IAAI;IAAA;CAAA,CAAI","names":["$capture0","$capture1","_$createComponent","n"],"ignoreList":[],"sources":["render/script-bound-tag-capture.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [
    { kind: "capture", key: "Badge$1durge4hv8o7p$2" },
    { kind: "capture", key: "count$1durge4hv8o7p$0" },
  ],
};
const $module6 = {
  id: "1durge4hv8o7p:28:10",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nexports.default = ($splice0, $capture1, $capture2) => ($For => (0, web_1.createComponent)($For, {\n    each: [1, 2],\n    children: m => (0, web_1.createComponent)($capture1, {\n        get n() {\n            return m * $capture2();\n        }\n    })\n}))($splice0($capture1, $capture2));\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;kBA2Ba,CAAAA,QAAA,EAAAC,SAAA,EAAAC,SAAA,KACH,CAAAC,IAAA,IAAAC,yBAAA,EAACD,IAAI;IAACE,IAAI,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC;IAAAC,QAAA,EAAIC,CAAS,IAAAH,yBAAA,EAAMH,SAAK;QAAA,IAACO,CAACA;YAAA,OAAED,CAAC,GAAGL,SAAK,EAAE;QAAA;KAAA;CAAI,CAAQ,EAApEF,QAAA,CAAAC,SAAA,EAAAC,SAAA,CAAI,CACN","names":["$splice0","$capture1","$capture2","$For","_$createComponent","each","children","m","n"],"ignoreList":[],"sources":["render/script-bound-tag-capture.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "capture", key: "Badge$1durge4hv8o7p$2" },
    { kind: "capture", key: "count$1durge4hv8o7p$0" },
  ],
};
// A tag naming a function an enclosing script holds. The nested script captures
// it the way it captures any binding, and calls it as a component: once, with
// its props read on access.
const scriptBoundTagCapture = cs.create($module0, [
  createSignal,
  cs.create($module1, []),
  cs.create($module2, [cs.create($module3, [])]),
  cs.create($module4, [cs.create($module5, [])]),
  cs.create($module6, [For]),
]);
it("scriptBoundTagCapture", async (t) => {
  await snapshotCase(t, "scriptBoundTagCapture", scriptBoundTagCapture);
});
describe("a tag naming a function the script holds", () => {
  it("calls one an enclosing script holds, however the call is nested", async () => {
    const { container } = render(await evaluate(() => scriptBoundTagCapture));
    const badges = () => [...container.querySelectorAll("b")];
    const before = badges();
    const texts = () => badges().map((b) => b.textContent);
    assert.deepEqual(texts(), ["n 0", "n 100", "n 1000", "n 0", "n 0"]);
    await userEvent.click(screen.getByRole("button", { name: "more" }));
    assert.deepEqual(texts(), ["n 1", "n 101", "n 1001", "n 1", "n 2"]);
    assert.deepEqual(badges(), before, "the same <b>s");
  });
});
