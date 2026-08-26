import { cs, For, state } from "@backtickjs/core";
import type { ReadonlyState } from "@backtickjs/core";

// A list whose drawing reads where a member sits as well as what it is.
//
// The index is storage, not a number, and this is the case that says why: a
// rotation moves every member without changing any of them, so a row keeps the
// node it had and only what read `index` runs again. Reading it eagerly — the
// number at the moment the row was drawn — leaves all three stale, which is the
// bug this pins.
async function Rows() {
  return cs.lift((() => {
    const __cs_names = cs.const((cs.splice((state)) satisfies import("@backtickjs/core").ClientUnknown)<string[]>(["a", "b", "c"]));
    const __cs_rotate = cs.const(() => {
        cs.statement(cs.receiver(__cs_names).update(__cs_held => [cs.index(__cs_held, 2), cs.index(__cs_held, 0), cs.index(__cs_held, 1)]));
    });
    return cs.const(<div>{cs.lift(<span onclick={cs.lift(__cs_rotate)}>rotate</span>)}{cs.lift(<div>{cs.lift(<For each={cs.lift(cs.receiver(__cs_names).read())}>{cs.lift((__cs_name: string, __cs_index: ReadonlyState<number>) => <span>{cs.lift(__cs_name + " at " + cs.receiver(__cs_index).read())}</span>)}</For>)}</div>)}</div>);
})());
}

export default <Rows />;
