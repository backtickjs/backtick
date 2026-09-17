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

const rows = (await bundler.run(
  cs.lift(cs.const((__cs_props: {
    count: number;
}) => (cs.splice((<Row count={cs.lift(cs.const(cs.receiver(__cs_props).count))} />)) satisfies typeof cs.ClientUnknown))),
)) as Bundle<Rows>;

const empty = (await bundler.run(<Nothing />)) as Bundle<BacktickElement>;

export default cs.lift((() => {
    const __cs_Rows = cs.const(cs.receiver((cs.splice((vm)) satisfies typeof cs.ClientUnknown)).eval((cs.splice((rows)) satisfies typeof cs.ClientUnknown)));
    const __cs_Empty = cs.const(cs.receiver((cs.splice((vm)) satisfies typeof cs.ClientUnknown)).eval((cs.splice((empty)) satisfies typeof cs.ClientUnknown)));
    // Wrong: the wrong type, a name it hasn't got, and none at all.
    // @ts-expect-error: Type 'string' is not assignable to type 'number'.
    const __cs_wrongType = cs.const(<__cs_Rows count={"one"}/>);
    // @ts-expect-error: Type '{ nope: number; }' is not assignable to type '{ count: number; }'.
    const __cs_unknownName = cs.const(<__cs_Rows nope={1}/>);
    // @ts-expect-error: Property 'count' is missing in type '{}' but required in type '{ count: number; }'.
    const __cs_missing = cs.const(<__cs_Rows />);
    // A drawing is finished: there is no call for props to reach.
    // @ts-expect-error: JSX element type 'Empty' does not have any construct or call signatures.
    const __cs_called = cs.const(<__cs_Empty count={1}/>);
    return cs.const(<div>{cs.lift(<__cs_Rows count={1}/>)}{cs.lift(__cs_Empty)}{cs.lift(__cs_wrongType)}{cs.lift(__cs_unknownName)}{cs.lift(__cs_missing)}{cs.lift(__cs_called)}{cs.lift(
    // @ts-expect-error: Argument of type 'null' is not assignable to parameter of type 'Bundle<string | number | BacktickElement | null>'.
    cs.receiver((cs.splice((vm)) satisfies typeof cs.ClientUnknown)).eval(null))}{cs.lift(
    // @ts-expect-error: Argument of type 'string' is not assignable to parameter of type 'Bundle<string | number | BacktickElement | null>'.
    cs.receiver((cs.splice((vm)) satisfies typeof cs.ClientUnknown)).eval(cs.receiver(JSON).stringify({})))}</div>);
})());
