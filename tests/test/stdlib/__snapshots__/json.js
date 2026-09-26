import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// Text in, value out, and back again. What round-trips is the format's to say
// — so what is here is what every host spells the same way, and a value a
// host could not hand back is not a value this admits.
it("jsonRoundTrip", async (t) => {
  await snapshotCase(
    t,
    "jsonRoundTrip",
    cs.create(
      "1nb9j9gha9a2e:12:4",
      { params: [] },
      {
        code: 'export default () => {\n    const numbers = JSON.stringify([1, 2, 3]);\n    const text = JSON.stringify("hi");\n    const flag = JSON.stringify(true);\n    const held = JSON.stringify({ a: 1, b: "two" });\n    const back = JSON.parse(numbers);\n    return (numbers +\n        "|" +\n        text +\n        "|" +\n        flag +\n        "|" +\n        held +\n        "|" +\n        JSON.stringify(back) +\n        "|" +\n        JSON.stringify(JSON.parse(held)));\n};',
        map: '{"version":3,"file":"json.test.jsx","sourceRoot":"","sources":["json.test.tsx"],"names":[],"mappings":"eAWO;IACD,MAAM,OAAO,GAAG,IAAI,CAAC,SAAS,CAAC,CAAC,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC;IAC1C,MAAM,IAAI,GAAG,IAAI,CAAC,SAAS,CAAC,IAAI,CAAC,CAAC;IAClC,MAAM,IAAI,GAAG,IAAI,CAAC,SAAS,CAAC,IAAI,CAAC,CAAC;IAClC,MAAM,IAAI,GAAG,IAAI,CAAC,SAAS,CAAC,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,EAAE,KAAK,EAAE,CAAC,CAAC;IAChD,MAAM,IAAI,GAAG,IAAI,CAAC,KAAK,CAAC,OAAO,CAAC,CAAC;IACjC,OAAO,CACL,OAAO;QACP,GAAG;QACH,IAAI;QACJ,GAAG;QACH,IAAI;QACJ,GAAG;QACH,IAAI;QACJ,GAAG;QACH,IAAI,CAAC,SAAS,CAAC,IAAI,CAAC;QACpB,GAAG;QACH,IAAI,CAAC,SAAS,CAAC,IAAI,CAAC,KAAK,CAAC,IAAI,CAAC,CAAC,CACjC,CAAC;AACJ,CAAC"}',
      },
    ),
  );
});
