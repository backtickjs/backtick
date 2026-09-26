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
        code: 'export default () => {\n  const numbers = JSON.stringify([1, 2, 3]);\n  const text = JSON.stringify("hi");\n  const flag = JSON.stringify(true);\n  const held = JSON.stringify({\n    a: 1,\n    b: "two"\n  });\n  const back = JSON.parse(numbers);\n  return numbers + "|" + text + "|" + flag + "|" + held + "|" + JSON.stringify(back) + "|" + JSON.stringify(JSON.parse(held));\n};',
        map: '{"version":3,"mappings":"eAWO;EACD,MAAMA,OAAO,GAAGC,IAAI,CAACC,SAAS,CAAC,CAAC,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,CAAC;EACzC,MAAMC,IAAI,GAAGF,IAAI,CAACC,SAAS,CAAC,IAAI,CAAC;EACjC,MAAME,IAAI,GAAGH,IAAI,CAACC,SAAS,CAAC,IAAI,CAAC;EACjC,MAAMG,IAAI,GAAGJ,IAAI,CAACC,SAAS,CAAC;IAAEI,CAAC,EAAE,CAAC;IAAEC,CAAC,EAAE;EAAK,CAAE,CAAC;EAC/C,MAAMC,IAAI,GAAGP,IAAI,CAACQ,KAAK,CAACT,OAAO,CAAC;EAChC,OACEA,OAAO,GACP,GAAG,GACHG,IAAI,GACJ,GAAG,GACHC,IAAI,GACJ,GAAG,GACHC,IAAI,GACJ,GAAG,GACHJ,IAAI,CAACC,SAAS,CAACM,IAAI,CAAC,GACpB,GAAG,GACHP,IAAI,CAACC,SAAS,CAACD,IAAI,CAACQ,KAAK,CAACJ,IAAI,CAAC,CAAC;AAEpC,CAAC","names":["numbers","JSON","stringify","text","flag","held","a","b","back","parse"],"ignoreList":[],"sources":["json.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
