import { cs, For, state } from "@backtickjs/core";

// A list whose every row reads the cell the selection is held in. A write
// re-runs the `href` of all three rows and moves it on two of them — the row
// selected, and the row that no longer is. The third recomputes the href it
// already had.
//
// What that has to buy is silence: `state.test.ts` records what the host was
// told and checks the row that did not move was not written to. A host told
// about it anyway would be setting a prop per row per selection, in a list of
// any size, and no snapshot of the drawn markup could see it.
async function Rows() {
  return cs`{
    const selected = $state(0);
    return (
      <div>
        <span onclick={() => selected.write(1)}>select</span>
        <div>
          <For each={[0, 1, 2]}>
            {(id: number) => (
              <a href={selected.read() === id ? "#open" : "#closed"}>
                {"row " + id}
              </a>
            )}
          </For>
        </div>
      </div>
    );
  }`;
}

export default <Rows />;
