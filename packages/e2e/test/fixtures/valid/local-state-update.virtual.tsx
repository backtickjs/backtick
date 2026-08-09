import { cs, state } from "@backtickjs/core";

// `update` derives the next value from the current one, so a handler needs no
// separate read. It returns `void` like `write`, which is what keeps it out of
// a value body: only a statement position accepts `void`.
async function Stepper() {
  const size = state(16);
  return (
    <span
      style={cs.lift(cs.const("font-size: " + cs.receiver(cs.splice((size))).read() + "px"))}
      onclick={cs.lift(cs.const(() => {
    cs.statement(cs.receiver(cs.splice((size))).update((__cs_current: number) => __cs_current + 1));
}))}
    >
      press
    </span>
  );
}

export default <Stepper />;
