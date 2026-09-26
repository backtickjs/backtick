import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A namespace holding a value beside its functions: `Number.EPSILON` is read
// where `Number.isInteger` is called, and both are whole names the client
// answers rather than a member read off a `Number` there is no value for.
async function Checked() {
  return cs.create(
    "1o8290c5hfi65:9:9",
    { params: [] },
    {
      code: 'export default () => {\n    const positive = Number.EPSILON > 0;\n    const largest = Number.MAX_VALUE > 1e308;\n    const safe = Number.MAX_SAFE_INTEGER === 9007199254740991 &&\n        Number.MIN_SAFE_INTEGER === -9007199254740991 &&\n        Number.MIN_VALUE > 0 &&\n        Number.isSafeInteger(3) &&\n        !Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1);\n    const whole = Number.isInteger(2);\n    const fractional = Number.isInteger(2.5);\n    const written = Number.isFinite("2");\n    return (<span>\n        {whole +\n            " " +\n            fractional +\n            " " +\n            written +\n            " " +\n            positive +\n            " " +\n            largest +\n            " " +\n            safe}\n      </span>);\n};',
      map: '{"version":3,"file":"number-statics.test.jsx","sourceRoot":"","sources":["number-statics.test.tsx"],"names":[],"mappings":"eAQY;IACR,MAAM,QAAQ,GAAG,MAAM,CAAC,OAAO,GAAG,CAAC,CAAC;IACpC,MAAM,OAAO,GAAG,MAAM,CAAC,SAAS,GAAG,KAAK,CAAC;IACzC,MAAM,IAAI,GACR,MAAM,CAAC,gBAAgB,KAAK,gBAAgB;QAC5C,MAAM,CAAC,gBAAgB,KAAK,CAAC,gBAAgB;QAC7C,MAAM,CAAC,SAAS,GAAG,CAAC;QACpB,MAAM,CAAC,aAAa,CAAC,CAAC,CAAC;QACvB,CAAC,MAAM,CAAC,aAAa,CAAC,MAAM,CAAC,gBAAgB,GAAG,CAAC,CAAC,CAAC;IACrD,MAAM,KAAK,GAAG,MAAM,CAAC,SAAS,CAAC,CAAC,CAAC,CAAC;IAClC,MAAM,UAAU,GAAG,MAAM,CAAC,SAAS,CAAC,GAAG,CAAC,CAAC;IAEzC,MAAM,OAAO,GAAG,MAAM,CAAC,QAAQ,CAAC,GAAG,CAAC,CAAC;IACrC,OAAO,CACL,CAAC,IAAI,CACH;QAAA,CAAC,KAAK;YACJ,GAAG;YACH,UAAU;YACV,GAAG;YACH,OAAO;YACP,GAAG;YACH,QAAQ;YACR,GAAG;YACH,OAAO;YACP,GAAG;YACH,IAAI,CACR;MAAA,EAAE,IAAI,CAAC,CACR,CAAC;AACJ,CAAC"}',
    },
  );
}
it("Checked", async (t) => {
  await snapshotCase(t, "Checked", _jsx(Checked, {}));
});
