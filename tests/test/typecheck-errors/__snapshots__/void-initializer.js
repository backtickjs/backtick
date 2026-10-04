import { cs } from "@backtickjs/core";
const $module0 = {
  id: "3ch7rgcn8bjeq:5:13",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => () => {\n    let n = 0;\n    n = 1;\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAIgB;IACd,IAAIA,CAAC,GAAG,CAAC;IACTA,CAAC,GAAG,CAAC;AACP,CAAC","names":["n"],"ignoreList":[],"sources":["typecheck-errors/void-initializer.test.tsx"]}',
  dependencies: [],
};
const $module1 = {
  id: "3ch7rgcn8bjeq:10:15",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => {\n    const x = $splice0()();\n    return 1;\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBASkBA,QAAA;IAChB,MAAMC,CAAC,GAAGD,QAAA,EAAK,EAAE;IACjB,OAAO,CAAC;AACV,CAAC","names":["$splice0","x"],"ignoreList":[],"sources":["typecheck-errors/void-initializer.test.tsx"]}',
  dependencies: [],
};
const $module2 = {
  id: "3ch7rgcn8bjeq:15:15",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => {\n    const x = $splice0()();\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAckBA,QAAA;IAChB,MAAMC,CAAC,GAAGD,QAAA,EAAK,EAAE;AACnB,CAAC","names":["$splice0","x"],"ignoreList":[],"sources":["typecheck-errors/void-initializer.test.tsx"]}',
  dependencies: [],
};
const $module3 = {
  id: "3ch7rgcn8bjeq:21:14",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => text => {\n    return text;\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAoBiB,MAACA,IAAY;IAC5B,OAAOA,IAAI;AACb,CAAC","names":["text"],"ignoreList":[],"sources":["typecheck-errors/void-initializer.test.tsx"]}',
  dependencies: [],
};
const $module4 = {
  id: "3ch7rgcn8bjeq:25:22",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => {\n    const x = $splice0()(true);\n    return 1;\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAwByBA,QAAA;IAEvB,MAAMC,CAAC,GAAGD,QAAA,EAAM,CAAC,IAAI,CAAC;IACtB,OAAO,CAAC;AACV,CAAC","names":["$splice0","x"],"ignoreList":[],"sources":["typecheck-errors/void-initializer.test.tsx"]}',
  dependencies: [],
};
// An action call produces no value: its `void` result can't initialize a
// variable — in a value script or an action.
const ping = cs.create($module0, []);
const script = cs.create($module1, [
  { kind: "splice", value: ping, bindings: [] },
]);
const action = cs.create($module2, [
  { kind: "splice", value: ping, bindings: [] },
]);
// An error inside a checked initializer reports once: the duplicate copy
// the check sequences is shielded.
const label = cs.create($module3, []);
const wrongArgument = cs.create($module4, [
  { kind: "splice", value: label, bindings: [] },
]);
