import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
it("arrow", async (t) => {
  await snapshotCase(
    t,
    "arrow",
    cs.create(
      { start: { line: 9, column: 4 }, end: { line: 12, column: 6 } },
      { fileHash: "1qw9q1toh3rnd", splices: {}, captures: [] },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 9, column: 7 }, end: { line: 12, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 10, column: 6 },
              end: { line: 10, column: 22 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 10, column: 12 },
                  end: { line: 10, column: 21 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 10, column: 12 },
                    end: { line: 10, column: 16 },
                  },
                  name: "base",
                  key: "base$1qw9q1toh3rnd$0",
                },
                init: {
                  type: "Literal",
                  loc: {
                    start: { line: 10, column: 19 },
                    end: { line: 10, column: 21 },
                  },
                  value: 10,
                },
              },
            ],
          },
          {
            type: "ReturnStatement",
            loc: {
              start: { line: 11, column: 6 },
              end: { line: 11, column: 60 },
            },
            argument: {
              type: "ArrowFunctionExpression",
              loc: {
                start: { line: 11, column: 13 },
                end: { line: 11, column: 59 },
              },
              params: [
                {
                  type: "Identifier",
                  loc: {
                    start: { line: 11, column: 14 },
                    end: { line: 11, column: 17 },
                  },
                  name: "one",
                  key: "one$1qw9q1toh3rnd$1",
                },
                {
                  type: "Identifier",
                  loc: {
                    start: { line: 11, column: 27 },
                    end: { line: 11, column: 30 },
                  },
                  name: "two",
                  key: "two$1qw9q1toh3rnd$2",
                },
              ],
              body: {
                type: "BinaryExpression",
                loc: {
                  start: { line: 11, column: 43 },
                  end: { line: 11, column: 59 },
                },
                operator: "+",
                left: {
                  type: "BinaryExpression",
                  loc: {
                    start: { line: 11, column: 43 },
                    end: { line: 11, column: 52 },
                  },
                  operator: "+",
                  left: {
                    type: "Identifier",
                    loc: {
                      start: { line: 11, column: 43 },
                      end: { line: 11, column: 46 },
                    },
                    name: "one",
                    key: "one$1qw9q1toh3rnd$1",
                  },
                  right: {
                    type: "Identifier",
                    loc: {
                      start: { line: 11, column: 49 },
                      end: { line: 11, column: 52 },
                    },
                    name: "two",
                    key: "two$1qw9q1toh3rnd$2",
                  },
                },
                right: {
                  type: "Identifier",
                  loc: {
                    start: { line: 11, column: 55 },
                    end: { line: 11, column: 59 },
                  },
                  name: "base",
                  key: "base$1qw9q1toh3rnd$0",
                },
              },
              expression: true,
            },
          },
        ],
      }),
      "() => {\n    const base = 10;\n    return (one, two) => one + two + base;\n}",
      '{"version":3,"file":"arrow.test.jsx","sourceRoot":"","sources":["arrow.test.tsx"],"names":[],"mappings":"AAQO;IACD,MAAM,IAAI,GAAG,EAAE,CAAC;IAChB,OAAO,CAAC,GAAW,EAAE,GAAW,EAAE,EAAE,CAAC,GAAG,GAAG,GAAG,GAAG,IAAI,CAAC;AACxD,CAAC,CAAA"}',
    ),
  );
});
