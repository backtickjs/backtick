import { cs } from "@backtickjs/core";
import type { Client, State } from "@backtickjs/core";

// A cell crossing a component boundary: declared once by the script that draws
// the pair, handed to each child as a prop, so both read one storage. The cell
// is an ordinary client value — the prop takes it the way it takes any other —
// which is what makes a write through either child reach the same storage.
const Counter = async ({ size }: { size: Client<State<number>> }) => (
  <span
    style={cs.lift(cs.const("font-size: " + cs.receiver(cs.splice((size))).read() + "px"))}
    onclick={cs.lift(cs.const(() => {
    cs.statement(cs.receiver(cs.splice((size))).write(cs.receiver(cs.splice((size))).read() + 1));
}))}
  >
    press
  </span>
);

async function Panel() {
  return cs.lift((() => {
    const __cs_size = cs.const(cs.state(16));
    return cs.const(<div>{cs.lift(<Counter size={cs.lift(__cs_size)}/>)}{cs.lift(<Counter size={cs.lift(__cs_size)}/>)}</div>);
})());
}

export default <Panel />;
