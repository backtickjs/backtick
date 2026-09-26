import { jsx as _jsx, jsxs as _jsxs } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
import { children, drawn, fontSize } from "./dom.ts";
// State belongs to the script that declares it, and a script entry is applied
// once per place that reaches it — so two `<OwnCounter />` tags are two
// applications of one entry, and each declares a signal of its own.
async function OwnCounter() {
  return cs.create(
    "2vruvr5rxa3mr:13:9",
    { params: [{ kind: "splice", value: createSignal, bindings: [] }] },
    {
      code: 'export default ($0) => {\n    const size = $0()(16);\n    return (<span style={"font-size: " + size[0]() + "px"} onclick={() => {\n            size[1](size[0]() + 1);\n        }}>\n        press\n      </span>);\n};',
      map: '{"version":3,"file":"local-state-instances.test.jsx","sourceRoot":"","sources":["local-state-instances.test.tsx"],"names":[],"mappings":"eAYY;IACR,MAAM,IAAI,GAAG,IAAa,CAAC,EAAE,CAAC,CAAC;IAC/B,OAAO,CACL,CAAC,IAAI,CACH,KAAK,CAAC,CAAC,aAAa,GAAG,IAAI,CAAC,CAAC,CAAC,EAAE,GAAG,IAAI,CAAC,CACxC,OAAO,CAAC,CAAC,GAAG,EAAE;YACZ,IAAI,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC,CAAC;QACzB,CAAC,CAAC,CAEF;;MACF,EAAE,IAAI,CAAC,CACR,CAAC;AACJ,CAAC"}',
      imports: [],
      exportAt: 0,
    },
  );
}
const instances = _jsxs("div", {
  children: [_jsx(OwnCounter, {}), _jsx(OwnCounter, {})],
});
describe("local state", () => {
  it("two invocations of one component hold independent signals", async () => {
    const view = await drawn(instances);
    const [first, second] = children(view);
    assert.ok(first !== undefined && second !== undefined);
    assert.equal(fontSize(first), 16);
    assert.equal(fontSize(second), 16);
    await userEvent.click(first);
    assert.equal(fontSize(first), 17);
    assert.equal(fontSize(second), 16);
  });
});
it("instances", async (t) => {
  await snapshotCase(t, "instances", instances);
});
