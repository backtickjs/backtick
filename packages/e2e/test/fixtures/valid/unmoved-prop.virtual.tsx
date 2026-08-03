import { cs, state, For, Link, Text, View } from "@backtickjs/core";

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
  const selected = state(0);
  return (
    <View>
      <Text onPress={cs.lift(cs.const(() => cs.receiver(cs.splice((selected))).write(1)))}>select</Text>
      <View>
        <For each={cs.lift(cs.const([0, 1, 2]))}>
          {cs.lift(cs.const((__cs_id: number) => cs.splice((
              <Link href={cs.lift(cs.const(cs.receiver(cs.splice((selected))).read() === __cs_id ? "#open" : "#closed"))}>
                {cs.lift(cs.const("row " + __cs_id))}
              </Link>
            ))))}
        </For>
      </View>
    </View>
  );
}

export default <Rows />;
