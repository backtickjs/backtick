import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { snapshotCase } from "../snapshotCase.ts";
// A signal holding an enum, handed to a function whose parameter is that enum.
//
// The member is spliced as itself and the signal holds `Color` rather than
// `Color.Red`, so the other member is a value it takes. What a splice hands
// over keeps the width the host gave it: `cs.splice` reads it back unbound, and
// the binding it lands in decides the width the way TypeScript decides every
// other one — a member to its enum, as a `let` would.
var Color;
(function (Color) {
  Color[(Color["Red"] = 0)] = "Red";
  Color[(Color["Blue"] = 1)] = "Blue";
})(Color || (Color = {}));
const colorName = cs.create(
  "133ie16u4j0dm:19:48",
  { params: [{ kind: "splice", value: Color.Blue, bindings: [] }] },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => c => {\n    return c === $splice0() ? "blue" : "red";\n};\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;kBAkBmDA,QAAA,IAACC,CAAQ;IAC1D,OAAOA,CAAC,KAAKD,QAAA,EAAC,GAAe,MAAM,GAAG,KAAK;AAC7C,CAAC","names":["$splice0","c"],"ignoreList":[],"sources":["state/state-enum.test.tsx"]}',
  [],
);
async function Swatch() {
  return cs.create(
    "133ie16u4j0dm:24:9",
    {
      params: [
        { kind: "splice", value: createSignal, bindings: [] },
        { kind: "splice", value: Color.Red, bindings: [] },
        { kind: "splice", value: Color.Blue, bindings: [] },
        { kind: "splice", value: colorName, bindings: [] },
      ],
    },
    '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<span>`);\nexports.default = ($splice0, $splice1, $splice2, $splice3) => {\n    const held = $splice0()($splice1());\n    return (() => {\n        var _el$ = _tmpl$();\n        _el$.$$click = () => held[1]($splice2());\n        (0, web_3.insert)(_el$, () => $splice3()(held[0]()));\n        return _el$;\n    })();\n};\n(0, web_2.delegateEvents)(["click"]);\n}',
    '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBAuBY,CAAAA,QAAA,EAAAC,QAAA,EAAAC,QAAA,EAAAC,QAAA;IACR,MAAMC,IAAI,GAAGJ,QAAA,EAAa,CAACC,QAAA,EAAC,CAAY;IACxC;QAAA,IAAAI,IAAA,GAAAC,MAAA;QAAAD,IAAA,CAAAE,OAAA,GACiB,MAAMH,IAAI,CAAC,CAAC,CAAC,CAACF,QAAA,EAAC,CAAa;QAAAM,gBAAA,EAAAH,IAAA,QACxCF,QAAA,EAAU,CAACC,IAAI,CAAC,CAAC,CAAC,EAAE,CAAC;QAAA,OAAAC,IAAA;IAAA;AAG5B,CAAC","names":["$splice0","$splice1","$splice2","$splice3","held","_el$","_tmpl$","$$click","_$insert"],"ignoreList":[],"sources":["state/state-enum.test.tsx"]}',
    ["solid-js/web"],
  );
}
it("Swatch", async (t) => {
  await snapshotCase(t, "Swatch", _jsx(Swatch, {}));
});
