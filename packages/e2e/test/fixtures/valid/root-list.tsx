import { cs, For } from "@backtickjs/core";

// A list at the root, with nothing wrapping it. What that makes the root is a
// stretch of the target rather than one node of it: emptying the list takes
// children away from the target itself, which is the one shape where what a
// render claims of its target is visible.
//
// `render.test.ts` draws this into a target that is already holding something
// and empties it, which a claim to the whole target would take with it.
async function Rows() {
  return cs`{
    const ids = state<number[]>([1, 2, 3]);
    const clear = () => {
      ids.update(() => []);
    };
    return (
      <>
        <span onclick={clear}>clear</span>
        <For each={ids.read()}>
          {(id: number) => <span>{"row " + id}</span>}
        </For>
      </>
    );
  }`;
}

export default <Rows />;
