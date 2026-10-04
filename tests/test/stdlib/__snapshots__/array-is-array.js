import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "311zee6pw10s9:11:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    return [Array.isArray([]), Array.isArray([1, 2]), Array.isArray("ab"), Array.isArray({\n            length: 0\n        }), Array.isArray(null)];\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAUO;IACD,OAAO,CACLA,KAAK,CAACC,OAAO,CAAC,EAAE,CAAC,EACjBD,KAAK,CAACC,OAAO,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,EACrBD,KAAK,CAACC,OAAO,CAAC,IAAI,CAAC,EACnBD,KAAK,CAACC,OAAO,CAAC;YAAEC,MAAM,EAAE;SAAG,CAAC,EAC5BF,KAAK,CAACC,OAAO,CAAC,IAAI,CAAC,CACpB;AACH,CAAC","names":["Array","isArray","length"],"ignoreList":[],"sources":["stdlib/array-is-array.test.tsx"]}',
  dependencies: [],
};
// Any value may be asked about, and only an array answers true: a string has
// a length and indexes, and is still not one.
it("arrayIsArray", async (t) => {
  await snapshotCase(t, "arrayIsArray", cs.create($module0, []));
});
