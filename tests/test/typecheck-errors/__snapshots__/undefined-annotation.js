import { cs } from "@backtickjs/core";
const stored = cs.create(
  "2ybl4zwhlhjta:13:15",
  { params: [] },
  {
    code: "export default () => (x) => {\n    const y = x;\n    return 1;\n};",
    map: '{"version":3,"file":"undefined-annotation.test.jsx","sourceRoot":"","sources":["typecheck-errors/undefined-annotation.test.tsx"],"names":[],"mappings":"eAYkB,MAAA,CAAC,CAAQ,EAAE,EAAE;IAC7B,MAAM,CAAC,GAAG,CAAC,CAAC;IACZ,OAAO,CAAC,CAAC;AACX,CAAC"}',
  },
);
const written = cs.create(
  "2ybl4zwhlhjta:18:16",
  { params: [] },
  {
    code: 'export default () => (x) => {\n    let y = "";\n    y = x;\n    return 1;\n};',
    map: '{"version":3,"file":"undefined-annotation.test.jsx","sourceRoot":"","sources":["typecheck-errors/undefined-annotation.test.tsx"],"names":[],"mappings":"eAiBmB,MAAA,CAAC,CAAQ,EAAE,EAAE;IAC9B,IAAI,CAAC,GAAG,EAAE,CAAC;IAEX,CAAC,GAAG,CAAC,CAAC;IACN,OAAO,CAAC,CAAC;AACX,CAAC"}',
  },
);
