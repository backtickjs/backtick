import { jsx as _jsx } from "@backtickjs/jsx-solid/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bundler, ClientVersionMismatch, supports } from "@backtickjs/bundler";
import { cs } from "@backtickjs/core";
import { render, screen } from "@solidjs/testing-library";
const Button = {
  "@backtickjs": "ClientImport",
  name: "Button",
  from: "acme-ui",
  version: "1.0.0",
};
const Button2 = {
  "@backtickjs": "ClientImport",
  name: "Button",
  from: "acme-ui",
  version: "2.0.0",
};
import { evaluate } from "../evaluate.ts";
const $module0 = {
  id: "2kxoo6uz27lbk:16:6",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nexports.default = $splice0 => ($Button2 => (0, web_1.createComponent)($Button2, {\n    tone: "primary",\n    onClick: () => { },\n    children: "Save"\n}))($splice0());\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;kBAeSA,QAAA,IACD,CAAAC,QAAA,IAAAC,yBAAA,EAACD,QAAQ;IAACE,IAAI;IAAWC,OAAO,EAAEA,GAAA,KAAO,CAAC;IAAAC,QAAA;CAAA,CAE/B,EAFVL,QAAA,EAAQ,CAGV","names":["$splice0","$Button2","_$createComponent","tone","onClick","children"],"ignoreList":[],"sources":["bindings/library-versions.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
const $module1 = {
  id: "2kxoo6uz27lbk:21:6",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nexports.default = $splice0 => ($Button => (0, web_1.createComponent)($Button, {\n    variant: "primary",\n    onClick: () => { },\n    children: "Save"\n}))($splice0());\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;kBAoBSA,QAAA,IACD,CAAAC,OAAA,IAAAC,yBAAA,EAACD,OAAO;IAACE,OAAO;IAAWC,OAAO,EAAEA,GAAA,KAAO,CAAC;IAAAC,QAAA;CAAA,CAElC,EAFTL,QAAA,EAAO,CAGT","names":["$splice0","$Button","_$createComponent","variant","onClick","children"],"ignoreList":[],"sources":["bindings/library-versions.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
const $module2 = {
  id: "2kxoo6uz27lbk:63:8",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nexports.default = $splice0 => ($Button2 => (0, web_1.createComponent)($Button2, {\n    tone: "primary",\n    onClick: () => { },\n    children: "Save"\n}))($splice0());\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;kBA8DWA,QAAA,IACD,CAAAC,QAAA,IAAAC,yBAAA,EAACD,QAAQ;IAACE,IAAI;IAAWC,OAAO,EAAEA,GAAA,KAAO,CAAC;IAAAC,QAAA;CAAA,CAE/B,EAFVL,QAAA,EAAQ,CAGV","names":["$splice0","$Button2","_$createComponent","tone","onClick","children"],"ignoreList":[],"sources":["bindings/library-versions.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
// acme-ui 1 and 2, both installed, the second under an alias, as
// `"acme-ui-2": "npm:acme-ui@2"` installs it: each typed against its own
// version, and each an import of `acme-ui`, the module clients provide. The
// server draws each client the one it has.
function Save() {
  return supports("acme-ui", "^2.0.0")
    ? cs.create($module0, [Button2])
    : cs.create($module1, [Button]);
}
const solid = {
  "solid-js": "1.9.14",
  "solid-js/store": "1.9.14",
  "solid-js/web": "1.9.14",
};
async function bundleFor(input, acme) {
  const built = await bundler.build({
    input,
    modules: { ...solid, "acme-ui": acme },
  });
  return built.generate({ format: "es" }).code;
}
describe("two installed versions of one package", () => {
  it("import from the module clients provide, each at its own version", () => {
    const [one, two] = [Button, Button2];
    assert.deepEqual(
      [one.from, one.version, two.from, two.version],
      ["acme-ui", "1.0.0", "acme-ui", "2.0.0"],
    );
  });
  it("bundle each client the version it provides", async () => {
    const one = await bundleFor(_jsx(Save, {}), "1.0.0");
    assert.match(one, /from "acme-ui"/);
    assert.match(one, /variant: "primary"/);
    const two = await bundleFor(_jsx(Save, {}), "2.1.0");
    assert.match(two, /from "acme-ui"/);
    assert.match(two, /tone: "primary"/);
  });
  it("refuse a client the other version's import", async () => {
    await assert.rejects(
      bundleFor(cs.create($module2, [Button2]), "1.0.0"),
      ClientVersionMismatch,
    );
  });
  it("draw what the client's own version draws", async () => {
    // The tests' client provides acme-ui 1.0.0: see `evaluate.ts`.
    render(await evaluate(() => _jsx(Save, {})));
    assert.equal(screen.getByRole("button").className, "primary");
    assert.ok(screen.getByText("Save"));
  });
});
