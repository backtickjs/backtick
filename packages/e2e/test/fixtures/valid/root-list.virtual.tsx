import { cs, state, For } from "@backtickjs/core";

// A list at the root, with nothing wrapping it. What that makes the root is a
// stretch of the target rather than one node of it: emptying the list takes
// children away from the target itself, which is the one shape where what a
// render claims of its target is visible.
//
// `render.test.ts` draws this into a target that is already holding something
// and empties it, which a claim to the whole target would take with it.
async function Rows() {
  const ids = state<number[]>([1, 2, 3]);
  const clear = cs.lift(cs.const(() => {
    cs.statement(cs.receiver(cs.splice((ids))).update(() => []));
}));
  return (
    <>
      <span onclick={clear}>clear</span>
      <For each={cs.lift(cs.const(cs.receiver(cs.splice((ids))).read()))}>
        {cs.lift(cs.const((__cs_id: number) => cs.splice((<span>{cs.lift(cs.const("row " + __cs_id))}</span>))))}
      </For>
    </>
  );
}

export default <Rows />;
