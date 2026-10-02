import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal, For } from "@backtickjs/solid-js";
import { bundle } from "../evaluate.ts";
// A bundle is a function of what was spliced alone: bundling it again, or after
// other bundles, writes the same code. Scripts are where most of the bundler's
// bookkeeping is — their numbers, the names captures print under, the thunks a
// hole feeds — so this is the bundler's own repeatability test with them in.
const doubled = cs.create(
  "2h0tu4lbov8kg:12:16",
  { params: [] },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => n => n * 2;\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;kBAWmB,MAACA,CAAS,IAAKA,CAAC,GAAG,CAAC","names":["n"],"ignoreList":[],"sources":["bundler/repeatable.test.tsx"]}',
  [],
);
const pair = cs.create(
  "2h0tu4lbov8kg:13:13",
  { params: [] },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => n => m => n + m;\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;kBAYgB,MAACA,CAAS,IAAMC,CAAS,IAAKD,CAAC,GAAGC,CAAC","names":["n","m"],"ignoreList":[],"sources":["bundler/repeatable.test.tsx"]}',
  [],
);
function Card(props) {
  return cs.create(
    "2h0tu4lbov8kg:16:9",
    { params: [{ kind: "splice", value: props, bindings: [] }] },
    '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<h2>`);\nexports.default = $splice0 => (() => {\n    var _el$ = _tmpl$();\n    (0, web_2.insert)(_el$, () => $splice0().title);\n    return _el$;\n})();\n}',
    '{"version":3,"file":"module.jsx","mappings":";;;;;;kBAeYA,QAAA;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,gBAAA,EAAAF,IAAA,QAAKD,QAAA,EAAM,CAACI,KAAK;IAAA,OAAAH,IAAA;AAAA,IAAM","names":["$splice0","_el$","_tmpl$","_$insert","title"],"ignoreList":[],"sources":["bundler/repeatable.test.tsx"]}',
    ["solid-js/web"],
  );
}
const shared = cs.create(
  "2h0tu4lbov8kg:19:15",
  { params: [] },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => "shared";\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;kBAkBkB,cAAQ","names":[],"ignoreList":[],"sources":["bundler/repeatable.test.tsx"]}',
  [],
);
const page = () =>
  cs.create(
    "2h0tu4lbov8kg:21:19",
    {
      params: [
        { kind: "splice", value: createSignal, bindings: [] },
        {
          kind: "splice",
          value: cs.create(
            "2h0tu4lbov8kg:24:31",
            { params: [{ kind: "capture", key: "rows$2h0tu4lbov8kg$4" }] },
            '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $capture0 => $capture0.length;\n}',
            '{"version":3,"file":"module.jsx","mappings":";;;kBAuBkCA,SAAA,IAAAA,SAAI,CAACC,MAAM","names":["$capture0","length"],"ignoreList":[],"sources":["bundler/repeatable.test.tsx"]}',
            [],
          ),
          bindings: ["rows$2h0tu4lbov8kg$4"],
        },
        {
          kind: "splice",
          value: _jsx(Card, { title: "element" }),
          bindings: ["rows$2h0tu4lbov8kg$4"],
        },
        {
          kind: "splice",
          value: _jsx(Card, { title: shared }),
          bindings: ["rows$2h0tu4lbov8kg$4"],
        },
        { kind: "splice", value: doubled, bindings: ["rows$2h0tu4lbov8kg$4"] },
        { kind: "splice", value: pair, bindings: ["rows$2h0tu4lbov8kg$4"] },
        { kind: "splice", value: shared, bindings: ["rows$2h0tu4lbov8kg$4"] },
        { kind: "tag", value: For },
      ],
    },
    '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<section><p></p><p></p><p></p><p></p><ul>`), _tmpl$2 = /*#__PURE__*/ (0, web_1.template)(`<li>`);\nexports.default = ($splice0, $splice1, $splice2, $splice3, $splice4, $splice5, $splice6, $tag7) => {\n    const count = $splice0()(1);\n    const rows = [1, 2, 3];\n    const total = count[0]() + $splice1(rows);\n    return (() => {\n        var _el$ = _tmpl$(), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling, _el$4 = _el$3.nextSibling, _el$5 = _el$4.nextSibling, _el$6 = _el$5.nextSibling;\n        (0, web_3.insert)(_el$, () => $splice2(rows), _el$2);\n        (0, web_3.insert)(_el$, () => $splice3(rows), _el$2);\n        (0, web_3.insert)(_el$2, () => $splice4(rows)(count[0]()));\n        (0, web_3.insert)(_el$3, () => $splice5(rows)(1)(2));\n        (0, web_3.insert)(_el$4, () => $splice6(rows));\n        (0, web_3.insert)(_el$5, total);\n        (0, web_3.insert)(_el$6, (0, web_2.createComponent)($tag7, {\n            each: rows,\n            children: row => (() => {\n                var _el$7 = _tmpl$2();\n                (0, web_3.insert)(_el$7, () => row + count[0]());\n                return _el$7;\n            })()\n        }));\n        return _el$;\n    })();\n};\n}',
    '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBAoBsB,CAAAA,QAAA,EAAAC,QAAA,EAAAC,QAAA,EAAAC,QAAA,EAAAC,QAAA,EAAAC,QAAA,EAAAC,QAAA,EAAAC,KAAA;IACpB,MAAMC,KAAK,GAAGR,QAAA,EAAa,CAAC,CAAC,CAAC;IAC9B,MAAMS,IAAI,GAAG,CAAC,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC;IACtB,MAAMC,KAAK,GAAGF,KAAK,CAAC,CAAC,CAAC,EAAE,GAAGP,QAAA,CAAAQ,IAAA,CAAC;IAC5B;QAAA,IAAAE,IAAA,GAAAC,MAAA,IAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA,EAAAC,KAAA,GAAAF,KAAA,CAAAG,WAAA,EAAAC,KAAA,GAAAF,KAAA,CAAAC,WAAA,EAAAE,KAAA,GAAAD,KAAA,CAAAD,WAAA,EAAAG,KAAA,GAAAD,KAAA,CAAAF,WAAA;QAAAI,gBAAA,EAAAT,IAAA,QAEKT,QAAA,CAAAO,IAAA,CAA6B,EAAAI,KAAA;QAAAO,gBAAA,EAAAT,IAAA,QAC7BR,QAAA,CAAAM,IAAA,CAA4B,EAAAI,KAAA;QAAAO,gBAAA,EAAAP,KAAA,QACzBT,QAAA,CAAAK,IAAA,CAAQ,CAACD,KAAK,CAAC,CAAC,CAAC,EAAE,CAAC;QAAAY,gBAAA,EAAAL,KAAA,QACpBV,QAAA,CAAAI,IAAA,CAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;QAAAW,gBAAA,EAAAH,KAAA,QACXX,QAAA,CAAAG,IAAA,CAAO;QAAAW,gBAAA,EAAAF,KAAA,EACPR,KAAK;QAAAU,gBAAA,EAAAD,KAAA,EAAAE,yBAAA,EAENd,KAAG;YAACe,IAAI,EAAEb,IAAI;YAAAc,QAAA,EAAIC,GAAW;gBAAA,IAAAC,KAAA,GAAAC,OAAA;gBAAAN,gBAAA,EAAAK,KAAA,QAAUD,GAAG,GAAGhB,KAAK,CAAC,CAAC,CAAC,EAAE;gBAAA,OAAAiB,KAAA;YAAA;SAAM;QAAA,OAAAd,IAAA;IAAA;AAItE,CAAC","names":["$splice0","$splice1","$splice2","$splice3","$splice4","$splice5","$splice6","$tag7","count","rows","total","_el$","_tmpl$","_el$2","firstChild","_el$3","nextSibling","_el$4","_el$5","_el$6","_$insert","_$createComponent","each","children","row","_el$7","_tmpl$2"],"ignoreList":[],"sources":["bundler/repeatable.test.tsx"]}',
    ["solid-js/web"],
  );
const code = async (value) => (await bundle(value)).code;
it("bundles the same every time, with scripts in it", async () => {
  const first = await code(page());
  assert.equal(await code(page()), first);
  // Other bundles in between, sharing its scripts and components.
  await code(
    cs.create(
      "2h0tu4lbov8kg:46:13",
      { params: [{ kind: "splice", value: doubled, bindings: [] }] },
      '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0()(1);\n}',
      '{"version":3,"file":"module.jsx","mappings":";;;kBA6CgBA,QAAA,IAAAA,QAAA,EAAQ,CAAC,CAAC,CAAC","names":["$splice0"],"ignoreList":[],"sources":["bundler/repeatable.test.tsx"]}',
      [],
    ),
  );
  await code(
    cs.create(
      "2h0tu4lbov8kg:47:13",
      {
        params: [
          { kind: "splice", value: pair, bindings: [] },
          { kind: "splice", value: shared, bindings: [] },
        ],
      },
      '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => $splice0()(1)(2) + $splice1().length;\n}',
      '{"version":3,"file":"module.jsx","mappings":";;;kBA8CgB,CAAAA,QAAA,EAAAC,QAAA,KAAAD,QAAA,EAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAGC,QAAA,EAAO,CAACC,MAAM","names":["$splice0","$splice1","length"],"ignoreList":[],"sources":["bundler/repeatable.test.tsx"]}',
      [],
    ),
  );
  await code(
    cs.create(
      "2h0tu4lbov8kg:48:13",
      {
        params: [
          {
            kind: "splice",
            value: _jsx(Card, { title: "other" }),
            bindings: [],
          },
        ],
      },
      '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0();\n}',
      '{"version":3,"file":"module.jsx","mappings":";;;kBA+CgBA,QAAA,IAAAA,QAAA,EAAC","names":["$splice0"],"ignoreList":[],"sources":["bundler/repeatable.test.tsx"]}',
      [],
    ),
  );
  assert.equal(await code(page()), first);
});
