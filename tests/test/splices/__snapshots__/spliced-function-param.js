import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A function is never spliceable — it can't cross the host/client boundary
// as data — but an annotation can still name a function type: the parameter
// receives a client-born function (here, a spliced script), already client
// currency, and passes through the annotation untouched.
it("splicedFunctionParam", async (t) => {
  await snapshotCase(
    t,
    "splicedFunctionParam",
    cs.create(
      { start: { line: 13, column: 4 }, end: { line: 16, column: 6 } },
      {
        version: "0.0.0",
        filePath: "splices/spliced-function-param.test.tsx",
        fileHash: "yz0kiroonaez",
        splices: {
          $0splice0: {
            value: cs.create(
              {
                start: { line: 15, column: 21 },
                end: { line: 15, column: 32 },
              },
              {
                version: "0.0.0",
                filePath: "splices/spliced-function-param.test.tsx",
                fileHash: "yz0kiroonaez",
                splices: {},
                captures: [],
              },
              () => ({
                type: "ArrowFunctionExpression",
                loc: {
                  start: { line: 15, column: 24 },
                  end: { line: 15, column: 31 },
                },
                params: [],
                body: {
                  type: "Literal",
                  loc: {
                    start: { line: 15, column: 30 },
                    end: { line: 15, column: 31 },
                  },
                  value: 2,
                },
                expression: true,
              }),
            ),
            params: [],
          },
        },
        captures: [],
      },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 13, column: 7 }, end: { line: 16, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 14, column: 6 },
              end: { line: 14, column: 49 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 14, column: 12 },
                  end: { line: 14, column: 48 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 14, column: 12 },
                    end: { line: 14, column: 17 },
                  },
                  name: "apply",
                  key: "apply$yz0kiroonaez$0",
                },
                init: {
                  type: "ArrowFunctionExpression",
                  loc: {
                    start: { line: 14, column: 20 },
                    end: { line: 14, column: 48 },
                  },
                  params: [
                    {
                      type: "Identifier",
                      loc: {
                        start: { line: 14, column: 21 },
                        end: { line: 14, column: 22 },
                      },
                      name: "f",
                      key: "f$yz0kiroonaez$1",
                    },
                  ],
                  body: {
                    type: "BinaryExpression",
                    loc: {
                      start: { line: 14, column: 41 },
                      end: { line: 14, column: 48 },
                    },
                    operator: "+",
                    left: {
                      type: "CallExpression",
                      loc: {
                        start: { line: 14, column: 41 },
                        end: { line: 14, column: 44 },
                      },
                      callee: {
                        type: "Identifier",
                        loc: {
                          start: { line: 14, column: 41 },
                          end: { line: 14, column: 42 },
                        },
                        name: "f",
                        key: "f$yz0kiroonaez$1",
                      },
                      arguments: [],
                      optional: false,
                    },
                    right: {
                      type: "Literal",
                      loc: {
                        start: { line: 14, column: 47 },
                        end: { line: 14, column: 48 },
                      },
                      value: 1,
                    },
                  },
                  expression: true,
                },
              },
            ],
          },
          {
            type: "ReturnStatement",
            loc: {
              start: { line: 15, column: 6 },
              end: { line: 15, column: 35 },
            },
            argument: {
              type: "CallExpression",
              loc: {
                start: { line: 15, column: 13 },
                end: { line: 15, column: 34 },
              },
              callee: {
                type: "Identifier",
                loc: {
                  start: { line: 15, column: 13 },
                  end: { line: 15, column: 18 },
                },
                name: "apply",
                key: "apply$yz0kiroonaez$0",
              },
              arguments: [
                {
                  type: "Splice",
                  loc: {
                    start: { line: 15, column: 19 },
                    end: { line: 15, column: 33 },
                  },
                  key: "$0splice0",
                },
              ],
              optional: false,
            },
          },
        ],
      }),
    ),
  );
});
