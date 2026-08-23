import { cs, For } from "@backtickjs/core";

// A keyed list driven by a cell. Every write hands back a new array of new
// rows, so nothing about the list is the object it was — the keys are the only
// thing saying which row is which.
//
// What that has to buy is node identity: a reorder moves the nodes already
// built, and a removal takes one node with it and leaves the rest alone.
// `state.test.ts` holds the nodes across a write and checks exactly that,
// which is the half a snapshot of the drawn markup cannot see.
async function Rows() {
  return cs`{
    const ids = state<number[]>([1, 2, 3]);
    const swap = () => {
      ids.update((held) => held.with(0, held[2]).with(2, held[0]));
    };
    const drop = () => {
      ids.update((held) => held.filter((id) => id !== 2));
    };
    return (
      <div>
        <span onclick={swap}>swap</span>
        <span onclick={drop}>drop</span>
        <div>
          <For each={ids.read()}>
            {(id: number) => <span>{"row " + id}</span>}
          </For>
        </div>
      </div>
    );
  }`;
}

export default <Rows />;
