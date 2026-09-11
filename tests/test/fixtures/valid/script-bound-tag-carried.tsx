import { cs, state } from "@backtickjs/core";
import type { BacktickElement, Client, Prop } from "@backtickjs/core";

// A host component whose script declares its own `Badge`, and draws what it was
// handed beside it.
async function Panel(props: { body: Prop<BacktickElement> }) {
  return cs`{
    const Badge = (p: { n: number }) => <i>{"panel " + p.n}</i>;
    return (
      <section>
        <Badge n={0} />
        {$props.body}
      </section>
    );
  }`;
}

// A script handed to `Panel` as a prop, naming a function the script around it
// holds. It lands inside `Panel`'s script, whose own `Badge` is in scope there
// — and still calls the one it was written under, since that is the binding it
// carries. The tag holds children too, read through the same record.
export default cs`{
  const count = $state(0);
  const Badge = (p: { n: number; children: BacktickElement }) => (
    <b>
      {"outer " + p.n}
      {p.children}
    </b>
  );

  return (
    <div>
      <Panel body={${cs`<Badge n={count.read()}><u>{"kid " + count.read()}</u></Badge>`}} />
      <button onclick={() => count.write(count.read() + 1)}>more</button>
    </div>
  );
}`;
