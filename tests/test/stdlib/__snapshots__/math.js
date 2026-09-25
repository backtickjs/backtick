import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// The one global. What it is, is the host's to answer; which members exist
// and what each means is the format's, which is why the list is short — only
// the members every host can agree on to the last bit are here.
it("math", async (t) => {
  await snapshotCase(
    t,
    "math",
    cs.create(
      "1j4uiiyebx17u:12:4",
      { params: [] },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 12, column: 7 }, end: { line: 36, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 13, column: 6 },
              end: { line: 14, column: 74 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 13, column: 12 },
                  end: { line: 14, column: 73 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 13, column: 12 },
                    end: { line: 13, column: 19 },
                  },
                  name: "rounded",
                  key: "rounded$1j4uiiyebx17u$0",
                },
                init: {
                  type: "BinaryExpression",
                  loc: {
                    start: { line: 14, column: 8 },
                    end: { line: 14, column: 73 },
                  },
                  operator: "+",
                  left: {
                    type: "BinaryExpression",
                    loc: {
                      start: { line: 14, column: 8 },
                      end: { line: 14, column: 54 },
                    },
                    operator: "+",
                    left: {
                      type: "BinaryExpression",
                      loc: {
                        start: { line: 14, column: 8 },
                        end: { line: 14, column: 48 },
                      },
                      operator: "+",
                      left: {
                        type: "BinaryExpression",
                        loc: {
                          start: { line: 14, column: 8 },
                          end: { line: 14, column: 29 },
                        },
                        operator: "+",
                        left: {
                          type: "CallExpression",
                          loc: {
                            start: { line: 14, column: 8 },
                            end: { line: 14, column: 23 },
                          },
                          callee: {
                            type: "MemberExpression",
                            loc: {
                              start: { line: 14, column: 8 },
                              end: { line: 14, column: 18 },
                            },
                            object: {
                              type: "Identifier",
                              loc: {
                                start: { line: 14, column: 8 },
                                end: { line: 14, column: 12 },
                              },
                              name: "Math",
                            },
                            property: {
                              type: "Identifier",
                              loc: {
                                start: { line: 14, column: 13 },
                                end: { line: 14, column: 18 },
                              },
                              name: "round",
                            },
                            computed: false,
                            optional: false,
                          },
                          arguments: [
                            {
                              type: "Literal",
                              loc: {
                                start: { line: 14, column: 19 },
                                end: { line: 14, column: 22 },
                              },
                              value: 2.5,
                            },
                          ],
                          optional: false,
                        },
                        right: {
                          type: "Literal",
                          loc: {
                            start: { line: 14, column: 26 },
                            end: { line: 14, column: 29 },
                          },
                          value: ",",
                        },
                      },
                      right: {
                        type: "CallExpression",
                        loc: {
                          start: { line: 14, column: 32 },
                          end: { line: 14, column: 48 },
                        },
                        callee: {
                          type: "MemberExpression",
                          loc: {
                            start: { line: 14, column: 32 },
                            end: { line: 14, column: 42 },
                          },
                          object: {
                            type: "Identifier",
                            loc: {
                              start: { line: 14, column: 32 },
                              end: { line: 14, column: 36 },
                            },
                            name: "Math",
                          },
                          property: {
                            type: "Identifier",
                            loc: {
                              start: { line: 14, column: 37 },
                              end: { line: 14, column: 42 },
                            },
                            name: "round",
                          },
                          computed: false,
                          optional: false,
                        },
                        arguments: [
                          {
                            type: "UnaryExpression",
                            loc: {
                              start: { line: 14, column: 43 },
                              end: { line: 14, column: 47 },
                            },
                            operator: "-",
                            prefix: true,
                            argument: {
                              type: "Literal",
                              loc: {
                                start: { line: 14, column: 44 },
                                end: { line: 14, column: 47 },
                              },
                              value: 2.5,
                            },
                          },
                        ],
                        optional: false,
                      },
                    },
                    right: {
                      type: "Literal",
                      loc: {
                        start: { line: 14, column: 51 },
                        end: { line: 14, column: 54 },
                      },
                      value: ",",
                    },
                  },
                  right: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 14, column: 57 },
                      end: { line: 14, column: 73 },
                    },
                    callee: {
                      type: "MemberExpression",
                      loc: {
                        start: { line: 14, column: 57 },
                        end: { line: 14, column: 67 },
                      },
                      object: {
                        type: "Identifier",
                        loc: {
                          start: { line: 14, column: 57 },
                          end: { line: 14, column: 61 },
                        },
                        name: "Math",
                      },
                      property: {
                        type: "Identifier",
                        loc: {
                          start: { line: 14, column: 62 },
                          end: { line: 14, column: 67 },
                        },
                        name: "round",
                      },
                      computed: false,
                      optional: false,
                    },
                    arguments: [
                      {
                        type: "UnaryExpression",
                        loc: {
                          start: { line: 14, column: 68 },
                          end: { line: 14, column: 72 },
                        },
                        operator: "-",
                        prefix: true,
                        argument: {
                          type: "Literal",
                          loc: {
                            start: { line: 14, column: 69 },
                            end: { line: 14, column: 72 },
                          },
                          value: 0.5,
                        },
                      },
                    ],
                    optional: false,
                  },
                },
              },
            ],
          },
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 15, column: 6 },
              end: { line: 16, column: 74 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 15, column: 12 },
                  end: { line: 16, column: 73 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 15, column: 12 },
                    end: { line: 15, column: 17 },
                  },
                  name: "edges",
                  key: "edges$1j4uiiyebx17u$1",
                },
                init: {
                  type: "BinaryExpression",
                  loc: {
                    start: { line: 16, column: 8 },
                    end: { line: 16, column: 73 },
                  },
                  operator: "+",
                  left: {
                    type: "BinaryExpression",
                    loc: {
                      start: { line: 16, column: 8 },
                      end: { line: 16, column: 54 },
                    },
                    operator: "+",
                    left: {
                      type: "BinaryExpression",
                      loc: {
                        start: { line: 16, column: 8 },
                        end: { line: 16, column: 48 },
                      },
                      operator: "+",
                      left: {
                        type: "BinaryExpression",
                        loc: {
                          start: { line: 16, column: 8 },
                          end: { line: 16, column: 30 },
                        },
                        operator: "+",
                        left: {
                          type: "CallExpression",
                          loc: {
                            start: { line: 16, column: 8 },
                            end: { line: 16, column: 24 },
                          },
                          callee: {
                            type: "MemberExpression",
                            loc: {
                              start: { line: 16, column: 8 },
                              end: { line: 16, column: 18 },
                            },
                            object: {
                              type: "Identifier",
                              loc: {
                                start: { line: 16, column: 8 },
                                end: { line: 16, column: 12 },
                              },
                              name: "Math",
                            },
                            property: {
                              type: "Identifier",
                              loc: {
                                start: { line: 16, column: 13 },
                                end: { line: 16, column: 18 },
                              },
                              name: "floor",
                            },
                            computed: false,
                            optional: false,
                          },
                          arguments: [
                            {
                              type: "UnaryExpression",
                              loc: {
                                start: { line: 16, column: 19 },
                                end: { line: 16, column: 23 },
                              },
                              operator: "-",
                              prefix: true,
                              argument: {
                                type: "Literal",
                                loc: {
                                  start: { line: 16, column: 20 },
                                  end: { line: 16, column: 23 },
                                },
                                value: 1.5,
                              },
                            },
                          ],
                          optional: false,
                        },
                        right: {
                          type: "Literal",
                          loc: {
                            start: { line: 16, column: 27 },
                            end: { line: 16, column: 30 },
                          },
                          value: ",",
                        },
                      },
                      right: {
                        type: "CallExpression",
                        loc: {
                          start: { line: 16, column: 33 },
                          end: { line: 16, column: 48 },
                        },
                        callee: {
                          type: "MemberExpression",
                          loc: {
                            start: { line: 16, column: 33 },
                            end: { line: 16, column: 42 },
                          },
                          object: {
                            type: "Identifier",
                            loc: {
                              start: { line: 16, column: 33 },
                              end: { line: 16, column: 37 },
                            },
                            name: "Math",
                          },
                          property: {
                            type: "Identifier",
                            loc: {
                              start: { line: 16, column: 38 },
                              end: { line: 16, column: 42 },
                            },
                            name: "ceil",
                          },
                          computed: false,
                          optional: false,
                        },
                        arguments: [
                          {
                            type: "UnaryExpression",
                            loc: {
                              start: { line: 16, column: 43 },
                              end: { line: 16, column: 47 },
                            },
                            operator: "-",
                            prefix: true,
                            argument: {
                              type: "Literal",
                              loc: {
                                start: { line: 16, column: 44 },
                                end: { line: 16, column: 47 },
                              },
                              value: 1.5,
                            },
                          },
                        ],
                        optional: false,
                      },
                    },
                    right: {
                      type: "Literal",
                      loc: {
                        start: { line: 16, column: 51 },
                        end: { line: 16, column: 54 },
                      },
                      value: ",",
                    },
                  },
                  right: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 16, column: 57 },
                      end: { line: 16, column: 73 },
                    },
                    callee: {
                      type: "MemberExpression",
                      loc: {
                        start: { line: 16, column: 57 },
                        end: { line: 16, column: 67 },
                      },
                      object: {
                        type: "Identifier",
                        loc: {
                          start: { line: 16, column: 57 },
                          end: { line: 16, column: 61 },
                        },
                        name: "Math",
                      },
                      property: {
                        type: "Identifier",
                        loc: {
                          start: { line: 16, column: 62 },
                          end: { line: 16, column: 67 },
                        },
                        name: "trunc",
                      },
                      computed: false,
                      optional: false,
                    },
                    arguments: [
                      {
                        type: "UnaryExpression",
                        loc: {
                          start: { line: 16, column: 68 },
                          end: { line: 16, column: 72 },
                        },
                        operator: "-",
                        prefix: true,
                        argument: {
                          type: "Literal",
                          loc: {
                            start: { line: 16, column: 69 },
                            end: { line: 16, column: 72 },
                          },
                          value: 1.5,
                        },
                      },
                    ],
                    optional: false,
                  },
                },
              },
            ],
          },
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 17, column: 6 },
              end: { line: 18, column: 73 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 17, column: 12 },
                  end: { line: 18, column: 72 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 17, column: 12 },
                    end: { line: 17, column: 17 },
                  },
                  name: "picks",
                  key: "picks$1j4uiiyebx17u$2",
                },
                init: {
                  type: "BinaryExpression",
                  loc: {
                    start: { line: 18, column: 8 },
                    end: { line: 18, column: 72 },
                  },
                  operator: "+",
                  left: {
                    type: "BinaryExpression",
                    loc: {
                      start: { line: 18, column: 8 },
                      end: { line: 18, column: 57 },
                    },
                    operator: "+",
                    left: {
                      type: "BinaryExpression",
                      loc: {
                        start: { line: 18, column: 8 },
                        end: { line: 18, column: 51 },
                      },
                      operator: "+",
                      left: {
                        type: "BinaryExpression",
                        loc: {
                          start: { line: 18, column: 8 },
                          end: { line: 18, column: 31 },
                        },
                        operator: "+",
                        left: {
                          type: "CallExpression",
                          loc: {
                            start: { line: 18, column: 8 },
                            end: { line: 18, column: 25 },
                          },
                          callee: {
                            type: "MemberExpression",
                            loc: {
                              start: { line: 18, column: 8 },
                              end: { line: 18, column: 16 },
                            },
                            object: {
                              type: "Identifier",
                              loc: {
                                start: { line: 18, column: 8 },
                                end: { line: 18, column: 12 },
                              },
                              name: "Math",
                            },
                            property: {
                              type: "Identifier",
                              loc: {
                                start: { line: 18, column: 13 },
                                end: { line: 18, column: 16 },
                              },
                              name: "min",
                            },
                            computed: false,
                            optional: false,
                          },
                          arguments: [
                            {
                              type: "Literal",
                              loc: {
                                start: { line: 18, column: 17 },
                                end: { line: 18, column: 18 },
                              },
                              value: 3,
                            },
                            {
                              type: "Literal",
                              loc: {
                                start: { line: 18, column: 20 },
                                end: { line: 18, column: 21 },
                              },
                              value: 1,
                            },
                            {
                              type: "Literal",
                              loc: {
                                start: { line: 18, column: 23 },
                                end: { line: 18, column: 24 },
                              },
                              value: 2,
                            },
                          ],
                          optional: false,
                        },
                        right: {
                          type: "Literal",
                          loc: {
                            start: { line: 18, column: 28 },
                            end: { line: 18, column: 31 },
                          },
                          value: ",",
                        },
                      },
                      right: {
                        type: "CallExpression",
                        loc: {
                          start: { line: 18, column: 34 },
                          end: { line: 18, column: 51 },
                        },
                        callee: {
                          type: "MemberExpression",
                          loc: {
                            start: { line: 18, column: 34 },
                            end: { line: 18, column: 42 },
                          },
                          object: {
                            type: "Identifier",
                            loc: {
                              start: { line: 18, column: 34 },
                              end: { line: 18, column: 38 },
                            },
                            name: "Math",
                          },
                          property: {
                            type: "Identifier",
                            loc: {
                              start: { line: 18, column: 39 },
                              end: { line: 18, column: 42 },
                            },
                            name: "max",
                          },
                          computed: false,
                          optional: false,
                        },
                        arguments: [
                          {
                            type: "Literal",
                            loc: {
                              start: { line: 18, column: 43 },
                              end: { line: 18, column: 44 },
                            },
                            value: 3,
                          },
                          {
                            type: "Literal",
                            loc: {
                              start: { line: 18, column: 46 },
                              end: { line: 18, column: 47 },
                            },
                            value: 1,
                          },
                          {
                            type: "Literal",
                            loc: {
                              start: { line: 18, column: 49 },
                              end: { line: 18, column: 50 },
                            },
                            value: 2,
                          },
                        ],
                        optional: false,
                      },
                    },
                    right: {
                      type: "Literal",
                      loc: {
                        start: { line: 18, column: 54 },
                        end: { line: 18, column: 57 },
                      },
                      value: ",",
                    },
                  },
                  right: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 18, column: 60 },
                      end: { line: 18, column: 72 },
                    },
                    callee: {
                      type: "MemberExpression",
                      loc: {
                        start: { line: 18, column: 60 },
                        end: { line: 18, column: 68 },
                      },
                      object: {
                        type: "Identifier",
                        loc: {
                          start: { line: 18, column: 60 },
                          end: { line: 18, column: 64 },
                        },
                        name: "Math",
                      },
                      property: {
                        type: "Identifier",
                        loc: {
                          start: { line: 18, column: 65 },
                          end: { line: 18, column: 68 },
                        },
                        name: "abs",
                      },
                      computed: false,
                      optional: false,
                    },
                    arguments: [
                      {
                        type: "UnaryExpression",
                        loc: {
                          start: { line: 18, column: 69 },
                          end: { line: 18, column: 71 },
                        },
                        operator: "-",
                        prefix: true,
                        argument: {
                          type: "Literal",
                          loc: {
                            start: { line: 18, column: 70 },
                            end: { line: 18, column: 71 },
                          },
                          value: 4,
                        },
                      },
                    ],
                    optional: false,
                  },
                },
              },
            ],
          },
          {
            type: "ReturnStatement",
            loc: {
              start: { line: 19, column: 6 },
              end: { line: 35, column: 8 },
            },
            argument: {
              type: "BinaryExpression",
              loc: {
                start: { line: 20, column: 8 },
                end: { line: 34, column: 23 },
              },
              operator: "+",
              left: {
                type: "BinaryExpression",
                loc: {
                  start: { line: 20, column: 8 },
                  end: { line: 33, column: 11 },
                },
                operator: "+",
                left: {
                  type: "BinaryExpression",
                  loc: {
                    start: { line: 20, column: 8 },
                    end: { line: 32, column: 24 },
                  },
                  operator: "+",
                  left: {
                    type: "BinaryExpression",
                    loc: {
                      start: { line: 20, column: 8 },
                      end: { line: 31, column: 11 },
                    },
                    operator: "+",
                    left: {
                      type: "BinaryExpression",
                      loc: {
                        start: { line: 20, column: 8 },
                        end: { line: 30, column: 24 },
                      },
                      operator: "+",
                      left: {
                        type: "BinaryExpression",
                        loc: {
                          start: { line: 20, column: 8 },
                          end: { line: 29, column: 11 },
                        },
                        operator: "+",
                        left: {
                          type: "BinaryExpression",
                          loc: {
                            start: { line: 20, column: 8 },
                            end: { line: 28, column: 21 },
                          },
                          operator: "+",
                          left: {
                            type: "BinaryExpression",
                            loc: {
                              start: { line: 20, column: 8 },
                              end: { line: 27, column: 11 },
                            },
                            operator: "+",
                            left: {
                              type: "BinaryExpression",
                              loc: {
                                start: { line: 20, column: 8 },
                                end: { line: 26, column: 20 },
                              },
                              operator: "+",
                              left: {
                                type: "BinaryExpression",
                                loc: {
                                  start: { line: 20, column: 8 },
                                  end: { line: 25, column: 11 },
                                },
                                operator: "+",
                                left: {
                                  type: "BinaryExpression",
                                  loc: {
                                    start: { line: 20, column: 8 },
                                    end: { line: 24, column: 13 },
                                  },
                                  operator: "+",
                                  left: {
                                    type: "BinaryExpression",
                                    loc: {
                                      start: { line: 20, column: 8 },
                                      end: { line: 23, column: 11 },
                                    },
                                    operator: "+",
                                    left: {
                                      type: "BinaryExpression",
                                      loc: {
                                        start: { line: 20, column: 8 },
                                        end: { line: 22, column: 13 },
                                      },
                                      operator: "+",
                                      left: {
                                        type: "BinaryExpression",
                                        loc: {
                                          start: { line: 20, column: 8 },
                                          end: { line: 21, column: 11 },
                                        },
                                        operator: "+",
                                        left: {
                                          type: "Identifier",
                                          loc: {
                                            start: { line: 20, column: 8 },
                                            end: { line: 20, column: 15 },
                                          },
                                          name: "rounded",
                                          key: "rounded$1j4uiiyebx17u$0",
                                        },
                                        right: {
                                          type: "Literal",
                                          loc: {
                                            start: { line: 21, column: 8 },
                                            end: { line: 21, column: 11 },
                                          },
                                          value: "|",
                                        },
                                      },
                                      right: {
                                        type: "Identifier",
                                        loc: {
                                          start: { line: 22, column: 8 },
                                          end: { line: 22, column: 13 },
                                        },
                                        name: "edges",
                                        key: "edges$1j4uiiyebx17u$1",
                                      },
                                    },
                                    right: {
                                      type: "Literal",
                                      loc: {
                                        start: { line: 23, column: 8 },
                                        end: { line: 23, column: 11 },
                                      },
                                      value: "|",
                                    },
                                  },
                                  right: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 24, column: 8 },
                                      end: { line: 24, column: 13 },
                                    },
                                    name: "picks",
                                    key: "picks$1j4uiiyebx17u$2",
                                  },
                                },
                                right: {
                                  type: "Literal",
                                  loc: {
                                    start: { line: 25, column: 8 },
                                    end: { line: 25, column: 11 },
                                  },
                                  value: "|",
                                },
                              },
                              right: {
                                type: "CallExpression",
                                loc: {
                                  start: { line: 26, column: 8 },
                                  end: { line: 26, column: 20 },
                                },
                                callee: {
                                  type: "MemberExpression",
                                  loc: {
                                    start: { line: 26, column: 8 },
                                    end: { line: 26, column: 17 },
                                  },
                                  object: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 26, column: 8 },
                                      end: { line: 26, column: 12 },
                                    },
                                    name: "Math",
                                  },
                                  property: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 26, column: 13 },
                                      end: { line: 26, column: 17 },
                                    },
                                    name: "sqrt",
                                  },
                                  computed: false,
                                  optional: false,
                                },
                                arguments: [
                                  {
                                    type: "Literal",
                                    loc: {
                                      start: { line: 26, column: 18 },
                                      end: { line: 26, column: 19 },
                                    },
                                    value: 9,
                                  },
                                ],
                                optional: false,
                              },
                            },
                            right: {
                              type: "Literal",
                              loc: {
                                start: { line: 27, column: 8 },
                                end: { line: 27, column: 11 },
                              },
                              value: ",",
                            },
                          },
                          right: {
                            type: "CallExpression",
                            loc: {
                              start: { line: 28, column: 8 },
                              end: { line: 28, column: 21 },
                            },
                            callee: {
                              type: "MemberExpression",
                              loc: {
                                start: { line: 28, column: 8 },
                                end: { line: 28, column: 17 },
                              },
                              object: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 28, column: 8 },
                                  end: { line: 28, column: 12 },
                                },
                                name: "Math",
                              },
                              property: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 28, column: 13 },
                                  end: { line: 28, column: 17 },
                                },
                                name: "sign",
                              },
                              computed: false,
                              optional: false,
                            },
                            arguments: [
                              {
                                type: "UnaryExpression",
                                loc: {
                                  start: { line: 28, column: 18 },
                                  end: { line: 28, column: 20 },
                                },
                                operator: "-",
                                prefix: true,
                                argument: {
                                  type: "Literal",
                                  loc: {
                                    start: { line: 28, column: 19 },
                                    end: { line: 28, column: 20 },
                                  },
                                  value: 8,
                                },
                              },
                            ],
                            optional: false,
                          },
                        },
                        right: {
                          type: "Literal",
                          loc: {
                            start: { line: 29, column: 8 },
                            end: { line: 29, column: 11 },
                          },
                          value: ",",
                        },
                      },
                      right: {
                        type: "CallExpression",
                        loc: {
                          start: { line: 30, column: 8 },
                          end: { line: 30, column: 24 },
                        },
                        callee: {
                          type: "MemberExpression",
                          loc: {
                            start: { line: 30, column: 8 },
                            end: { line: 30, column: 19 },
                          },
                          object: {
                            type: "Identifier",
                            loc: {
                              start: { line: 30, column: 8 },
                              end: { line: 30, column: 12 },
                            },
                            name: "Math",
                          },
                          property: {
                            type: "Identifier",
                            loc: {
                              start: { line: 30, column: 13 },
                              end: { line: 30, column: 19 },
                            },
                            name: "fround",
                          },
                          computed: false,
                          optional: false,
                        },
                        arguments: [
                          {
                            type: "Literal",
                            loc: {
                              start: { line: 30, column: 20 },
                              end: { line: 30, column: 23 },
                            },
                            value: 1.5,
                          },
                        ],
                        optional: false,
                      },
                    },
                    right: {
                      type: "Literal",
                      loc: {
                        start: { line: 31, column: 8 },
                        end: { line: 31, column: 11 },
                      },
                      value: "|",
                    },
                  },
                  right: {
                    type: "BinaryExpression",
                    loc: {
                      start: { line: 32, column: 9 },
                      end: { line: 32, column: 23 },
                    },
                    operator: ">",
                    left: {
                      type: "MemberExpression",
                      loc: {
                        start: { line: 32, column: 9 },
                        end: { line: 32, column: 16 },
                      },
                      object: {
                        type: "Identifier",
                        loc: {
                          start: { line: 32, column: 9 },
                          end: { line: 32, column: 13 },
                        },
                        name: "Math",
                      },
                      property: {
                        type: "Identifier",
                        loc: {
                          start: { line: 32, column: 14 },
                          end: { line: 32, column: 16 },
                        },
                        name: "PI",
                      },
                      computed: false,
                      optional: false,
                    },
                    right: {
                      type: "Literal",
                      loc: {
                        start: { line: 32, column: 19 },
                        end: { line: 32, column: 23 },
                      },
                      value: 3.14,
                    },
                  },
                },
                right: {
                  type: "Literal",
                  loc: {
                    start: { line: 33, column: 8 },
                    end: { line: 33, column: 11 },
                  },
                  value: ",",
                },
              },
              right: {
                type: "BinaryExpression",
                loc: {
                  start: { line: 34, column: 9 },
                  end: { line: 34, column: 22 },
                },
                operator: ">",
                left: {
                  type: "MemberExpression",
                  loc: {
                    start: { line: 34, column: 9 },
                    end: { line: 34, column: 15 },
                  },
                  object: {
                    type: "Identifier",
                    loc: {
                      start: { line: 34, column: 9 },
                      end: { line: 34, column: 13 },
                    },
                    name: "Math",
                  },
                  property: {
                    type: "Identifier",
                    loc: {
                      start: { line: 34, column: 14 },
                      end: { line: 34, column: 15 },
                    },
                    name: "E",
                  },
                  computed: false,
                  optional: false,
                },
                right: {
                  type: "Literal",
                  loc: {
                    start: { line: 34, column: 18 },
                    end: { line: 34, column: 22 },
                  },
                  value: 2.71,
                },
              },
            },
          },
        ],
      }),
      '() => {\n    const rounded = Math.round(2.5) + "," + Math.round(-2.5) + "," + Math.round(-0.5);\n    const edges = Math.floor(-1.5) + "," + Math.ceil(-1.5) + "," + Math.trunc(-1.5);\n    const picks = Math.min(3, 1, 2) + "," + Math.max(3, 1, 2) + "," + Math.abs(-4);\n    return (rounded +\n        "|" +\n        edges +\n        "|" +\n        picks +\n        "|" +\n        Math.sqrt(9) +\n        "," +\n        Math.sign(-8) +\n        "," +\n        Math.fround(1.5) +\n        "|" +\n        (Math.PI > 3.14) +\n        "," +\n        (Math.E > 2.71));\n}',
      '{"version":3,"file":"math.test.jsx","sourceRoot":"","sources":["math.test.tsx"],"names":[],"mappings":"AAWO;IACD,MAAM,OAAO,GACX,IAAI,CAAC,KAAK,CAAC,GAAG,CAAC,GAAG,GAAG,GAAG,IAAI,CAAC,KAAK,CAAC,CAAC,GAAG,CAAC,GAAG,GAAG,GAAG,IAAI,CAAC,KAAK,CAAC,CAAC,GAAG,CAAC,CAAC;IACpE,MAAM,KAAK,GACT,IAAI,CAAC,KAAK,CAAC,CAAC,GAAG,CAAC,GAAG,GAAG,GAAG,IAAI,CAAC,IAAI,CAAC,CAAC,GAAG,CAAC,GAAG,GAAG,GAAG,IAAI,CAAC,KAAK,CAAC,CAAC,GAAG,CAAC,CAAC;IACpE,MAAM,KAAK,GACT,IAAI,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,GAAG,GAAG,GAAG,IAAI,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,GAAG,GAAG,GAAG,IAAI,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC;IACnE,OAAO,CACL,OAAO;QACP,GAAG;QACH,KAAK;QACL,GAAG;QACH,KAAK;QACL,GAAG;QACH,IAAI,CAAC,IAAI,CAAC,CAAC,CAAC;QACZ,GAAG;QACH,IAAI,CAAC,IAAI,CAAC,CAAC,CAAC,CAAC;QACb,GAAG;QACH,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC;QAChB,GAAG;QACH,CAAC,IAAI,CAAC,EAAE,GAAG,IAAI,CAAC;QAChB,GAAG;QACH,CAAC,IAAI,CAAC,CAAC,GAAG,IAAI,CAAC,CAChB,CAAC;AACJ,CAAC,CAAA"}',
    ),
  );
});
