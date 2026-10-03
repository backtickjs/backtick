import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal, For } from "@backtickjs/solid-js";
import { render, screen } from "@solidjs/testing-library";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
import { evaluate } from "../evaluate.ts";
// A tag naming a function an enclosing script holds. The nested script captures
// it the way it captures any binding, and calls it as a component: once, with
// its props read on access.
const scriptBoundTagCapture = cs.create(
  "3dnmz2nwnczai:13:30",
  {
    params: [
      { kind: "splice", value: createSignal, bindings: [] },
      {
        kind: "splice",
        value: cs.create(
          "3dnmz2nwnczai:19:9",
          {
            params: [
              { kind: "capture", key: "Badge$3dnmz2nwnczai$2" },
              { kind: "capture", key: "count$3dnmz2nwnczai$0" },
            ],
          },
          '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nexports.default = ($capture0, $capture1) => (0, web_1.createComponent)($capture0, {\n    get n() {\n        return $capture1();\n    }\n});\n}',
          '{"version":3,"file":"module.jsx","mappings":";;;;kBAkBY,CAAAA,SAAA,EAAAC,SAAA,KAAAC,yBAAA,EAACF,SAAK;IAAA,IAACG,CAACA;QAAA,OAAEF,SAAK,EAAE;IAAA;CAAA,CAAI","names":["$capture0","$capture1","_$createComponent","n"],"ignoreList":[],"sources":["render/script-bound-tag-capture.test.tsx"]}',
          ["solid-js/web"],
        ),
        bindings: ["count$3dnmz2nwnczai$0", "Badge$3dnmz2nwnczai$2"],
      },
      {
        kind: "splice",
        value: cs.create(
          "3dnmz2nwnczai:21:10",
          {
            params: [
              {
                kind: "splice",
                value: cs.create(
                  "3dnmz2nwnczai:23:19",
                  {
                    params: [
                      { kind: "capture", key: "Badge$3dnmz2nwnczai$2" },
                      { kind: "capture", key: "count$3dnmz2nwnczai$0" },
                    ],
                  },
                  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nexports.default = ($capture0, $capture1) => (0, web_1.createComponent)($capture0, {\n    get n() {\n        return $capture1() + 100;\n    }\n});\n}',
                  '{"version":3,"file":"module.jsx","mappings":";;;;kBAsBsB,CAAAA,SAAA,EAAAC,SAAA,KAAAC,yBAAA,EAACF,SAAK;IAAA,IAACG,CAACA;QAAA,OAAEF,SAAK,EAAE,GAAG,GAAG;IAAA;CAAA,CAAI","names":["$capture0","$capture1","_$createComponent","n"],"ignoreList":[],"sources":["render/script-bound-tag-capture.test.tsx"]}',
                  ["solid-js/web"],
                ),
                bindings: [],
              },
              { kind: "capture", key: "Badge$3dnmz2nwnczai$2" },
              { kind: "capture", key: "count$3dnmz2nwnczai$0" },
            ],
          },
          '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $capture1, $capture2) => {\n    const skipped = 10;\n    return $splice0($capture1, $capture2);\n};\n}',
          '{"version":3,"file":"module.jsx","mappings":";;;kBAoBa,CAAAA,QAAA,EAAAC,SAAA,EAAAC,SAAA;IACH,MAAMC,OAAO,GAAG,EAAE;IAClB,OAAOH,QAAA,CAAAC,SAAA,EAAAC,SAAA,CAAkC;AAC3C,CAAC","names":["$splice0","$capture1","$capture2","skipped"],"ignoreList":[],"sources":["render/script-bound-tag-capture.test.tsx"]}',
          [],
        ),
        bindings: ["count$3dnmz2nwnczai$0", "Badge$3dnmz2nwnczai$2"],
      },
      {
        kind: "splice",
        value: cs.create(
          "3dnmz2nwnczai:26:9",
          {
            params: [
              {
                kind: "splice",
                value: cs.create(
                  "3dnmz2nwnczai:26:24",
                  {
                    params: [
                      { kind: "capture", key: "Badge$3dnmz2nwnczai$2" },
                      { kind: "capture", key: "count$3dnmz2nwnczai$0" },
                    ],
                  },
                  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nexports.default = ($capture0, $capture1) => (0, web_1.createComponent)($capture0, {\n    get n() {\n        return $capture1() + 1000;\n    }\n});\n}',
                  '{"version":3,"file":"module.jsx","mappings":";;;;kBAyB2B,CAAAA,SAAA,EAAAC,SAAA,KAAAC,yBAAA,EAACF,SAAK;IAAA,IAACG,CAACA;QAAA,OAAEF,SAAK,EAAE,GAAG,IAAI;IAAA;CAAA,CAAI","names":["$capture0","$capture1","_$createComponent","n"],"ignoreList":[],"sources":["render/script-bound-tag-capture.test.tsx"]}',
                  ["solid-js/web"],
                ),
                bindings: [],
              },
              { kind: "capture", key: "Badge$3dnmz2nwnczai$2" },
              { kind: "capture", key: "count$3dnmz2nwnczai$0" },
            ],
          },
          '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<section>`);\nexports.default = ($splice0, $capture1, $capture2) => (() => {\n    var _el$ = _tmpl$();\n    (0, web_2.insert)(_el$, () => $splice0($capture1, $capture2));\n    return _el$;\n})();\n}',
          '{"version":3,"file":"module.jsx","mappings":";;;;;;kBAyBY,CAAAA,QAAA,EAAAC,SAAA,EAAAC,SAAA;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,gBAAA,EAAAF,IAAA,QAAUH,QAAA,CAAAC,SAAA,EAAAC,SAAA,CAAmC;IAAA,OAAAC,IAAA;AAAA,IAAW","names":["$splice0","$capture1","$capture2","_el$","_tmpl$","_$insert"],"ignoreList":[],"sources":["render/script-bound-tag-capture.test.tsx"]}',
          ["solid-js/web"],
        ),
        bindings: ["count$3dnmz2nwnczai$0", "Badge$3dnmz2nwnczai$2"],
      },
      {
        kind: "splice",
        value: cs.create(
          "3dnmz2nwnczai:28:10",
          {
            params: [
              { kind: "tag", value: For },
              { kind: "capture", key: "Badge$3dnmz2nwnczai$2" },
              { kind: "capture", key: "count$3dnmz2nwnczai$0" },
            ],
          },
          '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nexports.default = ($tag0, $capture1, $capture2) => (0, web_1.createComponent)($tag0, {\n    each: [1, 2],\n    children: m => (0, web_1.createComponent)($capture1, {\n        get n() {\n            return m * $capture2();\n        }\n    })\n});\n}',
          '{"version":3,"file":"module.jsx","mappings":";;;;kBA2Ba,CAAAA,KAAA,EAAAC,SAAA,EAAAC,SAAA,KAAAC,yBAAA,EAACH,KAAG;IAACI,IAAI,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC;IAAAC,QAAA,EAClBC,CAAS,IAAAH,yBAAA,EAAMF,SAAK;QAAA,IAACM,CAACA;YAAA,OAAED,CAAC,GAAGJ,SAAK,EAAE;QAAA;KAAA;CAAI,CACrC","names":["$tag0","$capture1","$capture2","_$createComponent","each","children","m","n"],"ignoreList":[],"sources":["render/script-bound-tag-capture.test.tsx"]}',
          ["solid-js/web"],
        ),
        bindings: ["count$3dnmz2nwnczai$0", "Badge$3dnmz2nwnczai$2"],
      },
    ],
  },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<b>`), _tmpl$2 = /*#__PURE__*/ (0, web_1.template)(`<div><button>more`);\nexports.default = ($splice0, $splice1, $splice2, $splice3, $splice4) => {\n    const [count, setCount] = $splice0()(0);\n    const Badge = props => (() => {\n        var _el$ = _tmpl$();\n        (0, web_3.insert)(_el$, () => "n " + props.n);\n        return _el$;\n    })();\n    return (() => {\n        var _el$2 = _tmpl$2(), _el$3 = _el$2.firstChild;\n        (0, web_3.insert)(_el$2, () => $splice1(count, Badge), _el$3);\n        (0, web_3.insert)(_el$2, () => $splice2(count, Badge), _el$3);\n        (0, web_3.insert)(_el$2, () => $splice3(count, Badge), _el$3);\n        (0, web_3.insert)(_el$2, () => $splice4(count, Badge), _el$3);\n        _el$3.$$click = () => setCount(count() + 1);\n        return _el$2;\n    })();\n};\n(0, web_2.delegateEvents)(["click"]);\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBAYiC,CAAAA,QAAA,EAAAC,QAAA,EAAAC,QAAA,EAAAC,QAAA,EAAAC,QAAA;IAC/B,MAAM,CAACC,KAAK,EAAEC,QAAQ,CAAC,GAAGN,QAAA,EAAa,CAAC,CAAC,CAAC;IAC1C,MAAMO,KAAK,GAAIC,KAAoB;QAAA,IAAAC,IAAA,GAAAC,MAAA;QAAAC,gBAAA,EAAAF,IAAA,QAAS,IAAI,GAAGD,KAAK,CAACI,CAAC;QAAA,OAAAH,IAAA;IAAA,IAAK;IAE/D;QAAA,IAAAI,KAAA,GAAAC,OAAA,IAAAC,KAAA,GAAAF,KAAA,CAAAG,UAAA;QAAAL,gBAAA,EAAAE,KAAA,QAEKZ,QAAA,CAAAI,KAAA,EAAAE,KAAA,CAA4B,EAAAQ,KAAA;QAAAJ,gBAAA,EAAAE,KAAA,QAE3BX,QAAA,CAAAG,KAAA,EAAAE,KAAA,CAIF,EAAAQ,KAAA;QAAAJ,gBAAA,EAAAE,KAAA,QACCV,QAAA,CAAAE,KAAA,EAAAE,KAAA,CAA+D,EAAAQ,KAAA;QAAAJ,gBAAA,EAAAE,KAAA,QAE9DT,QAAA,CAAAC,KAAA,EAAAE,KAAA,CAGF,EAAAQ,KAAA;QAAAA,KAAA,CAAAE,OAAA,GACiB,MAAMX,QAAQ,CAACD,KAAK,EAAE,GAAG,CAAC,CAAC;QAAA,OAAAQ,KAAA;IAAA;AAGlD,CAAC","names":["$splice0","$splice1","$splice2","$splice3","$splice4","count","setCount","Badge","props","_el$","_tmpl$","_$insert","n","_el$2","_tmpl$2","_el$3","firstChild","$$click"],"ignoreList":[],"sources":["render/script-bound-tag-capture.test.tsx"]}',
  ["solid-js/web"],
);
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
