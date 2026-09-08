import { cs, state } from "@backtickjs/core";

// Two bundles written elsewhere, each reading `props` — the way any script
// reads a name it did not write.
//
// The second is handed a cell as a splice, so it stays right after a write
// without being built again: reading a splice is calling it.
const greets = JSON.stringify({
  functions: {
    "0": [
      "=>",
      [],
      ["el", "em", {}, ["+", "hello ", [".", ["bltn", "props"], "who"]]],
    ],
  },
  root: ["()", ["fn", "0"], []],
});

const counts = JSON.stringify({
  functions: {
    "0": [
      "=>",
      [],
      [
        "el",
        "b",
        {},
        ["+", "count ", ["()", [".", ["bltn", "props"], "count"], []]],
      ],
    ],
  },
  root: ["()", ["fn", "0"], []],
});

export default cs.lift((() => {
    const __cs_count = cs.const((cs.splice((state)) satisfies import("@backtickjs/core").ClientUnknown)(0));
    return cs.const(<div>{cs.lift(<backtick bundle={cs.lift(cs.splice((greets)) satisfies import("@backtickjs/core").ClientUnknown)} props={cs.lift({ who: "world" })}/>)}{cs.lift(<backtick bundle={cs.lift(cs.splice((counts)) satisfies import("@backtickjs/core").ClientUnknown)} props={cs.lift({ count: () => cs.receiver(__cs_count).read() })}/>)}{cs.lift(<button onclick={cs.lift(() => cs.receiver(__cs_count).write(cs.receiver(__cs_count).read() + 1))}>more</button>)}</div>);
})());
