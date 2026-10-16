import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { cs } from "@backtickjs/core";
const createSignal = {
  "@backtickjs": "ClientImport",
  name: "createSignal",
  from: "solid-js",
  version: "1.9.14",
};
const $module0 = {
  id: "2rxo7qmky3qnh:8:9",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => {\n    const [n, setN] = $splice0()(2);\n    setN(3);\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAOYA,QAAA;IACR,MAAM,CAACC,CAAC,EAAEC,IAAI,CAAC,GAAGF,QAAA,EAAa,CAAC,CAAC,CAAC;IAClCE,IAAI,CAAC,CAAC,CAAC;AACT,CAAC","names":["$splice0","n","setN"],"ignoreList":[],"sources":["typecheck-errors/component-answers-action.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "block",
};
// A component may answer with a script, but the answer stands where a drawing
// would — so it is expanded in value position, and an action, which completes
// without returning, has nothing to draw.
async function Panel() {
  return cs.create($module0, [createSignal]);
}
// @ts-expect-error: 'Panel' cannot be used as a JSX component.
export default _jsx(Panel, {});
