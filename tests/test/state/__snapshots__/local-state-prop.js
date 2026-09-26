import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
import { children, drawn, fontSize } from "./dom.ts";
// A signal crossing a component boundary: declared once by the script that
// draws the pair, handed to each child as a prop, so both read one storage. The
// signal is an ordinary client value — the prop takes it the way it takes any other —
// which is what makes a write through either child reach the same storage.
const SharedCounter = async ({ size }) =>
  _jsx("span", {
    style: cs.create(
      "sm4cgpukv0uc:17:11",
      { params: [{ kind: "splice", value: size, bindings: [] }] },
      {
        code: 'export default ($0) => "font-size: " + $0()[0]() + "px";',
        map: '{"version":3,"file":"local-state-prop.test.jsx","sourceRoot":"","sources":["state/local-state-prop.test.tsx"],"names":[],"mappings":"eAgBc,QAAA,aAAa,GAAG,IAAK,CAAC,CAAC,CAAC,EAAE,GAAG,IAAI"}',
      },
    ),
    onclick: cs.create(
      "sm4cgpukv0uc:18:13",
      { params: [{ kind: "splice", value: size, bindings: [] }] },
      {
        code: "export default ($0) => () => {\n    $0()[1]($0()[0]() + 1);\n};",
        map: '{"version":3,"file":"local-state-prop.test.jsx","sourceRoot":"","sources":["state/local-state-prop.test.tsx"],"names":[],"mappings":"eAiBgB,QAAA,GAAG,EAAE;IACf,IAAK,CAAC,CAAC,CAAC,CAAC,IAAK,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC,CAAC;AAC3B,CAAC"}',
      },
    ),
    children: "press",
  });
async function SharingPanel() {
  return cs.create(
    "sm4cgpukv0uc:27:9",
    {
      params: [
        { kind: "splice", value: createSignal, bindings: [] },
        { kind: "tag", value: SharedCounter },
      ],
    },
    {
      code: "export default ($0, $1) => {\n    const size = $0()(16);\n    return (<div>\n        <$1 size={size}/>\n        <$1 size={size}/>\n      </div>);\n};",
      map: '{"version":3,"file":"local-state-prop.test.jsx","sourceRoot":"","sources":["state/local-state-prop.test.tsx"],"names":[],"mappings":"eA0BY;IACR,MAAM,IAAI,GAAG,IAAa,CAAC,EAAE,CAAC,CAAC;IAC/B,OAAO,CACL,CAAC,GAAG,CACF;QAAA,CAAC,EAAa,CAAC,IAAI,CAAC,CAAC,IAAI,CAAC,EAC1B;QAAA,CAAC,EAAa,CAAC,IAAI,CAAC,CAAC,IAAI,CAAC,EAC5B;MAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
    },
  );
}
describe("local state", () => {
  it("a signal passed as a prop is one storage, shared by both children", async () => {
    const view = await drawn(_jsx(SharingPanel, {}));
    const [first, second] = children(view);
    assert.ok(first !== undefined && second !== undefined);
    assert.equal(fontSize(first), 16);
    assert.equal(fontSize(second), 16);
    // The parent declared the signal and handed it to both, so a write through
    // one child's handle moves the other's display too.
    await userEvent.click(first);
    assert.equal(fontSize(first), 17);
    assert.equal(fontSize(second), 17);
  });
});
it("SharingPanel", async (t) => {
  await snapshotCase(t, "SharingPanel", _jsx(SharingPanel, {}));
});
