import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "353rib4gy05pn:12:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    const count = "one";\n    return count;\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAWO;IAED,MAAMA,KAAK,GAAW,KAAK;IAC3B,OAAOA,KAAK;AACd,CAAC","names":["count"],"ignoreList":[],"sources":["expressions/ts-expect-error.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "block",
};
// A checker directive written in a script covers the statement below it, as it
// does in TypeScript. The typecheck of this file is the assertion: it passes
// only while the error is there and the directive suppresses it.
it("tsExpectError", async (t) => {
  await snapshotCase(t, "tsExpectError", cs.create($module0, []));
});
