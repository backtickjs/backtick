import { cs } from "@backtickjs/core";
const $module0 = {
  id: "l2xcqm5jzb5g:8:21",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    window.console.log("logged");\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAOwB;IACtBA,MAAM,CAACC,OAAO,CAACC,GAAG,CAAC,QAAQ,CAAC;AAC9B,CAAC","names":["window","console","log"],"ignoreList":[],"sources":["typecheck-errors/script-without-value.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "block",
  scope: "module",
};
const $module1 = {
  id: "l2xcqm5jzb5g:13:26",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => window.console.log("logged");\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAY6B,MAAAA,MAAM,CAACC,OAAO,CAACC,GAAG,CAAC,QAAQ,CAAC","names":["window","console","log"],"ignoreList":[],"sources":["typecheck-errors/script-without-value.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "expression",
  scope: "module",
};
const $module2 = {
  id: "l2xcqm5jzb5g:15:22",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => () => {\n    window.console.log("logged");\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAcyB;IACvBA,MAAM,CAACC,OAAO,CAACC,GAAG,CAAC,QAAQ,CAAC;AAC9B,CAAC","names":["window","console","log"],"ignoreList":[],"sources":["typecheck-errors/script-without-value.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "function",
  scope: "module",
};
const $module3 = {
  id: "l2xcqm5jzb5g:19:22",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => () => {\n    $splice0()();\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAkByBA,QAAA;IACvBA,QAAA,EAAO,EAAE;AACX,CAAC","names":["$splice0"],"ignoreList":[],"sources":["typecheck-errors/script-without-value.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "function",
  scope: "module",
};
const $module4 = {
  id: "l2xcqm5jzb5g:24:23",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => undefined;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAuB0B,MAAAA,SAAS","names":["undefined"],"ignoreList":[],"sources":["typecheck-errors/script-without-value.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "expression",
  scope: "module",
};
const $module5 = {
  id: "l2xcqm5jzb5g:25:22",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => JSON.parse("{}");\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAwByB,MAAAA,IAAI,CAACC,KAAK,CAAC,IAAI,CAAC","names":["JSON","parse"],"ignoreList":[],"sources":["typecheck-errors/script-without-value.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "expression",
  scope: "module",
};
const $module6 = {
  id: "l2xcqm5jzb5g:29:22",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    throw new Error("thrown");\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA4ByB;IACvB,MAAM,IAAIA,KAAK,CAAC,QAAQ,CAAC;AAC3B,CAAC","names":["Error"],"ignoreList":[],"sources":["typecheck-errors/script-without-value.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "block",
  scope: "module",
};
// A script is one value, made at load, so one that makes no value is refused
// where it's written, a block or an expression: code that only does something
// is a function, called where it runs.
// @ts-expect-error: a script that makes no value
export const block = cs.create($module0, []);
// @ts-expect-error: a script that makes no value
export const expression = cs.create($module1, []);
export const logged = cs.create($module2, []);
export const called = cs.create($module3, [logged]);
// `undefined` is a value, and so is a script TypeScript can't type.
export const nothing = cs.create($module4, []);
export const parsed = cs.create($module5, []);
// A script that always throws is a value too: it throws at load. Last, as
// TypeScript reads what follows it as unreachable.
export const thrown = cs.create($module6, []);
