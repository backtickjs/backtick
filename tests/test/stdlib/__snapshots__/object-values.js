import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "1lmwvcf4zc2ir:11:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    const prices = {\n        apple: 1,\n        pear: 2\n    };\n    return {\n        values: Object.values(prices),\n        holds: [Object.hasOwn(prices, "pear"), Object.hasOwn(prices, "plum")]\n    };\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAUO;IACD,MAAMA,MAAM,GAAG;QAAEC,KAAK,EAAE,CAAC;QAAEC,IAAI,EAAE;KAAG;IACpC,OAAO;QACLC,MAAM,EAAEC,MAAM,CAACD,MAAM,CAACH,MAAM,CAAC;QAC7BK,KAAK,EAAE,CAACD,MAAM,CAACE,MAAM,CAACN,MAAM,EAAE,MAAM,CAAC,EAAEI,MAAM,CAACE,MAAM,CAACN,MAAM,EAAE,MAAM,CAAC;KACrE;AACH,CAAC","names":["prices","apple","pear","values","Object","holds","hasOwn"],"ignoreList":[],"sources":["stdlib/object-values.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "block",
};
// An object's values in key order, and whether it holds a key: the check a
// script would otherwise write as `Object.keys(o).includes(k)`.
it("objectValues", async (t) => {
  await snapshotCase(t, "objectValues", cs.create($module0, []));
});
