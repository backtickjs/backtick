import { cs } from "@backtickjs/core";
const $module0 = {
  id: "3t1x6ghgr300c:10:20",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    return hostValue + 1;\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBASuB;IAErB,OAAOA,SAAS,GAAG,CAAC;AACtB,CAAC","names":["hostValue"],"ignoreList":[],"sources":["typecheck-errors/unknown-identifier.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "block",
};
const $module1 = {
  id: "3t1x6ghgr300c:15:24",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    count = 1;\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAc2B;IAEzBA,KAAK,GAAG,CAAC;AACX,CAAC","names":["count"],"ignoreList":[],"sources":["typecheck-errors/unknown-identifier.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "block",
};
const $module2 = {
  id: "3t1x6ghgr300c:21:45",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    return hostParam;\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAoBgD;IAE9C,OAAOA,SAAS;AAClB,CAAC","names":["hostParam"],"ignoreList":[],"sources":["typecheck-errors/unknown-identifier.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "block",
};
const $module3 = {
  id: "3t1x6ghgr300c:26:22",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => window.location.href;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAyByB,MAAAA,MAAM,CAACC,QAAQ,CAACC,IAAI","names":["window","location","href"],"ignoreList":[],"sources":["typecheck-errors/unknown-identifier.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "expression",
};
// A name a script didn't bind is the client's global: one the project
// declares — `window`, from the DOM's lib — reads as it is, and one it
// doesn't is reported as TypeScript reports it. A host binding is no global,
// however it is in scope around the script, so it is reported where it is
// written: it has to be spliced.
const hostValue = 5;
export const host = cs.create($module0, []);
export const assigned = cs.create($module1, []);
// However deep the host binding is declared, if the script is in its scope.
export const scoped = (hostParam) => cs.create($module2, []);
export const global = cs.create($module3, []);
