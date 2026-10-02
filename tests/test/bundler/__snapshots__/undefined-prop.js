import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { bundler } from "@backtickjs/bundler";
import { onMount } from "@backtickjs/solid-js";
import { render, screen } from "@solidjs/testing-library";
import { evaluate } from "../evaluate.ts";
// An element's prop that is `undefined` is left out, as an optional prop reads
// in JSX and TypeScript. That is what lets a component forward an optional
// prop it wasn't given.
async function Pill({ label, ref }) {
  return _jsx("button", { ref: ref, children: label });
}
describe("an undefined prop", () => {
  it("is left out of the element", async () => {
    const bundle = await bundler.build({
      input: _jsx("div", { class: undefined, id: "kept" }),
      external: {},
    });
    const { code } = bundle.generate({ format: "es" });
    assert.match(code, /<div id=\{"kept"\} \/>/);
  });
  it("lets a component forward an optional prop it wasn't given", async () => {
    render(await evaluate(() => _jsx(Pill, { label: "plain" })));
    assert.ok(screen.getByRole("button", { name: "plain" }));
  });
  it("still reaches the element when it is given", async () => {
    render(
      await evaluate(() =>
        _jsx(Pill, {
          label: "focused",
          ref: cs.create(
            "30g9hm5l8s924:41:35",
            { params: [{ kind: "splice", value: onMount, bindings: [] }] },
            "($splice0) => (el) => $splice0()(() => el.focus())",
            '{"version":3,"file":"undefined-prop.test.jsx","sourceRoot":"","sources":["bundler/undefined-prop.test.tsx"],"names":[],"mappings":"AAwCsC,cAAA,CAAC,EAAE,EAAE,EAAE,CAAC,UAAQ,CAAC,GAAG,EAAE,CAAC,EAAE,CAAC,KAAK,EAAE,CAAC"}',
          ),
        }),
      ),
    );
    assert.equal(document.activeElement, screen.getByRole("button"));
  });
});
