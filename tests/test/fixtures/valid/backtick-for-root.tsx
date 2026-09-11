import { bundler } from "@backtickjs/bundler";
import { cs, For } from "@backtickjs/core";

// A bundle whose root is a list, drawn by `<backtick />`.
//
// A list evaluates to a function — the accessor its members are read through —
// and a bundle that takes props also evaluates to one, so this is the shape
// where the two have to be told apart.
async function Items() {
  return cs`<For each={[1, 2, 3]}>{(n: number) => <span>{"item " + n}</span>}</For>`;
}

const items = await bundler.run(<Items />);

export default cs`<div><backtick bundle={$items} /></div>`;
