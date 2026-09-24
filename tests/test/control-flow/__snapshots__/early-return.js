import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A bare `return` exits an action early; the completion is null either way.
it("earlyReturn", async (t) => {
  await snapshotCase(
    t,
    "earlyReturn",
    cs.create(
      { start: { line: 10, column: 4 }, end: { line: 16, column: 6 } },
      {
        version: "0.0.0",
        filePath: "control-flow/early-return.test.tsx",
        fileHash: "33mpmt8iae2c7",
        splices: {},
        captures: [],
      },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 10, column: 7 }, end: { line: 16, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 11, column: 6 },
              end: { line: 11, column: 16 },
            },
            kind: "let",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 11, column: 10 },
                  end: { line: 11, column: 15 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 11, column: 10 },
                    end: { line: 11, column: 11 },
                  },
                  name: "n",
                  key: "n$33mpmt8iae2c7$0",
                },
                init: {
                  type: "Literal",
                  loc: {
                    start: { line: 11, column: 14 },
                    end: { line: 11, column: 15 },
                  },
                  value: 0,
                },
              },
            ],
          },
          {
            type: "IfStatement",
            loc: {
              start: { line: 12, column: 6 },
              end: { line: 14, column: 7 },
            },
            test: {
              type: "BinaryExpression",
              loc: {
                start: { line: 12, column: 10 },
                end: { line: 12, column: 17 },
              },
              operator: "===",
              left: {
                type: "Identifier",
                loc: {
                  start: { line: 12, column: 10 },
                  end: { line: 12, column: 11 },
                },
                name: "n",
                key: "n$33mpmt8iae2c7$0",
              },
              right: {
                type: "Literal",
                loc: {
                  start: { line: 12, column: 16 },
                  end: { line: 12, column: 17 },
                },
                value: 0,
              },
            },
            consequent: {
              type: "BlockStatement",
              loc: {
                start: { line: 12, column: 19 },
                end: { line: 14, column: 7 },
              },
              body: [
                {
                  type: "ReturnStatement",
                  loc: {
                    start: { line: 13, column: 8 },
                    end: { line: 13, column: 15 },
                  },
                  argument: null,
                },
              ],
            },
            alternate: null,
          },
          {
            type: "ExpressionStatement",
            loc: {
              start: { line: 15, column: 6 },
              end: { line: 15, column: 12 },
            },
            expression: {
              type: "AssignmentExpression",
              loc: {
                start: { line: 15, column: 6 },
                end: { line: 15, column: 11 },
              },
              operator: "=",
              left: {
                type: "Identifier",
                loc: {
                  start: { line: 15, column: 6 },
                  end: { line: 15, column: 7 },
                },
                name: "n",
                key: "n$33mpmt8iae2c7$0",
              },
              right: {
                type: "Literal",
                loc: {
                  start: { line: 15, column: 10 },
                  end: { line: 15, column: 11 },
                },
                value: 1,
              },
            },
          },
        ],
      }),
    ),
  );
});
