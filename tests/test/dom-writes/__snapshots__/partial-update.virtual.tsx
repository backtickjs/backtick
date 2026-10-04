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
  return cs.lift((() => {
    const __cs_rows = [1, 2, 3, 4].map((__cs_id: number) => ({
      id: __cs_id,
      label: cs.splice((createSignal))("row " + __cs_id),
    }));
    const __cs_update = () => {
      for (let __cs_index = 0; __cs_index < __cs_rows.length; __cs_index = __cs_index + 2) {
        const __cs_label = __cs_rows[__cs_index].label;
        __cs_label[1](__cs_label[0]() + " !!!");
      }
    };
    return (
      <div>
        <button onclick={__cs_update}>update</button>
        <table>
          <tbody>
            {(void <cs.tag>{(For)}</cs.tag>, cs.splice((For))({ each: __cs_rows, children: (__cs_row: { id: number; label: Signal<string> }) => (
                <tr id={"row-" + __cs_row.id}>
                  <td>{__cs_row.label[0]()}</td>
                </tr>
              ) }))}
          </tbody>
        </table>
      </div>
    );
  })());
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
