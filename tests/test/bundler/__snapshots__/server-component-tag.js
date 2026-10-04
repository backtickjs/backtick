import assert from "node:assert/strict";
import { it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { cs } from "@backtickjs/core";
const $module0 = {
  id: "1yqy3pwul9j8j:9:9",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<hr>`);\nexports.default = () => _tmpl$();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;kBAQY,MAAAA,MAAA,EAAM","names":["_tmpl$"],"ignoreList":[],"sources":["bundler/server-component-tag.test.tsx"]}',
  dependencies: ["solid-js/web"],
};
const $module1 = {
  id: "1yqy3pwul9j8j:15:13",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div>`);\nexports.default = $tag0 => (() => {\n    var _el$ = _tmpl$();\n    (0, web_2.insert)(_el$, (0, web_3.createComponent)($tag0, {}));\n    return _el$;\n})();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBAcgBA,KAAA;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,gBAAA,EAAAF,IAAA,EAAAG,yBAAA,EAEPJ,KAAK;IAAA,OAAAC,IAAA;AAAA,IACF","names":["$tag0","_el$","_tmpl$","_$insert","_$createComponent"],"ignoreList":[],"sources":["bundler/server-component-tag.test.tsx"]}',
  dependencies: ["solid-js/web"],
};
// A server component written as a tag in a script, past the typechecker:
// refused when bundling, pointing at the splice it belongs in.
function Rule() {
  return cs.create($module0, []);
}
it("refuses a server component as a tag in a script", async () => {
  await assert.rejects(
    bundler.build({
      input: cs.create($module1, [{ kind: "tag", value: Rule }]),
      external: {},
    }),
    {
      message:
        "`<Rule>` is a server component, so it can't be a tag in a script, whose tags are client components. Use it in a splice: `{${<Rule />}}`.",
    },
  );
});
