import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { execRoot } from "@backtickjs/core/es";
const createSignal = {
  "@backtickjs": "ClientImport",
  name: "createSignal",
  from: "solid-js",
  version: "1.9.14",
};
import { bundle } from "../evaluate.ts";
const $module0 = {
  id: "5bmv5y9bkio1:10:34",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => {\n    const [count, setCount] = $splice0()(1);\n    setCount(count() + 1);\n    return count();\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBASqCA,QAAA;IAC/B,MAAM,CAACC,KAAK,EAAEC,QAAQ,CAAC,GAAGF,QAAA,EAAa,CAAC,CAAC,CAAC;IAC1CE,QAAQ,CAACD,KAAK,EAAE,GAAG,CAAC,CAAC;IACrB,OAAOA,KAAK,EAAE;AAChB,CAAC","names":["$splice0","count","setCount"],"ignoreList":[],"sources":["bundler/exec-root-es.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "block",
};
describe("execRoot, from @backtickjs/core/es", () => {
  it("runs an ES module, the page's import map answering it", async () => {
    const { code } = await bundle(cs.create($module0, [createSignal]));
    assert.equal(await execRoot(code), 2);
  });
});
