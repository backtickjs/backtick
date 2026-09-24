import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `++` and `--` step a variable by one. A prefix step answers the value after
// the step, and a postfix step the value before it — exactly, for a fraction
// too.
it("step", async (t) => {
  await snapshotCase(
    t,
    "step",
    cs.create(
      "l4vdws2hl3xc:12:4",
      { splices: {}, captures: [] },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 12, column: 7 }, end: { line: 22, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 13, column: 6 },
              end: { line: 13, column: 20 },
            },
            kind: "let",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 13, column: 10 },
                  end: { line: 13, column: 19 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 13, column: 10 },
                    end: { line: 13, column: 15 },
                  },
                  name: "total",
                  key: "total$l4vdws2hl3xc$0",
                },
                init: {
                  type: "Literal",
                  loc: {
                    start: { line: 13, column: 18 },
                    end: { line: 13, column: 19 },
                  },
                  value: 0,
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
                    key: "i$l4vdws2hl3xc$5",
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
                key: "i$l4vdws2hl3xc$5",
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
              type: "UpdateExpression",
              loc: {
                start: { line: 14, column: 29 },
                end: { line: 14, column: 32 },
              },
              operator: "++",
              prefix: false,
              argument: {
                type: "Identifier",
                loc: {
                  start: { line: 14, column: 29 },
                  end: { line: 14, column: 30 },
                },
                name: "i",
                key: "i$l4vdws2hl3xc$5",
              },
            },
            body: {
              type: "BlockStatement",
              loc: {
                start: { line: 14, column: 34 },
                end: { line: 16, column: 7 },
              },
              body: [
                {
                  type: "ExpressionStatement",
                  loc: {
                    start: { line: 15, column: 8 },
                    end: { line: 15, column: 26 },
                  },
                  expression: {
                    type: "AssignmentExpression",
                    loc: {
                      start: { line: 15, column: 8 },
                      end: { line: 15, column: 25 },
                    },
                    operator: "=",
                    left: {
                      type: "Identifier",
                      loc: {
                        start: { line: 15, column: 8 },
                        end: { line: 15, column: 13 },
                      },
                      name: "total",
                      key: "total$l4vdws2hl3xc$0",
                    },
                    right: {
                      type: "BinaryExpression",
                      loc: {
                        start: { line: 15, column: 16 },
                        end: { line: 15, column: 25 },
                      },
                      operator: "+",
                      left: {
                        type: "Identifier",
                        loc: {
                          start: { line: 15, column: 16 },
                          end: { line: 15, column: 21 },
                        },
                        name: "total",
                        key: "total$l4vdws2hl3xc$0",
                      },
                      right: {
                        type: "Identifier",
                        loc: {
                          start: { line: 15, column: 24 },
                          end: { line: 15, column: 25 },
                        },
                        name: "i",
                        key: "i$l4vdws2hl3xc$5",
                      },
                    },
                  },
                },
              ],
            },
          },
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 17, column: 6 },
              end: { line: 17, column: 18 },
            },
            kind: "let",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 17, column: 10 },
                  end: { line: 17, column: 17 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 17, column: 10 },
                    end: { line: 17, column: 11 },
                  },
                  name: "n",
                  key: "n$l4vdws2hl3xc$1",
                },
                init: {
                  type: "Literal",
                  loc: {
                    start: { line: 17, column: 14 },
                    end: { line: 17, column: 17 },
                  },
                  value: 0.1,
                },
              },
            ],
          },
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 18, column: 6 },
              end: { line: 18, column: 25 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 18, column: 12 },
                  end: { line: 18, column: 24 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 18, column: 12 },
                    end: { line: 18, column: 18 },
                  },
                  name: "before",
                  key: "before$l4vdws2hl3xc$2",
                },
                init: {
                  type: "UpdateExpression",
                  loc: {
                    start: { line: 18, column: 21 },
                    end: { line: 18, column: 24 },
                  },
                  operator: "++",
                  prefix: false,
                  argument: {
                    type: "Identifier",
                    loc: {
                      start: { line: 18, column: 21 },
                      end: { line: 18, column: 22 },
                    },
                    name: "n",
                    key: "n$l4vdws2hl3xc$1",
                  },
                },
              },
            ],
          },
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 19, column: 6 },
              end: { line: 19, column: 24 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 19, column: 12 },
                  end: { line: 19, column: 23 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 19, column: 12 },
                    end: { line: 19, column: 17 },
                  },
                  name: "after",
                  key: "after$l4vdws2hl3xc$3",
                },
                init: {
                  type: "UpdateExpression",
                  loc: {
                    start: { line: 19, column: 20 },
                    end: { line: 19, column: 23 },
                  },
                  operator: "++",
                  prefix: true,
                  argument: {
                    type: "Identifier",
                    loc: {
                      start: { line: 19, column: 22 },
                      end: { line: 19, column: 23 },
                    },
                    name: "n",
                    key: "n$l4vdws2hl3xc$1",
                  },
                },
              },
            ],
          },
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 20, column: 6 },
              end: { line: 20, column: 23 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 20, column: 12 },
                  end: { line: 20, column: 22 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 20, column: 12 },
                    end: { line: 20, column: 16 },
                  },
                  name: "down",
                  key: "down$l4vdws2hl3xc$4",
                },
                init: {
                  type: "UpdateExpression",
                  loc: {
                    start: { line: 20, column: 19 },
                    end: { line: 20, column: 22 },
                  },
                  operator: "--",
                  prefix: false,
                  argument: {
                    type: "Identifier",
                    loc: {
                      start: { line: 20, column: 19 },
                      end: { line: 20, column: 20 },
                    },
                    name: "n",
                    key: "n$l4vdws2hl3xc$1",
                  },
                },
              },
            ],
          },
          {
            type: "ReturnStatement",
            loc: {
              start: { line: 21, column: 6 },
              end: { line: 21, column: 45 },
            },
            argument: {
              type: "ArrayExpression",
              loc: {
                start: { line: 21, column: 13 },
                end: { line: 21, column: 44 },
              },
              elements: [
                {
                  type: "Identifier",
                  loc: {
                    start: { line: 21, column: 14 },
                    end: { line: 21, column: 19 },
                  },
                  name: "total",
                  key: "total$l4vdws2hl3xc$0",
                },
                {
                  type: "Identifier",
                  loc: {
                    start: { line: 21, column: 21 },
                    end: { line: 21, column: 27 },
                  },
                  name: "before",
                  key: "before$l4vdws2hl3xc$2",
                },
                {
                  type: "Identifier",
                  loc: {
                    start: { line: 21, column: 29 },
                    end: { line: 21, column: 34 },
                  },
                  name: "after",
                  key: "after$l4vdws2hl3xc$3",
                },
                {
                  type: "Identifier",
                  loc: {
                    start: { line: 21, column: 36 },
                    end: { line: 21, column: 40 },
                  },
                  name: "down",
                  key: "down$l4vdws2hl3xc$4",
                },
                {
                  type: "Identifier",
                  loc: {
                    start: { line: 21, column: 42 },
                    end: { line: 21, column: 43 },
                  },
                  name: "n",
                  key: "n$l4vdws2hl3xc$1",
                },
              ],
            },
          },
        ],
      }),
      "() => {\n    let total = 0;\n    for (let i = 0; i < 3; i++) {\n        total = total + i;\n    }\n    let n = 0.1;\n    const before = n++;\n    const after = ++n;\n    const down = n--;\n    return [total, before, after, down, n];\n}",
      '{"version":3,"file":"step.test.jsx","sourceRoot":"","sources":["step.test.tsx"],"names":[],"mappings":"AAWO;IACD,IAAI,KAAK,GAAG,CAAC,CAAC;IACd,KAAK,IAAI,CAAC,GAAG,CAAC,EAAE,CAAC,GAAG,CAAC,EAAE,CAAC,EAAE,EAAE,CAAC;QAC3B,KAAK,GAAG,KAAK,GAAG,CAAC,CAAC;IACpB,CAAC;IACD,IAAI,CAAC,GAAG,GAAG,CAAC;IACZ,MAAM,MAAM,GAAG,CAAC,EAAE,CAAC;IACnB,MAAM,KAAK,GAAG,EAAE,CAAC,CAAC;IAClB,MAAM,IAAI,GAAG,CAAC,EAAE,CAAC;IACjB,OAAO,CAAC,KAAK,EAAE,MAAM,EAAE,KAAK,EAAE,IAAI,EAAE,CAAC,CAAC,CAAC;AACzC,CAAC,CAAA"}',
    ),
  );
});
