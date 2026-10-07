import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "bid8r58d3fdk:12:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    const rows = [1, 2, 3];\n    const first = rows.find(row => row > 1);\n    return first * 10;\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAWO;IACD,MAAMA,IAAI,GAAG,CAAC,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC;IACtB,MAAMC,KAAK,GAAGD,IAAI,CAACE,IAAI,CAAEC,GAAG,IAAKA,GAAG,GAAG,CAAC,CAAE;IAE1C,OAAOF,KAAK,GAAG,EAAE;AACnB,CAAC","names":["rows","first","find","row"],"ignoreList":[],"sources":["expressions/non-null-assertion.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "block",
};
// A non-null assertion is the checker's alone, as `as` is: erased on the way
// to a bundle. `find` answers `number | undefined`; the script knows a row
// past 1 exists, and `!` says so.
it("nonNullAssertion", async (t) => {
  await snapshotCase(t, "nonNullAssertion", cs.create($module0, []));
});
