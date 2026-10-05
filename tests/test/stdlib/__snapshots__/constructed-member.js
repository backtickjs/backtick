import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, createImport } from "@backtickjs/core";
import { createRoot } from "@backtickjs/solid-js";
import { evaluate } from "../evaluate.ts";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "34amrub3e2oyr:14:17",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => $splice0()(() => new ($splice1().Circle)(2).diameter);\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAaoB,CAAAA,QAAA,EAAAC,QAAA,KAAAD,QAAA,EAAW,CAAC,MAAM,KAAIC,QAAA,EAAS,CAACC,MAAM,EAAC,CAAC,CAAC,CAACC,QAAQ,CAAC","names":["$splice0","$splice1","Circle","diameter"],"ignoreList":[],"sources":["stdlib/constructed-member.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
};
// A class reached through a member of a spliced value, as `Animated.Value`
// is. `new` takes the member, not the splice: the splice reads as one value.
const geometry = createImport({
  name: "geometry",
  from: "app",
  version: "^1.0.0",
});
const diameter = cs.create($module0, [createRoot, geometry]);
it("constructedMember", async (t) => {
  await snapshotCase(t, "constructedMember", diameter);
});
describe("a class constructed through a spliced value's member", () => {
  it("is constructed on the client", async () => {
    assert.equal(await evaluate(diameter), 4);
  });
});
