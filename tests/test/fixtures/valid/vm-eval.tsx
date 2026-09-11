import { bundler } from "@backtickjs/bundler";
import { cs, For, vm } from "@backtickjs/core";

// A bundle evaluated where a script stands, and used by its type: a drawing
// whose root is a list, placed as a child, and a number, added to.
async function Items() {
  return cs`<For each={[1, 2, 3]}>{(n: number) => <span>{"item " + n}</span>}</For>`;
}

const items = await bundler.run(<Items />);
const total = await bundler.run(41);

export default cs`<div>{$vm.eval($items)}<b>{$vm.eval($total) + 1}</b></div>`;
