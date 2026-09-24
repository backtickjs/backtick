import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `for (;;)` has no condition, so `break` is the only way out.
it("forEndless", async (t) => {
  await snapshotCase(
    t,
    "forEndless",
    cs.create(
      "3voddrkfnxnd9:10:4",
      { splices: {}, captures: [] },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 10, column: 7 }, end: { line: 19, column: 5 } },
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
                  name: "i",
                  key: "i$3voddrkfnxnd9$0",
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
            type: "ForStatement",
            loc: {
              start: { line: 12, column: 6 },
              end: { line: 17, column: 7 },
            },
            init: null,
            test: null,
            update: null,
            body: {
              type: "BlockStatement",
              loc: {
                start: { line: 12, column: 15 },
                end: { line: 17, column: 7 },
              },
              body: [
                {
                  type: "IfStatement",
                  loc: {
                    start: { line: 13, column: 8 },
                    end: { line: 15, column: 9 },
                  },
                  test: {
                    type: "BinaryExpression",
                    loc: {
                      start: { line: 13, column: 12 },
                      end: { line: 13, column: 19 },
                    },
                    operator: "===",
                    left: {
                      type: "Identifier",
                      loc: {
                        start: { line: 13, column: 12 },
                        end: { line: 13, column: 13 },
                      },
                      name: "i",
                      key: "i$3voddrkfnxnd9$0",
                    },
                    right: {
                      type: "Literal",
                      loc: {
                        start: { line: 13, column: 18 },
                        end: { line: 13, column: 19 },
                      },
                      value: 4,
                    },
                  },
                  consequent: {
                    type: "BlockStatement",
                    loc: {
                      start: { line: 13, column: 21 },
                      end: { line: 15, column: 9 },
                    },
                    body: [
                      {
                        type: "BreakStatement",
                        loc: {
                          start: { line: 14, column: 10 },
                          end: { line: 14, column: 16 },
                        },
                        label: null,
                      },
                    ],
                  },
                  alternate: null,
                },
                {
                  type: "ExpressionStatement",
                  loc: {
                    start: { line: 16, column: 8 },
                    end: { line: 16, column: 18 },
                  },
                  expression: {
                    type: "AssignmentExpression",
                    loc: {
                      start: { line: 16, column: 8 },
                      end: { line: 16, column: 17 },
                    },
                    operator: "=",
                    left: {
                      type: "Identifier",
                      loc: {
                        start: { line: 16, column: 8 },
                        end: { line: 16, column: 9 },
                      },
                      name: "i",
                      key: "i$3voddrkfnxnd9$0",
                    },
                    right: {
                      type: "BinaryExpression",
                      loc: {
                        start: { line: 16, column: 12 },
                        end: { line: 16, column: 17 },
                      },
                      operator: "+",
                      left: {
                        type: "Identifier",
                        loc: {
                          start: { line: 16, column: 12 },
                          end: { line: 16, column: 13 },
                        },
                        name: "i",
                        key: "i$3voddrkfnxnd9$0",
                      },
                      right: {
                        type: "Literal",
                        loc: {
                          start: { line: 16, column: 16 },
                          end: { line: 16, column: 17 },
                        },
                        value: 1,
                      },
                    },
                  },
                },
              ],
            },
          },
          {
            type: "ReturnStatement",
            loc: {
              start: { line: 18, column: 6 },
              end: { line: 18, column: 15 },
            },
            argument: {
              type: "Identifier",
              loc: {
                start: { line: 18, column: 13 },
                end: { line: 18, column: 14 },
              },
              name: "i",
              key: "i$3voddrkfnxnd9$0",
            },
          },
        ],
      }),
      "() => {\n    let i = 0;\n    for (;;) {\n        if (i === 4) {\n            break;\n        }\n        i = i + 1;\n    }\n    return i;\n}",
      '{"version":3,"file":"for-endless.test.jsx","sourceRoot":"","sources":["for-endless.test.tsx"],"names":[],"mappings":"AASO;IACD,IAAI,CAAC,GAAG,CAAC,CAAC;IACV,SAAS,CAAC;QACR,IAAI,CAAC,KAAK,CAAC,EAAE,CAAC;YACZ,MAAM;QACR,CAAC;QACD,CAAC,GAAG,CAAC,GAAG,CAAC,CAAC;IACZ,CAAC;IACD,OAAO,CAAC,CAAC;AACX,CAAC,CAAA"}',
    ),
  );
});
