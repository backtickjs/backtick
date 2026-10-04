import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "365uagjo5wofp:9:9",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => () => $splice0();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAQYA,QAAA,UAAMA,QAAA,EAAE","names":["$splice0"],"ignoreList":[],"sources":["jsx/jsx-polymorphic-prop.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
};
const $module1 = {
  id: "365uagjo5wofp:16:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div><span></span><span>`);\nexports.default = ($splice0, $splice1) => (() => {\n    var _el$ = _tmpl$(), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling;\n    (0, web_3.addEventListener)(_el$2, "click", $splice0(), true);\n    (0, web_3.addEventListener)(_el$3, "click", $splice1(), true);\n    return _el$;\n})();\n(0, web_2.delegateEvents)(["click"]);\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBAeO,CAAAA,QAAA,EAAAC,QAAA;IAAA,IAAAC,IAAA,GAAAC,MAAA,IAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA,EAAAC,KAAA,GAAAF,KAAA,CAAAG,WAAA;IAAAC,0BAAA,EAAAJ,KAAA,WACcJ,QAAA,EAAU;IAAAQ,0BAAA,EAAAF,KAAA,WACVL,QAAA,EAAU;IAAA,OAAAC,IAAA;AAAA,IACrB","names":["$splice0","$splice1","_el$","_tmpl$","_el$2","firstChild","_el$3","nextSibling","_$addEventListener"],"ignoreList":[],"sources":["jsx/jsx-polymorphic-prop.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
};
// One script body (one source location) instantiated with different splices —
// the JSX analogue of the `splice-sharing` fixture. The entry takes a thunk
// parameter, and each `onPress`'s `#call` passes its own splice as a `#thunk`.
function make(n) {
  return cs.create($module0, [n]);
}
it("jsxPolymorphicProp", async (t) => {
  await snapshotCase(
    t,
    "jsxPolymorphicProp",
    cs.create($module1, [make(1), make(2)]),
  );
});
