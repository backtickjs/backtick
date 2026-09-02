import { cs } from "@backtickjs/core";
async function fetchGreeting() {
  return "hello";
}
// A spliced host expression evaluates in the template's own scope — the
// compiled output wraps it in no function — so `await` works wherever the
// template itself may await, here at module top level.
export default cs.create(
  [10, 16, 10, 50],
  {
    version: "0.0.0",
    filePath: "await-in-splice.ts",
    fileHash: "3872sh2awxtu6",
    splices: { $0splice0: await fetchGreeting() },
    captures: [],
    spliceParams: { $0splice0: [] },
  },
  () => ({
    kind: 227,
    loc: [10, 19, 10, 49],
    left: {
      kind: 1000,
      loc: [10, 19, 10, 43],
      key: "$0splice0",
    },
    operatorToken: "+",
    right: {
      kind: 11,
      loc: [10, 46, 10, 49],
      text: "!",
    },
  }),
);
