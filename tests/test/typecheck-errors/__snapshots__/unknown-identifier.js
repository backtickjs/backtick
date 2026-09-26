import { cs } from "@backtickjs/core";
// A name a script didn't bind is the client's global, read off `globalThis`:
// one the project declares — `window`, from the DOM's lib — reads as it is. A
// host binding is no global, however it is in scope around the script, so it
// is reported where it is written: it has to be spliced.
const hostValue = 5;
export const host = cs.create(
  "2t0yx6qaqtfpp:9:20",
  { params: [] },
  "() => {\n    return hostValue + 1;\n}",
  '{"version":3,"file":"unknown-identifier.test.jsx","sourceRoot":"","sources":["typecheck-errors/unknown-identifier.test.tsx"],"names":[],"mappings":"AAQuB;IAErB,OAAO,SAAS,GAAG,CAAC,CAAC;AACvB,CAAC"}',
);
export const assigned = cs.create(
  "2t0yx6qaqtfpp:14:24",
  { params: [] },
  "() => {\n    count = 1;\n}",
  '{"version":3,"file":"unknown-identifier.test.jsx","sourceRoot":"","sources":["typecheck-errors/unknown-identifier.test.tsx"],"names":[],"mappings":"AAa2B;IAEzB,KAAK,GAAG,CAAC,CAAC;AACZ,CAAC"}',
);
export const global = cs.create(
  "2t0yx6qaqtfpp:19:22",
  { params: [] },
  "() => window.location.href",
  '{"version":3,"file":"unknown-identifier.test.jsx","sourceRoot":"","sources":["typecheck-errors/unknown-identifier.test.tsx"],"names":[],"mappings":"AAkByB,MAAA,MAAM,CAAC,QAAQ,CAAC,IAAI"}',
);
