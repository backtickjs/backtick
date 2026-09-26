import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
import { drawn, fontSize } from "./dom.ts";
// A signal a script declares, read and written by what it draws. The script
// owns the storage, so the display and the handler are two readers of one
// binding and share one signal: its getter is an input — a value that
// re-evaluates when the signal changes — and its setter an effect.
async function Stepper() {
  return cs.create(
    "2d5qp9itzo9r0:14:9",
    { params: [{ kind: "splice", value: createSignal, bindings: [] }] },
    {
      code: 'export default ($0) => {\n    const size = $0()(16);\n    return (<span style={"font-size: " + size[0]() + "px"} onclick={() => {\n            size[1](size[0]() + 1);\n        }}>\n        press\n      </span>);\n};',
      map: '{"version":3,"file":"local-state.test.jsx","sourceRoot":"","sources":["local-state.test.tsx"],"names":[],"mappings":"eAaY;IACR,MAAM,IAAI,GAAG,IAAa,CAAC,EAAE,CAAC,CAAC;IAC/B,OAAO,CACL,CAAC,IAAI,CACH,KAAK,CAAC,CAAC,aAAa,GAAG,IAAI,CAAC,CAAC,CAAC,EAAE,GAAG,IAAI,CAAC,CACxC,OAAO,CAAC,CAAC,GAAG,EAAE;YACZ,IAAI,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC,CAAC;QACzB,CAAC,CAAC,CAEF;;MACF,EAAE,IAAI,CAAC,CACR,CAAC;AACJ,CAAC"}',
      imports: [],
      exportAt: 0,
    },
  );
}
describe("local state", () => {
  it("renders the cell's initial value", async () => {
    const text = await drawn(_jsx(Stepper, {}));
    assert.equal(fontSize(text), 16);
  });
  it("a write persists and re-renders the instance", async () => {
    const text = await drawn(_jsx(Stepper, {}));
    await userEvent.click(text);
    assert.equal(fontSize(text), 17);
  });
  it("the display and the handler share one cell", async () => {
    const text = await drawn(_jsx(Stepper, {}));
    // Each write reads the value the previous one stored — the handler's
    // `read()` and the display's are the same cell, not two snapshots.
    await userEvent.click(text);
    await userEvent.click(text);
    await userEvent.click(text);
    assert.equal(fontSize(text), 19);
  });
  it("a handle captured before a write keeps working after it", async () => {
    const text = await drawn(_jsx(Stepper, {}));
    // The host holds the handler across re-renders; the handle resolves its
    // cell by name at call time, so the stale closure still writes the
    // instance's live storage. One registration per event, reading whatever
    // the prop holds now — so the click after a write runs the handler the
    // write left behind, not the one that was registered first.
    await userEvent.click(text);
    await userEvent.click(text);
    assert.equal(fontSize(text), 18);
  });
});
it("Stepper", async (t) => {
  await snapshotCase(t, "Stepper", _jsx(Stepper, {}));
});
