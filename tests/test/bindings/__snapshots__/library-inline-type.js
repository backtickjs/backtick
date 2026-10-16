import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { render, screen } from "@solidjs/testing-library";
const Button = {
  "@backtickjs": "ClientImport",
  name: "Button",
  from: "acme-ui",
  version: "1.0.0",
};
import { evaluate } from "../evaluate.ts";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "30to2gbd5zcf7:19:14",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nexports.default = ($splice0, $splice1) => ($Button => (0, web_1.createComponent)($Button, {\n    get variant() {\n        return $splice1();\n    },\n    onClick: () => { },\n    children: "Save"\n}))($splice0());\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;kBAkBiB,CAAAA,QAAA,EAAAC,QAAA,KACf,CAAAC,OAAA,IAAAC,yBAAA,EAACD,OAAO;IAAA,IAACE,OAAOA;QAAA,OAAEH,QAAA,EAAQ;IAAA;IAAEI,OAAO,EAAEA,GAAA,KAAO,CAAC;IAAAC,QAAA;CAAA,CAEnC,EAFTN,QAAA,EAAO,CAGT","names":["$splice0","$splice1","$Button","_$createComponent","variant","onClick","children"],"ignoreList":[],"sources":["bindings/library-inline-type.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "expression",
};
// The types an import names beside its values are the library's own, for host
// code: they reach no client.
const variant = "ghost";
// @ts-expect-error: Type '"large"' is not assignable to type 'ButtonVariant'.
export const large = "large";
const saved = cs.create($module0, [Button, variant]);
it("libraryInlineType", async (t) => {
  await snapshotCase(t, "libraryInlineType", saved);
});
describe("a type imported beside a library component", () => {
  it("types the host value the script splices", async () => {
    render(await evaluate(() => saved));
    assert.equal(screen.getByRole("button").className, "ghost");
  });
});
