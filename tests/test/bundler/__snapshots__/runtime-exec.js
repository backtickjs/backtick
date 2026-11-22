import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { createImport, createRuntime, cs, exec } from "@backtickjs/core";
const $module0 = {
  id: "1d3tm13zxjtse:39:33",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0() + 1;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAsCoCA,QAAA,IAAAA,QAAA,EAAO,GAAG,CAAC","names":["$splice0"],"ignoreList":[],"sources":["bundler/runtime-exec.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
  scope: "function",
};
const $module1 = {
  id: "1d3tm13zxjtse:44:33",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0() + 1;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA2CoCA,QAAA,IAAAA,QAAA,EAAO,GAAG,CAAC","names":["$splice0"],"ignoreList":[],"sources":["bundler/runtime-exec.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
  scope: "function",
};
const $module2 = {
  id: "1d3tm13zxjtse:52:34",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0() + 1;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAmDqCA,QAAA,IAAAA,QAAA,EAAO,GAAG,CAAC","names":["$splice0"],"ignoreList":[],"sources":["bundler/runtime-exec.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
  scope: "function",
};
const $module3 = {
  id: "1d3tm13zxjtse:53:33",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => $splice0()($splice1());\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAoDoC,CAAAA,QAAA,EAAAC,QAAA,KAAAD,QAAA,EAAK,CAACC,QAAA,EAAM,CAAC","names":["$splice0","$splice1"],"ignoreList":[],"sources":["bundler/runtime-exec.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "expression",
  scope: "function",
};
const $module4 = {
  id: "1d3tm13zxjtse:59:34",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0() + 1;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA0DqCA,QAAA,IAAAA,QAAA,EAAO,GAAG,CAAC","names":["$splice0"],"ignoreList":[],"sources":["bundler/runtime-exec.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
  scope: "function",
};
const $module5 = {
  id: "1d3tm13zxjtse:60:33",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => $splice0()($splice1());\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA2DoC,CAAAA,QAAA,EAAAC,QAAA,KAAAD,QAAA,EAAK,CAACC,QAAA,EAAM,CAAC","names":["$splice0","$splice1"],"ignoreList":[],"sources":["bundler/runtime-exec.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "expression",
  scope: "function",
};
// What an app provides beside Solid, for a bundle to import.
const answer = createImport({
  name: "answer",
  from: "app",
  version: "1.0.0",
});
async function bundleCjs(value) {
  const built = await bundler.build({
    input: value,
    modules: { app: "1.0.0" },
  });
  return built.generate().code;
}
// A runtime providing `app`, or nothing.
const withApp = () =>
  createRuntime({
    moduleMap: { app: { answer: 41 } },
    installedPackages: { app: "1.0.0" },
  });
const withNothing = () =>
  createRuntime({ moduleMap: {}, installedPackages: {} });
describe("a runtime's exec", () => {
  it("runs CommonJS with require answered from the module map", async () => {
    const root = await bundleCjs(cs.create($module0, [answer]));
    assert.equal(await withApp().exec(root), 42);
  });
  it("refuses a module the map doesn't provide", async () => {
    const root = await bundleCjs(cs.create($module1, [answer]));
    await assert.rejects(
      withNothing().exec(root),
      /requires "app", which this app doesn't provide/,
    );
  });
  it("hands the bundles it runs with exec the same modules", async () => {
    const inner = await bundleCjs(cs.create($module2, [answer]));
    const root = await bundleCjs(cs.create($module3, [exec, inner]));
    const value = await withApp().exec(root);
    assert.equal(value, 42);
  });
  it("refuses a module the map doesn't provide to the bundles exec runs", async () => {
    const inner = await bundleCjs(cs.create($module4, [answer]));
    const root = await bundleCjs(cs.create($module5, [exec, inner]));
    await assert.rejects(
      withNothing().exec(root),
      /requires "app", which this app doesn't provide/,
    );
  });
});
