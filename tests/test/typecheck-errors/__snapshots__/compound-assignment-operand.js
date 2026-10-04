import { cs } from "@backtickjs/core";
const $module0 = {
  id: "3586xtu4la89h:5:24",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    const n = 0;\n    n += 1;\n    return n;\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAI2B;IACzB,MAAMA,CAAC,GAAG,CAAC;IAEXA,CAAC,IAAI,CAAC;IACN,OAAOA,CAAC;AACV,CAAC","names":["n"],"ignoreList":[],"sources":["typecheck-errors/compound-assignment-operand.test.tsx"]}',
  dependencies: [],
  params: [],
};
const $module1 = {
  id: "3586xtu4la89h:12:21",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    let n = 1;\n    n -= "a";\n    return n;\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAWwB;IACtB,IAAIA,CAAC,GAAG,CAAC;IAETA,CAAC,IAAI,GAAG;IACR,OAAOA,CAAC;AACV,CAAC","names":["n"],"ignoreList":[],"sources":["typecheck-errors/compound-assignment-operand.test.tsx"]}',
  dependencies: [],
  params: [],
};
// Checked as TypeScript checks one: a variable that isn't `const`, and operands
// the operator takes.
export const constant = cs.create($module0, []);
export const mixed = cs.create($module1, []);
