import { cs, For, state } from "@backtickjs/core";

// A list at the root, with nothing wrapping it. What that makes the root is a
// stretch of the target rather than one node of it: emptying the list takes
// children away from the target itself, which is the one shape where what a
// render claims of its target is visible.
//
// `render.test.ts` draws this into a target that is already holding something
// and empties it, which a claim to the whole target would take with it.
async function Rows() {
  return cs.lift((() => {
    const __cs_ids = cs.const(cs.splice((state))<number[]>([1, 2, 3]));
    const __cs_clear = cs.const(() => {
        cs.statement(cs.receiver(__cs_ids).update(() => []));
    });
    return cs.const(<>{cs.lift(<span onclick={cs.lift(__cs_clear)}>clear</span>)}{cs.lift(<For each={cs.lift(cs.receiver(__cs_ids).read())}>{cs.lift((__cs_id: number) => <span>{cs.lift("row " + __cs_id)}</span>)}</For>)}</>);
})());
}

export default <Rows />;
