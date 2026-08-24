import { cs, state } from "@backtickjs/core";

// A cell a script declares, read and written by what it draws. The script owns
// the storage, so the display and the handler are two readers of one binding
// and share one cell: `read()` is an input — a value that re-evaluates when the
// cell changes — and `write` is an effect, which only an action can perform.
async function Stepper() {
  return cs.lift((() => {
    const __cs_size = cs.const(cs.splice((state))(16));
    return cs.const(<span style={cs.lift("font-size: " + cs.receiver(__cs_size).read() + "px")} onclick={cs.lift(() => {
        cs.statement(cs.receiver(__cs_size).write(cs.receiver(__cs_size).read() + 1));
    })}>
        press
      </span>);
})());
}

export default <Stepper />;
