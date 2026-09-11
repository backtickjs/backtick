import { cs, For, state } from "@backtickjs/core";

// A tag naming a function an enclosing script holds. The nested script captures
// it the way it captures any binding, and calls it as a component: once, with
// its props read on access.
export default cs`{
  const count = $state(0);
  const Badge = (props: { n: number }) => <b>{"n " + props.n}</b>;

  return (
    <div>
      {${cs`<Badge n={count.read()} />`}}
      {${cs`{
        const skipped = 10;
        return ${cs`<Badge n={count.read() + 100} />`};
      }`}}
      {${(<section>{cs`<Badge n={count.read() + 1000} />`}</section>)}}
      {${cs`<For each={[1, 2]}>{(m: number) => <Badge n={m * count.read()} />}</For>`}}
      <button onclick={() => count.write(count.read() + 1)}>more</button>
    </div>
  );
}`;
