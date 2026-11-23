import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { createImport, createRuntime, cs, runtime } from "@backtickjs/core";
const $module0 = {
  id: "24hu49e8gr6hg:56:34",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0() + 1;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAuDqCA,QAAA,IAAAA,QAAA,EAAO,GAAG,CAAC","names":["$splice0"],"ignoreList":[],"sources":["bundler/runtime.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
  scope: "function",
};
const $module1 = {
  id: "24hu49e8gr6hg:58:32",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => (async () => {\n    const response = await $splice0().fetch("https://app.example/screen");\n    return $splice1().exec(await response.text());\n})();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAyDmC,CAAAA,QAAA,EAAAC,QAAA,MAAC;IAC9B,MAAMC,QAAQ,GAAG,MAAMF,QAAA,EAAQ,CAACG,KAAK,CAAC,4BAA4B,CAAC;IACnE,OAAOF,QAAA,EAAQ,CAACG,IAAI,CAAE,MAAMF,QAAQ,CAACG,IAAI,EAAY,CAAC;AACxD,CAAC,GAAG","names":["$splice0","$splice1","response","fetch","exec","text"],"ignoreList":[],"sources":["bundler/runtime.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "expression",
  scope: "function",
};
const $module2 = {
  id: "24hu49e8gr6hg:70:33",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAqEoCA,QAAA,IAAAA,QAAA,EAAQ","names":["$splice0"],"ignoreList":[],"sources":["bundler/runtime.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
  scope: "function",
};
const $module3 = {
  id: "24hu49e8gr6hg:72:33",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => $splice0().exec($splice1());\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAuEoC,CAAAA,QAAA,EAAAC,QAAA,KAAAD,QAAA,EAAQ,CAACE,IAAI,CAACD,QAAA,EAAM,CAAC","names":["$splice0","$splice1","exec"],"ignoreList":[],"sources":["bundler/runtime.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "expression",
  scope: "function",
};
const $module4 = {
  id: "24hu49e8gr6hg:77:32",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => () => $splice0();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA4EmCA,QAAA,UAAMA,QAAA,EAAQ","names":["$splice0"],"ignoreList":[],"sources":["bundler/runtime.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "function",
  scope: "function",
};
const $module5 = {
  id: "24hu49e8gr6hg:85:39",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => 1;\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAoF0C,OAAC","names":[],"ignoreList":[],"sources":["bundler/runtime.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "expression",
  scope: "function",
};
// What an app provides, for a bundle to import.
const answer = createImport({
  name: "answer",
  from: "app",
  version: "1.0.0",
});
async function bundleOf(value) {
  const built = await bundler.build({
    input: value,
    modules: { app: "1.0.0" },
  });
  return built.generate().code;
}
// A runtime providing `app`, whose requests are recorded and answered with
// `bundles` by path.
function appRuntime(bundles) {
  const requests = [];
  const runtime = createRuntime({
    moduleMap: { app: { answer: 41 } },
    installedPackages: { app: "1.0.0" },
    fetch(request) {
      requests.push(request);
      return new Response(bundles[new URL(request.url).pathname]);
    },
  });
  return { runtime, requests };
}
// A bundle run as a page runs one: no runtime, a `require` of its own.
function runOnPage(code) {
  const module = { exports: {} };
  new Function("module", "exports", "require", code)(
    module,
    module.exports,
    () => ({ answer: 41 }),
  );
  return module.exports;
}
describe("$runtime", () => {
  it("fetches and runs a bundle through the runtime that ran the script", async () => {
    const screen = await bundleOf(cs.create($module0, [answer]));
    const { runtime: app, requests } = appRuntime({ "/screen": screen });
    const root = await bundleOf(cs.create($module1, [runtime, runtime]));
    assert.equal(await await app.exec(root), 42);
    assert.equal(
      requests[0].headers.get("x-backtick-modules"),
      '{"app":"1.0.0"}',
    );
  });
  it("is the same runtime in a bundle run with $runtime.exec", async () => {
    const inner = await bundleOf(cs.create($module2, [runtime]));
    const { runtime: app } = appRuntime({});
    const outer = await bundleOf(cs.create($module3, [runtime, inner]));
    assert.equal(await await app.exec(outer), app);
  });
  it("throws as the bundle starts where nothing provides one", async () => {
    const root = await bundleOf(cs.create($module4, [runtime]));
    assert.throws(
      () => runOnPage(root),
      /\$runtime is missing: run this bundle with createRuntime/,
    );
  });
  it("is declared only in a bundle that reads it", async () => {
    assert.doesNotMatch(await bundleOf(cs.create($module5, [])), /\$runtime/);
  });
});
