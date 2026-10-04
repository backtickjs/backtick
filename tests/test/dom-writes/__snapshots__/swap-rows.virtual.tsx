import assert from "node:assert/strict";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal, For } from "@backtickjs/solid-js";
import { render, screen } from "@solidjs/testing-library";
import { userEvent } from "@testing-library/user-event";
import { watchWrites } from "./writes.ts";
import { evaluate } from "../evaluate.ts";

// js-framework-benchmark's "swap rows": the second row and the second-to-last
// change places. The rows between them stay where they are, so what moves is
// the two rows and nothing else.
async function SwappableRows() {
  return cs.lift((() => {
    const [__cs_ids, __cs_setIds] = cs.splice((createSignal))<number[]>([1, 2, 3, 4, 5]);
    const __cs_swap = () => {
      const __cs_held = __cs_ids();
      __cs_setIds(__cs_held.with(1, __cs_held[3]).with(3, __cs_held[1]));
    };
    return (
      <div>
        <button onclick={__cs_swap}>swap</button>
        <table>
          <tbody>
            {(void <cs.tag>{(For)}</cs.tag>, cs.splice((For))({ each: __cs_ids(), children: (__cs_id: number) => (
                <tr id={"row-" + __cs_id}>
                  <td>{"row " + __cs_id}</td>
                </tr>
              ) }))}
          </tbody>
        </table>
      </div>
    );
  })());
}

it("a swap moves the two rows it swapped", async () => {
  const { container } = render(await evaluate(() => <SwappableRows />));
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
