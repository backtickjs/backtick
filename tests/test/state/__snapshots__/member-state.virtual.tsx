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
  return cs.lift((() => {
    const __cs_build = (__cs_from: number) => {
        return Array.from({ length: 3 }, (__cs__, __cs_at) => {
            return { id: __cs_from + __cs_at, label: cs.splice((createSignal) satisfies typeof cs.Spliceable)("row " + (__cs_from + __cs_at)) };
        });
    };
    const __cs_held = cs.splice((createSignal) satisfies typeof cs.Spliceable)(__cs_build(1));
    return <div>{cs.lift(<ul class={cs.lift("rows")}>{cs.lift(<For each={cs.lift(__cs_held[0]())}>{cs.lift((__cs_row: Row) => <li onclick={cs.lift(() => __cs_row.label[1]("pressed"))}>{cs.lift(__cs_row.label[0]())}</li>)}</For>)}</ul>)}</div>;
})());
}

it("MemberRows", async (t) => {
  await snapshotCase(t, "MemberRows", <MemberRows />);
});
