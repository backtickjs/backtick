import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// The one global. What it is, is the host's to answer; which members exist
// and what each means is the format's, which is why the list is short — only
// the members every host can agree on to the last bit are here.
it("math", async (t) => {
  await snapshotCase(
    t,
    "math",
    cs.create(
      "1j4uiiyebx17u:12:4",
      { params: [] },
      {
        code: 'export default () => {\n  const rounded = Math.round(2.5) + "," + Math.round(-2.5) + "," + Math.round(-0.5);\n  const edges = Math.floor(-1.5) + "," + Math.ceil(-1.5) + "," + Math.trunc(-1.5);\n  const picks = Math.min(3, 1, 2) + "," + Math.max(3, 1, 2) + "," + Math.abs(-4);\n  return rounded + "|" + edges + "|" + picks + "|" + Math.sqrt(9) + "," + Math.sign(-8) + "," + Math.fround(1.5) + "|" + (Math.PI > 3.14) + "," + (Math.E > 2.71);\n};',
        map: '{"version":3,"mappings":"eAWO;EACD,MAAMA,OAAO,GACXC,IAAI,CAACC,KAAK,CAAC,GAAG,CAAC,GAAG,GAAG,GAAGD,IAAI,CAACC,KAAK,CAAC,CAAC,GAAG,CAAC,GAAG,GAAG,GAAGD,IAAI,CAACC,KAAK,CAAC,CAAC,GAAG,CAAC;EACnE,MAAMC,KAAK,GACTF,IAAI,CAACG,KAAK,CAAC,CAAC,GAAG,CAAC,GAAG,GAAG,GAAGH,IAAI,CAACI,IAAI,CAAC,CAAC,GAAG,CAAC,GAAG,GAAG,GAAGJ,IAAI,CAACK,KAAK,CAAC,CAAC,GAAG,CAAC;EACnE,MAAMC,KAAK,GACTN,IAAI,CAACO,GAAG,CAAC,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,GAAG,GAAG,GAAGP,IAAI,CAACQ,GAAG,CAAC,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,GAAG,GAAG,GAAGR,IAAI,CAACS,GAAG,CAAC,CAAC,CAAC,CAAC;EAClE,OACEV,OAAO,GACP,GAAG,GACHG,KAAK,GACL,GAAG,GACHI,KAAK,GACL,GAAG,GACHN,IAAI,CAACU,IAAI,CAAC,CAAC,CAAC,GACZ,GAAG,GACHV,IAAI,CAACW,IAAI,CAAC,CAAC,CAAC,CAAC,GACb,GAAG,GACHX,IAAI,CAACY,MAAM,CAAC,GAAG,CAAC,GAChB,GAAG,IACFZ,IAAI,CAACa,EAAE,GAAG,IAAI,CAAC,GAChB,GAAG,IACFb,IAAI,CAACc,CAAC,GAAG,IAAI,CAAC;AAEnB,CAAC","names":["rounded","Math","round","edges","floor","ceil","trunc","picks","min","max","abs","sqrt","sign","fround","PI","E"],"ignoreList":[],"sources":["math.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
