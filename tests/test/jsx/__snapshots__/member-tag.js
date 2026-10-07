import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { render, screen } from "@solidjs/testing-library";
import { evaluate } from "../evaluate.ts";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "7k5q0iuij35f:11:9",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<b>`);\nexports.default = () => props => (() => {\n    var _el$ = _tmpl$();\n    (0, web_2.insert)(_el$, () => "badge " + props.n);\n    return _el$;\n})();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;kBAUY,MAACA,KAAoB;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,gBAAA,EAAAF,IAAA,QAAS,QAAQ,GAAGD,KAAK,CAACI,CAAC;IAAA,OAAAH,IAAA;AAAA,IAAK","names":["props","_el$","_tmpl$","_$insert","n"],"ignoreList":[],"sources":["jsx/member-tag.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [],
  kind: "function",
};
const $module1 = {
  id: "7k5q0iuij35f:14:13",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<p>`);\nexports.default = $splice0 => (() => {\n    var _el$ = _tmpl$();\n    (0, web_3.insert)(_el$, () => ($ui => (0, web_2.createComponent)($ui.Badge, {\n        n: 1\n    }))($splice0()), null);\n    (0, web_3.insert)(_el$, () => ($ui => (0, web_2.createComponent)($ui.Badge, {\n        n: 2\n    }))($splice0()), null);\n    return _el$;\n})();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBAagBA,QAAA;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,gBAAA,EAAAF,IAAA,QAEZ,CAAAG,GAAA,IAAAC,yBAAA,EAACD,GAAG,CAACE,KAAK;QAACC,CAAC,EAAE;KAAC,CAAI,EAAlBP,QAAA,EAAG,CACJ;IAAAG,gBAAA,EAAAF,IAAA,SAAAG,GAAA,IAAAC,yBAAA,EAACD,GAAG,CAACE,KAAK;QAACC,CAAC,EAAE;KAAC,CAAc,EAA5BP,QAAA,EAAG,CACN;IAAA,OAAAC,IAAA;AAAA,IACD","names":["$splice0","_el$","_tmpl$","_$insert","$ui","_$createComponent","Badge","n"],"ignoreList":[],"sources":["jsx/member-tag.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
// A member of a host value as a tag: the value handed over whole, and the tag
// read off it on the client.
const ui = {
  Badge: cs.create($module0, []),
};
const page = cs.create($module1, [ui]);
it("memberTag", async (t) => {
  await snapshotCase(t, "memberTag", page);
});
describe("a member of a host value as a tag", () => {
  it("draws the component it names", async () => {
    render(await evaluate(() => page));
    assert.ok(screen.getByText("badge 1"));
    assert.ok(screen.getByText("badge 2"));
  });
});
