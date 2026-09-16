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
const originX = cs.create(
  [12, 17, 12, 22],
  {
    version: "0.0.0",
    filePath: "splicedContainer.tsx",
    fileHash: "k990m374feb3",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "number",
    loc: [12, 20, 12, 21],
    value: 1,
  }),
);
const label = cs.create(
  [14, 15, 14, 27],
  {
    version: "0.0.0",
    filePath: "splicedContainer.tsx",
    fileHash: "k990m374feb3",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "string",
    loc: [14, 18, 14, 26],
    text: "origin",
  }),
);
const point = { x: originX, label };
const splicedContainer = cs.create(
  [18, 26, 18, 42],
  {
    version: "0.0.0",
    filePath: "splicedContainer.tsx",
    fileHash: "k990m374feb3",
    splices: { $point: { value: point, params: [] } },
    captures: [],
  },
  () => ({
    kind: "binop",
    loc: [18, 29, 18, 41],
    left: {
      kind: ".",
      loc: [18, 29, 18, 37],
      expression: {
        kind: "splice",
        loc: [18, 29, 18, 35],
        key: "$point",
      },
      name: "x",
    },
    operatorToken: "+",
    right: {
      kind: "number",
      loc: [18, 40, 18, 41],
      value: 1,
    },
  }),
);
