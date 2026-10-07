import { cs } from "@backtickjs/core";
const $module0 = {
  id: "3iw6lzhko8e0n:5:24",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    const i = 0;\n    i++;\n    return i;\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAI2B;IACzB,MAAMA,CAAC,GAAG,CAAC;IAEXA,CAAC,EAAE;IACH,OAAOA,CAAC;AACV,CAAC","names":["i"],"ignoreList":[],"sources":["typecheck-errors/step-operand.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "block",
};
const $module1 = {
  id: "3iw6lzhko8e0n:12:20",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    let s = "a";\n    s++;\n    return s;\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAWuB;IACrB,IAAIA,CAAC,GAAG,GAAG;IAEXA,CAAC,EAAE;IACH,OAAOA,CAAC;AACV,CAAC","names":["s"],"ignoreList":[],"sources":["typecheck-errors/step-operand.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "block",
};
// A step is checked as TypeScript checks one: a number, in a variable that
// isn't `const`.
export const constant = cs.create($module0, []);
export const text = cs.create($module1, []);
