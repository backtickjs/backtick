import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "26efeom523wsc:11:16",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => label => {\n    return {\n        label: $splice0()(label)\n    };\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAUmBA,QAAA,IAACC,KAAa;IAC7B,OAAO;QAAEA,KAAK,EAAED,QAAA,EAAa,CAACC,KAAK;KAAG;AACxC,CAAC","names":["$splice0","label"],"ignoreList":[],"sources":["state/script-state.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
};
const $module1 = {
  id: "26efeom523wsc:15:9",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<span style=font-size:16px>`);\nexports.default = $splice0 => (() => {\n    var _el$ = _tmpl$();\n    _el$.$$click = () => {\n        const row = $splice0()("one");\n        row.label[1](row.label[0]() + " !!!");\n    };\n    (0, web_3.insert)(_el$, () => $splice0()("one").label[0]());\n    return _el$;\n})();\n(0, web_2.delegateEvents)(["click"]);\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBAcYA,QAAA;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAD,IAAA,CAAAE,OAAA,GAEC;QACP,MAAMC,GAAG,GAAGJ,QAAA,EAAM,CAAC,KAAK,CAAC;QACzBI,GAAG,CAACC,KAAK,CAAC,CAAC,CAAC,CAACD,GAAG,CAACC,KAAK,CAAC,CAAC,CAAC,EAAE,GAAG,MAAM,CAAC;IACvC,CAAC;IAAAC,gBAAA,EAAAL,IAAA,QAEAD,QAAA,EAAM,CAAC,KAAK,CAAC,CAACK,KAAK,CAAC,CAAC,CAAC,EAAE;IAAA,OAAAJ,IAAA;AAAA,IACpB","names":["$splice0","_el$","_tmpl$","$$click","row","label","_$insert"],"ignoreList":[],"sources":["state/script-state.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [{ kind: "splice", bindings: [] }],
};
// Storage a script declares for itself, rather than one a component owns and
// splices in. `$createSignal(...)` is an ordinary call of an imported value, and
// the signal is what the call answers with: each time it is evaluated there is
// another signal, which is what lets a script build a row that carries its own.
async function ScriptRows() {
  const build = cs.create($module0, [createSignal]);
  return cs.create($module1, [build]);
}
it("ScriptRows", async (t) => {
  await snapshotCase(t, "ScriptRows", _jsx(ScriptRows, {}));
});
