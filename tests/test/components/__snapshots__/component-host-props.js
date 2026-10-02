import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A component's props are the host's own. It runs while bundling and consumes
// them there, so they never cross and need not be able to: a class instance and
// a host function are both fine here, where either would be refused in a
// script.
//
// This is why a drawing's props are `unknown` rather than what a client value
// may be — crossing is a tag's requirement, checked where a tag lowers.
class Palette {
  accent;
  constructor(accent) {
    this.accent = accent;
  }
}
async function Swatch(props) {
  const accent = props.palette.accent;
  const label = props.label();
  return cs.create(
    "2w330bu6mnxi6:22:9",
    {
      params: [
        { kind: "splice", value: accent, bindings: [] },
        { kind: "splice", value: label, bindings: [] },
      ],
    },
    '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nconst web_4 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<span>`);\nexports.default = ($splice0, $splice1) => (() => {\n    var _el$ = _tmpl$();\n    (0, web_4.insert)(_el$, $splice1);\n    (0, web_3.effect)(() => (0, web_2.className)(_el$, $splice0()));\n    return _el$;\n})();\n}',
    '{"version":3,"file":"module.jsx","mappings":";;;;;;;;kBAqBY,CAAAA,QAAA,EAAAC,QAAA;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,gBAAA,EAAAF,IAAA,EAAuBD,QAAA;IAAAI,gBAAA,QAAAC,mBAAA,EAAAJ,IAAA,EAAVF,QAAA,EAAO;IAAA,OAAAE,IAAA;AAAA,IAAiB","names":["$splice0","$splice1","_el$","_tmpl$","_$insert","_$effect","_$className"],"ignoreList":[],"sources":["components/component-host-props.test.tsx"]}',
    ["solid-js/web"],
  );
}
it("componentHostProps", async (t) => {
  await snapshotCase(
    t,
    "componentHostProps",
    cs.create(
      "2w330bu6mnxi6:29:4",
      {
        params: [
          {
            kind: "splice",
            value: _jsx(Swatch, {
              palette: new Palette("danger"),
              label: () => "one",
            }),
            bindings: [],
          },
        ],
      },
      '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div>`);\nexports.default = $splice0 => (() => {\n    var _el$ = _tmpl$();\n    (0, web_2.insert)(_el$, $splice0);\n    return _el$;\n})();\n}',
      '{"version":3,"file":"module.jsx","mappings":";;;;;;kBA4BOA,QAAA;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,gBAAA,EAAAF,IAAA,EACAD,QAAA;IAAA,OAAAC,IAAA;AAAA,IACG","names":["$splice0","_el$","_tmpl$","_$insert"],"ignoreList":[],"sources":["components/component-host-props.test.tsx"]}',
      ["solid-js/web"],
    ),
  );
});
