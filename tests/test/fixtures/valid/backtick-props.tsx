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

export default cs`{
  const count = $state(0);

  return (
    <div>
      <backtick bundle={$greets} props={{ who: "world" }} />
      <backtick bundle={$counts} props={{ count: () => count.read() }} />
      <button onclick={() => count.write(count.read() + 1)}>more</button>
    </div>
  );
}`;
