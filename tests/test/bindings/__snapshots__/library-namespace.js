import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { render, screen } from "@solidjs/testing-library";
const Acme = {
  "@backtickjs": "ClientImport",
  name: "*",
  from: "acme-ui",
  version: "^1.0.0",
};
import { evaluate } from "../evaluate.ts";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "2j2xcyothsjlf:10:14",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nexports.default = $splice0 => ($Acme => (0, web_1.createComponent)($Acme.Button, {\n    variant: "ghost",\n    onClick: () => { },\n    children: "Save"\n}))($splice0());\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;kBASiBA,QAAA,IACf,CAAAC,KAAA,IAAAC,yBAAA,EAACD,KAAK,CAACE,MAAM;IAACC,OAAO;IAASC,OAAO,EAAEA,GAAA,KAAO,CAAC;IAAAC,QAAA;CAAA,CAEhC,EAFdN,QAAA,EAAK,CAGP","names":["$splice0","$Acme","_$createComponent","Button","variant","onClick","children"],"ignoreList":[],"sources":["bindings/library-namespace.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
const $module1 = {
  id: "2j2xcyothsjlf:17:23",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nexports.default = $splice0 => ($Acme => (0, web_1.createComponent)($Acme.Link, {}))($splice0());\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;kBAgB0BA,QAAA,IAExB,CAAAC,KAAA,IAAAC,yBAAA,EAACD,KAAK,CAACE,IAAI,KAAG,EAAbH,QAAA,EAAK,CACP","names":["$splice0","$Acme","_$createComponent","Link"],"ignoreList":[],"sources":["bindings/library-namespace.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
// The library whole, its components read from it on the client.
const saved = cs.create($module0, [Acme]);
// A component the library doesn't export, caught at its name.
export const missing = cs.create($module1, [Acme]);
it("libraryNamespace", async (t) => {
  await snapshotCase(t, "libraryNamespace", saved);
});
describe("a library's namespace in a script", () => {
  it("draws the component read from it", async () => {
    render(await evaluate(() => saved));
    assert.equal(screen.getByRole("button").className, "ghost");
  });
});
