import { cs, state } from "@backtickjs/core";

// Two bundles written elsewhere, each a function of what it is handed — which
// is what a bundle that takes props is, and drawing one is calling it.
//
// Both read a member plainly, and both stay right after a write: a member is
// read where the drawing reads it, the same as a prop on a component. Nothing
// here is written as a thunk, and the second is handed a cell's read.
const greets = JSON.stringify({
  functions: {
    "0": [
      "=>",
      [["param", "props"]],
      ["el", "em", {}, ["+", "hello ", [".", ["id", "props"], "who"]]],
    ],
  },
  root: ["fn", "0"],
});

const counts = JSON.stringify({
  functions: {
    "0": [
      "=>",
      [["param", "props"]],
      ["el", "b", {}, ["+", "count ", [".", ["id", "props"], "count"]]],
    ],
  },
  root: ["fn", "0"],
});

export default cs.lift((() => {
    const __cs_count = cs.const((cs.splice((state)) satisfies import("@backtickjs/core").ClientUnknown)(0));
    return cs.const(<div>{cs.lift(<backtick bundle={cs.lift(cs.splice((greets)) satisfies import("@backtickjs/core").ClientUnknown)} props={cs.lift({ who: "world" })}/>)}{cs.lift(<backtick bundle={cs.lift(cs.splice((counts)) satisfies import("@backtickjs/core").ClientUnknown)} props={cs.lift({ count: cs.receiver(__cs_count).read() })}/>)}{cs.lift(<button onclick={cs.lift(() => cs.receiver(__cs_count).write(cs.receiver(__cs_count).read() + 1))}>more</button>)}</div>);
})());
