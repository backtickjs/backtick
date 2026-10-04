import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "rkwygfa87yuf:15:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div>`);\nexports.default = $splice0 => (() => {\n    var _el$ = _tmpl$();\n    (0, web_2.insert)(_el$, $splice0);\n    return _el$;\n})();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;kBAcOA,QAAA;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,gBAAA,EAAAF,IAAA,EAAMD,QAAA;IAAA,OAAAC,IAAA;AAAA,IAA+D","names":["$splice0","_el$","_tmpl$","_$insert"],"ignoreList":[],"sources":["jsx/mapped-elements.test.tsx"]}',
  dependencies: ["solid-js/web"],
};
const $module1 = {
  id: "rkwygfa87yuf:15:43",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<span>`);\nexports.default = $splice0 => (() => {\n    var _el$ = _tmpl$();\n    (0, web_2.insert)(_el$, $splice0);\n    return _el$;\n})();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;kBAc8CA,QAAA;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,gBAAA,EAAAF,IAAA,EAAOD,QAAA;IAAA,OAAAC,IAAA;AAAA,IAAa","names":["$splice0","_el$","_tmpl$","_$insert"],"ignoreList":[],"sources":["jsx/mapped-elements.test.tsx"]}',
  dependencies: ["solid-js/web"],
};
const elementLabels = ["alpha", "beta", "gamma"];
// A list mapped on the host. The array is host data, so the map runs while
// bundling and each item becomes a script of its own — the list's length is
// fixed in the bundle. `largeData` is the other shape, where a script maps on
// the client and the bundle carries one template plus the data.
it("mappedElements", async (t) => {
  await snapshotCase(
    t,
    "mappedElements",
    cs.create($module0, [
      {
        kind: "splice",
        value: elementLabels.map((item) =>
          cs.create($module1, [{ kind: "splice", value: item, bindings: [] }]),
        ),
        bindings: [],
      },
    ]),
  );
});
