import { cs } from "@backtickjs/core";
// A container the host built holding scripts, spliced whole.
//
// Each member crosses as what its script produced, so a script reads
// `{ x: number, label: string }` where the host wrote `{ x: Client<number>,
// label: Client<string> }`. Reading `x` off it has to typecheck as a number,
// which is what pins the direction `cs.splice` maps in: forward, from what the
// host wrote. Read the other way — from the client's type back to what the host
// may write — this shape is the one TypeScript cannot infer, and a splice has
// nowhere to name it, since the compiler writes the call.
const x = cs.create(
  [12, 11, 12, 16],
  {
    version: "0.0.0",
    filePath: "spliced-container.ts",
    fileHash: "3tlfkx843ni71",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: 9,
    loc: [12, 14, 12, 15],
    value: 1,
  }),
);
const label = cs.create(
  [13, 15, 13, 27],
  {
    version: "0.0.0",
    filePath: "spliced-container.ts",
    fileHash: "3tlfkx843ni71",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: 11,
    loc: [13, 18, 13, 26],
    text: "origin",
  }),
);
const point = { x, label };
export default cs.create(
  [17, 16, 17, 32],
  {
    version: "0.0.0",
    filePath: "spliced-container.ts",
    fileHash: "3tlfkx843ni71",
    kind: "value",
    splices: { $point: point },
    captures: [],
    spliceParams: { $point: [] },
  },
  () => ({
    kind: 227,
    loc: [17, 19, 17, 31],
    left: {
      kind: 212,
      loc: [17, 19, 17, 27],
      expression: {
        kind: 1000,
        loc: [17, 19, 17, 25],
        key: "$point",
      },
      questionDotToken: false,
      name: "x",
    },
    operatorToken: "+",
    right: {
      kind: 9,
      loc: [17, 30, 17, 31],
      value: 1,
    },
  }),
);
