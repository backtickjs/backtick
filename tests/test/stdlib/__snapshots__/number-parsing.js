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
    {
      code: 'export default () => {\n    const whole = Number.parseInt("42px");\n    const based = Number.parseInt("ff", 16);\n    const fractional = Number.parseFloat("1.5");\n    return <span>{whole + based + fractional + ""}</span>;\n};',
      map: '{"version":3,"file":"number-parsing.test.jsx","sourceRoot":"","sources":["number-parsing.test.tsx"],"names":[],"mappings":"eAQY;IACR,MAAM,KAAK,GAAG,MAAM,CAAC,QAAQ,CAAC,MAAM,CAAC,CAAC;IACtC,MAAM,KAAK,GAAG,MAAM,CAAC,QAAQ,CAAC,IAAI,EAAE,EAAE,CAAC,CAAC;IACxC,MAAM,UAAU,GAAG,MAAM,CAAC,UAAU,CAAC,KAAK,CAAC,CAAC;IAC5C,OAAO,CAAC,IAAI,CAAC,CAAC,KAAK,GAAG,KAAK,GAAG,UAAU,GAAG,EAAE,CAAC,EAAE,IAAI,CAAC,CAAC;AACxD,CAAC"}',
      imports: [],
      exportAt: 0,
    },
  );
}
it("Parsed", async (t) => {
  await snapshotCase(t, "Parsed", _jsx(Parsed, {}));
});
