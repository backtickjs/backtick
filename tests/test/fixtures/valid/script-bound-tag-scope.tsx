import { cs } from "@backtickjs/core";
import type { BacktickElement, Prop } from "@backtickjs/core";

// Which tag names a function the script holds is the scope rule every name
// follows. Inside the arrow, `Card` is its parameter; outside it, the same name
// is the host's component, spliced as before.
async function Card(props: { title: Prop<string> }) {
  return <h2>{props.title}</h2>;
}

export default cs`{
  const twice = (Card: (props: { n: number }) => BacktickElement) => (
    <div>
      <Card n={1} />
      <Card n={2} />
    </div>
  );

  return (
    <section>
      <Card title="host" />
      {twice((props: { n: number }) => <i>{"row " + props.n}</i>)}
    </section>
  );
}`;
