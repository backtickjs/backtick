import assert from "node:assert/strict";
import { it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { cs } from "@backtickjs/core";
const $module0 = {
  id: "1ffrf3pln049q:9:9",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<hr>`);\nexports.default = () => _tmpl$();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;kBAQY,MAAAA,MAAA,EAAM","names":["_tmpl$"],"ignoreList":[],"sources":["bundler/server-component-tag.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [],
  kind: "expression",
};
const $module1 = {
  id: "1ffrf3pln049q:15:13",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div>`);\nexports.default = $splice0 => (() => {\n    var _el$ = _tmpl$();\n    (0, web_3.insert)(_el$, () => ($Rule => (0, web_2.createComponent)($Rule, {}))($splice0()));\n    return _el$;\n})();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBAcgBA,QAAA;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,gBAAA,EAAAF,IAAA,QAGN,CAAAG,KAAA,IAAAC,yBAAA,EAACD,KAAK,KAAG,EAARJ,QAAA,EAAK,CACR;IAAA,OAAAC,IAAA;AAAA,IACD","names":["$splice0","_el$","_tmpl$","_$insert","$Rule","_$createComponent"],"ignoreList":[],"sources":["bundler/server-component-tag.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
// A server component written as a tag in a script, past the typechecker:
// refused when bundling, pointing at the splice it belongs in.
function Rule() {
  return cs.create($module0, []);
}
it("refuses a server component as a tag in a script", async () => {
  await assert.rejects(
    bundler.build({
      input: cs.create($module1, [Rule]),
      packageVersions: {},
    }),
    {
      message:
        "Can't splice the host function `Rule`: it's host code, and only runs on the host. Write a client function as a script instead: cs`(n: number) => ...`; a server component is drawn in a braced splice: `{${<Rule />}}`.",
    },
  );
});
