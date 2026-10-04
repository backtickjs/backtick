import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { render, screen } from "@solidjs/testing-library";
import { evaluate } from "../evaluate.ts";
const $module0 = {
  id: "2iu7bt1cywglp:13:14",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<span>styled`);\nexports.default = () => {\n    const rest = {\n        title: "spread",\n        "data-kind": "span"\n    };\n    return (() => {\n        var _el$ = _tmpl$();\n        (0, web_2.spread)(_el$, rest, false, true);\n        return _el$;\n    })();\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;kBAYiB;IACP,MAAMA,IAAI,GAAG;QAAEC,KAAK,EAAE,QAAQ;QAAE,WAAW,EAAE;KAAQ;IACrD;QAAA,IAAAC,IAAA,GAAAC,MAAA;QAAAC,gBAAA,EAAAF,IAAA,EAAiBF,IAAI;QAAA,OAAAE,IAAA;IAAA;AACvB,CAAC","names":["rest","title","_el$","_tmpl$","_$spread"],"ignoreList":[],"sources":["jsx/spread-and-member-tags.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [],
};
const $module1 = {
  id: "2iu7bt1cywglp:27:14",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<small>`);\nexports.default = () => {\n    const Text = {\n        Small: props => (() => {\n            var _el$ = _tmpl$();\n            (0, web_3.insert)(_el$, () => props.children);\n            return _el$;\n        })()\n    };\n    return (0, web_2.createComponent)(Text.Small, {\n        children: "fine print"\n    });\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBA0BiB;IACP,MAAMA,IAAI,GAAG;QACXC,KAAK,EAAGC,KAA2B;YAAA,IAAAC,IAAA,GAAAC,MAAA;YAAAC,gBAAA,EAAAF,IAAA,QACzBD,KAAK,CAACI,QAAQ;YAAA,OAAAH,IAAA;QAAA;KAEzB;IACD,OAAAI,yBAAA,EAAQP,IAAI,CAACC,KAAK;QAAAK,QAAA;KAAA;AACpB,CAAC","names":["Text","Small","props","_el$","_tmpl$","_$insert","children","_$createComponent"],"ignoreList":[],"sources":["jsx/spread-and-member-tags.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [],
};
// JSX a script writes as Solid code: attributes spread onto an element, and a
// tag naming a component its own object holds.
describe("JSX in a script", () => {
  it("spreads attributes onto an element", async () => {
    render(await evaluate(() => cs.create($module0, [])));
    const span = screen.getByText("styled");
    assert.equal(span.getAttribute("title"), "spread");
    assert.equal(span.getAttribute("data-kind"), "span");
  });
  it("draws a component a member tag names", async () => {
    render(await evaluate(() => cs.create($module1, [])));
    assert.equal(screen.getByText("fine print").tagName, "SMALL");
  });
});
