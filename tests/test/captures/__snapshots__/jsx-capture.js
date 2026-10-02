import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A binding declared in an enclosing script and captured by a script spliced
// into it: the spliced script is handed `x` where it is called.
const script = cs.create(
  "njvzopgmpqpe:7:15",
  {
    params: [
      {
        kind: "splice",
        value: cs.create(
          "njvzopgmpqpe:9:11",
          { params: [{ kind: "capture", key: "x$njvzopgmpqpe$0" }] },
          '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<span>`);\nexports.default = $capture0 => (() => {\n    var _el$ = _tmpl$();\n    _el$.$$click = () => $capture0;\n    return _el$;\n})();\n(0, web_2.delegateEvents)(["click"]);\n}',
          '{"version":3,"file":"module.jsx","mappings":";;;;;;kBAQcA,SAAA;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAD,IAAA,CAAAE,OAAA,GAAe,MAAMH,SAAC;IAAA,OAAAC,IAAA;AAAA,IAAI","names":["$capture0","_el$","_tmpl$","$$click"],"ignoreList":[],"sources":["captures/jsx-capture.test.tsx"]}',
          ["solid-js/web"],
        ),
        bindings: ["x$njvzopgmpqpe$0"],
      },
    ],
  },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => () => {\n    const x = 1;\n    return $splice0(x);\n};\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;kBAMkBA,QAAA;IAChB,MAAMC,CAAC,GAAG,CAAC;IACX,OAAOD,QAAA,CAAAC,CAAA,CAAC;AACV,CAAC","names":["$splice0","x"],"ignoreList":[],"sources":["captures/jsx-capture.test.tsx"]}',
  [],
);
it("jsxCapture", async (t) => {
  await snapshotCase(t, "jsxCapture", script);
});
