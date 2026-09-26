import { bundler } from "@backtickjs/bundler";
import { transform } from "@backtickjs/solid-js/transform";
import { cs } from "@backtickjs/core";
import type { BacktickElement, Bundle, Prop } from "@backtickjs/core";

// What `eval` answers with is what the bundle says it evaluates to — a
// drawing, or a function of what it takes — so a tag naming it is checked the
// way any component is. Nothing here writes a type argument.
type Rows = (props: { count: number }) => BacktickElement;

// Built rather than written out: what a bundle looks like is the bundler's, and
// a fixture that spelled one would pin the format twice. The claim about what
// each takes is still written, because that is what is under test.
async function Row({ count }: { count: Prop<number> }) {
  return cs.lift(<em>{cs.lift("rows " + cs.splice((count) satisfies typeof cs.Spliceable))}</em>);
}

async function Nothing() {
  return cs.lift(<em>{cs.lift("nothing to hand it")}</em>);
}

const rows = (await bundler.run(
  cs.lift((__cs_props: {
    count: number;
}) => cs.splice((<Row count={cs.lift(__cs_props.count)} />) satisfies typeof cs.Spliceable)),
  { transform },
)) as Bundle<Rows>;

const empty = (await bundler.run(<Nothing />, {
  transform,
})) as Bundle<BacktickElement>;

export default cs.lift((() => {
    const __cs_Rows = eval(cs.splice((rows) satisfies typeof cs.Spliceable));
    const __cs_Empty = eval(cs.splice((empty) satisfies typeof cs.Spliceable));
    // Wrong: the wrong type, a name it hasn't got, and none at all.
    // @ts-expect-error: Type 'string' is not assignable to type 'number'.
    const __cs_wrongType = <__cs_Rows count={"one"}/>;
    // @ts-expect-error: Type '{ nope: number; }' is not assignable to type '{ count: number; }'.
    const __cs_unknownName = <__cs_Rows nope={1}/>;
    // @ts-expect-error: Property 'count' is missing in type '{}' but required in type '{ count: number; }'.
    const __cs_missing = <__cs_Rows />;
    // A drawing is finished: there is no call for props to reach.
    // @ts-expect-error: JSX element type 'Empty' does not have any construct or call signatures.
    const __cs_called = <__cs_Empty count={1}/>;
    return <div>{cs.lift(<__cs_Rows count={1}/>)}{cs.lift(__cs_Empty)}{cs.lift(__cs_wrongType)}{cs.lift(__cs_unknownName)}{cs.lift(__cs_missing)}{cs.lift(__cs_called)}{cs.lift(
    // @ts-expect-error: No overload matches this call.
    eval(null))}</div>;
})());
