import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { createImport, cs, exec } from "@backtickjs/core";
import { execRoot } from "@backtickjs/core/cjs";
const $module0 = {
  id: "wn7m1ov8mfny:30:33",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0() + 1;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA6BoCA,QAAA,IAAAA,QAAA,EAAO,GAAG,CAAC","names":["$splice0"],"ignoreList":[],"sources":["bundler/exec-root.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
  scope: "function",
};
const $module1 = {
  id: "wn7m1ov8mfny:35:33",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0() + 1;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAkCoCA,QAAA,IAAAA,QAAA,EAAO,GAAG,CAAC","names":["$splice0"],"ignoreList":[],"sources":["bundler/exec-root.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
  scope: "function",
};
const $module2 = {
  id: "wn7m1ov8mfny:43:34",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0() + 1;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA0CqCA,QAAA,IAAAA,QAAA,EAAO,GAAG,CAAC","names":["$splice0"],"ignoreList":[],"sources":["bundler/exec-root.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
  scope: "function",
};
const $module3 = {
  id: "wn7m1ov8mfny:44:33",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => $splice0()($splice1());\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA2CoC,CAAAA,QAAA,EAAAC,QAAA,KAAAD,QAAA,EAAK,CAACC,QAAA,EAAM,CAAC","names":["$splice0","$splice1"],"ignoreList":[],"sources":["bundler/exec-root.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "expression",
  scope: "function",
};
const $module4 = {
  id: "wn7m1ov8mfny:50:34",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0() + 1;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAiDqCA,QAAA,IAAAA,QAAA,EAAO,GAAG,CAAC","names":["$splice0"],"ignoreList":[],"sources":["bundler/exec-root.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
  scope: "function",
};
const $module5 = {
  id: "wn7m1ov8mfny:51:33",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => $splice0()($splice1());\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAkDoC,CAAAA,QAAA,EAAAC,QAAA,KAAAD,QAAA,EAAK,CAACC,QAAA,EAAM,CAAC","names":["$splice0","$splice1"],"ignoreList":[],"sources":["bundler/exec-root.test.tsx"]}',
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
describe("execRoot, from @backtickjs/core/cjs", () => {
  it("runs CommonJS with require answered from the module map", async () => {
    const root = await bundleCjs(cs.create($module0, [answer]));
    assert.equal(await execRoot(root, { app: { answer: 41 } }), 42);
  });
  it("refuses a module the map doesn't provide", async () => {
    const root = await bundleCjs(cs.create($module1, [answer]));
    await assert.rejects(
      execRoot(root, {}),
      /requires "app", which this app doesn't provide/,
    );
  });
  it("hands the bundles it runs with exec the same modules", async () => {
    const inner = await bundleCjs(cs.create($module2, [answer]));
    const root = await bundleCjs(cs.create($module3, [exec, inner]));
    const value = await execRoot(root, { app: { answer: 41 } });
    assert.equal(value, 42);
  });
  it("refuses a module the map doesn't provide to the bundles exec runs", async () => {
    const inner = await bundleCjs(cs.create($module4, [answer]));
    const root = await bundleCjs(cs.create($module5, [exec, inner]));
    await assert.rejects(
      execRoot(root, {}),
      /requires "app", which this app doesn't provide/,
    );
  });
});
