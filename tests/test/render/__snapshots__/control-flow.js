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
  id: "1jcbbk251ep80:20:16",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<ul>`), _tmpl$2 = /*#__PURE__*/ (0, web_1.template)(`<li>`);\nexports.default = ($tag0, $splice1) => (() => {\n    var _el$ = _tmpl$();\n    (0, web_2.insert)(_el$, (0, web_3.createComponent)($tag0, {\n        get each() {\n            return $splice1();\n        },\n        children: (row, index) => (() => {\n            var _el$2 = _tmpl$2();\n            (0, web_2.insert)(_el$2, () => index + ": " + row());\n            return _el$2;\n        })()\n    }));\n    return _el$;\n})();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBAmBmB,CAAAA,KAAA,EAAAC,QAAA;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,gBAAA,EAAAF,IAAA,EAAAG,yBAAA,EAChBL,KAAM;QAAA,IAACM,IAAIA;YAAA,OAAEL,QAAA,EAAK;QAAA;QAAAM,QAAA,EAChBA,CAACC,GAAiB,EAAEC,KAAa;YAAA,IAAAC,KAAA,GAAAC,OAAA;YAAAP,gBAAA,EAAAM,KAAA,QAAUD,KAAK,GAAG,IAAI,GAAGD,GAAG,EAAE;YAAA,OAAAE,KAAA;QAAA;KAAM;IAAA,OAAAR,IAAA;AAAA,IAErE","names":["$tag0","$splice1","_el$","_tmpl$","_$insert","_$createComponent","each","children","row","index","_el$2","_tmpl$2"],"ignoreList":[],"sources":["render/control-flow.test.tsx"]}',
  dependencies: ["solid-js/web"],
};
const $module1 = {
  id: "1jcbbk251ep80:26:17",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<p>wrong`), _tmpl$2 = /*#__PURE__*/ (0, web_1.template)(`<p>right`), _tmpl$3 = /*#__PURE__*/ (0, web_1.template)(`<p>none`);\nexports.default = ($tag0, $tag1) => (0, web_2.createComponent)($tag0, {\n    get fallback() {\n        return _tmpl$3();\n    },\n    get children() {\n        return [(0, web_2.createComponent)($tag1, {\n                when: 1 > 2,\n                get children() {\n                    return _tmpl$();\n                }\n            }), (0, web_2.createComponent)($tag1, {\n                when: 2 > 1,\n                get children() {\n                    return _tmpl$2();\n                }\n            })];\n    }\n});\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;kBAyBoB,CAAAA,KAAA,EAAAC,KAAA,KAAAC,yBAAA,EAACF,KAAO;IAAA,IAACG,QAAQA;QAAA,OAAAC,OAAA;IAAA;IAAA,IAAAC;QAAA,QAAAH,yBAAA,EAClCD,KAAM;gBAACK,IAAI,EAAE,CAAC,GAAG,CAAC;gBAAA,IAAAD;oBAAA,OAAAE,MAAA;gBAAA;aAAA,GAAAL,yBAAA,EAGlBD,KAAM;gBAACK,IAAI,EAAE,CAAC,GAAG,CAAC;gBAAA,IAAAD;oBAAA,OAAAG,OAAA;gBAAA;aAAA;IAAA;CAAA,CAGX","names":["$tag0","$tag1","_$createComponent","fallback","_tmpl$3","children","when","_tmpl$","_tmpl$2"],"ignoreList":[],"sources":["render/control-flow.test.tsx"]}',
  dependencies: ["solid-js/web"],
};
const $module2 = {
  id: "1jcbbk251ep80:35:15",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<p>caught`);\nexports.default = ($tag0, $splice1) => (0, web_2.createComponent)($tag0, {\n    get fallback() {\n        return _tmpl$();\n    },\n    get children() {\n        return $splice1();\n    }\n});\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;kBAkCkB,CAAAA,KAAA,EAAAC,QAAA,KAAAC,yBAAA,EAACF,KAAc;IAAA,IAACG,QAAQA;QAAA,OAAAC,MAAA;IAAA;IAAA,IAAAC;QAAA,OACxCJ,QAAA,EAGF;IAAA;CAAA,CAAkB","names":["$tag0","$splice1","_$createComponent","fallback","_tmpl$","children"],"ignoreList":[],"sources":["render/control-flow.test.tsx"]}',
  dependencies: ["solid-js/web"],
};
const $module3 = {
  id: "1jcbbk251ep80:36:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    throw "drawn wrong";\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAmCO;IACH,MAAM,aAAa;AACrB,CAAC","names":[],"ignoreList":[],"sources":["render/control-flow.test.tsx"]}',
  dependencies: [],
};
const $module4 = {
  id: "1jcbbk251ep80:41:18",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<p>loaded`), _tmpl$2 = /*#__PURE__*/ (0, web_1.template)(`<p>loading`);\nexports.default = $tag0 => (0, web_2.createComponent)($tag0, {\n    get fallback() {\n        return _tmpl$2();\n    },\n    get children() {\n        return _tmpl$();\n    }\n});\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;kBAwCqBA,KAAA,IAAAC,yBAAA,EAACD,KAAS;IAAA,IAACE,QAAQA;QAAA,OAAAC,OAAA;IAAA;IAAA,IAAAC;QAAA,OAAAC,MAAA;IAAA;CAAA,CAE5B","names":["$tag0","_$createComponent","fallback","_tmpl$2","children","_tmpl$"],"ignoreList":[],"sources":["render/control-flow.test.tsx"]}',
  dependencies: ["solid-js/web"],
};
const $module5 = {
  id: "1jcbbk251ep80:45:17",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<p>elsewhere`), _tmpl$2 = /*#__PURE__*/ (0, web_1.template)(`<div><p>here`);\nexports.default = $tag0 => (() => {\n    var _el$ = _tmpl$2(), _el$2 = _el$.firstChild;\n    (0, web_2.insert)(_el$, (0, web_3.createComponent)($tag0, {\n        get children() {\n            return _tmpl$();\n        }\n    }), null);\n    return _el$;\n})();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBA4CoBA,KAAA;IAAA,IAAAC,IAAA,GAAAC,OAAA,IAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA;IAAAC,gBAAA,EAAAJ,IAAA,EAAAK,yBAAA,EAEjBN,KAAO;QAAA,IAAAO;YAAA,OAAAC,MAAA;QAAA;KAAA;IAAA,OAAAP,IAAA;AAAA,IAGJ","names":["$tag0","_el$","_tmpl$2","_el$2","firstChild","_$insert","_$createComponent","children","_tmpl$"],"ignoreList":[],"sources":["render/control-flow.test.tsx"]}',
  dependencies: ["solid-js/web"],
};
// Solid's control flow in a script, as Solid types and draws it.
const rows = ["first", "second"];
const indexed = cs.create($module0, [
  { kind: "tag", value: Index },
  { kind: "splice", value: rows, bindings: [] },
]);
const switched = cs.create($module1, [
  { kind: "tag", value: Switch },
  { kind: "tag", value: Match },
]);
const caught = cs.create($module2, [
  { kind: "tag", value: ErrorBoundary },
  { kind: "splice", value: cs.create($module3, []), bindings: [] },
]);
const suspended = cs.create($module4, [{ kind: "tag", value: Suspense }]);
const portaled = cs.create($module5, [{ kind: "tag", value: Portal }]);
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
