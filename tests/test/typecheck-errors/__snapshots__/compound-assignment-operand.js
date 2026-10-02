import { cs } from "@backtickjs/core";
// Checked as TypeScript checks one: a variable that isn't `const`, and operands
// the operator takes.
export const constant = cs.create(
  "3586xtu4la89h:5:24",
  { params: [] },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    const n = 0;\n    n += 1;\n    return n;\n};\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;kBAI2B;IACzB,MAAMA,CAAC,GAAG,CAAC;IAEXA,CAAC,IAAI,CAAC;IACN,OAAOA,CAAC;AACV,CAAC","names":["n"],"ignoreList":[],"sources":["typecheck-errors/compound-assignment-operand.test.tsx"]}',
  [],
);
export const mixed = cs.create(
  "3586xtu4la89h:12:21",
  { params: [] },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    let n = 1;\n    n -= "a";\n    return n;\n};\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;kBAWwB;IACtB,IAAIA,CAAC,GAAG,CAAC;IAETA,CAAC,IAAI,GAAG;IACR,OAAOA,CAAC;AACV,CAAC","names":["n"],"ignoreList":[],"sources":["typecheck-errors/compound-assignment-operand.test.tsx"]}',
  [],
);
