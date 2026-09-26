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
        code: 'export default () => {\n    const rounded = Math.round(2.5) + "," + Math.round(-2.5) + "," + Math.round(-0.5);\n    const edges = Math.floor(-1.5) + "," + Math.ceil(-1.5) + "," + Math.trunc(-1.5);\n    const picks = Math.min(3, 1, 2) + "," + Math.max(3, 1, 2) + "," + Math.abs(-4);\n    return (rounded +\n        "|" +\n        edges +\n        "|" +\n        picks +\n        "|" +\n        Math.sqrt(9) +\n        "," +\n        Math.sign(-8) +\n        "," +\n        Math.fround(1.5) +\n        "|" +\n        (Math.PI > 3.14) +\n        "," +\n        (Math.E > 2.71));\n};',
        map: '{"version":3,"file":"math.test.jsx","sourceRoot":"","sources":["math.test.tsx"],"names":[],"mappings":"eAWO;IACD,MAAM,OAAO,GACX,IAAI,CAAC,KAAK,CAAC,GAAG,CAAC,GAAG,GAAG,GAAG,IAAI,CAAC,KAAK,CAAC,CAAC,GAAG,CAAC,GAAG,GAAG,GAAG,IAAI,CAAC,KAAK,CAAC,CAAC,GAAG,CAAC,CAAC;IACpE,MAAM,KAAK,GACT,IAAI,CAAC,KAAK,CAAC,CAAC,GAAG,CAAC,GAAG,GAAG,GAAG,IAAI,CAAC,IAAI,CAAC,CAAC,GAAG,CAAC,GAAG,GAAG,GAAG,IAAI,CAAC,KAAK,CAAC,CAAC,GAAG,CAAC,CAAC;IACpE,MAAM,KAAK,GACT,IAAI,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,GAAG,GAAG,GAAG,IAAI,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,GAAG,GAAG,GAAG,IAAI,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC;IACnE,OAAO,CACL,OAAO;QACP,GAAG;QACH,KAAK;QACL,GAAG;QACH,KAAK;QACL,GAAG;QACH,IAAI,CAAC,IAAI,CAAC,CAAC,CAAC;QACZ,GAAG;QACH,IAAI,CAAC,IAAI,CAAC,CAAC,CAAC,CAAC;QACb,GAAG;QACH,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC;QAChB,GAAG;QACH,CAAC,IAAI,CAAC,EAAE,GAAG,IAAI,CAAC;QAChB,GAAG;QACH,CAAC,IAAI,CAAC,CAAC,GAAG,IAAI,CAAC,CAChB,CAAC;AACJ,CAAC"}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
