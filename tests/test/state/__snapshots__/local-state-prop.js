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
      "21asyyklgxxq8:17:11",
      { params: [{ kind: "splice", value: size, bindings: [] }] },
      '($splice0) => "font-size: " + $splice0()[0]() + "px"',
      '{"version":3,"file":"local-state-prop.test.jsx","sourceRoot":"","sources":["state/local-state-prop.test.tsx"],"names":[],"mappings":"AAgBc,cAAA,aAAa,GAAG,UAAK,CAAC,CAAC,CAAC,EAAE,GAAG,IAAI"}',
    ),
    onclick: cs.create(
      "21asyyklgxxq8:18:13",
      { params: [{ kind: "splice", value: size, bindings: [] }] },
      "($splice0) => () => {\n    $splice0()[1]($splice0()[0]() + 1);\n}",
      '{"version":3,"file":"local-state-prop.test.jsx","sourceRoot":"","sources":["state/local-state-prop.test.tsx"],"names":[],"mappings":"AAiBgB,cAAA,GAAG,EAAE;IACf,UAAK,CAAC,CAAC,CAAC,CAAC,UAAK,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC,CAAC;AAC3B,CAAC"}',
    ),
    children: "press",
  });
async function SharingPanel() {
  return cs.create(
    "21asyyklgxxq8:27:9",
    {
      params: [
        { kind: "splice", value: createSignal, bindings: [] },
        {
          kind: "splice",
          value: _jsx(SharedCounter, {
            size: cs.create(
              "21asyyklgxxq8:31:32",
              { params: [{ kind: "capture", key: "size$21asyyklgxxq8$0" }] },
              "($capture0) => $capture0",
              '{"version":3,"file":"local-state-prop.test.jsx","sourceRoot":"","sources":["state/local-state-prop.test.tsx"],"names":[],"mappings":"AA8BmC,eAAA,SAAI"}',
            ),
          }),
          bindings: ["size$21asyyklgxxq8$0"],
        },
        {
          kind: "splice",
          value: _jsx(SharedCounter, {
            size: cs.create(
              "21asyyklgxxq8:32:32",
              { params: [{ kind: "capture", key: "size$21asyyklgxxq8$0" }] },
              "($capture0) => $capture0",
              '{"version":3,"file":"local-state-prop.test.jsx","sourceRoot":"","sources":["state/local-state-prop.test.tsx"],"names":[],"mappings":"AA+BmC,eAAA,SAAI"}',
            ),
          }),
          bindings: ["size$21asyyklgxxq8$0"],
        },
      ],
    },
    "($splice0, $splice1, $splice2) => {\n    const size = $splice0()(16);\n    return (<div>\n        {$splice1(size)}\n        {$splice2(size)}\n      </div>);\n}",
    '{"version":3,"file":"local-state-prop.test.jsx","sourceRoot":"","sources":["state/local-state-prop.test.tsx"],"names":[],"mappings":"AA0BY;IACR,MAAM,IAAI,GAAG,UAAa,CAAC,EAAE,CAAC,CAAC;IAC/B,OAAO,CACL,CAAC,GAAG,CACF;QAAA,CAAC,cAAoC,CACrC;QAAA,CAAC,cAAoC,CACvC;MAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
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
