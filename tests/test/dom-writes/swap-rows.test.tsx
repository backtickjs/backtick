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
  return cs`{
    const ids = $createSignal<number[]>([1, 2, 3, 4, 5]);
    const swap = () => {
      const held = ids[0]();
      ids[1](held.with(1, held[3]).with(3, held[1]));
    };
    return (
      <div>
        <button onclick={swap}>swap</button>
        <table>
          <tbody>
            <For each={ids[0]()}>
              {(id: number) => (
                <tr id={"row-" + id}>
                  <td>{"row " + id}</td>
                </tr>
              )}
            </For>
          </tbody>
        </table>
      </div>
    );
  }`;
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
