import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { createImport, cs, exec, execRoot } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { bundle } from "../evaluate.ts";
const $module0 = {
  id: "2eh5betpngjo1:35:33",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0() + 1;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAkCoCA,QAAA,IAAAA,QAAA,EAAO,GAAG,CAAC","names":["$splice0"],"ignoreList":[],"sources":["bundler/exec-root.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
const $module1 = {
  id: "2eh5betpngjo1:46:33",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0() + 1;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA6CoCA,QAAA,IAAAA,QAAA,EAAO,GAAG,CAAC","names":["$splice0"],"ignoreList":[],"sources":["bundler/exec-root.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
const $module2 = {
  id: "2eh5betpngjo1:54:40",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => {\n    const [count, setCount] = $splice0()(1);\n    setCount(count() + 1);\n    return count();\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAqD2CA,QAAA;IACrC,MAAM,CAACC,KAAK,EAAEC,QAAQ,CAAC,GAAGF,QAAA,EAAa,CAAC,CAAC,CAAC;IAC1CE,QAAQ,CAACD,KAAK,EAAE,GAAG,CAAC,CAAC;IACrB,OAAOA,KAAK,EAAE;AAChB,CAAC","names":["$splice0","count","setCount"],"ignoreList":[],"sources":["bundler/exec-root.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "block",
};
const $module3 = {
  id: "2eh5betpngjo1:63:34",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0() + 1;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA8DqCA,QAAA,IAAAA,QAAA,EAAO,GAAG,CAAC","names":["$splice0"],"ignoreList":[],"sources":["bundler/exec-root.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
const $module4 = {
  id: "2eh5betpngjo1:64:33",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => $splice0()($splice1());\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA+DoC,CAAAA,QAAA,EAAAC,QAAA,KAAAD,QAAA,EAAK,CAACC,QAAA,EAAM,CAAC","names":["$splice0","$splice1"],"ignoreList":[],"sources":["bundler/exec-root.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "expression",
};
const $module5 = {
  id: "2eh5betpngjo1:73:34",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0() + 1;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAwEqCA,QAAA,IAAAA,QAAA,EAAO,GAAG,CAAC","names":["$splice0"],"ignoreList":[],"sources":["bundler/exec-root.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
const $module6 = {
  id: "2eh5betpngjo1:74:33",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => $splice0()($splice1());\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAyEoC,CAAAA,QAAA,EAAAC,QAAA,KAAAD,QAAA,EAAK,CAACC,QAAA,EAAM,CAAC","names":["$splice0","$splice1"],"ignoreList":[],"sources":["bundler/exec-root.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "expression",
};
// What an app provides beside Solid, for a bundle to import.
const answer = createImport({
  name: "answer",
  from: "app",
  version: "^1.0.0",
});
async function bundleCjs(value) {
  const built = await bundler.build({
    input: value,
    modules: { app: "1.0.0" },
  });
  return built.generate({ format: "cjs" }).code;
}
describe("execRoot", () => {
  it("runs CommonJS with require answered from the module map", async () => {
    const root = await bundleCjs(cs.create($module0, [answer]));
    assert.equal(
      await execRoot(root, {
        format: "cjs",
        moduleMap: { app: { answer: 41 } },
      }),
      42,
    );
  });
  it("refuses a module the map doesn't provide", async () => {
    const root = await bundleCjs(cs.create($module1, [answer]));
    await assert.rejects(
      execRoot(root, { format: "cjs", moduleMap: {} }),
      /requires "app", which this app doesn't provide/,
    );
  });
  it("runs an ES module, the page's import map answering it", async () => {
    const { code: root } = await bundle(cs.create($module2, [createSignal]));
    assert.equal(await execRoot(root, { format: "es" }), 2);
  });
  it("hands the bundles it runs with exec the same modules", async () => {
    const inner = await bundleCjs(cs.create($module3, [answer]));
    const root = await bundleCjs(cs.create($module4, [exec, inner]));
    const value = await execRoot(root, {
      format: "cjs",
      moduleMap: { app: { answer: 41 } },
    });
    assert.equal(value, 42);
  });
  it("refuses a module the map doesn't provide to the bundles exec runs", async () => {
    const inner = await bundleCjs(cs.create($module5, [answer]));
    const root = await bundleCjs(cs.create($module6, [exec, inner]));
    await assert.rejects(
      execRoot(root, { format: "cjs", moduleMap: {} }),
      /requires "app", which this app doesn't provide/,
    );
  });
});
