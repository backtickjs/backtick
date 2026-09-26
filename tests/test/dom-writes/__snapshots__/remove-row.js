import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal, For } from "@backtickjs/solid-js";
import { render, screen } from "@backtickjs/solid-js/testing";
import { userEvent } from "@testing-library/user-event";
import { watchWrites } from "./writes.ts";
// js-framework-benchmark's "remove row": one row in the middle goes. The rows
// after it close up by staying where they are, so what is written is the one
// removal.
async function RemovableRows() {
  return cs.create(
    "goh8ksx12td5:13:9",
    {
      params: [
        { kind: "splice", value: createSignal, bindings: [] },
        { kind: "tag", value: For },
      ],
    },
    {
      code: 'export default ($0, $1) => {\n    const ids = $0()([1, 2, 3, 4, 5]);\n    return (<table>\n        <tbody>\n          <$1 each={ids[0]()}>\n            {(id) => (<tr id={"row-" + id}>\n                <td>\n                  <button onclick={() => ids[1](ids[0]().filter((each) => each !== id))}>\n                    {"remove " + id}\n                  </button>\n                </td>\n              </tr>)}\n          </$1>\n        </tbody>\n      </table>);\n};',
      map: '{"version":3,"file":"remove-row.test.jsx","sourceRoot":"","sources":["remove-row.test.tsx"],"names":[],"mappings":"eAYY;IACR,MAAM,GAAG,GAAG,IAAa,CAAW,CAAC,CAAC,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC;IACrD,OAAO,CACL,CAAC,KAAK,CACJ;QAAA,CAAC,KAAK,CACJ;UAAA,CAAC,EAAG,CAAC,IAAI,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,EAAE,CAAC,CAClB;YAAA,CAAC,CAAC,EAAU,EAAE,EAAE,CAAC,CACf,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,MAAM,GAAG,EAAE,CAAC,CAClB;gBAAA,CAAC,EAAE,CACD;kBAAA,CAAC,MAAM,CACL,OAAO,CAAC,CAAC,GAAG,EAAE,CACZ,GAAG,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,EAAE,CAAC,MAAM,CAAC,CAAC,IAAI,EAAE,EAAE,CAAC,IAAI,KAAK,EAAE,CAAC,CAC/C,CAAC,CAED;oBAAA,CAAC,SAAS,GAAG,EAAE,CACjB;kBAAA,EAAE,MAAM,CACV;gBAAA,EAAE,EAAE,CACN;cAAA,EAAE,EAAE,CAAC,CACN,CACH;UAAA,EAAE,EAAG,CACP;QAAA,EAAE,KAAK,CACT;MAAA,EAAE,KAAK,CAAC,CACT,CAAC;AACJ,CAAC"}',
      imports: [],
      exportAt: 0,
    },
  );
}
it("a removal takes out the one row", async () => {
  const { container } = await render(_jsx(RemovableRows, {}));
  const written = watchWrites(container);
  await userEvent.click(screen.getByRole("button", { name: "remove 3" }));
  assert.deepEqual(written(), ["tbody − tr#row-3"]);
});
