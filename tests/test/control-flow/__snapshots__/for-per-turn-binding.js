import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// Each turn of a `for` gets its own copy of the header binding, so the arrow
// built on the last turn reads 2 — the value that turn had — and not the 3
// the loop stopped at.
it("forPerTurnBinding", async (t) => {
  await snapshotCase(
    t,
    "forPerTurnBinding",
    cs.create(
      "2s6lhx8c4k6ow:12:4",
      { splices: {}, captures: [] },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 12, column: 7 }, end: { line: 18, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 13, column: 6 },
              end: { line: 13, column: 39 },
            },
            kind: "let",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 13, column: 10 },
                  end: { line: 13, column: 38 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 13, column: 10 },
                    end: { line: 13, column: 14 },
                  },
                  name: "last",
                  key: "last$2s6lhx8c4k6ow$0",
                },
                init: {
                  type: "ArrowFunctionExpression",
                  loc: {
                    start: { line: 13, column: 31 },
                    end: { line: 13, column: 38 },
                  },
                  params: [],
                  body: {
                    type: "Literal",
                    loc: {
                      start: { line: 13, column: 37 },
                      end: { line: 13, column: 38 },
                    },
                    value: 0,
                  },
                  expression: true,
                },
              },
            ],
          },
          {
            type: "ForStatement",
            loc: {
              start: { line: 14, column: 6 },
              end: { line: 16, column: 7 },
            },
            init: {
              type: "VariableDeclaration",
              loc: {
                start: { line: 14, column: 11 },
                end: { line: 14, column: 20 },
              },
              kind: "let",
              declarations: [
                {
                  type: "VariableDeclarator",
                  loc: {
                    start: { line: 14, column: 15 },
                    end: { line: 14, column: 20 },
                  },
                  id: {
                    type: "Identifier",
                    loc: {
                      start: { line: 14, column: 15 },
                      end: { line: 14, column: 16 },
                    },
                    name: "i",
                    key: "i$2s6lhx8c4k6ow$1",
                  },
                  init: {
                    type: "Literal",
                    loc: {
                      start: { line: 14, column: 19 },
                      end: { line: 14, column: 20 },
                    },
                    value: 0,
                  },
                },
              ],
            },
            test: {
              type: "BinaryExpression",
              loc: {
                start: { line: 14, column: 22 },
                end: { line: 14, column: 27 },
              },
              operator: "<",
              left: {
                type: "Identifier",
                loc: {
                  start: { line: 14, column: 22 },
                  end: { line: 14, column: 23 },
                },
                name: "i",
                key: "i$2s6lhx8c4k6ow$1",
              },
              right: {
                type: "Literal",
                loc: {
                  start: { line: 14, column: 26 },
                  end: { line: 14, column: 27 },
                },
                value: 3,
              },
            },
            update: {
              type: "AssignmentExpression",
              loc: {
                start: { line: 14, column: 29 },
                end: { line: 14, column: 38 },
              },
              operator: "=",
              left: {
                type: "Identifier",
                loc: {
                  start: { line: 14, column: 29 },
                  end: { line: 14, column: 30 },
                },
                name: "i",
                key: "i$2s6lhx8c4k6ow$1",
              },
              right: {
                type: "BinaryExpression",
                loc: {
                  start: { line: 14, column: 33 },
                  end: { line: 14, column: 38 },
                },
                operator: "+",
                left: {
                  type: "Identifier",
                  loc: {
                    start: { line: 14, column: 33 },
                    end: { line: 14, column: 34 },
                  },
                  name: "i",
                  key: "i$2s6lhx8c4k6ow$1",
                },
                right: {
                  type: "Literal",
                  loc: {
                    start: { line: 14, column: 37 },
                    end: { line: 14, column: 38 },
                  },
                  value: 1,
                },
              },
            },
            body: {
              type: "BlockStatement",
              loc: {
                start: { line: 14, column: 40 },
                end: { line: 16, column: 7 },
              },
              body: [
                {
                  type: "ExpressionStatement",
                  loc: {
                    start: { line: 15, column: 8 },
                    end: { line: 15, column: 23 },
                  },
                  expression: {
                    type: "AssignmentExpression",
                    loc: {
                      start: { line: 15, column: 8 },
                      end: { line: 15, column: 22 },
                    },
                    operator: "=",
                    left: {
                      type: "Identifier",
                      loc: {
                        start: { line: 15, column: 8 },
                        end: { line: 15, column: 12 },
                      },
                      name: "last",
                      key: "last$2s6lhx8c4k6ow$0",
                    },
                    right: {
                      type: "ArrowFunctionExpression",
                      loc: {
                        start: { line: 15, column: 15 },
                        end: { line: 15, column: 22 },
                      },
                      params: [],
                      body: {
                        type: "Identifier",
                        loc: {
                          start: { line: 15, column: 21 },
                          end: { line: 15, column: 22 },
                        },
                        name: "i",
                        key: "i$2s6lhx8c4k6ow$1",
                      },
                      expression: true,
                    },
                  },
                },
              ],
            },
          },
          {
            type: "ReturnStatement",
            loc: {
              start: { line: 17, column: 6 },
              end: { line: 17, column: 20 },
            },
            argument: {
              type: "CallExpression",
              loc: {
                start: { line: 17, column: 13 },
                end: { line: 17, column: 19 },
              },
              callee: {
                type: "Identifier",
                loc: {
                  start: { line: 17, column: 13 },
                  end: { line: 17, column: 17 },
                },
                name: "last",
                key: "last$2s6lhx8c4k6ow$0",
              },
              arguments: [],
              optional: false,
            },
          },
        ],
      }),
      "() => {\n    let last = () => 0;\n    for (let i = 0; i < 3; i = i + 1) {\n        last = () => i;\n    }\n    return last();\n}",
      '{"version":3,"file":"for-per-turn-binding.test.jsx","sourceRoot":"","sources":["for-per-turn-binding.test.tsx"],"names":[],"mappings":"AAWO;IACD,IAAI,IAAI,GAAiB,GAAG,EAAE,CAAC,CAAC,CAAC;IACjC,KAAK,IAAI,CAAC,GAAG,CAAC,EAAE,CAAC,GAAG,CAAC,EAAE,CAAC,GAAG,CAAC,GAAG,CAAC,EAAE,CAAC;QACjC,IAAI,GAAG,GAAG,EAAE,CAAC,CAAC,CAAC;IACjB,CAAC;IACD,OAAO,IAAI,EAAE,CAAC;AAChB,CAAC,CAAA"}',
    ),
  );
});
