import { cs } from "@backtickjs/core";
// A step is checked as TypeScript checks one: a number, in a variable that
// isn't `const`.
export const constant = cs.create(
  "3iw6lzhko8e0n:5:24",
  { params: [] },
  "() => {\n    const i = 0;\n    i++;\n    return i;\n}",
  '{"version":3,"file":"step-operand.test.jsx","sourceRoot":"","sources":["typecheck-errors/step-operand.test.tsx"],"names":[],"mappings":"AAI2B;IACzB,MAAM,CAAC,GAAG,CAAC,CAAC;IAEZ,CAAC,EAAE,CAAC;IACJ,OAAO,CAAC,CAAC;AACX,CAAC"}',
);
export const text = cs.create(
  "3iw6lzhko8e0n:12:20",
  { params: [] },
  '() => {\n    let s = "a";\n    s++;\n    return s;\n}',
  '{"version":3,"file":"step-operand.test.jsx","sourceRoot":"","sources":["typecheck-errors/step-operand.test.tsx"],"names":[],"mappings":"AAWuB;IACrB,IAAI,CAAC,GAAG,GAAG,CAAC;IAEZ,CAAC,EAAE,CAAC;IACJ,OAAO,CAAC,CAAC;AACX,CAAC"}',
);
