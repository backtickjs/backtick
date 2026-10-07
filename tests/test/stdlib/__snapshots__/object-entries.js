import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "txb5yf5uyd2o:11:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    const held = {\n        n: 1,\n        q: "ada"\n    };\n    const written = Object.fromEntries(Object.entries(held).map(pair => [pair[0], JSON.stringify(pair[1])]));\n    return written.n + " " + written.q;\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAUO;IACD,MAAMA,IAAI,GAAG;QAAEC,CAAC,EAAE,CAAC;QAAEC,CAAC,EAAE;KAAO;IAC/B,MAAMC,OAAO,GAAGC,MAAM,CAACC,WAAW,CAChCD,MAAM,CAACE,OAAO,CAACN,IAAI,CAAC,CAACO,GAAG,CAAEC,IAAI,IAAK,CAACA,IAAI,CAAC,CAAC,CAAC,EAAEC,IAAI,CAACC,SAAS,CAACF,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACvE;IACD,OAAOL,OAAO,CAACF,CAAC,GAAG,GAAG,GAAGE,OAAO,CAACD,CAAC;AACpC,CAAC","names":["held","n","q","written","Object","fromEntries","entries","map","pair","JSON","stringify"],"ignoreList":[],"sources":["stdlib/object-entries.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "block",
};
// A record read as pairs and built back from them: how a script makes a
// record whose keys it only learns when it runs.
it("objectEntries", async (t) => {
  await snapshotCase(t, "objectEntries", cs.create($module0, []));
});
