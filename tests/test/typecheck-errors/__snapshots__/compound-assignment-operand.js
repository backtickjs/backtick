import { cs } from "@backtickjs/core";
// Checked as TypeScript checks one: a variable that isn't `const`, and operands
// the operator takes.
export const constant = cs.create(
  "3586xtu4la89h:5:24",
  { params: [] },
  {
    code: "export default () => {\n  const n = 0;\n  n += 1;\n  return n;\n};",
    map: '{"version":3,"mappings":"eAI2B;EACzB,MAAMA,CAAC,GAAG,CAAC;EAEXA,CAAC,IAAI,CAAC;EACN,OAAOA,CAAC;AACV,CAAC","names":["n"],"ignoreList":[],"sources":["compound-assignment-operand.test.tsx"]}',
    imports: [],
    exportAt: 0,
  },
);
export const mixed = cs.create(
  "3586xtu4la89h:12:21",
  { params: [] },
  {
    code: 'export default () => {\n  let n = 1;\n  n -= "a";\n  return n;\n};',
    map: '{"version":3,"mappings":"eAWwB;EACtB,IAAIA,CAAC,GAAG,CAAC;EAETA,CAAC,IAAI,GAAG;EACR,OAAOA,CAAC;AACV,CAAC","names":["n"],"ignoreList":[],"sources":["compound-assignment-operand.test.tsx"]}',
    imports: [],
    exportAt: 0,
  },
);
