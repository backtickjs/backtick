import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `...xs` where an element goes: it has no value of its own, it contributes
// however many the array it spreads has. An empty one contributes nothing, a
// list may hold several, and what it spreads is an ordinary expression.
it("spread", async (t) => {
  await snapshotCase(
    t,
    "spread",
    cs.create(
      "umu4jsb4aovz:12:4",
      { splices: {}, captures: [] },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 12, column: 7 }, end: { line: 19, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 13, column: 6 },
              end: { line: 13, column: 27 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 13, column: 12 },
                  end: { line: 13, column: 26 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 13, column: 12 },
                    end: { line: 13, column: 17 },
                  },
                  name: "front",
                  key: "front$umu4jsb4aovz$0",
                },
                init: {
                  type: "ArrayExpression",
                  loc: {
                    start: { line: 13, column: 20 },
                    end: { line: 13, column: 26 },
                  },
                  elements: [
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 13, column: 21 },
                        end: { line: 13, column: 22 },
                      },
                      value: 1,
                    },
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 13, column: 24 },
                        end: { line: 13, column: 25 },
                      },
                      value: 2,
                    },
                  ],
                },
              },
            ],
          },
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 14, column: 6 },
              end: { line: 14, column: 23 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 14, column: 12 },
                  end: { line: 14, column: 22 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 14, column: 12 },
                    end: { line: 14, column: 16 },
                  },
                  name: "back",
                  key: "back$umu4jsb4aovz$1",
                },
                init: {
                  type: "ArrayExpression",
                  loc: {
                    start: { line: 14, column: 19 },
                    end: { line: 14, column: 22 },
                  },
                  elements: [
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 14, column: 20 },
                        end: { line: 14, column: 21 },
                      },
                      value: 3,
                    },
                  ],
                },
              },
            ],
          },
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 15, column: 6 },
              end: { line: 15, column: 32 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 15, column: 12 },
                  end: { line: 15, column: 31 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 15, column: 12 },
                    end: { line: 15, column: 16 },
                  },
                  name: "none",
                  key: "none$umu4jsb4aovz$2",
                },
                init: {
                  type: "ArrayExpression",
                  loc: {
                    start: { line: 15, column: 29 },
                    end: { line: 15, column: 31 },
                  },
                  elements: [],
                },
              },
            ],
          },
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 16, column: 6 },
              end: { line: 16, column: 53 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 16, column: 12 },
                  end: { line: 16, column: 52 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 16, column: 12 },
                    end: { line: 16, column: 15 },
                  },
                  name: "all",
                  key: "all$umu4jsb4aovz$3",
                },
                init: {
                  type: "ArrayExpression",
                  loc: {
                    start: { line: 16, column: 18 },
                    end: { line: 16, column: 52 },
                  },
                  elements: [
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 16, column: 19 },
                        end: { line: 16, column: 20 },
                      },
                      value: 0,
                    },
                    {
                      type: "SpreadElement",
                      loc: {
                        start: { line: 16, column: 22 },
                        end: { line: 16, column: 30 },
                      },
                      argument: {
                        type: "Identifier",
                        loc: {
                          start: { line: 16, column: 25 },
                          end: { line: 16, column: 30 },
                        },
                        name: "front",
                        key: "front$umu4jsb4aovz$0",
                      },
                    },
                    {
                      type: "SpreadElement",
                      loc: {
                        start: { line: 16, column: 32 },
                        end: { line: 16, column: 39 },
                      },
                      argument: {
                        type: "Identifier",
                        loc: {
                          start: { line: 16, column: 35 },
                          end: { line: 16, column: 39 },
                        },
                        name: "none",
                        key: "none$umu4jsb4aovz$2",
                      },
                    },
                    {
                      type: "SpreadElement",
                      loc: {
                        start: { line: 16, column: 41 },
                        end: { line: 16, column: 48 },
                      },
                      argument: {
                        type: "Identifier",
                        loc: {
                          start: { line: 16, column: 44 },
                          end: { line: 16, column: 48 },
                        },
                        name: "back",
                        key: "back$umu4jsb4aovz$1",
                      },
                    },
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 16, column: 50 },
                        end: { line: 16, column: 51 },
                      },
                      value: 4,
                    },
                  ],
                },
              },
            ],
          },
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 17, column: 6 },
              end: { line: 17, column: 37 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 17, column: 12 },
                  end: { line: 17, column: 36 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 17, column: 12 },
                    end: { line: 17, column: 17 },
                  },
                  name: "twice",
                  key: "twice$umu4jsb4aovz$4",
                },
                init: {
                  type: "ArrayExpression",
                  loc: {
                    start: { line: 17, column: 20 },
                    end: { line: 17, column: 36 },
                  },
                  elements: [
                    {
                      type: "SpreadElement",
                      loc: {
                        start: { line: 17, column: 21 },
                        end: { line: 17, column: 27 },
                      },
                      argument: {
                        type: "Identifier",
                        loc: {
                          start: { line: 17, column: 24 },
                          end: { line: 17, column: 27 },
                        },
                        name: "all",
                        key: "all$umu4jsb4aovz$3",
                      },
                    },
                    {
                      type: "SpreadElement",
                      loc: {
                        start: { line: 17, column: 29 },
                        end: { line: 17, column: 35 },
                      },
                      argument: {
                        type: "Identifier",
                        loc: {
                          start: { line: 17, column: 32 },
                          end: { line: 17, column: 35 },
                        },
                        name: "all",
                        key: "all$umu4jsb4aovz$3",
                      },
                    },
                  ],
                },
              },
            ],
          },
          {
            type: "ReturnStatement",
            loc: {
              start: { line: 18, column: 6 },
              end: { line: 18, column: 48 },
            },
            argument: {
              type: "BinaryExpression",
              loc: {
                start: { line: 18, column: 13 },
                end: { line: 18, column: 47 },
              },
              operator: "+",
              left: {
                type: "BinaryExpression",
                loc: {
                  start: { line: 18, column: 13 },
                  end: { line: 18, column: 32 },
                },
                operator: "+",
                left: {
                  type: "CallExpression",
                  loc: {
                    start: { line: 18, column: 13 },
                    end: { line: 18, column: 26 },
                  },
                  callee: {
                    type: "MemberExpression",
                    loc: {
                      start: { line: 18, column: 13 },
                      end: { line: 18, column: 21 },
                    },
                    object: {
                      type: "Identifier",
                      loc: {
                        start: { line: 18, column: 13 },
                        end: { line: 18, column: 16 },
                      },
                      name: "all",
                      key: "all$umu4jsb4aovz$3",
                    },
                    property: {
                      type: "Identifier",
                      loc: {
                        start: { line: 18, column: 17 },
                        end: { line: 18, column: 21 },
                      },
                      name: "join",
                    },
                    computed: false,
                    optional: false,
                  },
                  arguments: [
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 18, column: 22 },
                        end: { line: 18, column: 25 },
                      },
                      value: ",",
                    },
                  ],
                  optional: false,
                },
                right: {
                  type: "Literal",
                  loc: {
                    start: { line: 18, column: 29 },
                    end: { line: 18, column: 32 },
                  },
                  value: "|",
                },
              },
              right: {
                type: "MemberExpression",
                loc: {
                  start: { line: 18, column: 35 },
                  end: { line: 18, column: 47 },
                },
                object: {
                  type: "Identifier",
                  loc: {
                    start: { line: 18, column: 35 },
                    end: { line: 18, column: 40 },
                  },
                  name: "twice",
                  key: "twice$umu4jsb4aovz$4",
                },
                property: {
                  type: "Identifier",
                  loc: {
                    start: { line: 18, column: 41 },
                    end: { line: 18, column: 47 },
                  },
                  name: "length",
                },
                computed: false,
                optional: false,
              },
            },
          },
        ],
      }),
      '() => {\n    const front = [1, 2];\n    const back = [3];\n    const none = [];\n    const all = [0, ...front, ...none, ...back, 4];\n    const twice = [...all, ...all];\n    return all.join(",") + "|" + twice.length;\n}',
      '{"version":3,"file":"spread.test.jsx","sourceRoot":"","sources":["spread.test.tsx"],"names":[],"mappings":"AAWO;IACD,MAAM,KAAK,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC;IACrB,MAAM,IAAI,GAAG,CAAC,CAAC,CAAC,CAAC;IACjB,MAAM,IAAI,GAAa,EAAE,CAAC;IAC1B,MAAM,GAAG,GAAG,CAAC,CAAC,EAAE,GAAG,KAAK,EAAE,GAAG,IAAI,EAAE,GAAG,IAAI,EAAE,CAAC,CAAC,CAAC;IAC/C,MAAM,KAAK,GAAG,CAAC,GAAG,GAAG,EAAE,GAAG,GAAG,CAAC,CAAC;IAC/B,OAAO,GAAG,CAAC,IAAI,CAAC,GAAG,CAAC,GAAG,GAAG,GAAG,KAAK,CAAC,MAAM,CAAC;AAC5C,CAAC,CAAA"}',
    ),
  );
});
