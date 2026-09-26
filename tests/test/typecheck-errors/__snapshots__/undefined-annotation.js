import { cs } from "@backtickjs/core";
const stored = cs.create(
  "2ybl4zwhlhjta:13:15",
  { params: [] },
  {
    code: "export default () => x => {\n  const y = x;\n  return 1;\n};",
    map: '{"version":3,"mappings":"eAYkB,MAACA,CAAQ,IAAI;EAC7B,MAAMC,CAAC,GAAGD,CAAC;EACX,OAAO,CAAC;AACV,CAAC","names":["x","y"],"ignoreList":[],"sources":["undefined-annotation.test.tsx"]}',
    imports: [],
    exportAt: 0,
  },
);
const written = cs.create(
  "2ybl4zwhlhjta:18:16",
  { params: [] },
  {
    code: 'export default () => x => {\n  let y = "";\n  y = x;\n  return 1;\n};',
    map: '{"version":3,"mappings":"eAiBmB,MAACA,CAAQ,IAAI;EAC9B,IAAIC,CAAC,GAAG,EAAE;EAEVA,CAAC,GAAGD,CAAC;EACL,OAAO,CAAC;AACV,CAAC","names":["x","y"],"ignoreList":[],"sources":["undefined-annotation.test.tsx"]}',
    imports: [],
    exportAt: 0,
  },
);
