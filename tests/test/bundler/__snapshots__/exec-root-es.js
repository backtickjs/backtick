import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { cs } from "@backtickjs/core";
import { execRoot } from "@backtickjs/core/es";
const createSignal = {
  "@backtickjs": "ClientImport",
  name: "createSignal",
  from: "solid-js",
  version: "1.9.14",
};
const $module0 = {
  id: "237oe1xu0mrfz:11:13",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => {\n    const [count, setCount] = $splice0()(1);\n    setCount(count() + 1);\n    return count();\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAUgBA,QAAA;IACR,MAAM,CAACC,KAAK,EAAEC,QAAQ,CAAC,GAAGF,QAAA,EAAa,CAAC,CAAC,CAAC;IAC1CE,QAAQ,CAACD,KAAK,EAAE,GAAG,CAAC,CAAC;IACrB,OAAOA,KAAK,EAAE;AAChB,CAAC","names":["$splice0","count","setCount"],"ignoreList":[],"sources":["bundler/exec-root-es.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "block",
  scope: "function",
};
describe("execRoot, from @backtickjs/core/es", () => {
  it("runs an ES module, the page's import map answering it", async () => {
    const built = await bundler.build({
      input: cs.create($module0, [createSignal]),
      modules: { "solid-js": "1.9.14" },
    });
    const { code } = built.generate({ format: "es" });
    assert.equal(await execRoot(code), 2);
  });
});
