import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// Nested headers reusing a name, and a body that shadows the header's own:
// the update still means the header's binding, because names resolve to their
// binding before anything is lowered.
it("forNestedShadowing", async (t) => {
  await snapshotCase(
    t,
    "forNestedShadowing",
    cs.create(
      "lj6vk8127ex6:12:4",
      { params: [] },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 12, column: 7 }, end: { line: 21, column: 5 } },
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
                  key: "out$lj6vk8127ex6$0",
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
              end: { line: 19, column: 7 },
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
                    key: "i$lj6vk8127ex6$1",
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
                key: "i$lj6vk8127ex6$1",
              },
              right: {
                type: "Literal",
                loc: {
                  start: { line: 14, column: 26 },
                  end: { line: 14, column: 27 },
                },
                value: 2,
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
                key: "i$lj6vk8127ex6$1",
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
                  key: "i$lj6vk8127ex6$1",
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
                end: { line: 19, column: 7 },
              },
              body: [
                {
                  type: "VariableDeclaration",
                  loc: {
                    start: { line: 15, column: 8 },
                    end: { line: 15, column: 22 },
                  },
                  kind: "const",
                  declarations: [
                    {
                      type: "VariableDeclarator",
                      loc: {
                        start: { line: 15, column: 14 },
                        end: { line: 15, column: 21 },
                      },
                      id: {
                        type: "Identifier",
                        loc: {
                          start: { line: 15, column: 14 },
                          end: { line: 15, column: 15 },
                        },
                        name: "i",
                        key: "i$lj6vk8127ex6$2",
                      },
                      init: {
                        type: "Literal",
                        loc: {
                          start: { line: 15, column: 18 },
                          end: { line: 15, column: 21 },
                        },
                        value: "-",
                      },
                    },
                  ],
                },
                {
                  type: "ForStatement",
                  loc: {
                    start: { line: 16, column: 8 },
                    end: { line: 18, column: 9 },
                  },
                  init: {
                    type: "VariableDeclaration",
                    loc: {
                      start: { line: 16, column: 13 },
                      end: { line: 16, column: 22 },
                    },
                    kind: "let",
                    declarations: [
                      {
                        type: "VariableDeclarator",
                        loc: {
                          start: { line: 16, column: 17 },
                          end: { line: 16, column: 22 },
                        },
                        id: {
                          type: "Identifier",
                          loc: {
                            start: { line: 16, column: 17 },
                            end: { line: 16, column: 18 },
                          },
                          name: "j",
                          key: "j$lj6vk8127ex6$3",
                        },
                        init: {
                          type: "Literal",
                          loc: {
                            start: { line: 16, column: 21 },
                            end: { line: 16, column: 22 },
                          },
                          value: 0,
                        },
                      },
                    ],
                  },
                  test: {
                    type: "BinaryExpression",
                    loc: {
                      start: { line: 16, column: 24 },
                      end: { line: 16, column: 29 },
                    },
                    operator: "<",
                    left: {
                      type: "Identifier",
                      loc: {
                        start: { line: 16, column: 24 },
                        end: { line: 16, column: 25 },
                      },
                      name: "j",
                      key: "j$lj6vk8127ex6$3",
                    },
                    right: {
                      type: "Literal",
                      loc: {
                        start: { line: 16, column: 28 },
                        end: { line: 16, column: 29 },
                      },
                      value: 2,
                    },
                  },
                  update: {
                    type: "AssignmentExpression",
                    loc: {
                      start: { line: 16, column: 31 },
                      end: { line: 16, column: 40 },
                    },
                    operator: "=",
                    left: {
                      type: "Identifier",
                      loc: {
                        start: { line: 16, column: 31 },
                        end: { line: 16, column: 32 },
                      },
                      name: "j",
                      key: "j$lj6vk8127ex6$3",
                    },
                    right: {
                      type: "BinaryExpression",
                      loc: {
                        start: { line: 16, column: 35 },
                        end: { line: 16, column: 40 },
                      },
                      operator: "+",
                      left: {
                        type: "Identifier",
                        loc: {
                          start: { line: 16, column: 35 },
                          end: { line: 16, column: 36 },
                        },
                        name: "j",
                        key: "j$lj6vk8127ex6$3",
                      },
                      right: {
                        type: "Literal",
                        loc: {
                          start: { line: 16, column: 39 },
                          end: { line: 16, column: 40 },
                        },
                        value: 1,
                      },
                    },
                  },
                  body: {
                    type: "BlockStatement",
                    loc: {
                      start: { line: 16, column: 42 },
                      end: { line: 18, column: 9 },
                    },
                    body: [
                      {
                        type: "ExpressionStatement",
                        loc: {
                          start: { line: 17, column: 10 },
                          end: { line: 17, column: 28 },
                        },
                        expression: {
                          type: "AssignmentExpression",
                          loc: {
                            start: { line: 17, column: 10 },
                            end: { line: 17, column: 27 },
                          },
                          operator: "=",
                          left: {
                            type: "Identifier",
                            loc: {
                              start: { line: 17, column: 10 },
                              end: { line: 17, column: 13 },
                            },
                            name: "out",
                            key: "out$lj6vk8127ex6$0",
                          },
                          right: {
                            type: "BinaryExpression",
                            loc: {
                              start: { line: 17, column: 16 },
                              end: { line: 17, column: 27 },
                            },
                            operator: "+",
                            left: {
                              type: "BinaryExpression",
                              loc: {
                                start: { line: 17, column: 16 },
                                end: { line: 17, column: 23 },
                              },
                              operator: "+",
                              left: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 17, column: 16 },
                                  end: { line: 17, column: 19 },
                                },
                                name: "out",
                                key: "out$lj6vk8127ex6$0",
                              },
                              right: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 17, column: 22 },
                                  end: { line: 17, column: 23 },
                                },
                                name: "i",
                                key: "i$lj6vk8127ex6$2",
                              },
                            },
                            right: {
                              type: "Identifier",
                              loc: {
                                start: { line: 17, column: 26 },
                                end: { line: 17, column: 27 },
                              },
                              name: "j",
                              key: "j$lj6vk8127ex6$3",
                            },
                          },
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            type: "ReturnStatement",
            loc: {
              start: { line: 20, column: 6 },
              end: { line: 20, column: 17 },
            },
            argument: {
              type: "Identifier",
              loc: {
                start: { line: 20, column: 13 },
                end: { line: 20, column: 16 },
              },
              name: "out",
              key: "out$lj6vk8127ex6$0",
            },
          },
        ],
      }),
      '() => {\n    let out = "";\n    for (let i = 0; i < 2; i = i + 1) {\n        const i = "-";\n        for (let j = 0; j < 2; j = j + 1) {\n            out = out + i + j;\n        }\n    }\n    return out;\n}',
      '{"version":3,"file":"for-nested-shadowing.test.jsx","sourceRoot":"","sources":["for-nested-shadowing.test.tsx"],"names":[],"mappings":"AAWO;IACD,IAAI,GAAG,GAAG,EAAE,CAAC;IACb,KAAK,IAAI,CAAC,GAAG,CAAC,EAAE,CAAC,GAAG,CAAC,EAAE,CAAC,GAAG,CAAC,GAAG,CAAC,EAAE,CAAC;QACjC,MAAM,CAAC,GAAG,GAAG,CAAC;QACd,KAAK,IAAI,CAAC,GAAG,CAAC,EAAE,CAAC,GAAG,CAAC,EAAE,CAAC,GAAG,CAAC,GAAG,CAAC,EAAE,CAAC;YACjC,GAAG,GAAG,GAAG,GAAG,CAAC,GAAG,CAAC,CAAC;QACpB,CAAC;IACH,CAAC;IACD,OAAO,GAAG,CAAC;AACb,CAAC,CAAA"}',
    ),
  );
});
