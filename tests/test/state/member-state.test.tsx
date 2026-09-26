import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal, For } from "@backtickjs/solid-js";
import type { Signal } from "solid-js";
import { snapshotCase } from "../snapshotCase.ts";

type Row = {
  readonly id: number;
  readonly label: Signal<string>;
};

// A list whose members carry storage of their own: `build` declares a signal per
// row, and the signal the list reads holds those signals along with the rows.
// A press writes into one row's signal, so only what read it runs again —
// the array is the array it was, and no other row moves.
//
// What a signal starts at is the other half of this: the initial is a call
// here, not data, which is what a signal declared where it is evaluated allows.
async function MemberRows() {
  return cs`{
    const build = (from: number) => {
      return Array.from({ length: 3 }, (_, at) => {
        return { id: from + at, label: $createSignal("row " + (from + at)) };
      });
    };

    const held = $createSignal(build(1));

    return (
      <div>
        <ul class="rows">
          <For each={held[0]()}>
            {(row: Row) => (
              <li onclick={() => row.label[1]("pressed")}>
                {row.label[0]()}
              </li>
            )}
          </For>
        </ul>
      </div>
    );
  }`;
}

it("MemberRows", async (t) => {
  await snapshotCase(t, "MemberRows", <MemberRows />);
});
