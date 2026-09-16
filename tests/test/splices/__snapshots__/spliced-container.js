import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
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
  [14, 17, 14, 22],
  {
    version: "0.0.0",
    filePath: "splices/spliced-container.test.tsx",
    fileHash: "3hhvicr225pmx",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "number",
    loc: [14, 20, 14, 21],
    value: 1,
  }),
);
const label = cs.create(
  [16, 15, 16, 27],
  {
    version: "0.0.0",
    filePath: "splices/spliced-container.test.tsx",
    fileHash: "3hhvicr225pmx",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "string",
    loc: [16, 18, 16, 26],
    text: "origin",
  }),
);
const point = { x: originX, label };
it("splicedContainer", async (t) => {
  await snapshotCase(
    t,
    "splicedContainer",
    cs.create(
      [21, 45, 21, 61],
      {
        version: "0.0.0",
        filePath: "splices/spliced-container.test.tsx",
        fileHash: "3hhvicr225pmx",
        splices: { $point: { value: point, params: [] } },
        captures: [],
      },
      () => ({
        kind: "binop",
        loc: [21, 48, 21, 60],
        left: {
          kind: ".",
          loc: [21, 48, 21, 56],
          expression: {
            kind: "splice",
            loc: [21, 48, 21, 54],
            key: "$point",
          },
          name: "x",
        },
        operatorToken: "+",
        right: {
          kind: "number",
          loc: [21, 59, 21, 60],
          value: 1,
        },
      }),
    ),
  );
});
