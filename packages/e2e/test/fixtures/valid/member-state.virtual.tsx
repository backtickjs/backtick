import { cs, For, type State, state } from "@backtickjs/core";

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
async function Rows() {
  return cs.lift((() => {
    const __cs_build = cs.const((__cs_from: number) => {
        return cs.const(cs.receiver(Array).from({ length: 3 }, (__cs__, __cs_at) => {
            return cs.const({ id: __cs_from + __cs_at, label: cs.splice((state))("row " + (__cs_from + __cs_at)) });
        }));
    });
    const __cs_held = cs.const(cs.splice((state))(__cs_build(1)));
    return cs.const(<div>{cs.lift(<ul class={cs.lift("rows")}>{cs.lift(<For each={cs.lift(cs.receiver(__cs_held).read())}>{cs.lift((__cs_row: Row) => <li onclick={cs.lift(() => cs.receiver(cs.receiver(__cs_row).label).write("pressed"))}>{cs.lift(cs.receiver(cs.receiver(__cs_row).label).read())}</li>)}</For>)}</ul>)}</div>);
})());
}

export default <Rows />;
