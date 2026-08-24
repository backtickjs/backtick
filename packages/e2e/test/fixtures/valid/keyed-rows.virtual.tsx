import { cs, For, state } from "@backtickjs/core";

// A keyed list driven by a cell. Every write hands back a new array of new
// rows, so nothing about the list is the object it was — the keys are the only
// thing saying which row is which.
//
// What that has to buy is node identity: a reorder moves the nodes already
// built, and a removal takes one node with it and leaves the rest alone.
// `state.test.ts` holds the nodes across a write and checks exactly that,
// which is the half a snapshot of the drawn markup cannot see.
async function Rows() {
  return cs.lift((() => {
    const __cs_ids = cs.const(cs.splice((state))<number[]>([1, 2, 3]));
    const __cs_swap = cs.const(() => {
        cs.statement(cs.receiver(__cs_ids).update(__cs_held => cs.receiver(cs.receiver(__cs_held).with(0, cs.index(__cs_held, 2))).with(2, cs.index(__cs_held, 0))));
    });
    const __cs_drop = cs.const(() => {
        cs.statement(cs.receiver(__cs_ids).update(__cs_held => cs.receiver(__cs_held).filter(__cs_id => __cs_id !== 2)));
    });
    return cs.const(<div>{cs.lift(<span onclick={cs.lift(__cs_swap)}>swap</span>)}{cs.lift(<span onclick={cs.lift(__cs_drop)}>drop</span>)}{cs.lift(<div>{cs.lift(<For each={cs.lift(cs.receiver(__cs_ids).read())}>{cs.lift((__cs_id: number) => <span>{cs.lift("row " + __cs_id)}</span>)}</For>)}</div>)}</div>);
})());
}

export default <Rows />;
