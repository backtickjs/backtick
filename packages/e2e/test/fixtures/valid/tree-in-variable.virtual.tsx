import { cs } from "@backtickjs/core";

// A tree spliced into a body and bound to a name before it is used. Nothing
// applies it at the hole and nothing draws it there — it is a value, held and
// handed back, and the position that receives it is what draws it.
//
// The shape this pins is that an entry reached from a body is *applied*: the
// value says which entry and what to hand it, and that is the whole of what an
// instance-to-be is. There was once a second way to say it — naming the entry,
// and calling what that named — and this is the case it existed for.
const Row = async () => <span>x</span>;

const held = cs.lift(cs.const(() => {
    const __cs_tree = cs.const(cs.splice((<div />)));
    return cs.const(__cs_tree);
}));

const heldComponent = cs.lift(cs.const(() => {
    const __cs_tree = cs.const(cs.splice((<Row />)));
    return cs.const(__cs_tree);
}));

export default (
  <div>
    {cs.lift(cs.const(cs.splice((held))()))}
    {cs.lift(cs.const(cs.splice((heldComponent))()))}
  </div>
);
