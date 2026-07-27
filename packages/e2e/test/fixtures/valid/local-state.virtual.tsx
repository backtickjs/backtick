import { cs, state, Text } from "@backtickjs/core";

// A per-instance state cell. The component that declared it owns it, so that
// component's entry carries the initial value and each instance allocates its
// own storage. The display and the handler splice the same handle, so they
// share one cell: `read()` is an input — a value that re-evaluates when the
// cell changes — and `write` is an effect, which only an action can perform.
//
// A cell reaches each script as an argument, so the handler entry takes it as
// a parameter and the tree wires it in with `cells`, exactly as a capture
// threads through `slots`.
async function Stepper() {
  const size = state(16);
  return (
    <Text
      style={{ fontSize: cs.lift(cs.const(cs.receiver(cs.splice((size))).read())) }}
      onPress={cs.lift(cs.const(() => {
    cs.statement(cs.receiver(cs.splice((size))).write(cs.receiver(cs.splice((size))).read() + 1));
}))}
    >
      press
    </Text>
  );
}

export default <Stepper />;
