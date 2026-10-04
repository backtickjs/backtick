import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal, For } from "@backtickjs/solid-js";
import type { Signal } from "@backtickjs/solid-js";
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
  return cs.lift((() => {
    const __cs_build = (__cs_from: number) => {
      return cs.globalThis.Array.from({ length: 3 }, (__cs__, __cs_at) => {
        return { id: __cs_from + __cs_at, label: cs.splice((createSignal))("row " + (__cs_from + __cs_at)) };
      });
    };

    const [__cs_held, __cs_setHeld] = cs.splice((createSignal))(__cs_build(1));

    return (
      <div>
        <ul class="rows">
          {(void <cs.tag>{(For)}</cs.tag>, cs.splice((For))({ each: __cs_held(), children: (__cs_row: Row) => (
              <li onclick={() => __cs_row.label[1]("pressed")}>{__cs_row.label[0]()}</li>
            ) }))}
        </ul>
      </div>
    );
  })());
}

it("MemberRows", async (t) => {
  await snapshotCase(t, "MemberRows", <MemberRows />);
});
