import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A tree spliced into a body and bound to a name before it is used. Nothing
// applies it at the hole and nothing draws it there — it is a value, held and
// handed back, and the position that receives it is what draws it.
//
// The shape this pins is that an entry reached from a body is *applied*: the
// value says which entry and what to hand it, and that is the whole of what an
// instance-to-be is. There was once a second way to say it — naming the entry,
// and calling what that named — and this is the case it existed for.
const HeldRow = async () =>
  cs.create(
    "3cjyucql1m4dw:13:28",
    { params: [] },
    '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<span>x`);\nexports.default = () => _tmpl$();\n}',
    '{"version":3,"file":"module.jsx","mappings":";;;;;kBAY+B,MAAAA,MAAA,EAAc","names":["_tmpl$"],"ignoreList":[],"sources":["jsx/tree-in-variable.test.tsx"]}',
    ["solid-js/web"],
  );
const heldElement = cs.create(
  "3cjyucql1m4dw:15:20",
  {
    params: [
      {
        kind: "splice",
        value: cs.create(
          "3cjyucql1m4dw:16:17",
          { params: [] },
          '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div>`);\nexports.default = () => _tmpl$();\n}',
          '{"version":3,"file":"module.jsx","mappings":";;;;;kBAeoB,MAAAA,MAAA,EAAO","names":["_tmpl$"],"ignoreList":[],"sources":["jsx/tree-in-variable.test.tsx"]}',
          ["solid-js/web"],
        ),
        bindings: [],
      },
    ],
  },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => () => {\n    const tree = $splice0();\n    return tree;\n};\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;kBAcuBA,QAAA;IACrB,MAAMC,IAAI,GAAGD,QAAA,EAAc;IAC3B,OAAOC,IAAI;AACb,CAAC","names":["$splice0","tree"],"ignoreList":[],"sources":["jsx/tree-in-variable.test.tsx"]}',
  [],
);
const heldComponent = cs.create(
  "3cjyucql1m4dw:20:22",
  { params: [{ kind: "splice", value: _jsx(HeldRow, {}), bindings: [] }] },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => () => {\n    const tree = $splice0();\n    return tree;\n};\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;kBAmByBA,QAAA;IACvB,MAAMC,IAAI,GAAGD,QAAA,EAAgB;IAC7B,OAAOC,IAAI;AACb,CAAC","names":["$splice0","tree"],"ignoreList":[],"sources":["jsx/tree-in-variable.test.tsx"]}',
  [],
);
it("treeInVariable", async (t) => {
  await snapshotCase(
    t,
    "treeInVariable",
    cs.create(
      "3cjyucql1m4dw:29:4",
      {
        params: [
          { kind: "splice", value: heldElement, bindings: [] },
          { kind: "splice", value: heldComponent, bindings: [] },
        ],
      },
      '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div>`);\nexports.default = ($splice0, $splice1) => (() => {\n    var _el$ = _tmpl$();\n    (0, web_2.insert)(_el$, () => $splice0()(), null);\n    (0, web_2.insert)(_el$, () => $splice1()(), null);\n    return _el$;\n})();\n}',
      '{"version":3,"file":"module.jsx","mappings":";;;;;;kBA4BO,CAAAA,QAAA,EAAAC,QAAA;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,gBAAA,EAAAF,IAAA,QACAF,QAAA,EAAY,EAAE;IAAAI,gBAAA,EAAAF,IAAA,QACdD,QAAA,EAAc,EAAE;IAAA,OAAAC,IAAA;AAAA,IACb","names":["$splice0","$splice1","_el$","_tmpl$","_$insert"],"ignoreList":[],"sources":["jsx/tree-in-variable.test.tsx"]}',
      ["solid-js/web"],
    ),
  );
});
