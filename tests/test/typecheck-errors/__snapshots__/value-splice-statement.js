import { cs } from "@backtickjs/core";
// Statement position takes an action and nothing else: a discarded value
// splice is dead code.
const count = cs.create(
  { start: { line: 5, column: 14 }, end: { line: 5, column: 19 } },
  {
    version: "0.0.0",
    filePath: "typecheck-errors/value-splice-statement.test.tsx",
    fileHash: "1nbm51mtfsgbx",
    splices: {},
    captures: [],
  },
  () => ({
    type: "Literal",
    loc: { start: { line: 5, column: 17 }, end: { line: 5, column: 18 } },
    value: 1,
  }),
);
export const script = cs.create(
  { start: { line: 7, column: 22 }, end: { line: 10, column: 2 } },
  {
    version: "0.0.0",
    filePath: "typecheck-errors/value-splice-statement.test.tsx",
    fileHash: "1nbm51mtfsgbx",
    splices: { $count: { value: count, params: [] } },
    captures: [],
  },
  () => ({
    type: "BlockStatement",
    loc: { start: { line: 7, column: 25 }, end: { line: 10, column: 1 } },
    body: [
      {
        type: "ExpressionStatement",
        loc: { start: { line: 9, column: 2 }, end: { line: 9, column: 9 } },
        expression: {
          type: "Splice",
          loc: { start: { line: 9, column: 2 }, end: { line: 9, column: 8 } },
          key: "$count",
        },
      },
    ],
  }),
);
