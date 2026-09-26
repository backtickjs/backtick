import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// The key is an expression, which is the point: a loop reaches every element
// without one script per position.
it("arrayIndex", async (t) => {
  await snapshotCase(
    t,
    "arrayIndex",
    cs.create(
      "2nqckix5uoswz:11:4",
      { params: [] },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 11, column: 7 }, end: { line: 18, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 12, column: 6 },
              end: { line: 12, column: 31 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 12, column: 12 },
                  end: { line: 12, column: 30 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 12, column: 12 },
                    end: { line: 12, column: 17 },
                  },
                  name: "coins",
                  key: "coins$2nqckix5uoswz$0",
                },
                init: {
                  type: "ArrayExpression",
                  loc: {
                    start: { line: 12, column: 20 },
                    end: { line: 12, column: 30 },
                  },
                  elements: [
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 12, column: 21 },
                        end: { line: 12, column: 22 },
                      },
                      value: 5,
                    },
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 12, column: 24 },
                        end: { line: 12, column: 26 },
                      },
                      value: 31,
                    },
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 12, column: 28 },
                        end: { line: 12, column: 29 },
                      },
                      value: 7,
                    },
                  ],
                },
              },
            ],
          },
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
                  key: "total$2nqckix5uoswz$1",
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
                    key: "i$2nqckix5uoswz$2",
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
                end: { line: 14, column: 38 },
              },
              operator: "<",
              left: {
                type: "Identifier",
                loc: {
                  start: { line: 14, column: 22 },
                  end: { line: 14, column: 23 },
                },
                name: "i",
                key: "i$2nqckix5uoswz$2",
              },
              right: {
                type: "MemberExpression",
                loc: {
                  start: { line: 14, column: 26 },
                  end: { line: 14, column: 38 },
                },
                object: {
                  type: "Identifier",
                  loc: {
                    start: { line: 14, column: 26 },
                    end: { line: 14, column: 31 },
                  },
                  name: "coins",
                  key: "coins$2nqckix5uoswz$0",
                },
                property: {
                  type: "Identifier",
                  loc: {
                    start: { line: 14, column: 32 },
                    end: { line: 14, column: 38 },
                  },
                  name: "length",
                },
                computed: false,
                optional: false,
              },
            },
            update: {
              type: "AssignmentExpression",
              loc: {
                start: { line: 14, column: 40 },
                end: { line: 14, column: 49 },
              },
              operator: "=",
              left: {
                type: "Identifier",
                loc: {
                  start: { line: 14, column: 40 },
                  end: { line: 14, column: 41 },
                },
                name: "i",
                key: "i$2nqckix5uoswz$2",
              },
              right: {
                type: "BinaryExpression",
                loc: {
                  start: { line: 14, column: 44 },
                  end: { line: 14, column: 49 },
                },
                operator: "+",
                left: {
                  type: "Identifier",
                  loc: {
                    start: { line: 14, column: 44 },
                    end: { line: 14, column: 45 },
                  },
                  name: "i",
                  key: "i$2nqckix5uoswz$2",
                },
                right: {
                  type: "Literal",
                  loc: {
                    start: { line: 14, column: 48 },
                    end: { line: 14, column: 49 },
                  },
                  value: 1,
                },
              },
            },
            body: {
              type: "BlockStatement",
              loc: {
                start: { line: 14, column: 51 },
                end: { line: 16, column: 7 },
              },
              body: [
                {
                  type: "ExpressionStatement",
                  loc: {
                    start: { line: 15, column: 8 },
                    end: { line: 15, column: 33 },
                  },
                  expression: {
                    type: "AssignmentExpression",
                    loc: {
                      start: { line: 15, column: 8 },
                      end: { line: 15, column: 32 },
                    },
                    operator: "=",
                    left: {
                      type: "Identifier",
                      loc: {
                        start: { line: 15, column: 8 },
                        end: { line: 15, column: 13 },
                      },
                      name: "total",
                      key: "total$2nqckix5uoswz$1",
                    },
                    right: {
                      type: "BinaryExpression",
                      loc: {
                        start: { line: 15, column: 16 },
                        end: { line: 15, column: 32 },
                      },
                      operator: "+",
                      left: {
                        type: "Identifier",
                        loc: {
                          start: { line: 15, column: 16 },
                          end: { line: 15, column: 21 },
                        },
                        name: "total",
                        key: "total$2nqckix5uoswz$1",
                      },
                      right: {
                        type: "MemberExpression",
                        loc: {
                          start: { line: 15, column: 24 },
                          end: { line: 15, column: 32 },
                        },
                        object: {
                          type: "Identifier",
                          loc: {
                            start: { line: 15, column: 24 },
                            end: { line: 15, column: 29 },
                          },
                          name: "coins",
                          key: "coins$2nqckix5uoswz$0",
                        },
                        property: {
                          type: "Identifier",
                          loc: {
                            start: { line: 15, column: 30 },
                            end: { line: 15, column: 31 },
                          },
                          name: "i",
                          key: "i$2nqckix5uoswz$2",
                        },
                        computed: true,
                        optional: false,
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
              start: { line: 17, column: 6 },
              end: { line: 17, column: 19 },
            },
            argument: {
              type: "Identifier",
              loc: {
                start: { line: 17, column: 13 },
                end: { line: 17, column: 18 },
              },
              name: "total",
              key: "total$2nqckix5uoswz$1",
            },
          },
        ],
      }),
      {
        code: "export default () => {\n    const coins = [5, 31, 7];\n    let total = 0;\n    for (let i = 0; i < coins.length; i = i + 1) {\n        total = total + coins[i];\n    }\n    return total;\n};",
        map: '{"version":3,"file":"array-index.test.jsx","sourceRoot":"","sources":["array-index.test.tsx"],"names":[],"mappings":"eAUO;IACD,MAAM,KAAK,GAAG,CAAC,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC,CAAC;IACzB,IAAI,KAAK,GAAG,CAAC,CAAC;IACd,KAAK,IAAI,CAAC,GAAG,CAAC,EAAE,CAAC,GAAG,KAAK,CAAC,MAAM,EAAE,CAAC,GAAG,CAAC,GAAG,CAAC,EAAE,CAAC;QAC5C,KAAK,GAAG,KAAK,GAAG,KAAK,CAAC,CAAC,CAAC,CAAC;IAC3B,CAAC;IACD,OAAO,KAAK,CAAC;AACf,CAAC"}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
