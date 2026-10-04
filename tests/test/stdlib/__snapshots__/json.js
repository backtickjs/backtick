import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "1nb9j9gha9a2e:12:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    const numbers = JSON.stringify([1, 2, 3]);\n    const text = JSON.stringify("hi");\n    const flag = JSON.stringify(true);\n    const held = JSON.stringify({\n        a: 1,\n        b: "two"\n    });\n    const back = JSON.parse(numbers);\n    return numbers + "|" + text + "|" + flag + "|" + held + "|" + JSON.stringify(back) + "|" + JSON.stringify(JSON.parse(held));\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAWO;IACD,MAAMA,OAAO,GAAGC,IAAI,CAACC,SAAS,CAAC,CAAC,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,CAAC;IACzC,MAAMC,IAAI,GAAGF,IAAI,CAACC,SAAS,CAAC,IAAI,CAAC;IACjC,MAAME,IAAI,GAAGH,IAAI,CAACC,SAAS,CAAC,IAAI,CAAC;IACjC,MAAMG,IAAI,GAAGJ,IAAI,CAACC,SAAS,CAAC;QAAEI,CAAC,EAAE,CAAC;QAAEC,CAAC,EAAE;KAAO,CAAC;IAC/C,MAAMC,IAAI,GAAGP,IAAI,CAACQ,KAAK,CAACT,OAAO,CAAC;IAChC,OACEA,OAAO,GACP,GAAG,GACHG,IAAI,GACJ,GAAG,GACHC,IAAI,GACJ,GAAG,GACHC,IAAI,GACJ,GAAG,GACHJ,IAAI,CAACC,SAAS,CAACM,IAAI,CAAC,GACpB,GAAG,GACHP,IAAI,CAACC,SAAS,CAACD,IAAI,CAACQ,KAAK,CAACJ,IAAI,CAAC,CAAC;AAEpC,CAAC","names":["numbers","JSON","stringify","text","flag","held","a","b","back","parse"],"ignoreList":[],"sources":["stdlib/json.test.tsx"]}',
  dependencies: [],
};
// Text in, value out, and back again. What round-trips is the format's to say
// — so what is here is what every host spells the same way, and a value a
// host could not hand back is not a value this admits.
it("jsonRoundTrip", async (t) => {
  await snapshotCase(t, "jsonRoundTrip", cs.create($module0, []));
});
