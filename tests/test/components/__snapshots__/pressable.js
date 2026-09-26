import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { render, screen } from "@backtickjs/solid-js/testing";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
// A drawing read the way Testing Library reads one: by role and by text, with
// a click a user would make.
// `Pressable` is the row that responds as one thing: `View` lays children out
// and `Text` takes a press, and this takes both — so a checkbox and a label are
// one tap target while staying separately styled.
async function Row() {
  return cs.create(
    "3sdwassvq0mne:16:9",
    { params: [{ kind: "splice", value: createSignal, bindings: [] }] },
    {
      code: 'export default ($0) => {\n    const count = $0()(0);\n    return (<button id="row" style="display: flex; gap: 8px" onclick={() => count[1](count[0]() + 1)}>\n        <span style="font-weight: 700">{count[0]() > 0 ? "\u2611" : "\u2610"}</span>\n        <span>{"pressed " + count[0]() + " times"}</span>\n      </button>);\n};',
      map: '{"version":3,"file":"pressable.test.jsx","sourceRoot":"","sources":["pressable.test.tsx"],"names":[],"mappings":"eAeY;IACR,MAAM,KAAK,GAAG,IAAa,CAAC,CAAC,CAAC,CAAC;IAC/B,OAAO,CACL,CAAC,MAAM,CACL,EAAE,CAAC,KAAK,CACR,KAAK,CAAC,yBAAyB,CAC/B,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC,CAAC,CAExC;QAAA,CAAC,IAAI,CAAC,KAAK,CAAC,kBAAkB,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,GAAG,CAAC,EAAE,IAAI,CACjE;QAAA,CAAC,IAAI,CAAC,CAAC,UAAU,GAAG,KAAK,CAAC,CAAC,CAAC,EAAE,GAAG,QAAQ,CAAC,EAAE,IAAI,CAClD;MAAA,EAAE,MAAM,CAAC,CACV,CAAC;AACJ,CAAC"}',
      imports: [],
      exportAt: 0,
    },
  );
}
describe("screen", () => {
  it("increments the counter", async () => {
    await render(_jsx(Row, {}));
    await userEvent.click(screen.getByRole("button", { name: /pressed/ }));
    assert.ok(screen.getByText("pressed 1 times"));
  });
  it("reads a fresh page in each test", async () => {
    await render(_jsx(Row, {}));
    assert.ok(screen.getByText("pressed 0 times"));
  });
});
describe("what each case compiles and bundles to", () => {
  it("Row", async (t) => {
    await snapshotCase(t, "Row", _jsx(Row, {}));
  });
});
