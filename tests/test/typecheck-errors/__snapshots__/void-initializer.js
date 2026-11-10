import { cs } from "@backtickjs/core";
const $module0 = {
  id: "2as6z5psop7u2:5:13",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => () => {\n    let n = 0;\n    n = 1;\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAIgB;IACd,IAAIA,CAAC,GAAG,CAAC;IACTA,CAAC,GAAG,CAAC;AACP,CAAC","names":["n"],"ignoreList":[],"sources":["typecheck-errors/void-initializer.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "function",
  scope: "module",
};
const $module1 = {
  id: "2as6z5psop7u2:10:15",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => {\n    const x = $splice0()();\n    return 1;\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBASkBA,QAAA;IAChB,MAAMC,CAAC,GAAGD,QAAA,EAAK,EAAE;IACjB,OAAO,CAAC;AACV,CAAC","names":["$splice0","x"],"ignoreList":[],"sources":["typecheck-errors/void-initializer.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "block",
  scope: "module",
};
const $module2 = {
  id: "2as6z5psop7u2:17:14",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => text => {\n    return text;\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAgBiB,MAACA,IAAY;IAC5B,OAAOA,IAAI;AACb,CAAC","names":["text"],"ignoreList":[],"sources":["typecheck-errors/void-initializer.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "function",
  scope: "module",
};
const $module3 = {
  id: "2as6z5psop7u2:21:22",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => {\n    const x = $splice0()(true);\n    return 1;\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAoByBA,QAAA;IAEvB,MAAMC,CAAC,GAAGD,QAAA,EAAM,CAAC,IAAI,CAAC;IACtB,OAAO,CAAC;AACV,CAAC","names":["$splice0","x"],"ignoreList":[],"sources":["typecheck-errors/void-initializer.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "block",
  scope: "module",
};
// A call of a function that returns nothing produces no value: its `void`
// result can't initialize a variable.
const ping = cs.create($module0, []);
const script = cs.create($module1, [ping]);
// An error inside a checked initializer reports once: the duplicate copy
// the check sequences is shielded.
const label = cs.create($module2, []);
const wrongArgument = cs.create($module3, [label]);
