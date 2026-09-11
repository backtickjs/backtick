import { cs } from "@backtickjs/core";
import type { BacktickElement, Prop } from "@backtickjs/core";

// Which tag names a function the script holds is the scope rule every name
// follows. Inside the arrow, `Card` is its parameter; outside it, the same name
// is the host's component, spliced as before.
async function Card(props: { title: Prop<string> }) {
  return <h2>{props.title}</h2>;
}

export default cs.lift((() => {
    const __cs_twice = cs.const((__cs_Card: (props: {
        n: number;
    }) => BacktickElement) => <div>{cs.lift(<__cs_Card n={1}/>)}{cs.lift(<__cs_Card n={2}/>)}</div>);
    return cs.const(<section>{cs.lift(<Card title={cs.lift("host")}/>)}{cs.lift(__cs_twice((__cs_props: {
        n: number;
    }) => <i>{cs.lift("row " + cs.receiver(__cs_props).n)}</i>))}</section>);
})());
