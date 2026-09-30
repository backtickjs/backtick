import assert from "node:assert/strict";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal, For } from "@backtickjs/solid-js";
import { render, screen } from "@solidjs/testing-library";
import { userEvent } from "@testing-library/user-event";
import { watchWrites } from "./writes.ts";
import { draw } from "@backtickjs/solid-js/testing";

// js-framework-benchmark's "remove row": one row in the middle goes. The rows
// after it close up by staying where they are, so what is written is the one
// removal.
async function RemovableRows() {
  return cs.lift((() => {
    const __cs_ids = cs.splice((createSignal))<number[]>([1, 2, 3, 4, 5]);
    return <table>{cs.lift(<tbody>{cs.lift(<For each={cs.lift(__cs_ids[0]())}>{cs.lift((__cs_id: number) => <tr id={cs.lift("row-" + __cs_id)}>{cs.lift(<td>{cs.lift(<button onclick={cs.lift(() => __cs_ids[1](__cs_ids[0]().filter(__cs_each => __cs_each !== __cs_id)))}>{cs.lift("remove " + __cs_id)}</button>)}</td>)}</tr>)}</For>)}</tbody>)}</table>;
})());
}

it("a removal takes out the one row", async () => {
  const { container } = render(await draw(() => <RemovableRows />));
  const written = watchWrites(container);
  await userEvent.click(screen.getByRole("button", { name: "remove 3" }));
  assert.deepEqual(written(), ["tbody − tr#row-3"]);
});
