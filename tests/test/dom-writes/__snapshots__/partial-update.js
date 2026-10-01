import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal, For } from "@backtickjs/solid-js";
import { render, screen } from "@solidjs/testing-library";
import { userEvent } from "@testing-library/user-event";
import { watchWrites } from "./writes.ts";
import { evaluate } from "../evaluate.ts";
// js-framework-benchmark's "partial update": every other row's label grows,
// and each label is a signal of its own. Writing one is a write to that row's
// text, and nothing else: no row is rebuilt, and no other row hears of it.
async function Labels() {
  return cs.create(
    "2gmqev1zv5x1m:15:9",
    {
      params: [
        { kind: "splice", value: createSignal, bindings: [] },
        { kind: "tag", value: For },
      ],
    },
    '($splice0, $tag1) => {\n    const rows = [1, 2, 3, 4].map((id) => ({\n        id: id,\n        label: $splice0()("row " + id),\n    }));\n    const update = () => {\n        for (let index = 0; index < rows.length; index = index + 2) {\n            const label = rows[index].label;\n            label[1](label[0]() + " !!!");\n        }\n    };\n    return (<div>\n        <button onclick={update}>update</button>\n        <table>\n          <tbody>\n            <$tag1 each={rows}>\n              {(row) => (<tr id={"row-" + row.id}>\n                  <td>{row.label[0]()}</td>\n                </tr>)}\n            </$tag1>\n          </tbody>\n        </table>\n      </div>);\n}',
    '{"version":3,"file":"partial-update.test.jsx","sourceRoot":"","sources":["dom-writes/partial-update.test.tsx"],"names":[],"mappings":"AAcY;IACR,MAAM,IAAI,GAAG,CAAC,CAAC,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,EAAU,EAAE,EAAE,CAAC,CAAC;QAC7C,EAAE,EAAE,EAAE;QACN,KAAK,EAAE,UAAa,CAAC,MAAM,GAAG,EAAE,CAAC;KAClC,CAAC,CAAC,CAAC;IACJ,MAAM,MAAM,GAAG,GAAG,EAAE;QAClB,KAAK,IAAI,KAAK,GAAG,CAAC,EAAE,KAAK,GAAG,IAAI,CAAC,MAAM,EAAE,KAAK,GAAG,KAAK,GAAG,CAAC,EAAE,CAAC;YAC3D,MAAM,KAAK,GAAG,IAAI,CAAC,KAAK,CAAC,CAAC,KAAK,CAAC;YAChC,KAAK,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,EAAE,GAAG,MAAM,CAAC,CAAC;QAChC,CAAC;IACH,CAAC,CAAC;IACF,OAAO,CACL,CAAC,GAAG,CACF;QAAA,CAAC,MAAM,CAAC,OAAO,CAAC,CAAC,MAAM,CAAC,CAAC,MAAM,EAAE,MAAM,CACvC;QAAA,CAAC,KAAK,CACJ;UAAA,CAAC,KAAK,CACJ;YAAA,CAAC,KAAG,CAAC,IAAI,CAAC,CAAC,IAAI,CAAC,CACd;cAAA,CAAC,CAAC,GAA0C,EAAE,EAAE,CAAC,CAC/C,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,MAAM,GAAG,GAAG,CAAC,EAAE,CAAC,CACtB;kBAAA,CAAC,EAAE,CAAC,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,EAAE,CAAC,EAAE,EAAE,CAC1B;gBAAA,EAAE,EAAE,CAAC,CACN,CACH;YAAA,EAAE,KAAG,CACP;UAAA,EAAE,KAAK,CACT;QAAA,EAAE,KAAK,CACT;MAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
  );
}
it("a label written changes that label's text and nothing else", async () => {
  const { container } = render(await evaluate(() => _jsx(Labels, {})));
  const written = watchWrites(container);
  await userEvent.click(screen.getByRole("button", { name: "update" }));
  assert.deepEqual(written(), [
    'text: "row 1" → "row 1 !!!"',
    'text: "row 3" → "row 3 !!!"',
  ]);
});
