import { bundler } from "@backtickjs/bundler";
import { cs, For } from "@backtickjs/core";

// A bundle whose root is a list, drawn by `<backtick />`.
//
// A list evaluates to a function — the accessor its members are read through —
// and a bundle that takes props also evaluates to one, so this is the shape
// where the two have to be told apart.
async function Items() {
  return cs.lift(cs.const(<For each={cs.lift([1, 2, 3])}>{cs.lift((__cs_n: number) => <span>{cs.lift("item " + __cs_n)}</span>)}</For>));
}

const items = await bundler.run(<Items />);

export default cs.lift(cs.const(<div>{cs.lift(<backtick bundle={cs.lift(cs.splice((items)) satisfies typeof cs.ClientUnknown)}/>)}</div>));
