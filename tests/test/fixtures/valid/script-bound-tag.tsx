import { bundler } from "@backtickjs/bundler";
import { cs, state, vm } from "@backtickjs/core";

// A tag naming a function the script holds — here a bundle that takes props,
// evaluated. It is called with its props read on access, the way a component's
// are, so `count` follows the cell without the badge being drawn again.
const badge = await bundler.run(
  cs`(props: { count: number }) => <b>{"count " + props.count}</b>`,
);

export default cs`{
  const count = $state(0);
  const Badge = $vm.eval($badge);

  return (
    <div>
      <Badge count={count.read()} />
      <button onclick={() => count.write(count.read() + 1)}>more</button>
    </div>
  );
}`;
