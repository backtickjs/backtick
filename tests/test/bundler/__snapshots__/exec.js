import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { createImport, cs, exec } from "@backtickjs/core";
const createSignal = {
  "@backtickjs": "ClientImport",
  name: "createSignal",
  from: "solid-js",
  version: "1.9.14",
};
import { bundle, evaluate } from "../evaluate.ts";
const $module0 = {
  id: "3h1vamotezc68:46:42",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => 40 + 2;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA6C6C,QAAE,GAAG,CAAC","names":[],"ignoreList":[],"sources":["bundler/exec.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "expression",
};
const $module1 = {
  id: "3h1vamotezc68:47:33",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => $splice0()($splice1());\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA8CoC,CAAAA,QAAA,EAAAC,QAAA,KAAAD,QAAA,EAAK,CAACC,QAAA,EAAO,CAAC","names":["$splice0","$splice1"],"ignoreList":[],"sources":["bundler/exec.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "expression",
};
const $module2 = {
  id: "3h1vamotezc68:52:43",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => {\n    const [count, setCount] = $splice0()(1);\n    setCount(count() + 1);\n    return count();\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAmD8CA,QAAA;IACxC,MAAM,CAACC,KAAK,EAAEC,QAAQ,CAAC,GAAGF,QAAA,EAAa,CAAC,CAAC,CAAC;IAC1CE,QAAQ,CAACD,KAAK,EAAE,GAAG,CAAC,CAAC;IACrB,OAAOA,KAAK,EAAE;AAChB,CAAC","names":["$splice0","count","setCount"],"ignoreList":[],"sources":["bundler/exec.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "block",
};
const $module3 = {
  id: "3h1vamotezc68:57:33",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => $splice0()($splice1());\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAwDoC,CAAAA,QAAA,EAAAC,QAAA,KAAAD,QAAA,EAAK,CAACC,QAAA,EAAQ,CAAC","names":["$splice0","$splice1"],"ignoreList":[],"sources":["bundler/exec.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "expression",
};
const $module4 = {
  id: "3h1vamotezc68:62:34",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0() + 1;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA6DqCA,QAAA,IAAAA,QAAA,EAAO,GAAG,CAAC","names":["$splice0"],"ignoreList":[],"sources":["bundler/exec.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
const $module5 = {
  id: "3h1vamotezc68:63:34",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => $splice0()($splice1());\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA8DqC,CAAAA,QAAA,EAAAC,QAAA,KAAAD,QAAA,EAAK,CAACC,QAAA,EAAM,CAAC","names":["$splice0","$splice1"],"ignoreList":[],"sources":["bundler/exec.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "expression",
};
const $module6 = {
  id: "3h1vamotezc68:69:40",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => 1;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAoE2C,OAAC","names":[],"ignoreList":[],"sources":["bundler/exec.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "expression",
};
// What an app provides beside Solid, for a bundle to import.
const answer = createImport({
  name: "answer",
  from: "app",
  version: "1.0.0",
});
// A bundle as CommonJS, run as a React Native app runs one: handed a
// `require` answering what the app provides.
async function bundleCjs(value) {
  const built = await bundler.build({
    input: value,
    modules: { app: "1.0.0" },
  });
  return built.generate({ format: "cjs" }).code;
}
function runCjs(code, provided) {
  const module = { exports: {} };
  const require = (specifier) => provided[specifier];
  new Function("module", "exports", "require", code)(
    module,
    module.exports,
    require,
  );
  return module.exports;
}
describe("exec", () => {
  it("runs an ES module, to its value", async () => {
    const { code: answer } = await bundle(cs.create($module0, []));
    const value = await evaluate(cs.create($module1, [exec, answer]));
    assert.equal(await value, 42);
  });
  it("answers its imports as the page answers the bundle's", async () => {
    const { code: counted } = await bundle(cs.create($module2, [createSignal]));
    const value = await evaluate(cs.create($module3, [exec, counted]));
    assert.equal(await value, 2);
  });
  it("runs CommonJS with the require the bundle was handed", async () => {
    const inner = await bundleCjs(cs.create($module4, [answer]));
    const outer = await bundleCjs(cs.create($module5, [exec, inner]));
    const value = runCjs(outer, { app: { answer: 41 } });
    assert.equal(await value, 42);
  });
  it("is declared only in a bundle that reads it", async () => {
    assert.doesNotMatch(await bundleCjs(cs.create($module6, [])), /\$exec/);
  });
});
