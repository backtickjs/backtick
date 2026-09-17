import assert from "node:assert/strict";
import { it } from "node:test";
import { cs, For, state } from "@backtickjs/core";
import { render, screen } from "@backtickjs/web-testing";
import { userEvent } from "@testing-library/user-event";
import { watchWrites } from "./writes.ts";

// js-framework-benchmark's "remove row": one row in the middle goes. The rows
// after it close up by staying where they are, so what is written is the one
// removal.
async function RemovableRows() {
  return cs`{
    const ids = $state<number[]>([1, 2, 3, 4, 5]);
    return (
      <table>
        <tbody>
          <For each={ids.get()}>
            {(id: number) => (
              <tr id={"row-" + id}>
                <td>
                  <button
                    onclick={() =>
                      ids.set(ids.get().filter((each) => each !== id))
                    }
                  >
                    {"remove " + id}
                  </button>
                </td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    );
  }`;
}

it("a removal takes out the one row", async () => {
  const { container } = await render(<RemovableRows />);
  const written = watchWrites(container);
  await userEvent.click(screen.getByRole("button", { name: "remove 3" }));
  assert.deepEqual(written(), ["tbody − tr#row-3"]);
});
