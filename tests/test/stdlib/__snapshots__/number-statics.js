import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "1o8290c5hfi65:9:9",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<span>`);\nexports.default = () => {\n    const positive = Number.EPSILON > 0;\n    const largest = Number.MAX_VALUE > 1e308;\n    const safe = Number.MAX_SAFE_INTEGER === 9007199254740991 && Number.MIN_SAFE_INTEGER === -9007199254740991 && Number.MIN_VALUE > 0 && Number.isSafeInteger(3) && !Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1);\n    const whole = Number.isInteger(2);\n    const fractional = Number.isInteger(2.5);\n    const written = Number.isFinite("2");\n    return (() => {\n        var _el$ = _tmpl$();\n        (0, web_2.insert)(_el$, whole + " " + fractional + " " + written + " " + positive + " " + largest + " " + safe);\n        return _el$;\n    })();\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;kBAQY;IACR,MAAMA,QAAQ,GAAGC,MAAM,CAACC,OAAO,GAAG,CAAC;IACnC,MAAMC,OAAO,GAAGF,MAAM,CAACG,SAAS,GAAG,KAAK;IACxC,MAAMC,IAAI,GACRJ,MAAM,CAACK,gBAAgB,KAAK,gBAAgB,IAC5CL,MAAM,CAACM,gBAAgB,KAAK,CAAC,gBAAgB,IAC7CN,MAAM,CAACO,SAAS,GAAG,CAAC,IACpBP,MAAM,CAACQ,aAAa,CAAC,CAAC,CAAC,IACvB,CAACR,MAAM,CAACQ,aAAa,CAACR,MAAM,CAACK,gBAAgB,GAAG,CAAC,CAAC;IACpD,MAAMI,KAAK,GAAGT,MAAM,CAACU,SAAS,CAAC,CAAC,CAAC;IACjC,MAAMC,UAAU,GAAGX,MAAM,CAACU,SAAS,CAAC,GAAG,CAAC;IAExC,MAAME,OAAO,GAAGZ,MAAM,CAACa,QAAQ,CAAC,GAAG,CAAC;IACpC;QAAA,IAAAC,IAAA,GAAAC,MAAA;QAAAC,gBAAA,EAAAF,IAAA,EAEKL,KAAK,GACJ,GAAG,GACHE,UAAU,GACV,GAAG,GACHC,OAAO,GACP,GAAG,GACHb,QAAQ,GACR,GAAG,GACHG,OAAO,GACP,GAAG,GACHE,IAAI;QAAA,OAAAU,IAAA;IAAA;AAGZ,CAAC","names":["positive","Number","EPSILON","largest","MAX_VALUE","safe","MAX_SAFE_INTEGER","MIN_SAFE_INTEGER","MIN_VALUE","isSafeInteger","whole","isInteger","fractional","written","isFinite","_el$","_tmpl$","_$insert"],"ignoreList":[],"sources":["stdlib/number-statics.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [],
  kind: "block",
};
// A namespace holding a value beside its functions: `Number.EPSILON` is read
// where `Number.isInteger` is called, and both are whole names the client
// answers rather than a member read off a `Number` there is no value for.
async function Checked() {
  return cs.create($module0, []);
}
it("Checked", async (t) => {
  await snapshotCase(t, "Checked", _jsx(Checked, {}));
});
