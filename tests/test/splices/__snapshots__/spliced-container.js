import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "3hhvicr225pmx:14:16",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => 1;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAamB,OAAC","names":[],"ignoreList":[],"sources":["splices/spliced-container.test.tsx"]}',
  dependencies: [],
};
const $module1 = {
  id: "3hhvicr225pmx:16:14",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => "origin";\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAeiB,cAAQ","names":[],"ignoreList":[],"sources":["splices/spliced-container.test.tsx"]}',
  dependencies: [],
};
const $module2 = {
  id: "3hhvicr225pmx:21:44",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0().x + 1;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAoB+CA,QAAA,IAAAA,QAAA,EAAM,CAACC,CAAC,GAAG,CAAC","names":["$splice0","x"],"ignoreList":[],"sources":["splices/spliced-container.test.tsx"]}',
  dependencies: [],
};
// A container the host built holding scripts, spliced whole.
//
// Each member crosses as what its script produced, so a script reads
// `{ x: number, label: string }` where the host wrote `{ x: Client<number>,
// label: Client<string> }`. Reading `x` off it has to typecheck as a number,
// which is what pins the direction `cs.splice` maps in: forward, from what the
// host wrote. Read the other way — from the client's type back to what the host
// may write — this shape is the one TypeScript cannot infer, and a splice has
// nowhere to name it, since the compiler writes the call.
const originX = cs.create($module0, []);
const label = cs.create($module1, []);
const point = { x: originX, label };
it("splicedContainer", async (t) => {
  await snapshotCase(
    t,
    "splicedContainer",
    cs.create($module2, [{ kind: "splice", value: point, bindings: [] }]),
  );
});
