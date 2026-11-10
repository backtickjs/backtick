import assert from "node:assert/strict";
import { it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { cs } from "@backtickjs/core";
import { execRoot } from "@backtickjs/core/cjs";
const $module0 = {
  id: "1zx5f1mxuxz9c:17:14",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => ({\n    count: 0\n});\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAgBiB,OAAC;IAAEA,KAAK,EAAE;CAAG,CAAC","names":["count"],"ignoreList":[],"sources":["once/across-bundles.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "expression",
  scope: "module",
};
const $module1 = {
  id: "1zx5f1mxuxz9c:18:13",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAiBgBA,QAAA,IAAAA,QAAA,EAAM","names":["$splice0"],"ignoreList":[],"sources":["once/across-bundles.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
  scope: "module",
};
const $module2 = {
  id: "1zx5f1mxuxz9c:19:16",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAkBmBA,QAAA,IAAAA,QAAA,EAAM","names":["$splice0"],"ignoreList":[],"sources":["once/across-bundles.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
  scope: "module",
};
const $module3 = {
  id: "1zx5f1mxuxz9c:35:9",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => ({\n    label: "box"\n});\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAkCY,OAAC;IAAEA,KAAK,EAAE;CAAO,CAAC","names":["label"],"ignoreList":[],"sources":["once/across-bundles.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "expression",
  scope: "function",
};
const $module4 = {
  id: "1zx5f1mxuxz9c:42:37",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => [$splice0(), $splice1()];\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAyCwC,CAAAA,QAAA,EAAAC,QAAA,MAACD,QAAA,EAAE,EAAEC,QAAA,EAAE,CAAC","names":["$splice0","$splice1"],"ignoreList":[],"sources":["once/across-bundles.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "expression",
  scope: "function",
};
const $module5 = {
  id: "1zx5f1mxuxz9c:44:29",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => [$splice0()];\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA2CgCA,QAAA,KAACA,QAAA,EAAE,CAAC","names":["$splice0"],"ignoreList":[],"sources":["once/across-bundles.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
  scope: "function",
};
// An app's bundles share the values of its module-level scripts, as an app's
// chunks share its modules: two routes that splice one module-level store get
// one store, as the runtime runs them, with one registry. A bundle run alone
// has its own.
async function run(input, values) {
  const bundle = await bundler.build({ input, modules: {} });
  const { code } = bundle.generate({ format: "cjs" });
  return execRoot(code, {}, values);
}
const store = cs.create($module0, []);
const home = cs.create($module1, [store]);
const details = cs.create($module2, [store]);
it("two bundles of an app share a value", async () => {
  const values = new Map();
  const homeStore = await run(home, values);
  const detailsStore = await run(details, values);
  assert.equal(homeStore, detailsStore);
});
it("a bundle run alone has its own", async () => {
  assert.notEqual(await run(home), await run(details));
});
// A `cs` written in a function runs each call: its values are each bundle's
// own, as a function's locals are each call's.
function box() {
  return cs.create($module3, []);
}
const a = box();
const b = box();
it("a value made in a function is each bundle's own", async () => {
  const values = new Map();
  const [first, second] = await run(cs.create($module4, [a, b]), values);
  assert.notEqual(first, second);
  const [again] = await run(cs.create($module5, [a]), values);
  assert.notEqual(again, first);
});
