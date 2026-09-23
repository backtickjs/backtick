import assert from "node:assert/strict";
import { it } from "node:test";
import { cs, For, state } from "@backtickjs/core";
import { render, screen } from "@backtickjs/web-testing";
import { userEvent } from "@testing-library/user-event";
import { watchWrites } from "./writes.ts";

// js-framework-benchmark's "swap rows": the second row and the second-to-last
// change places. The rows between them stay where they are, so what moves is
// the two rows and nothing else.
async function SwappableRows() {
  return cs.lift((() => {
    const __cs_ids = cs.const((cs.splice((state)) satisfies typeof cs.ClientUnknown)<number[]>([1, 2, 3, 4, 5]));
    const __cs_swap = cs.const(() => {
        const __cs_held = cs.const(__cs_ids.get());
        cs.statement(__cs_ids.set(__cs_held.with(1, __cs_held[3]).with(3, __cs_held[1])));
    });
    return cs.const(<div>{cs.lift(<button onclick={cs.lift(__cs_swap)}>swap</button>)}{cs.lift(<table>{cs.lift(<tbody>{cs.lift(<For each={cs.lift(__cs_ids.get())}>{cs.lift((__cs_id: number) => <tr id={cs.lift("row-" + __cs_id)}>{cs.lift(<td>{cs.lift("row " + __cs_id)}</td>)}</tr>)}</For>)}</tbody>)}</table>)}</div>);
})());
}

it("a swap moves the two rows it swapped", async () => {
  const { container } = await render(<SwappableRows />);
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
