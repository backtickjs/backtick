import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `continue` runs the update before the next turn — a loop that skipped it
// would never end — and each jump means the loop it is written in, the inner
// one here.
it("loopJumps", async (t) => {
  await snapshotCase(
    t,
    "loopJumps",
    cs.create(
      "28bjtc1esuow3:12:4",
      { params: [] },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 12, column: 7 }, end: { line: 27, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 13, column: 6 },
              end: { line: 13, column: 19 },
            },
            kind: "let",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 13, column: 10 },
                  end: { line: 13, column: 18 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 13, column: 10 },
                    end: { line: 13, column: 13 },
                  },
                  name: "out",
                  key: "out$28bjtc1esuow3$0",
                },
                init: {
                  type: "Literal",
                  loc: {
                    start: { line: 13, column: 16 },
                    end: { line: 13, column: 18 },
                  },
                  value: "",
                },
              },
            ],
          },
          {
            type: "ForStatement",
            loc: {
              start: { line: 14, column: 6 },
              end: { line: 25, column: 7 },
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
                    key: "i$28bjtc1esuow3$1",
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
                key: "i$28bjtc1esuow3$1",
              },
              right: {
                type: "Literal",
                loc: {
                  start: { line: 14, column: 26 },
                  end: { line: 14, column: 27 },
                },
                value: 5,
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
                key: "i$28bjtc1esuow3$1",
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
                  key: "i$28bjtc1esuow3$1",
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
                end: { line: 25, column: 7 },
              },
              body: [
                {
                  type: "IfStatement",
                  loc: {
                    start: { line: 15, column: 8 },
                    end: { line: 17, column: 9 },
                  },
                  test: {
                    type: "BinaryExpression",
                    loc: {
                      start: { line: 15, column: 12 },
                      end: { line: 15, column: 19 },
                    },
                    operator: "===",
                    left: {
                      type: "Identifier",
                      loc: {
                        start: { line: 15, column: 12 },
                        end: { line: 15, column: 13 },
                      },
                      name: "i",
                      key: "i$28bjtc1esuow3$1",
                    },
                    right: {
                      type: "Literal",
                      loc: {
                        start: { line: 15, column: 18 },
                        end: { line: 15, column: 19 },
                      },
                      value: 1,
                    },
                  },
                  consequent: {
                    type: "BlockStatement",
                    loc: {
                      start: { line: 15, column: 21 },
                      end: { line: 17, column: 9 },
                    },
                    body: [
                      {
                        type: "ContinueStatement",
                        loc: {
                          start: { line: 16, column: 10 },
                          end: { line: 16, column: 19 },
                        },
                        label: null,
                      },
                    ],
                  },
                  alternate: null,
                },
                {
                  type: "WhileStatement",
                  loc: {
                    start: { line: 18, column: 8 },
                    end: { line: 21, column: 9 },
                  },
                  test: {
                    type: "Literal",
                    loc: {
                      start: { line: 18, column: 15 },
                      end: { line: 18, column: 19 },
                    },
                    value: true,
                  },
                  body: {
                    type: "BlockStatement",
                    loc: {
                      start: { line: 18, column: 21 },
                      end: { line: 21, column: 9 },
                    },
                    body: [
                      {
                        type: "ExpressionStatement",
                        loc: {
                          start: { line: 19, column: 10 },
                          end: { line: 19, column: 24 },
                        },
                        expression: {
                          type: "AssignmentExpression",
                          loc: {
                            start: { line: 19, column: 10 },
                            end: { line: 19, column: 23 },
                          },
                          operator: "=",
                          left: {
                            type: "Identifier",
                            loc: {
                              start: { line: 19, column: 10 },
                              end: { line: 19, column: 13 },
                            },
                            name: "out",
                            key: "out$28bjtc1esuow3$0",
                          },
                          right: {
                            type: "BinaryExpression",
                            loc: {
                              start: { line: 19, column: 16 },
                              end: { line: 19, column: 23 },
                            },
                            operator: "+",
                            left: {
                              type: "Identifier",
                              loc: {
                                start: { line: 19, column: 16 },
                                end: { line: 19, column: 19 },
                              },
                              name: "out",
                              key: "out$28bjtc1esuow3$0",
                            },
                            right: {
                              type: "Identifier",
                              loc: {
                                start: { line: 19, column: 22 },
                                end: { line: 19, column: 23 },
                              },
                              name: "i",
                              key: "i$28bjtc1esuow3$1",
                            },
                          },
                        },
                      },
                      {
                        type: "BreakStatement",
                        loc: {
                          start: { line: 20, column: 10 },
                          end: { line: 20, column: 16 },
                        },
                        label: null,
                      },
                    ],
                  },
                },
                {
                  type: "IfStatement",
                  loc: {
                    start: { line: 22, column: 8 },
                    end: { line: 24, column: 9 },
                  },
                  test: {
                    type: "BinaryExpression",
                    loc: {
                      start: { line: 22, column: 12 },
                      end: { line: 22, column: 19 },
                    },
                    operator: "===",
                    left: {
                      type: "Identifier",
                      loc: {
                        start: { line: 22, column: 12 },
                        end: { line: 22, column: 13 },
                      },
                      name: "i",
                      key: "i$28bjtc1esuow3$1",
                    },
                    right: {
                      type: "Literal",
                      loc: {
                        start: { line: 22, column: 18 },
                        end: { line: 22, column: 19 },
                      },
                      value: 3,
                    },
                  },
                  consequent: {
                    type: "BlockStatement",
                    loc: {
                      start: { line: 22, column: 21 },
                      end: { line: 24, column: 9 },
                    },
                    body: [
                      {
                        type: "BreakStatement",
                        loc: {
                          start: { line: 23, column: 10 },
                          end: { line: 23, column: 16 },
                        },
                        label: null,
                      },
                    ],
                  },
                  alternate: null,
                },
              ],
            },
          },
          {
            type: "ReturnStatement",
            loc: {
              start: { line: 26, column: 6 },
              end: { line: 26, column: 17 },
            },
            argument: {
              type: "Identifier",
              loc: {
                start: { line: 26, column: 13 },
                end: { line: 26, column: 16 },
              },
              name: "out",
              key: "out$28bjtc1esuow3$0",
            },
          },
        ],
      }),
      {
        code: 'export default () => {\n    let out = "";\n    for (let i = 0; i < 5; i = i + 1) {\n        if (i === 1) {\n            continue;\n        }\n        while (true) {\n            out = out + i;\n            break;\n        }\n        if (i === 3) {\n            break;\n        }\n    }\n    return out;\n};',
        map: '{"version":3,"file":"loop-jumps.test.jsx","sourceRoot":"","sources":["loop-jumps.test.tsx"],"names":[],"mappings":"eAWO;IACD,IAAI,GAAG,GAAG,EAAE,CAAC;IACb,KAAK,IAAI,CAAC,GAAG,CAAC,EAAE,CAAC,GAAG,CAAC,EAAE,CAAC,GAAG,CAAC,GAAG,CAAC,EAAE,CAAC;QACjC,IAAI,CAAC,KAAK,CAAC,EAAE,CAAC;YACZ,SAAS;QACX,CAAC;QACD,OAAO,IAAI,EAAE,CAAC;YACZ,GAAG,GAAG,GAAG,GAAG,CAAC,CAAC;YACd,MAAM;QACR,CAAC;QACD,IAAI,CAAC,KAAK,CAAC,EAAE,CAAC;YACZ,MAAM;QACR,CAAC;IACH,CAAC;IACD,OAAO,GAAG,CAAC;AACb,CAAC"}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
