import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, onMount } from "@backtickjs/core";
import { bundler } from "@backtickjs/bundler";
import { render, screen } from "@backtickjs/web-testing";
// An element's prop that is `undefined` is left out, as an optional prop reads
// in JSX and TypeScript. That is what lets a component forward an optional
// prop it wasn't given.
async function Pill({ label, ref }) {
  return _jsx("button", { ref: ref, children: label });
}
describe("an undefined prop", () => {
  it("is left out of the element", async () => {
    const code = await bundler.run(
      _jsx("div", { class: undefined, id: "kept" }),
    );
    assert.match(code, /jsx\("div", \{\s*id: "kept"\s*\}\)/);
  });
  it("lets a component forward an optional prop it wasn't given", async () => {
    await render(_jsx(Pill, { label: "plain" }));
    assert.ok(screen.getByRole("button", { name: "plain" }));
  });
  it("still reaches the element when it is given", async () => {
    await render(
      _jsx(Pill, {
        label: "focused",
        ref: cs.create(
          "28eplibrubp3g:34:33",
          { params: [{ kind: "splice", value: onMount, bindings: [] }] },
          {
            code: "export default ($0) => (el) => $0()(() => el.focus());",
            map: '{"version":3,"file":"undefined-prop.test.jsx","sourceRoot":"","sources":["undefined-prop.test.tsx"],"names":[],"mappings":"eAiCoC,QAAA,CAAC,EAAE,EAAE,EAAE,CAAC,IAAQ,CAAC,GAAG,EAAE,CAAC,EAAE,CAAC,KAAK,EAAE,CAAC"}',
            imports: [],
            exportAt: 0,
          },
        ),
      }),
    );
    assert.equal(document.activeElement, screen.getByRole("button"));
  });
});
