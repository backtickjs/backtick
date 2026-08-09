import { cs, state, For } from "@backtickjs/core";
import type { ReadonlyState } from "@backtickjs/core";

// A list whose drawing reads where a member sits as well as what it is.
//
// The index is storage, not a number, and this is the case that says why: a
// rotation moves every member without changing any of them, so a row keeps the
// node it had and only what read `index` runs again. Reading it eagerly — the
// number at the moment the row was drawn — leaves all three stale, which is the
// bug this pins.
async function Rows() {
  const names = state<string[]>(["a", "b", "c"]);
  const rotate = cs.lift(cs.const(() => {
    cs.statement(cs.receiver(cs.splice((names))).update(__cs_held => [cs.index(__cs_held, 2), cs.index(__cs_held, 0), cs.index(__cs_held, 1)]));
}));
  return (
    <div>
      <span onclick={rotate}>rotate</span>
      <div>
        <For each={cs.lift(cs.const(cs.receiver(cs.splice((names))).read()))}>
          {cs.lift(cs.const((__cs_name: string, __cs_index: ReadonlyState<number>) => cs.splice((<span>{cs.lift(cs.const(__cs_name + " at " + cs.receiver(__cs_index).read()))}</span>))))}
        </For>
      </div>
    </div>
  );
}

export default <Rows />;
