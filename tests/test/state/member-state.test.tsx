import { it } from "node:test";
import { cs, For, state } from "@backtickjs/core";
import type { State } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

type Row = {
  readonly id: number;
  readonly label: State<string>;
};

// A list whose members carry storage of their own: `build` declares a cell per
// row, and the cell the list reads holds those cells along with the rows. A
// press writes into one row's cell, so only what read that cell runs again —
// the array is the array it was, and no other row moves.
//
// What a cell starts at is the other half of this: the initial is a call here,
// not data, which is what a cell declared where it is evaluated allows.
async function MemberRows() {
  return cs`{
    const build = (from: number) => {
      return Array.from({ length: 3 }, (_, at) => {
        return { id: from + at, label: $state("row " + (from + at)) };
      });
    };

    const held = $state(build(1));

    return (
      <div>
        <ul class="rows">
          <For each={held.get()}>
            {(row: Row) => (
              <li onclick={() => row.label.set("pressed")}>
                {row.label.get()}
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
