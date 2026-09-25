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
  return cs.lift((() => {
    const __cs_build = (__cs_from: number) => {
        return Array.from({ length: 3 }, (__cs__, __cs_at) => {
            return { id: __cs_from + __cs_at, label: cs.splice((state) satisfies typeof cs.Spliceable)("row " + (__cs_from + __cs_at)) };
        });
    };
    const __cs_held = cs.splice((state) satisfies typeof cs.Spliceable)(__cs_build(1));
    return <div>{cs.lift(<ul class={cs.lift("rows")}>{cs.lift(<For each={cs.lift(__cs_held.get())}>{cs.lift((__cs_row: Row) => <li onclick={cs.lift(() => __cs_row.label.set("pressed"))}>{cs.lift(__cs_row.label.get())}</li>)}</For>)}</ul>)}</div>;
})());
}

it("MemberRows", async (t) => {
  await snapshotCase(t, "MemberRows", <MemberRows />);
});
