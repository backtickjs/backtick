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
  { start: { line: 14, column: 16 }, end: { line: 14, column: 21 } },
  {
    version: "0.0.0",
    filePath: "splices/spliced-container.test.tsx",
    fileHash: "3hhvicr225pmx",
    splices: {},
    captures: [],
  },
  () => ({
    type: "Literal",
    loc: { start: { line: 14, column: 19 }, end: { line: 14, column: 20 } },
    value: 1,
  }),
);
const label = cs.create(
  { start: { line: 16, column: 14 }, end: { line: 16, column: 26 } },
  {
    version: "0.0.0",
    filePath: "splices/spliced-container.test.tsx",
    fileHash: "3hhvicr225pmx",
    splices: {},
    captures: [],
  },
  () => ({
    type: "Literal",
    loc: { start: { line: 16, column: 17 }, end: { line: 16, column: 25 } },
    value: "origin",
  }),
);
const point = { x: originX, label };
it("splicedContainer", async (t) => {
  await snapshotCase(
    t,
    "splicedContainer",
    cs.create(
      { start: { line: 21, column: 44 }, end: { line: 21, column: 60 } },
      {
        version: "0.0.0",
        filePath: "splices/spliced-container.test.tsx",
        fileHash: "3hhvicr225pmx",
        splices: { $point: { value: point, params: [] } },
        captures: [],
      },
      () => ({
        type: "BinaryExpression",
        loc: { start: { line: 21, column: 47 }, end: { line: 21, column: 59 } },
        operator: "+",
        left: {
          type: "MemberExpression",
          loc: {
            start: { line: 21, column: 47 },
            end: { line: 21, column: 55 },
          },
          object: {
            type: "Splice",
            loc: {
              start: { line: 21, column: 47 },
              end: { line: 21, column: 53 },
            },
            key: "$point",
          },
          property: {
            type: "Identifier",
            loc: {
              start: { line: 21, column: 54 },
              end: { line: 21, column: 55 },
            },
            name: "x",
          },
          computed: false,
          optional: false,
        },
        right: {
          type: "Literal",
          loc: {
            start: { line: 21, column: 58 },
            end: { line: 21, column: 59 },
          },
          value: 1,
        },
      }),
    ),
  );
});
