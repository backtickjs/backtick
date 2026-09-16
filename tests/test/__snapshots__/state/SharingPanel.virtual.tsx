import { cs, state } from "@backtickjs/core";
import type { Client, State } from "@backtickjs/core";

// A cell crossing a component boundary: declared once by the script that draws
// the pair, handed to each child as a prop, so both read one storage. The cell
// is an ordinary client value — the prop takes it the way it takes any other —
// which is what makes a write through either child reach the same storage.
const SharedCounter = async ({ size }: { size: Client<State<number>> }) => (
  <span
    style={cs.lift(cs.const("font-size: " + cs.receiver(cs.splice((size)) satisfies typeof cs.ClientUnknown).read() + "px"))}
    onclick={cs.lift(cs.const(() => {
    cs.statement(cs.receiver(cs.splice((size)) satisfies typeof cs.ClientUnknown).write(cs.receiver(cs.splice((size)) satisfies typeof cs.ClientUnknown).read() + 1));
}))}
  >
    press
  </span>
);

async function SharingPanel() {
  return cs.lift((() => {
    const __cs_size = cs.const((cs.splice((state)) satisfies typeof cs.ClientUnknown)(16));
    return cs.const(<div>{cs.lift(<SharedCounter size={cs.lift(__cs_size)}/>)}{cs.lift(<SharedCounter size={cs.lift(__cs_size)}/>)}</div>);
})());
}
