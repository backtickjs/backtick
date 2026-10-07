import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "2y4si690gyts2:15:41",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0() + "!";\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAc4CA,QAAA,IAAAA,QAAA,EAAwB,GAAG,GAAG","names":["$splice0"],"ignoreList":[],"sources":["splices/await-in-splice.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
const $module1 = {
  id: "2y4si690gyts2:22:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => {\n    const greeting = $splice0();\n    return greeting + "!";\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAqBOA,QAAA;IACD,MAAMC,QAAQ,GAAGD,QAAA,EAAwB;IACzC,OAAOC,QAAQ,GAAG,GAAG;AACvB,CAAC","names":["$splice0","greeting"],"ignoreList":[],"sources":["splices/await-in-splice.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "block",
};
const $module2 = {
  id: "2y4si690gyts2:31:14",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<b>`);\nexports.default = () => props => (() => {\n    var _el$ = _tmpl$();\n    (0, web_2.insert)(_el$, () => props.children);\n    return _el$;\n})();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;kBA8BiB,MAACA,KAAgC;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,gBAAA,EAAAF,IAAA,QAASD,KAAK,CAACI,QAAQ;IAAA,OAAAH,IAAA;AAAA,IAAK","names":["props","_el$","_tmpl$","_$insert","children"],"ignoreList":[],"sources":["splices/await-in-splice.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [],
  kind: "function",
};
const $module3 = {
  id: "2y4si690gyts2:37:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nexports.default = ($splice0, $splice1) => ($Badge => (0, web_1.createComponent)($Badge, {\n    get children() {\n        return $splice1();\n    }\n}))($splice0());\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;kBAoCO,CAAAA,QAAA,EAAAC,QAAA,MAAAC,MAAA,IAAAC,yBAAA,EAACD,MAAM;IAAA,IAAAE;QAAA,OAAEH,QAAA,EAAwB;IAAA;CAAA,CAAU,EAA1CD,QAAA,EAAM,CAAoC","names":["$splice0","$splice1","$Badge","_$createComponent","children"],"ignoreList":[],"sources":["splices/await-in-splice.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "expression",
};
const $module4 = {
  id: "2y4si690gyts2:47:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<p>`);\nexports.default = ($splice0, $splice1) => (() => {\n    var _el$ = _tmpl$();\n    (0, web_3.insert)(_el$, $splice0, null);\n    (0, web_3.insert)(_el$, () => [1, 2].map(n => ($Badge => (0, web_2.createComponent)($Badge, {\n        children: n\n    }))($splice1())), null);\n    return _el$;\n})();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBA8CO,CAAAA,QAAA,EAAAC,QAAA;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,gBAAA,EAAAF,IAAA,EAEEF,QAAA;IAAAI,gBAAA,EAAAF,IAAA,QACA,CAAC,CAAC,EAAE,CAAC,CAAC,CAACG,GAAG,CAAEC,CAAS,IACpB,CAAAC,MAAA,IAAAC,yBAAA,EAACD,MAAM;QAAAE,QAAA,EAAEH;KAAC,CAAU,EAAnBL,QAAA,EAAM,CACR,CAAC;IAAA,OAAAC,IAAA;AAAA,IAEL","names":["$splice0","$splice1","_el$","_tmpl$","_$insert","map","n","$Badge","_$createComponent","children"],"ignoreList":[],"sources":["splices/await-in-splice.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "expression",
};
const $module5 = {
  id: "2y4si690gyts2:62:46",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => fetch("/rows");\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA6DiD,MAAAA,KAAK,CAAC,OAAO,CAAC","names":["fetch"],"ignoreList":[],"sources":["splices/await-in-splice.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "expression",
};
async function fetchGreeting() {
  return "hello";
}
// A spliced host expression evaluates in the template's own scope — the
// compiled output wraps it in no function — so `await` works wherever the
// template itself may await, here in an async test, whether the script is an
// expression or has statements.
it("awaitInSplice", async (t) => {
  await snapshotCase(
    t,
    "awaitInSplice",
    cs.create($module0, [await fetchGreeting()]),
  );
});
it("awaitInStatementsSplice", async (t) => {
  await snapshotCase(
    t,
    "awaitInStatementsSplice",
    cs.create($module1, [await fetchGreeting()]),
  );
});
// The same `await`, in a splice that is a child of a component tag, which
// the typechecker reads as JSX in a function of its own: awaited there too.
const Badge = cs.create($module2, []);
it("awaitInTagChildSplice", async (t) => {
  await snapshotCase(
    t,
    "awaitInTagChildSplice",
    cs.create($module3, [Badge, await fetchGreeting()]),
  );
});
// A tag in a function the script writes, in a script that awaits: that
// function isn't async, so the tag's isn't awaited there.
it("awaitBesideMappedTag", async (t) => {
  await snapshotCase(
    t,
    "awaitBesideMappedTag",
    cs.create($module4, [await fetchGreeting(), Badge]),
  );
});
// A script whose splices await nothing keeps its own value's type, a promise
// included, even in an async function: only an awaiting splice makes the
// script's function async.
export async function rows() {
  const response = cs.create($module5, []);
  return response;
}
