import { cs } from "@backtickjs/core";

// `update` derives the next value from the current one, so a handler needs no
// separate read. It returns `void` like `write`, which is what keeps it out of
// a value body: only a statement position accepts `void`.
async function Stepper() {
  return cs.lift((() => {
    const __cs_size = cs.const(cs.state(16));
    return cs.const(<span style={cs.lift("font-size: " + cs.receiver(__cs_size).read() + "px")} onclick={cs.lift(() => {
        cs.statement(cs.receiver(__cs_size).update((__cs_current: number) => __cs_current + 1));
    })}>
        press
      </span>);
})());
}

export default <Stepper />;
