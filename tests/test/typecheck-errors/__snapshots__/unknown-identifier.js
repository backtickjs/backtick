import { cs } from "@backtickjs/core";
// A name a script didn't bind is the client's global, read off `globalThis`:
// one the project declares — `window`, from the DOM's lib — reads as it is. A
// host binding is no global, however it is in scope around the script, so it
// is reported where it is written: it has to be spliced.
const hostValue = 5;
export const host = cs.create(
  "2t0yx6qaqtfpp:9:20",
  { params: [] },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    return hostValue + 1;\n};\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;kBAQuB;IAErB,OAAOA,SAAS,GAAG,CAAC;AACtB,CAAC","names":["hostValue"],"ignoreList":[],"sources":["typecheck-errors/unknown-identifier.test.tsx"]}',
  [],
);
export const assigned = cs.create(
  "2t0yx6qaqtfpp:14:24",
  { params: [] },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    count = 1;\n};\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;kBAa2B;IAEzBA,KAAK,GAAG,CAAC;AACX,CAAC","names":["count"],"ignoreList":[],"sources":["typecheck-errors/unknown-identifier.test.tsx"]}',
  [],
);
export const global = cs.create(
  "2t0yx6qaqtfpp:19:22",
  { params: [] },
  '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => window.location.href;\n}',
  '{"version":3,"file":"module.jsx","mappings":";;;kBAkByB,MAAAA,MAAM,CAACC,QAAQ,CAACC,IAAI","names":["window","location","href"],"ignoreList":[],"sources":["typecheck-errors/unknown-identifier.test.tsx"]}',
  [],
);
