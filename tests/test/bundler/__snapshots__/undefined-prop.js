import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { onMount } from "@backtickjs/solid-js";
import { render, screen } from "@solidjs/testing-library";
import { evaluate } from "../evaluate.ts";
const $module0 = {
  id: "10qn40vm7q8r9:18:9",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<button>`);\nexports.default = ($splice0, $splice1) => (() => {\n    var _el$ = _tmpl$();\n    var _ref$ = $splice0();\n    typeof _ref$ === "function" && (0, web_3.use)(_ref$, _el$);\n    (0, web_2.insert)(_el$, $splice1);\n    return _el$;\n})();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBAiBY,CAAAA,QAAA,EAAAC,QAAA;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAA,IAAAC,KAAA,GAAaJ,QAAA,EAAI;IAAA,OAAAI,KAAA,mBAAAC,aAAA,EAAAD,KAAA,EAAAF,IAAA;IAAAI,gBAAA,EAAAJ,IAAA,EAAGD,QAAA;IAAA,OAAAC,IAAA;AAAA,IAAgB","names":["$splice0","$splice1","_el$","_tmpl$","_ref$","_$use","_$insert"],"ignoreList":[],"sources":["bundler/undefined-prop.test.tsx"]}',
  dependencies: ["solid-js/web"],
};
const $module1 = {
  id: "10qn40vm7q8r9:30:35",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => el => $splice0()(() => el.focus());\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA6BsCA,QAAA,IAACC,EAAE,IAAKD,QAAA,EAAQ,CAAC,MAAMC,EAAE,CAACC,KAAK,EAAE,CAAC","names":["$splice0","el","focus"],"ignoreList":[],"sources":["bundler/undefined-prop.test.tsx"]}',
  dependencies: [],
};
// A component forwarding an optional prop it wasn't given: `undefined` reaches
// the script, where the element takes it as JSX and TypeScript read an absent
// prop.
async function Pill({ label, ref }) {
  return cs.create($module0, [
    { kind: "splice", value: ref, bindings: [] },
    { kind: "splice", value: label, bindings: [] },
  ]);
}
describe("an undefined prop", () => {
  it("lets a component forward an optional prop it wasn't given", async () => {
    render(await evaluate(() => _jsx(Pill, { label: "plain" })));
    assert.ok(screen.getByRole("button", { name: "plain" }));
  });
  it("still reaches the element when it is given", async () => {
    render(
      await evaluate(() =>
        _jsx(Pill, {
          label: "focused",
          ref: cs.create($module1, [
            { kind: "splice", value: onMount, bindings: [] },
          ]),
        }),
      ),
    );
    assert.equal(document.activeElement, screen.getByRole("button"));
  });
});
