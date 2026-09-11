import { bundler } from "@backtickjs/bundler";
import { cs, vm } from "@backtickjs/core";
import type { BacktickElement, Bundle, Prop } from "@backtickjs/core";

// What `vm.eval` answers with is what the bundle says it evaluates to — a
// drawing, or a function of what it takes — so a tag naming it is checked the
// way any component is. Nothing here writes a type argument.
type Rows = (props: { count: number }) => BacktickElement;

// Built rather than written out: what a bundle looks like is the bundler's, and
// a fixture that spelled one would pin the format twice. The claim about what
// each takes is still written, because that is what is under test.
async function Row({ count }: { count: Prop<number> }) {
  return cs.lift(cs.const(<em>{cs.lift("rows " + (cs.splice((count)) satisfies typeof cs.ClientUnknown))}</em>));
}

async function Nothing() {
  return cs.lift(cs.const(<em>{cs.lift("nothing to hand it")}</em>));
}

const rows = (await bundler.run(cs.lift(cs.const((__cs_props: {
    count: number;
}) => cs.splice((
  <Row count={cs.lift(cs.const(cs.receiver(__cs_props).count))} />
)) satisfies typeof cs.ClientUnknown)))) as Bundle<Rows>;

const empty = (await bundler.run(<Nothing />)) as Bundle<BacktickElement>;

export default cs.lift((() => {
    const __cs_Rows = cs.const(cs.receiver(cs.splice((vm)) satisfies typeof cs.ClientUnknown).eval(cs.splice((rows)) satisfies typeof cs.ClientUnknown));
    const __cs_Empty = cs.const(cs.receiver(cs.splice((vm)) satisfies typeof cs.ClientUnknown).eval(cs.splice((empty)) satisfies typeof cs.ClientUnknown));
    return cs.const(<div>{cs.lift(<__cs_Rows count={1}/>)}{cs.lift(__cs_Empty)}{cs.lift(<__cs_Rows count={"one"}/>)}{cs.lift(<__cs_Rows nope={1}/>)}{cs.lift(<__cs_Rows />)}{cs.lift(<__cs_Empty count={1}/>)}{cs.lift(cs.receiver(cs.splice((vm)) satisfies typeof cs.ClientUnknown).eval(null))}{cs.lift(cs.receiver(cs.splice((vm)) satisfies typeof cs.ClientUnknown).eval(cs.receiver(JSON).stringify({})))}</div>);
})());
