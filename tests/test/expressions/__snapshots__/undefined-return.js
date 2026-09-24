import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const lying = cs.create(
  { start: { line: 11, column: 35 }, end: { line: 11, column: 49 } },
  {
    version: "0.0.0",
    filePath: "expressions/undefined-return.test.tsx",
    fileHash: "2qb372nig0g3z",
    splices: {},
    captures: [],
  },
  () => ({
    type: "ArrowFunctionExpression",
    loc: { start: { line: 11, column: 38 }, end: { line: 11, column: 48 } },
    params: [],
    body: {
      type: "Literal",
      loc: { start: { line: 11, column: 44 }, end: { line: 11, column: 48 } },
      value: "hi",
    },
    expression: true,
  }),
);
it("undefinedReturn", async (t) => {
  await snapshotCase(
    t,
    "undefinedReturn",
    cs.create(
      { start: { line: 17, column: 4 }, end: { line: 21, column: 6 } },
      {
        version: "0.0.0",
        filePath: "expressions/undefined-return.test.tsx",
        fileHash: "2qb372nig0g3z",
        splices: { $lying: { value: lying, params: [] } },
        captures: [],
      },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 17, column: 7 }, end: { line: 21, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 18, column: 6 },
              end: { line: 18, column: 28 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 18, column: 12 },
                  end: { line: 18, column: 27 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 18, column: 12 },
                    end: { line: 18, column: 18 },
                  },
                  name: "stored",
                  bindingKey: "stored$2qb372nig0g3z$0",
                },
                init: {
                  type: "Splice",
                  loc: {
                    start: { line: 18, column: 21 },
                    end: { line: 18, column: 27 },
                  },
                  key: "$lying",
                },
              },
            ],
          },
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 19, column: 6 },
              end: { line: 19, column: 30 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 19, column: 12 },
                  end: { line: 19, column: 29 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 19, column: 12 },
                    end: { line: 19, column: 18 },
                  },
                  name: "caught",
                  bindingKey: "caught$2qb372nig0g3z$1",
                },
                init: {
                  type: "CallExpression",
                  loc: {
                    start: { line: 19, column: 21 },
                    end: { line: 19, column: 29 },
                  },
                  callee: {
                    type: "Splice",
                    loc: {
                      start: { line: 19, column: 21 },
                      end: { line: 19, column: 27 },
                    },
                    key: "$lying",
                  },
                  arguments: [],
                  optional: false,
                },
              },
            ],
          },
          {
            type: "ReturnStatement",
            loc: {
              start: { line: 20, column: 6 },
              end: { line: 20, column: 15 },
            },
            argument: {
              type: "Literal",
              loc: {
                start: { line: 20, column: 13 },
                end: { line: 20, column: 14 },
              },
              value: 1,
            },
          },
        ],
      }),
    ),
  );
});
