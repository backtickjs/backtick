import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal, For } from "@backtickjs/solid-js";
import { render, screen } from "@backtickjs/solid-js/testing";
import { userEvent } from "@testing-library/user-event";
import { watchWrites } from "./writes.ts";
// js-framework-benchmark's "swap rows": the second row and the second-to-last
// change places. The rows between them stay where they are, so what moves is
// the two rows and nothing else.
async function SwappableRows() {
  return cs.create(
    "3q35jg4lszesn:13:9",
    {
      params: [
        { kind: "splice", value: createSignal, bindings: [] },
        { kind: "tag", value: For },
      ],
    },
    '($splice0, $tag1) => {\n    const ids = $splice0()([1, 2, 3, 4, 5]);\n    const swap = () => {\n        const held = ids[0]();\n        ids[1](held.with(1, held[3]).with(3, held[1]));\n    };\n    return (<div>\n        <button onclick={swap}>swap</button>\n        <table>\n          <tbody>\n            <$tag1 each={ids[0]()}>\n              {(id) => (<tr id={"row-" + id}>\n                  <td>{"row " + id}</td>\n                </tr>)}\n            </$tag1>\n          </tbody>\n        </table>\n      </div>);\n}',
    '{"version":3,"file":"swap-rows.test.jsx","sourceRoot":"","sources":["dom-writes/swap-rows.test.tsx"],"names":[],"mappings":"AAYY;IACR,MAAM,GAAG,GAAG,UAAa,CAAW,CAAC,CAAC,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC;IACrD,MAAM,IAAI,GAAG,GAAG,EAAE;QAChB,MAAM,IAAI,GAAG,GAAG,CAAC,CAAC,CAAC,EAAE,CAAC;QACtB,GAAG,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,IAAI,CAAC,CAAC,EAAE,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,EAAE,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;IACjD,CAAC,CAAC;IACF,OAAO,CACL,CAAC,GAAG,CACF;QAAA,CAAC,MAAM,CAAC,OAAO,CAAC,CAAC,IAAI,CAAC,CAAC,IAAI,EAAE,MAAM,CACnC;QAAA,CAAC,KAAK,CACJ;UAAA,CAAC,KAAK,CACJ;YAAA,CAAC,KAAG,CAAC,IAAI,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,EAAE,CAAC,CAClB;cAAA,CAAC,CAAC,EAAU,EAAE,EAAE,CAAC,CACf,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,MAAM,GAAG,EAAE,CAAC,CAClB;kBAAA,CAAC,EAAE,CAAC,CAAC,MAAM,GAAG,EAAE,CAAC,EAAE,EAAE,CACvB;gBAAA,EAAE,EAAE,CAAC,CACN,CACH;YAAA,EAAE,KAAG,CACP;UAAA,EAAE,KAAK,CACT;QAAA,EAAE,KAAK,CACT;MAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
  );
}
it("a swap moves the two rows it swapped", async () => {
  const { container } = await render(_jsx(SwappableRows, {}));
  const written = watchWrites(container);
  await userEvent.click(screen.getByRole("button", { name: "swap" }));
  // Each move is the row leaving where it was and arriving where it goes.
  assert.deepEqual(written(), [
    "tbody − tr#row-4",
    "tbody + tr#row-4 before tr#row-3",
    "tbody − tr#row-2",
    "tbody + tr#row-2 before tr#row-5",
  ]);
});
