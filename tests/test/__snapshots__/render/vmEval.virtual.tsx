import { bundler } from "@backtickjs/bundler";
import { cs, For, vm } from "@backtickjs/core";

// A bundle evaluated where a script stands, and used by its type: a drawing
// whose root is a list, placed as a child, and a number, added to.
async function Items() {
  return cs.lift(cs.const(<For each={cs.lift([1, 2, 3])}>{cs.lift((__cs_n: number) => <span>{cs.lift("item " + __cs_n)}</span>)}</For>));
}

const items = await bundler.run(<Items />);

const total = await bundler.run(41);

const vmEval = cs.lift(cs.const(<div>{cs.lift(cs.receiver(cs.splice((vm)) satisfies typeof cs.ClientUnknown).eval(cs.splice((items)) satisfies typeof cs.ClientUnknown))}{cs.lift(<b>{cs.lift(cs.receiver(cs.splice((vm)) satisfies typeof cs.ClientUnknown).eval(cs.splice((total)) satisfies typeof cs.ClientUnknown) + 1)}</b>)}</div>));
