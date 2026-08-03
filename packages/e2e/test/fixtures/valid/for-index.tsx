import { cs, state, For, Text, View } from "@backtickjs/core";
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
  const rotate = cs`() => {
    $names.update((held) => [held[2], held[0], held[1]]);
  }`;
  return (
    <View>
      <Text onPress={rotate}>rotate</Text>
      <View>
        <For each={cs`$names.read()`}>
          {cs`(name: string, index: ReadonlyState<number>) =>
            ${(<Text>{cs`name + " at " + index.read()`}</Text>)}`}
        </For>
      </View>
    </View>
  );
}

export default <Rows />;
