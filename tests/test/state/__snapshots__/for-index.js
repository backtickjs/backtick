import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal, For } from "@backtickjs/solid-js";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
import { children, drawn, text } from "./dom.ts";
// A list whose drawing reads where a member sits as well as what it is.
//
// The index is storage, not a number: a rotation moves every member without
// changing any of them, so a row keeps the node it had and only what read
// `index` runs again. Reading it eagerly — the number at the moment the row was
// drawn — leaves all three stale.
async function RotatingRows() {
  return cs.create(
    "1jfuhgh5cfsz9:16:9",
    {
      params: [
        { kind: "splice", value: createSignal, bindings: [] },
        { kind: "tag", value: For },
      ],
    },
    {
      code: 'export default ($0, $1) => {\n    const names = $0()(["a", "b", "c"]);\n    const rotate = () => {\n        const held = names[0]();\n        names[1]([held[2], held[0], held[1]]);\n    };\n    return (<div>\n        <span onclick={rotate}>rotate</span>\n        <div>\n          <$1 each={names[0]()}>\n            {(name, index) => (<span>{name + " at " + index()}</span>)}\n          </$1>\n        </div>\n      </div>);\n};',
      map: '{"version":3,"file":"for-index.test.jsx","sourceRoot":"","sources":["state/for-index.test.tsx"],"names":[],"mappings":"eAeY;IACR,MAAM,KAAK,GAAG,IAAa,CAAW,CAAC,GAAG,EAAE,GAAG,EAAE,GAAG,CAAC,CAAC,CAAC;IACvD,MAAM,MAAM,GAAG,GAAG,EAAE;QAClB,MAAM,IAAI,GAAG,KAAK,CAAC,CAAC,CAAC,EAAE,CAAC;QACxB,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,EAAE,IAAI,CAAC,CAAC,CAAC,EAAE,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;IACxC,CAAC,CAAC;IACF,OAAO,CACL,CAAC,GAAG,CACF;QAAA,CAAC,IAAI,CAAC,OAAO,CAAC,CAAC,MAAM,CAAC,CAAC,MAAM,EAAE,IAAI,CACnC;QAAA,CAAC,GAAG,CACF;UAAA,CAAC,EAAG,CAAC,IAAI,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,EAAE,CAAC,CACpB;YAAA,CAAC,CAAC,IAAY,EAAE,KAAmB,EAAE,EAAE,CAAC,CACtC,CAAC,IAAI,CAAC,CAAC,IAAI,GAAG,MAAM,GAAG,KAAK,EAAE,CAAC,EAAE,IAAI,CAAC,CACvC,CACH;UAAA,EAAE,EAAG,CACP;QAAA,EAAE,GAAG,CACP;MAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
    },
  );
}
describe("local state", () => {
  it("a moved row keeps its node and reads its new index", async () => {
    const view = await drawn(_jsx(RotatingRows, {}));
    const [rotate, list] = children(view);
    assert.ok(rotate !== undefined && list !== undefined);
    assert.deepEqual([...list.children].map(text), [
      "a at 0",
      "b at 1",
      "c at 2",
    ]);
    const held = [...list.children][0];
    await userEvent.click(rotate);
    // Nothing about a member changed, so every row is the node it was — and
    // the index each one draws is the position it now sits at.
    assert.deepEqual([...list.children].map(text), [
      "c at 0",
      "a at 1",
      "b at 2",
    ]);
    assert.equal(list.children[1], held);
  });
});
it("RotatingRows", async (t) => {
  await snapshotCase(t, "RotatingRows", _jsx(RotatingRows, {}));
});
