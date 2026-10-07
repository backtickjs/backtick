import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import {
  ErrorBoundary,
  Index,
  Match,
  Suspense,
  Switch,
} from "@backtickjs/solid-js";
import { Portal } from "@backtickjs/solid-js/web";
import { evaluate } from "../evaluate.ts";
import { render, screen } from "@solidjs/testing-library";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "2r57qmcp53te6:20:16",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<ul>`), _tmpl$2 = /*#__PURE__*/ (0, web_1.template)(`<li>`);\nexports.default = ($splice0, $splice1) => (() => {\n    var _el$ = _tmpl$();\n    (0, web_3.insert)(_el$, () => ($Index => (0, web_2.createComponent)($Index, {\n        get each() {\n            return $splice1();\n        },\n        children: (row, index) => (() => {\n            var _el$2 = _tmpl$2();\n            (0, web_3.insert)(_el$2, () => index + ": " + row());\n            return _el$2;\n        })()\n    }))($splice0()));\n    return _el$;\n})();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBAmBmB,CAAAA,QAAA,EAAAC,QAAA;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,gBAAA,EAAAF,IAAA,QAEf,CAAAG,MAAA,IAAAC,yBAAA,EAACD,MAAM;QAAA,IAACE,IAAIA;YAAA,OAAEN,QAAA,EAAK;QAAA;QAAAO,QAAA,EAChBA,CAACC,GAAiB,EAAEC,KAAa;YAAA,IAAAC,KAAA,GAAAC,OAAA;YAAAR,gBAAA,EAAAO,KAAA,QAAUD,KAAK,GAAG,IAAI,GAAGD,GAAG,EAAE;YAAA,OAAAE,KAAA;QAAA;KAAM,CAC/D,EAFRX,QAAA,EAAM,CAGT;IAAA,OAAAE,IAAA;AAAA,IACD","names":["$splice0","$splice1","_el$","_tmpl$","_$insert","$Index","_$createComponent","each","children","row","index","_el$2","_tmpl$2"],"ignoreList":[],"sources":["render/control-flow.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "expression",
};
const $module1 = {
  id: "2r57qmcp53te6:28:17",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<p>none`), _tmpl$2 = /*#__PURE__*/ (0, web_1.template)(`<p>wrong`), _tmpl$3 = /*#__PURE__*/ (0, web_1.template)(`<p>right`);\nexports.default = ($splice0, $splice1, $splice2) => ($Switch => (0, web_2.createComponent)($Switch, {\n    get fallback() {\n        return _tmpl$();\n    },\n    get children() {\n        return [(0, web_3.memo)(() => ($Match => (0, web_2.createComponent)($Match, {\n                when: 1 > 2,\n                get children() {\n                    return _tmpl$2();\n                }\n            }))($splice1())), (0, web_3.memo)(() => ($Match => (0, web_2.createComponent)($Match, {\n                when: 2 > 1,\n                get children() {\n                    return _tmpl$3();\n                }\n            }))($splice2()))];\n    }\n}))($splice0());\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBA2BoB,CAAAA,QAAA,EAAAC,QAAA,EAAAC,QAAA,KAClB,CAAAC,OAAA,IAAAC,yBAAA,EAACD,OAAO;IAAA,IAACE,QAAQA;QAAA,OAAAC,MAAA;IAAA;IAAA,IAAAC;QAAA,QAAAC,cAAA,QACf,CAAAC,MAAA,IAAAL,yBAAA,EAACK,MAAM;gBAACC,IAAI,EAAE,CAAC,GAAG,CAAC;gBAAA,IAAAH;oBAAA,OAAAI,OAAA;gBAAA;aAAA,CAEV,EAFRV,QAAA,EAAM,CAGP,GAAAO,cAAA,SAAAC,MAAA,IAAAL,yBAAA,EAACK,MAAM;gBAACC,IAAI,EAAE,CAAC,GAAG,CAAC;gBAAA,IAAAH;oBAAA,OAAAK,OAAA;gBAAA;aAAA,CAEV,EAFRV,QAAA,EAAM,CAGT;IAAA;CAAA,CAAU,EAPTF,QAAA,EAAO,CAQT","names":["$splice0","$splice1","$splice2","$Switch","_$createComponent","fallback","_tmpl$","children","_$memo","$Match","when","_tmpl$2","_tmpl$3"],"ignoreList":[],"sources":["render/control-flow.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "expression",
};
const $module2 = {
  id: "2r57qmcp53te6:39:15",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<p>caught`);\nexports.default = ($splice0, $splice1) => ($ErrorBoundary => (0, web_2.createComponent)($ErrorBoundary, {\n    get fallback() {\n        return _tmpl$();\n    },\n    get children() {\n        return $splice1();\n    }\n}))($splice0());\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;kBAsCkB,CAAAA,QAAA,EAAAC,QAAA,MAAAC,cAAA,IAAAC,yBAAA,EAACD,cAAc;IAAA,IAACE,QAAQA;QAAA,OAAAC,MAAA;IAAA;IAAA,IAAAC;QAAA,OACtCL,QAAA,EAGF;IAAA;CAAA,CAAkB,EAJDD,QAAA,EAAc,CAIb","names":["$splice0","$splice1","$ErrorBoundary","_$createComponent","fallback","_tmpl$","children"],"ignoreList":[],"sources":["render/control-flow.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "expression",
};
const $module3 = {
  id: "2r57qmcp53te6:40:6",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    throw "drawn wrong";\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAuCS;IACH,MAAM,aAAa;AACrB,CAAC","names":[],"ignoreList":[],"sources":["render/control-flow.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "block",
};
const $module4 = {
  id: "2r57qmcp53te6:45:18",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<p>loaded`), _tmpl$2 = /*#__PURE__*/ (0, web_1.template)(`<p>loading`);\nexports.default = $splice0 => ($Suspense => (0, web_2.createComponent)($Suspense, {\n    get fallback() {\n        return _tmpl$2();\n    },\n    get children() {\n        return _tmpl$();\n    }\n}))($splice0());\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;kBA4CqBA,QAAA,IACnB,CAAAC,SAAA,IAAAC,yBAAA,EAACD,SAAS;IAAA,IAACE,QAAQA;QAAA,OAAAC,OAAA;IAAA;IAAA,IAAAC;QAAA,OAAAC,MAAA;IAAA;CAAA,CAEP,EAFXN,QAAA,EAAS,CAGX","names":["$splice0","$Suspense","_$createComponent","fallback","_tmpl$2","children","_tmpl$"],"ignoreList":[],"sources":["render/control-flow.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
const $module5 = {
  id: "2r57qmcp53te6:51:17",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div><p>here`), _tmpl$2 = /*#__PURE__*/ (0, web_1.template)(`<p>elsewhere`);\nexports.default = $splice0 => (() => {\n    var _el$ = _tmpl$(), _el$2 = _el$.firstChild;\n    (0, web_3.insert)(_el$, () => ($Portal => (0, web_2.createComponent)($Portal, {\n        get children() {\n            return _tmpl$2();\n        }\n    }))($splice0()), null);\n    return _el$;\n})();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBAkDoBA,QAAA;IAAA,IAAAC,IAAA,GAAAC,MAAA,IAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA;IAAAC,gBAAA,EAAAJ,IAAA,QAGhB,CAAAK,OAAA,IAAAC,yBAAA,EAACD,OAAO;QAAA,IAAAE;YAAA,OAAAC,OAAA;QAAA;KAAA,CAEE,EAFTT,QAAA,EAAO,CAGV;IAAA,OAAAC,IAAA;AAAA,IACD","names":["$splice0","_el$","_tmpl$","_el$2","firstChild","_$insert","$Portal","_$createComponent","children","_tmpl$2"],"ignoreList":[],"sources":["render/control-flow.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
// Solid's control flow in a script, as Solid types and draws it.
const rows = ["first", "second"];
const indexed = cs.create($module0, [Index, rows]);
const switched = cs.create($module1, [Switch, Match, Match]);
const caught = cs.create($module2, [ErrorBoundary, cs.create($module3, [])]);
const suspended = cs.create($module4, [Suspense]);
const portaled = cs.create($module5, [Portal]);
describe("control flow in a script", () => {
  it("draws each position with Index", async () => {
    render(await evaluate(() => indexed));
    assert.deepEqual(
      screen.getAllByRole("listitem").map((item) => item.textContent),
      ["0: first", "1: second"],
    );
  });
  it("draws the first Match that holds", async () => {
    render(await evaluate(() => switched));
    assert.ok(screen.getByText("right"));
    assert.equal(screen.queryByText("wrong"), null);
  });
  it("draws the fallback of an ErrorBoundary around a script that throws", async () => {
    render(await evaluate(() => caught));
    assert.ok(screen.getByText("caught"));
  });
  it("draws a Portal's children outside where it stands", async () => {
    const { container } = render(await evaluate(() => portaled));
    assert.ok(container.textContent?.includes("here"));
    assert.ok(!container.textContent?.includes("elsewhere"));
    assert.ok(screen.getByText("elsewhere"));
  });
  it("draws Suspense's children when nothing is pending", async () => {
    render(await evaluate(() => suspended));
    assert.ok(screen.getByText("loaded"));
  });
});
it("indexed", async (t) => {
  await snapshotCase(t, "indexed", indexed);
});
it("switched", async (t) => {
  await snapshotCase(t, "switched", switched);
});
