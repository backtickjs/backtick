import { cs } from "@backtickjs/core";
// A step is checked as TypeScript checks one: a number, in a variable that
// isn't `const`.
export const constant = cs.create(
  "3iw6lzhko8e0n:5:24",
  { params: [] },
  {
    code: "export default () => {\n  const i = 0;\n  i++;\n  return i;\n};",
    map: '{"version":3,"mappings":"eAI2B;EACzB,MAAMA,CAAC,GAAG,CAAC;EAEXA,CAAC,EAAE;EACH,OAAOA,CAAC;AACV,CAAC","names":["i"],"ignoreList":[],"sources":["step-operand.test.tsx"]}',
    imports: [],
    exportAt: 0,
  },
);
export const text = cs.create(
  "3iw6lzhko8e0n:12:20",
  { params: [] },
  {
    code: 'export default () => {\n  let s = "a";\n  s++;\n  return s;\n};',
    map: '{"version":3,"mappings":"eAWuB;EACrB,IAAIA,CAAC,GAAG,GAAG;EAEXA,CAAC,EAAE;EACH,OAAOA,CAAC;AACV,CAAC","names":["s"],"ignoreList":[],"sources":["step-operand.test.tsx"]}',
    imports: [],
    exportAt: 0,
  },
);
