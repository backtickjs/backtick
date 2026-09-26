import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { render, screen } from "@backtickjs/solid-js/testing";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
// A signal a script declares, and a button that writes it.
async function Counter() {
  return cs.create(
    "7znh0cmscuqg:11:9",
    { params: [{ kind: "splice", value: createSignal, bindings: [] }] },
    '($splice0) => {\n    const count = $splice0()(0);\n    return (<div>\n        <button onclick={() => count[1](count[0]() + 1)}>Add</button>\n        <p>{"Count: " + count[0]()}</p>\n      </div>);\n}',
    '{"version":3,"file":"counter.test.jsx","sourceRoot":"","sources":["web-testing/counter.test.tsx"],"names":[],"mappings":"AAUY;IACR,MAAM,KAAK,GAAG,UAAa,CAAC,CAAC,CAAC,CAAC;IAC/B,OAAO,CACL,CAAC,GAAG,CACF;QAAA,CAAC,MAAM,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC,CAAC,CAAC,GAAG,EAAE,MAAM,CAC5D;QAAA,CAAC,CAAC,CAAC,CAAC,SAAS,GAAG,KAAK,CAAC,CAAC,CAAC,EAAE,CAAC,EAAE,CAAC,CAChC;MAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
  );
}
describe("a counter", () => {
  it("Counter", async (t) => {
    await snapshotCase(t, "Counter", _jsx(Counter, {}));
  });
  it("increments on a click", async () => {
    await render(_jsx(Counter, {}));
    await userEvent.click(screen.getByRole("button", { name: /add/i }));
    assert.ok(screen.getByText("Count: 1"));
  });
});
