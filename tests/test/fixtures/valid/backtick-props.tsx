import { bundler } from "@backtickjs/bundler";
import { cs, state } from "@backtickjs/core";
import type { Prop } from "@backtickjs/core";

// Two bundles written elsewhere, each a function of what it is handed — which
// is what a bundle that takes props is, and drawing one is calling it.
//
// Both read a member plainly, and both stay right after a write: a member is
// read where the drawing reads it, the same as a prop on a component. Nothing
// here is written as a thunk, and the second is handed a cell's read.
//
// Built rather than written out: what a bundle looks like is the bundler's, and
// a fixture that spelled one would pin the format twice.
async function Greets({ who }: { who: Prop<string> }) {
  return cs`<em>{"hello " + $who}</em>`;
}

async function Counts({ count }: { count: Prop<number> }) {
  return cs`<b>{"count " + $count}</b>`;
}

const greets = JSON.stringify(
  await bundler.run(cs`(props: { who: string }) => ${(
    <Greets who={cs`props.who`} />
  )}`),
);

const counts = JSON.stringify(
  await bundler.run(cs`(props: { count: number }) => ${(
    <Counts count={cs`props.count`} />
  )}`),
);

export default cs`{
  const count = $state(0);

  return (
    <div>
      <backtick bundle={$greets} props={{ who: "world" }} />
      <backtick bundle={$counts} props={{ count: count.read() }} />
      <button onclick={() => count.write(count.read() + 1)}>more</button>
    </div>
  );
}`;
