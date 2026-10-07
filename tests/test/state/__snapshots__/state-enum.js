import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "3ekonqoxkrl1q:19:48",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => c => {\n    return c === $splice0() ? "blue" : "red";\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAkBmDA,QAAA,IAACC,CAAQ;IAC1D,OAAOA,CAAC,KAAKD,QAAA,EAAa,GAAG,MAAM,GAAG,KAAK;AAC7C,CAAC","names":["$splice0","c"],"ignoreList":[],"sources":["state/state-enum.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "function",
};
const $module1 = {
  id: "3ekonqoxkrl1q:24:9",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<span>`);\nexports.default = ($splice0, $splice1, $splice2, $splice3) => {\n    const [held, setHeld] = $splice0()($splice1());\n    return (() => {\n        var _el$ = _tmpl$();\n        _el$.$$click = () => setHeld($splice2());\n        (0, web_3.insert)(_el$, () => $splice3()(held()));\n        return _el$;\n    })();\n};\n(0, web_2.delegateEvents)(["click"]);\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBAuBY,CAAAA,QAAA,EAAAC,QAAA,EAAAC,QAAA,EAAAC,QAAA;IACR,MAAM,CAACC,IAAI,EAAEC,OAAO,CAAC,GAAGL,QAAA,EAAa,CAACC,QAAA,EAAY,CAAC;IACnD;QAAA,IAAAK,IAAA,GAAAC,MAAA;QAAAD,IAAA,CAAAE,OAAA,GACiB,MAAMH,OAAO,CAACH,QAAA,EAAa,CAAC;QAAAO,gBAAA,EAAAH,IAAA,QAAGH,QAAA,EAAU,CAACC,IAAI,EAAE,CAAC;QAAA,OAAAE,IAAA;IAAA;AAEpE,CAAC","names":["$splice0","$splice1","$splice2","$splice3","held","setHeld","_el$","_tmpl$","$$click","_$insert"],"ignoreList":[],"sources":["state/state-enum.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "block",
};
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
const colorName = cs.create($module0, [Color.Blue]);
async function Swatch() {
  return cs.create($module1, [createSignal, Color.Red, Color.Blue, colorName]);
}
it("Swatch", async (t) => {
  await snapshotCase(t, "Swatch", _jsx(Swatch, {}));
});
