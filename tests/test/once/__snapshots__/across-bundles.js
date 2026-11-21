import assert from "node:assert/strict";
import { it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { cs, createRuntime } from "@backtickjs/core";
const $module0 = {
  id: "2oahf97hqd4f2:19:14",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => ({\n    count: 0\n});\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAkBiB,OAAC;IAAEA,KAAK,EAAE;CAAG,CAAC","names":["count"],"ignoreList":[],"sources":["once/across-bundles.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "expression",
  scope: "module",
};
const $module1 = {
  id: "2oahf97hqd4f2:20:13",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAmBgBA,QAAA,IAAAA,QAAA,EAAM","names":["$splice0"],"ignoreList":[],"sources":["once/across-bundles.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
  scope: "module",
};
const $module2 = {
  id: "2oahf97hqd4f2:21:16",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAoBmBA,QAAA,IAAAA,QAAA,EAAM","names":["$splice0"],"ignoreList":[],"sources":["once/across-bundles.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
  scope: "module",
};
const $module3 = {
  id: "2oahf97hqd4f2:37:9",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => ({\n    label: "box"\n});\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAoCY,OAAC;IAAEA,KAAK,EAAE;CAAO,CAAC","names":["label"],"ignoreList":[],"sources":["once/across-bundles.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "expression",
  scope: "function",
};
const $module4 = {
  id: "2oahf97hqd4f2:44:36",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => [$splice0(), $splice1()];\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA2CuC,CAAAA,QAAA,EAAAC,QAAA,MAACD,QAAA,EAAE,EAAEC,QAAA,EAAE,CAAC","names":["$splice0","$splice1"],"ignoreList":[],"sources":["once/across-bundles.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "expression",
  scope: "function",
};
const $module5 = {
  id: "2oahf97hqd4f2:46:28",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => [$splice0()];\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA6C+BA,QAAA,KAACA,QAAA,EAAE,CAAC","names":["$splice0"],"ignoreList":[],"sources":["once/across-bundles.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
  scope: "function",
};
// An app's bundles share what its module-level scripts make, as an app's
// chunks share its modules: two routes that splice one module-level store get
// one store, as one runtime runs them, with one cache. A bundle run by a
// runtime of its own has its own.
async function run(input, runtime = createRuntime({})) {
  const bundle = await bundler.build({ input, modules: {} });
  const { code } = bundle.generate({ format: "cjs" });
  return runtime.exec(code);
}
const store = cs.create($module0, []);
const home = cs.create($module1, [store]);
const details = cs.create($module2, [store]);
it("two bundles of an app share a value", async () => {
  const runtime = createRuntime({});
  const homeStore = await run(home, runtime);
  const detailsStore = await run(details, runtime);
  assert.equal(homeStore, detailsStore);
});
it("a bundle run alone has its own", async () => {
  assert.notEqual(await run(home), await run(details));
});
// A `cs` written in a function runs each call: what it makes is each bundle's
// own, as a function's locals are each call's.
function box() {
  return cs.create($module3, []);
}
const a = box();
const b = box();
it("a value made in a function is each bundle's own", async () => {
  const runtime = createRuntime({});
  const [first, second] = await run(cs.create($module4, [a, b]), runtime);
  assert.notEqual(first, second);
  const [again] = await run(cs.create($module5, [a]), runtime);
  assert.notEqual(again, first);
});
