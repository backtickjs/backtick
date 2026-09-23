import assert from "node:assert/strict";
import { it } from "node:test";
import { cs, For, state, type State } from "@backtickjs/core";
import { render, screen } from "@backtickjs/web-testing";
import { userEvent } from "@testing-library/user-event";
import { watchWrites } from "./writes.ts";

// js-framework-benchmark's "partial update": every other row's label grows,
// and each label is a cell of its own. Writing one is a write to that row's
// text, and nothing else: no row is rebuilt, and no other row hears of it.
async function Labels() {
  return cs.lift((() => {
    const __cs_rows = cs.const([1, 2, 3, 4].map((__cs_id: number) => ({ id: __cs_id, label: (cs.splice((state)) satisfies typeof cs.ClientUnknown)("row " + __cs_id) })));
    const __cs_update = cs.const(() => {
        for (let __cs_index = 0; __cs_index < __cs_rows.length; __cs_index = cs.const(__cs_index + 2)) {
            const __cs_label = cs.const(__cs_rows[__cs_index].label);
            cs.statement(__cs_label.set(__cs_label.get() + " !!!"));
        }
    });
    return cs.const(<div>{cs.lift(<button onclick={cs.lift(__cs_update)}>update</button>)}{cs.lift(<table>{cs.lift(<tbody>{cs.lift(<For each={cs.lift(__cs_rows)}>{cs.lift((__cs_row: {
        id: number;
        label: State<string>;
    }) => <tr id={cs.lift("row-" + __cs_row.id)}>{cs.lift(<td>{cs.lift(__cs_row.label.get())}</td>)}</tr>)}</For>)}</tbody>)}</table>)}</div>);
})());
}

it("a label written changes that label's text and nothing else", async () => {
  const { container } = await render(<Labels />);
  const written = watchWrites(container);
  await userEvent.click(screen.getByRole("button", { name: "update" }));
  assert.deepEqual(written(), [
    'text: "row 1" → "row 1 !!!"',
    'text: "row 3" → "row 3 !!!"',
  ]);
});
