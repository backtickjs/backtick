import { cs } from "@backtickjs/core";
// A step is checked as TypeScript checks one: a number, in a variable that
// isn't `const`.
export const constant = cs.create(
  "3iw6lzhko8e0n:5:24",
  { params: [] },
  {
    code: "export default () => {\n    const i = 0;\n    i++;\n    return i;\n};",
    map: '{"version":3,"file":"step-operand.test.jsx","sourceRoot":"","sources":["typecheck-errors/step-operand.test.tsx"],"names":[],"mappings":"eAI2B;IACzB,MAAM,CAAC,GAAG,CAAC,CAAC;IAEZ,CAAC,EAAE,CAAC;IACJ,OAAO,CAAC,CAAC;AACX,CAAC"}',
  },
);
export const text = cs.create(
  "3iw6lzhko8e0n:12:20",
  { params: [] },
  {
    code: 'export default () => {\n    let s = "a";\n    s++;\n    return s;\n};',
    map: '{"version":3,"file":"step-operand.test.jsx","sourceRoot":"","sources":["typecheck-errors/step-operand.test.tsx"],"names":[],"mappings":"eAWuB;IACrB,IAAI,CAAC,GAAG,GAAG,CAAC;IAEZ,CAAC,EAAE,CAAC;IACJ,OAAO,CAAC,CAAC;AACX,CAAC"}',
  },
);
