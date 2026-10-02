import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A namespace static, reached the way `Math.floor` and `Array.from` are: the
// whole of `Number.parseInt` is one name the client answers, so `Number` is a
// front rather than a value and nothing is read off it.
async function Parsed() {
  return cs.create(
    "28kni4l69t7vb:9:9",
    { params: [] },
    '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<span>298.5`);\nexports.default = () => {\n    const whole = Number.parseInt("42px");\n    const based = Number.parseInt("ff", 16);\n    const fractional = Number.parseFloat("1.5");\n    return _tmpl$();\n};\n}',
    '{"version":3,"file":"module.jsx","mappings":";;;;;kBAQY;IACR,MAAMA,KAAK,GAAGC,MAAM,CAACC,QAAQ,CAAC,MAAM,CAAC;IACrC,MAAMC,KAAK,GAAGF,MAAM,CAACC,QAAQ,CAAC,IAAI,EAAE,EAAE,CAAC;IACvC,MAAME,UAAU,GAAGH,MAAM,CAACI,UAAU,CAAC,KAAK,CAAC;IAC3C,OAAAC,MAAA;AACF,CAAC","names":["whole","Number","parseInt","based","fractional","parseFloat","_tmpl$"],"ignoreList":[],"sources":["stdlib/number-parsing.test.tsx"]}',
    ["solid-js/web"],
  );
}
it("Parsed", async (t) => {
  await snapshotCase(t, "Parsed", _jsx(Parsed, {}));
});
