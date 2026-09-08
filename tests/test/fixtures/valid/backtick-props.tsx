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

export default cs`{
  const count = $state(0);

  return (
    <div>
      <backtick bundle={$greets} props={{ who: "world" }} />
      <backtick bundle={$counts} props={{ count: count.read() }} />
      <button onclick={() => count.write(count.read() + 1)}>more</button>
    </div>
  );
}`;
