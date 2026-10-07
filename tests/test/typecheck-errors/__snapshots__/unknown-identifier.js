import { cs } from "@backtickjs/core";
const $module0 = {
  id: "2t0yx6qaqtfpp:9:20",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    return hostValue + 1;\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAQuB;IAErB,OAAOA,SAAS,GAAG,CAAC;AACtB,CAAC","names":["hostValue"],"ignoreList":[],"sources":["typecheck-errors/unknown-identifier.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "block",
};
const $module1 = {
  id: "2t0yx6qaqtfpp:14:24",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    count = 1;\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAa2B;IAEzBA,KAAK,GAAG,CAAC;AACX,CAAC","names":["count"],"ignoreList":[],"sources":["typecheck-errors/unknown-identifier.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "block",
};
const $module2 = {
  id: "2t0yx6qaqtfpp:19:22",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => window.location.href;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAkByB,MAAAA,MAAM,CAACC,QAAQ,CAACC,IAAI","names":["window","location","href"],"ignoreList":[],"sources":["typecheck-errors/unknown-identifier.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "expression",
};
// A name a script didn't bind is the client's global, read off `globalThis`:
// one the project declares — `window`, from the DOM's lib — reads as it is. A
// host binding is no global, however it is in scope around the script, so it
// is reported where it is written: it has to be spliced.
const hostValue = 5;
export const host = cs.create($module0, []);
export const assigned = cs.create($module1, []);
export const global = cs.create($module2, []);
