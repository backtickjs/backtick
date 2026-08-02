import { cs, state, For, Text, View } from "@backtickjs/core";

// A keyed list driven by a cell. Every write hands back a new array of new
// rows, so nothing about the list is the object it was — the keys are the only
// thing saying which row is which.
//
// What that has to buy is node identity: a reorder moves the nodes already
// built, and a removal takes one node with it and leaves the rest alone.
// `state.test.ts` holds the nodes across a write and checks exactly that,
// which is the half a snapshot of the drawn markup cannot see.
async function Rows() {
  const ids = state<number[]>([1, 2, 3]);
  const swap = cs.lift(cs.const(() => {
    cs.statement(cs.receiver(cs.splice((ids))).update(__cs_held => cs.receiver(cs.receiver(__cs_held).with(0, cs.index(__cs_held, 2))).with(2, cs.index(__cs_held, 0))));
}));
  const drop = cs.lift(cs.const(() => {
    cs.statement(cs.receiver(cs.splice((ids))).update(__cs_held => cs.receiver(__cs_held).filter(__cs_id => __cs_id !== 2)));
}));
  return (
    <View>
      <Text onPress={swap}>swap</Text>
      <Text onPress={drop}>drop</Text>
      <View>
        <For each={cs.lift(cs.const(cs.receiver(cs.splice((ids))).read()))}>
          {cs.lift(cs.const((__cs_id: number) => cs.splice((<Text>{cs.lift(cs.const("row " + __cs_id))}</Text>))))}
        </For>
      </View>
    </View>
  );
}

export default <Rows />;
