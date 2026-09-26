import { cs } from "@backtickjs/core";
// Checked as TypeScript checks one: a variable that isn't `const`, and operands
// the operator takes.
export const constant = cs.create(
  "3586xtu4la89h:5:24",
  { params: [] },
  {
    code: "export default () => {\n    const n = 0;\n    n += 1;\n    return n;\n};",
    map: '{"version":3,"file":"compound-assignment-operand.test.jsx","sourceRoot":"","sources":["compound-assignment-operand.test.tsx"],"names":[],"mappings":"eAI2B;IACzB,MAAM,CAAC,GAAG,CAAC,CAAC;IAEZ,CAAC,IAAI,CAAC,CAAC;IACP,OAAO,CAAC,CAAC;AACX,CAAC"}',
  },
);
export const mixed = cs.create(
  "3586xtu4la89h:12:21",
  { params: [] },
  {
    code: 'export default () => {\n    let n = 1;\n    n -= "a";\n    return n;\n};',
    map: '{"version":3,"file":"compound-assignment-operand.test.jsx","sourceRoot":"","sources":["compound-assignment-operand.test.tsx"],"names":[],"mappings":"eAWwB;IACtB,IAAI,CAAC,GAAG,CAAC,CAAC;IAEV,CAAC,IAAI,GAAG,CAAC;IACT,OAAO,CAAC,CAAC;AACX,CAAC"}',
  },
);
