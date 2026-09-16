import { cs, state } from "@backtickjs/core";
import type { Client, State } from "@backtickjs/core";

// A child reading a cell it was handed, in all three positions at once: a prop,
// a text child, and a branch deciding which elements exist. The script that
// declares the cell never reads it, so a write reaches each `ReadingRow` with
// the arguments it already had — the same handle object, the same id.
//
// Nothing a row was given is different, and everything it draws is. Skipping
// on the arguments alone leaves both rows stale: a handle is one object
// whatever its cell holds. The branch is the half no amount of recomputing a
// prop can answer for.
const ReadingRow = async ({
  id,
  selected,
}: {
  id: Client<number>;
  selected: Client<State<number>>;
}) => (
  <div>
    <span
      style={cs.lift(cs.const("font-size: " + (cs.receiver(cs.splice((selected)) satisfies typeof cs.ClientUnknown).read() === cs.splice((id)) satisfies typeof cs.ClientUnknown ? 20 : 16) + "px"))}
    >
      {cs.lift(cs.const("row " + (cs.splice((id)) satisfies typeof cs.ClientUnknown) + " of " + cs.receiver(cs.splice((selected)) satisfies typeof cs.ClientUnknown).read()))}
    </span>
    {cs.lift(cs.const(cs.receiver(cs.splice((selected)) satisfies typeof cs.ClientUnknown).read() === cs.splice((id)) satisfies typeof cs.ClientUnknown ? cs.splice((<span>marker</span>)) satisfies typeof cs.ClientUnknown : null))}
  </div>
);

async function ReadingPanel() {
  return cs.lift((() => {
    const __cs_selected = cs.const((cs.splice((state)) satisfies typeof cs.ClientUnknown)(0));
    return cs.const(<div>{cs.lift(<span onclick={cs.lift(() => cs.receiver(__cs_selected).write(1))}>select</span>)}{cs.lift(<ReadingRow id={cs.lift(0)} selected={cs.lift(__cs_selected)}/>)}{cs.lift(<ReadingRow id={cs.lift(1)} selected={cs.lift(__cs_selected)}/>)}</div>);
})());
}
