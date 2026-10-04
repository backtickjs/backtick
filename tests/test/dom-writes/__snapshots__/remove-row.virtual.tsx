import assert from "node:assert/strict";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal, For } from "@backtickjs/solid-js";
import { render, screen } from "@solidjs/testing-library";
import { userEvent } from "@testing-library/user-event";
import { watchWrites } from "./writes.ts";
import { evaluate } from "../evaluate.ts";

// js-framework-benchmark's "remove row": one row in the middle goes. The rows
// after it close up by staying where they are, so what is written is the one
// removal.
async function RemovableRows() {
  return cs.lift((() => {
    const [__cs_ids, __cs_setIds] = cs.splice((createSignal))<number[]>([1, 2, 3, 4, 5]);
    return (
      <table>
        <tbody>
          {(void <cs.tag>{(For)}</cs.tag>, cs.splice((For))({ each: __cs_ids(), children: (__cs_id: number) => (
              <tr id={"row-" + __cs_id}>
                <td>
                  <button
                    onclick={() => __cs_setIds(__cs_ids().filter((__cs_each) => __cs_each !== __cs_id))}
                  >
                    {"remove " + __cs_id}
                  </button>
                </td>
              </tr>
            ) }))}
        </tbody>
      </table>
    );
  })());
}

it("a removal takes out the one row", async () => {
  const { container } = render(await evaluate(() => <RemovableRows />));
  const written = watchWrites(container);
  await userEvent.click(screen.getByRole("button", { name: "remove 3" }));
  assert.deepEqual(written(), ["tbody − tr#row-3"]);
});
