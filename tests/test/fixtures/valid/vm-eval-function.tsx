import { bundler } from "@backtickjs/bundler";
import { cs, vm } from "@backtickjs/core";

// A bundle whose value is a function: evaluated, then called like any other.
// One answers a string; the other a drawing, handed its props as a value.
const greet = await bundler.run(cs`(name: string) => "hello " + name`);
const badge = await bundler.run(
  cs`(props: { count: number }) => <b>{"count " + props.count}</b>`,
);

export default cs`<div>
  <span>{$vm.eval($greet)("ada")}</span>
  {$vm.eval($badge)({ count: 3 })}
</div>`;
