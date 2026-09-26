import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { bundler } from "@backtickjs/bundler";
import { transform } from "@backtickjs/solid-js/transform";
import { onMount } from "@backtickjs/solid-js";
import { render, screen } from "@backtickjs/solid-js/testing";
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
      {
        transform,
      },
    );
    assert.match(code, /_\$template\(`<div id=kept>`\)/);
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
          "1x1djky073nkj:37:33",
          { params: [{ kind: "splice", value: onMount, bindings: [] }] },
          {
            code: "export default $0 => el => $0()(() => el.focus());",
            map: '{"version":3,"mappings":"eAoCoCA,EAAA,IAACC,EAAE,IAAKD,EAAA,EAAQ,CAAC,MAAMC,EAAE,CAACC,KAAK,EAAE,CAAC","names":["$0","el","focus"],"ignoreList":[],"sources":["undefined-prop.test.tsx"]}',
            imports: [],
            exportAt: 0,
          },
        ),
      }),
    );
    assert.equal(document.activeElement, screen.getByRole("button"));
  });
});
