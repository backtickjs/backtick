import { cs } from "@backtickjs/core";
const stored = cs.create(
  "2ybl4zwhlhjta:13:15",
  { params: [] },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => x => {\n    const y = x;\n    return 1;\n};\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;kBAYkB,MAACA,CAAQ;IACzB,MAAMC,CAAC,GAAGD,CAAC;IACX,OAAO,CAAC;AACV,CAAC","names":["x","y"],"ignoreList":[],"sources":["typecheck-errors/undefined-annotation.test.tsx"]}',
  [],
);
const written = cs.create(
  "2ybl4zwhlhjta:18:16",
  { params: [] },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => x => {\n    let y = "";\n    y = x;\n    return 1;\n};\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;kBAiBmB,MAACA,CAAQ;IAC1B,IAAIC,CAAC,GAAG,EAAE;IAEVA,CAAC,GAAGD,CAAC;IACL,OAAO,CAAC;AACV,CAAC","names":["x","y"],"ignoreList":[],"sources":["typecheck-errors/undefined-annotation.test.tsx"]}',
  [],
);
