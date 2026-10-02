import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { onMount } from "@backtickjs/solid-js";
import { render, screen } from "@solidjs/testing-library";
import { evaluate } from "../evaluate.ts";
// A component forwarding an optional prop it wasn't given: `undefined` reaches
// the script, where the element takes it as JSX and TypeScript read an absent
// prop.
async function Pill({ label, ref }) {
  return cs.create(
    "10qn40vm7q8r9:18:9",
    {
      params: [
        { kind: "splice", value: ref, bindings: [] },
        { kind: "splice", value: label, bindings: [] },
      ],
    },
    "($splice0, $splice1) => <button ref={$splice0()}>{$splice1()}</button>",
    '{"version":3,"file":"undefined-prop.test.jsx","sourceRoot":"","sources":["bundler/undefined-prop.test.tsx"],"names":[],"mappings":"AAiBY,wBAAA,CAAC,MAAM,CAAC,GAAG,CAAC,CAAC,UAAI,CAAC,CAAC,CAAC,UAAM,CAAC,EAAE,MAAM,CAAC"}',
  );
}
describe("an undefined prop", () => {
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
            "10qn40vm7q8r9:30:35",
            { params: [{ kind: "splice", value: onMount, bindings: [] }] },
            "($splice0) => (el) => $splice0()(() => el.focus())",
            '{"version":3,"file":"undefined-prop.test.jsx","sourceRoot":"","sources":["bundler/undefined-prop.test.tsx"],"names":[],"mappings":"AA6BsC,cAAA,CAAC,EAAE,EAAE,EAAE,CAAC,UAAQ,CAAC,GAAG,EAAE,CAAC,EAAE,CAAC,KAAK,EAAE,CAAC"}',
          ),
        }),
      ),
    );
    assert.equal(document.activeElement, screen.getByRole("button"));
  });
});
