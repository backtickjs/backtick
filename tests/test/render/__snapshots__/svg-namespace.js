import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { For } from "@backtickjs/solid-js";
import { snapshotCase } from "../snapshotCase.ts";
import { namespaced } from "./dom.ts";
import { evaluate } from "../evaluate.ts";
import { render } from "@solidjs/testing-library";
const $module0 = {
  id: "14goklyg2ww24:17:9",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<svg><circle cx=5 cy=5 r=4 fill=none stroke=currentColor></svg>`, false, true, false);\nexports.default = () => _tmpl$();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;kBAgBY,MAAAA,MAAA,EAAgE","names":["_tmpl$"],"ignoreList":[],"sources":["render/svg-namespace.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [],
};
const $module1 = {
  id: "14goklyg2ww24:20:21",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nconst web_4 = require("solid-js/web");\nconst web_5 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<svg><circle cy=5 r=2><title></svg>`, false, true, false), _tmpl$2 = /*#__PURE__*/ (0, web_1.template)(`<div><a href=/shapes>shapes</a><svg viewBox="0 0 30 10"width=120><foreignObject x=0 y=0 width=10 height=10><p>html again`);\nexports.default = ($splice0, $tag1) => {\n    const Dot = props => (() => {\n        var _el$ = _tmpl$(), _el$2 = _el$.firstChild;\n        (0, web_5.insert)(_el$2, () => "dot " + props.x);\n        (0, web_4.effect)(() => (0, web_3.setAttribute)(_el$, "cx", props.x));\n        return _el$;\n    })();\n    return (() => {\n        var _el$3 = _tmpl$2(), _el$4 = _el$3.firstChild, _el$5 = _el$4.nextSibling, _el$6 = _el$5.firstChild;\n        (0, web_5.insert)(_el$5, $splice0, _el$6);\n        (0, web_5.insert)(_el$5, (0, web_2.createComponent)($tag1, {\n            each: [10, 20],\n            children: x => (0, web_2.createComponent)(Dot, {\n                x: x\n            })\n        }), _el$6);\n        return _el$3;\n    })();\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;;;;kBAmBwB,CAAAA,QAAA,EAAAC,KAAA;IACtB,MAAMC,GAAG,GAAIC,KAAoB;QAAA,IAAAC,IAAA,GAAAC,MAAA,IAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA;QAAAC,gBAAA,EAAAF,KAAA,QAErB,MAAM,GAAGH,KAAK,CAACM,CAAC;QAAAC,gBAAA,QAAAC,sBAAA,EAAAP,IAAA,QADdD,KAAK,CAACM,CAAC;QAAA,OAAAL,IAAA;IAAA,IAGpB;IAED;QAAA,IAAAQ,KAAA,GAAAC,OAAA,IAAAC,KAAA,GAAAF,KAAA,CAAAL,UAAA,EAAAQ,KAAA,GAAAD,KAAA,CAAAE,WAAA,EAAAC,KAAA,GAAAF,KAAA,CAAAR,UAAA;QAAAC,gBAAA,EAAAO,KAAA,EAIOf,QAAA,EAAAiB,KAAA;QAAAT,gBAAA,EAAAO,KAAA,EAAAG,yBAAA,EACAjB,KAAI;YAACkB,IAAI,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC;YAAAC,QAAA,EAAIX,CAAS,IAAAS,yBAAA,EAAMhB,GAAG;gBAACO,CAAC,EAAEA;aAAC;SAAI,GAAAQ,KAAA;QAAA,OAAAL,KAAA;IAAA;AAO3D,CAAC","names":["$splice0","$tag1","Dot","props","_el$","_tmpl$","_el$2","firstChild","_$insert","x","_$effect","_$setAttribute","_el$3","_tmpl$2","_el$4","_el$5","nextSibling","_el$6","_$createComponent","each","children"],"ignoreList":[],"sources":["render/svg-namespace.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [{ kind: "splice", bindings: [] }, { kind: "tag" }],
};
// SVG written the way it is pasted: no tag says which language it is from.
// Where an element is drawn does — inside an `svg` it is SVG's, and a
// `foreignObject` holds HTML again — so a circle a host component or a function
// the script holds draws is SVG's once it stands inside the `svg`, and a
// `title` or an `a`, whose names both languages use, is whichever one encloses
// it.
async function Ring() {
  return cs.create($module0, []);
}
const svgNamespace = cs.create($module1, [_jsx(Ring, {}), For]);
it("svgNamespace", async (t) => {
  await snapshotCase(t, "svgNamespace", svgNamespace);
});
describe("an element's namespace", () => {
  it("is where the element is drawn", async () => {
    const { container } = render(await evaluate(() => svgNamespace));
    // Sorted: a list builds its rows after the elements beside it, and the
    // order they are made in is not the claim.
    assert.deepEqual(namespaced(container).sort(), [
      "a",
      "div",
      "p",
      "svg:circle",
      "svg:circle",
      "svg:circle",
      "svg:foreignObject",
      "svg:svg",
      "svg:title",
      "svg:title",
    ]);
  });
});
