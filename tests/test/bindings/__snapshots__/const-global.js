import assert from "node:assert/strict";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
const createRoot = {
  "@backtickjs": "ClientImport",
  name: "createRoot",
  from: "solid-js",
  version: "1.9.14",
};
import { evaluate } from "../evaluate.ts";
const $module0 = {
  id: "3795lknovctiq:21:30",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0()(() => CLIENT_FLAG);\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAoBiCA,QAAA,IAAAA,QAAA,EAAW,CAAC,MAAMC,WAAW,CAAC","names":["$splice0","CLIENT_FLAG"],"ignoreList":[],"sources":["bindings/const-global.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
Object.assign(globalThis, { CLIENT_FLAG: true });
// A host binding of the same name hides the global only where it is in scope.
export function elsewhere(CLIENT_FLAG) {
  return CLIENT_FLAG;
}
it("reads a global the project declares with const", async () => {
  assert.equal(await evaluate(cs.create($module0, [createRoot])), true);
});
