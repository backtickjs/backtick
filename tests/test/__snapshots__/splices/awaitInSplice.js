import { cs } from "@backtickjs/core";
async function fetchGreeting() {
  return "hello";
}
// A spliced host expression evaluates in the template's own scope — the
// compiled output wraps it in no function — so `await` works wherever the
// template itself may await, here at module top level.
const awaitInSplice = cs.create(
  [10, 23, 10, 57],
  {
    version: "0.0.0",
    filePath: "awaitInSplice.tsx",
    fileHash: "328tnuqbwymds",
    splices: { $0splice0: { value: await fetchGreeting(), params: [] } },
    captures: [],
  },
  () => ({
    kind: "binop",
    loc: [10, 26, 10, 56],
    left: {
      kind: "splice",
      loc: [10, 26, 10, 50],
      key: "$0splice0",
    },
    operatorToken: "+",
    right: {
      kind: "string",
      loc: [10, 53, 10, 56],
      text: "!",
    },
  }),
);
