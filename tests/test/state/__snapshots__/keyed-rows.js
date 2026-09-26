import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal, For } from "@backtickjs/solid-js";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
import { children, drawn, text } from "./dom.ts";
// A keyed list driven by a signal. Every write hands back a new array of new
// rows, so nothing about the list is the object it was — the keys are the only
// thing saying which row is which.
async function SwappableRows() {
  return cs.create(
    "9zklt1bd02cm:13:9",
    {
      params: [
        { kind: "splice", value: createSignal, bindings: [] },
        { kind: "tag", value: For },
      ],
    },
    {
      code: 'export default ($0, $1) => {\n    const ids = $0()([1, 2, 3]);\n    const swap = () => {\n        const held = ids[0]();\n        ids[1](held.with(0, held[2]).with(2, held[0]));\n    };\n    const drop = () => {\n        ids[1](ids[0]().filter((id) => id !== 2));\n    };\n    return (<div>\n        <span onclick={swap}>swap</span>\n        <span onclick={drop}>drop</span>\n        <div>\n          <$1 each={ids[0]()}>\n            {(id) => <span>{"row " + id}</span>}\n          </$1>\n        </div>\n      </div>);\n};',
      map: '{"version":3,"file":"keyed-rows.test.jsx","sourceRoot":"","sources":["keyed-rows.test.tsx"],"names":[],"mappings":"eAYY;IACR,MAAM,GAAG,GAAG,IAAa,CAAW,CAAC,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC;IAC/C,MAAM,IAAI,GAAG,GAAG,EAAE;QAChB,MAAM,IAAI,GAAG,GAAG,CAAC,CAAC,CAAC,EAAE,CAAC;QACtB,GAAG,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,IAAI,CAAC,CAAC,EAAE,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,EAAE,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;IACjD,CAAC,CAAC;IACF,MAAM,IAAI,GAAG,GAAG,EAAE;QAChB,GAAG,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,EAAE,CAAC,MAAM,CAAC,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,KAAK,CAAC,CAAC,CAAC,CAAC;IAC5C,CAAC,CAAC;IACF,OAAO,CACL,CAAC,GAAG,CACF;QAAA,CAAC,IAAI,CAAC,OAAO,CAAC,CAAC,IAAI,CAAC,CAAC,IAAI,EAAE,IAAI,CAC/B;QAAA,CAAC,IAAI,CAAC,OAAO,CAAC,CAAC,IAAI,CAAC,CAAC,IAAI,EAAE,IAAI,CAC/B;QAAA,CAAC,GAAG,CACF;UAAA,CAAC,EAAG,CAAC,IAAI,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,EAAE,CAAC,CAClB;YAAA,CAAC,CAAC,EAAU,EAAE,EAAE,CAAC,CAAC,IAAI,CAAC,CAAC,MAAM,GAAG,EAAE,CAAC,EAAE,IAAI,CAAC,CAC7C;UAAA,EAAE,EAAG,CACP;QAAA,EAAE,GAAG,CACP;MAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
      imports: [],
      exportAt: 0,
    },
  );
}
describe("local state", () => {
  // A list is declared, so the client walks the array itself and a member is
  // named by its own identity. What that has to buy is node identity: a row
  // that moved is the node it was, and a row that went took its own node with
  // it — neither is anything a snapshot of the drawn markup can see, so both
  // are asserted on the nodes these hold across the write.
  it("a reordered list moves the rows it already built", async () => {
    const view = await drawn(_jsx(SwappableRows, {}));
    const [swap, , list] = children(view);
    assert.ok(swap !== undefined && list !== undefined);
    assert.deepEqual([...list.children].map(text), ["row 1", "row 2", "row 3"]);
    const [first, , third] = [...list.children];
    await userEvent.click(swap);
    assert.deepEqual([...list.children].map(text), ["row 3", "row 2", "row 1"]);
    // The two that swapped are the nodes they were, at each other's places.
    assert.equal([...list.children][0], third);
    assert.equal([...list.children][2], first);
  });
  it("a list a row was dropped from draws the rest", async () => {
    const view = await drawn(_jsx(SwappableRows, {}));
    const [, drop, list] = children(view);
    assert.ok(drop !== undefined && list !== undefined);
    const [first, , third] = [...list.children];
    await userEvent.click(drop);
    assert.deepEqual([...list.children].map(text), ["row 1", "row 3"]);
    // Only the row that went was touched; the rest kept their nodes.
    assert.deepEqual([...list.children], [first, third]);
  });
});
it("SwappableRows", async (t) => {
  await snapshotCase(t, "SwappableRows", _jsx(SwappableRows, {}));
});
