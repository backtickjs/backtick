import { bundler } from "@backtickjs/bundler";
import { cs, state, vm } from "@backtickjs/core";
import type { BacktickElement, Bundle } from "@backtickjs/core";

// A function the script holds that draws a bundle it is still waiting for.
//
// Read inside the drawing, so the condition follows the cell: when the bundle
// arrives the child runs again and calls `Badge`, and `count` stays a prop the
// badge reads on access rather than a value handed over once.
const badge = await bundler.run(
  cs`(props: { count: number }) => <b>{"count " + props.count}</b>`,
);

export default cs`{
  const count = $state(0);
  const drawn = $state<Bundle<(props: { count: number }) => BacktickElement> | null>(
    null,
  );
  const Badge = (props: { count: number }) => {
    const held = drawn.read();
    return held === null ? null : $vm.eval(held)(props);
  };

  return (
    <div>
      {drawn.read() === null ? <i>loading</i> : <Badge count={count.read()} />}
      <button onclick={() => drawn.write($badge)}>load</button>
      <button onclick={() => count.write(count.read() + 1)}>more</button>
    </div>
  );
}`;
