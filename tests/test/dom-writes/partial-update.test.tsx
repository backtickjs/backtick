import assert from "node:assert/strict";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal, For } from "@backtickjs/solid-js";
import type { Signal } from "@backtickjs/solid-js";
import { render, screen } from "@solidjs/testing-library";
import { userEvent } from "@testing-library/user-event";
import { watchWrites } from "./writes.ts";
import { evaluate } from "../evaluate.ts";

// js-framework-benchmark's "partial update": every other row's label grows,
// and each label is a signal of its own. Writing one is a write to that row's
// text, and nothing else: no row is rebuilt, and no other row hears of it.
async function Labels() {
  return cs`{
    const rows = [1, 2, 3, 4].map((id: number) => ({
      id: id,
      label: $createSignal("row " + id),
    }));
    const update = () => {
      for (let index = 0; index < rows.length; index = index + 2) {
        const label = rows[index].label;
        label[1](label[0]() + " !!!");
      }
    };
    return (
      <div>
        <button onclick={update}>update</button>
        <table>
          <tbody>
            <$For each={rows}>
              {(row: { id: number; label: Signal<string> }) => (
                <tr id={"row-" + row.id}>
                  <td>{row.label[0]()}</td>
                </tr>
              )}
            </$For>
          </tbody>
        </table>
      </div>
    );
  }`;
}

it("a label written changes that label's text and nothing else", async () => {
  const { container } = render(await evaluate(() => <Labels />));
  const written = watchWrites(container);
  await userEvent.click(screen.getByRole("button", { name: "update" }));
  assert.deepEqual(written(), [
    'text: "row 1" → "row 1 !!!"',
    'text: "row 3" → "row 3 !!!"',
  ]);
});
