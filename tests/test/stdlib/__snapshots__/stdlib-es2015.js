import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// The members ES2015 added that this language answers for: a search that
// finds nothing reads as `undefined`, as a read past the end does, and
// everything else is what the standard library says it is.
it("stdlibEs2015", async (t) => {
  await snapshotCase(
    t,
    "stdlibEs2015",
    cs.create(
      "s2q4937fji9l:12:4",
      { params: [] },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 12, column: 7 }, end: { line: 27, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 13, column: 6 },
              end: { line: 13, column: 31 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 13, column: 12 },
                  end: { line: 13, column: 30 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 13, column: 12 },
                    end: { line: 13, column: 14 },
                  },
                  name: "xs",
                  key: "xs$s2q4937fji9l$0",
                },
                init: {
                  type: "ArrayExpression",
                  loc: {
                    start: { line: 13, column: 17 },
                    end: { line: 13, column: 30 },
                  },
                  elements: [
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 13, column: 18 },
                        end: { line: 13, column: 19 },
                      },
                      value: 3,
                    },
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 13, column: 21 },
                        end: { line: 13, column: 22 },
                      },
                      value: 8,
                    },
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 13, column: 24 },
                        end: { line: 13, column: 26 },
                      },
                      value: 12,
                    },
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 13, column: 28 },
                        end: { line: 13, column: 29 },
                      },
                      value: 5,
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
              end: { line: 14, column: 30 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 14, column: 12 },
                  end: { line: 14, column: 29 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 14, column: 12 },
                    end: { line: 14, column: 16 },
                  },
                  name: "word",
                  key: "word$s2q4937fji9l$1",
                },
                init: {
                  type: "Literal",
                  loc: {
                    start: { line: 14, column: 19 },
                    end: { line: 14, column: 29 },
                  },
                  value: "backtick",
                },
              },
            ],
          },
          {
            type: "ReturnStatement",
            loc: {
              start: { line: 15, column: 6 },
              end: { line: 26, column: 8 },
            },
            argument: {
              type: "ObjectExpression",
              loc: {
                start: { line: 15, column: 13 },
                end: { line: 26, column: 7 },
              },
              properties: [
                {
                  type: "Property",
                  loc: {
                    start: { line: 16, column: 8 },
                    end: { line: 16, column: 36 },
                  },
                  key: {
                    type: "Identifier",
                    loc: {
                      start: { line: 16, column: 8 },
                      end: { line: 16, column: 13 },
                    },
                    name: "found",
                  },
                  value: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 16, column: 15 },
                      end: { line: 16, column: 36 },
                    },
                    callee: {
                      type: "MemberExpression",
                      loc: {
                        start: { line: 16, column: 15 },
                        end: { line: 16, column: 22 },
                      },
                      object: {
                        type: "Identifier",
                        loc: {
                          start: { line: 16, column: 15 },
                          end: { line: 16, column: 17 },
                        },
                        name: "xs",
                        key: "xs$s2q4937fji9l$0",
                      },
                      property: {
                        type: "Identifier",
                        loc: {
                          start: { line: 16, column: 18 },
                          end: { line: 16, column: 22 },
                        },
                        name: "find",
                      },
                      computed: false,
                      optional: false,
                    },
                    arguments: [
                      {
                        type: "ArrowFunctionExpression",
                        loc: {
                          start: { line: 16, column: 23 },
                          end: { line: 16, column: 35 },
                        },
                        params: [
                          {
                            type: "Identifier",
                            loc: {
                              start: { line: 16, column: 24 },
                              end: { line: 16, column: 25 },
                            },
                            name: "x",
                            key: "x$s2q4937fji9l$2",
                          },
                        ],
                        body: {
                          type: "BinaryExpression",
                          loc: {
                            start: { line: 16, column: 30 },
                            end: { line: 16, column: 35 },
                          },
                          operator: ">",
                          left: {
                            type: "Identifier",
                            loc: {
                              start: { line: 16, column: 30 },
                              end: { line: 16, column: 31 },
                            },
                            name: "x",
                            key: "x$s2q4937fji9l$2",
                          },
                          right: {
                            type: "Literal",
                            loc: {
                              start: { line: 16, column: 34 },
                              end: { line: 16, column: 35 },
                            },
                            value: 7,
                          },
                        },
                        expression: true,
                      },
                    ],
                    optional: false,
                  },
                  kind: "init",
                  computed: false,
                  method: false,
                  shorthand: false,
                },
                {
                  type: "Property",
                  loc: {
                    start: { line: 17, column: 8 },
                    end: { line: 17, column: 54 },
                  },
                  key: {
                    type: "Identifier",
                    loc: {
                      start: { line: 17, column: 8 },
                      end: { line: 17, column: 15 },
                    },
                    name: "missing",
                  },
                  value: {
                    type: "BinaryExpression",
                    loc: {
                      start: { line: 17, column: 17 },
                      end: { line: 17, column: 54 },
                    },
                    operator: "===",
                    left: {
                      type: "CallExpression",
                      loc: {
                        start: { line: 17, column: 17 },
                        end: { line: 17, column: 40 },
                      },
                      callee: {
                        type: "MemberExpression",
                        loc: {
                          start: { line: 17, column: 17 },
                          end: { line: 17, column: 24 },
                        },
                        object: {
                          type: "Identifier",
                          loc: {
                            start: { line: 17, column: 17 },
                            end: { line: 17, column: 19 },
                          },
                          name: "xs",
                          key: "xs$s2q4937fji9l$0",
                        },
                        property: {
                          type: "Identifier",
                          loc: {
                            start: { line: 17, column: 20 },
                            end: { line: 17, column: 24 },
                          },
                          name: "find",
                        },
                        computed: false,
                        optional: false,
                      },
                      arguments: [
                        {
                          type: "ArrowFunctionExpression",
                          loc: {
                            start: { line: 17, column: 25 },
                            end: { line: 17, column: 39 },
                          },
                          params: [
                            {
                              type: "Identifier",
                              loc: {
                                start: { line: 17, column: 26 },
                                end: { line: 17, column: 27 },
                              },
                              name: "x",
                              key: "x$s2q4937fji9l$3",
                            },
                          ],
                          body: {
                            type: "BinaryExpression",
                            loc: {
                              start: { line: 17, column: 32 },
                              end: { line: 17, column: 39 },
                            },
                            operator: ">",
                            left: {
                              type: "Identifier",
                              loc: {
                                start: { line: 17, column: 32 },
                                end: { line: 17, column: 33 },
                              },
                              name: "x",
                              key: "x$s2q4937fji9l$3",
                            },
                            right: {
                              type: "Literal",
                              loc: {
                                start: { line: 17, column: 36 },
                                end: { line: 17, column: 39 },
                              },
                              value: 100,
                            },
                          },
                          expression: true,
                        },
                      ],
                      optional: false,
                    },
                    right: {
                      type: "Identifier",
                      loc: {
                        start: { line: 17, column: 45 },
                        end: { line: 17, column: 54 },
                      },
                      name: "undefined",
                    },
                  },
                  kind: "init",
                  computed: false,
                  method: false,
                  shorthand: false,
                },
                {
                  type: "Property",
                  loc: {
                    start: { line: 18, column: 8 },
                    end: { line: 18, column: 38 },
                  },
                  key: {
                    type: "Identifier",
                    loc: {
                      start: { line: 18, column: 8 },
                      end: { line: 18, column: 10 },
                    },
                    name: "at",
                  },
                  value: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 18, column: 12 },
                      end: { line: 18, column: 38 },
                    },
                    callee: {
                      type: "MemberExpression",
                      loc: {
                        start: { line: 18, column: 12 },
                        end: { line: 18, column: 24 },
                      },
                      object: {
                        type: "Identifier",
                        loc: {
                          start: { line: 18, column: 12 },
                          end: { line: 18, column: 14 },
                        },
                        name: "xs",
                        key: "xs$s2q4937fji9l$0",
                      },
                      property: {
                        type: "Identifier",
                        loc: {
                          start: { line: 18, column: 15 },
                          end: { line: 18, column: 24 },
                        },
                        name: "findIndex",
                      },
                      computed: false,
                      optional: false,
                    },
                    arguments: [
                      {
                        type: "ArrowFunctionExpression",
                        loc: {
                          start: { line: 18, column: 25 },
                          end: { line: 18, column: 37 },
                        },
                        params: [
                          {
                            type: "Identifier",
                            loc: {
                              start: { line: 18, column: 26 },
                              end: { line: 18, column: 27 },
                            },
                            name: "x",
                            key: "x$s2q4937fji9l$4",
                          },
                        ],
                        body: {
                          type: "BinaryExpression",
                          loc: {
                            start: { line: 18, column: 32 },
                            end: { line: 18, column: 37 },
                          },
                          operator: ">",
                          left: {
                            type: "Identifier",
                            loc: {
                              start: { line: 18, column: 32 },
                              end: { line: 18, column: 33 },
                            },
                            name: "x",
                            key: "x$s2q4937fji9l$4",
                          },
                          right: {
                            type: "Literal",
                            loc: {
                              start: { line: 18, column: 36 },
                              end: { line: 18, column: 37 },
                            },
                            value: 7,
                          },
                        },
                        expression: true,
                      },
                    ],
                    optional: false,
                  },
                  kind: "init",
                  computed: false,
                  method: false,
                  shorthand: false,
                },
                {
                  type: "Property",
                  loc: {
                    start: { line: 19, column: 8 },
                    end: { line: 19, column: 45 },
                  },
                  key: {
                    type: "Identifier",
                    loc: {
                      start: { line: 19, column: 8 },
                      end: { line: 19, column: 15 },
                    },
                    name: "nowhere",
                  },
                  value: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 19, column: 17 },
                      end: { line: 19, column: 45 },
                    },
                    callee: {
                      type: "MemberExpression",
                      loc: {
                        start: { line: 19, column: 17 },
                        end: { line: 19, column: 29 },
                      },
                      object: {
                        type: "Identifier",
                        loc: {
                          start: { line: 19, column: 17 },
                          end: { line: 19, column: 19 },
                        },
                        name: "xs",
                        key: "xs$s2q4937fji9l$0",
                      },
                      property: {
                        type: "Identifier",
                        loc: {
                          start: { line: 19, column: 20 },
                          end: { line: 19, column: 29 },
                        },
                        name: "findIndex",
                      },
                      computed: false,
                      optional: false,
                    },
                    arguments: [
                      {
                        type: "ArrowFunctionExpression",
                        loc: {
                          start: { line: 19, column: 30 },
                          end: { line: 19, column: 44 },
                        },
                        params: [
                          {
                            type: "Identifier",
                            loc: {
                              start: { line: 19, column: 31 },
                              end: { line: 19, column: 32 },
                            },
                            name: "x",
                            key: "x$s2q4937fji9l$5",
                          },
                        ],
                        body: {
                          type: "BinaryExpression",
                          loc: {
                            start: { line: 19, column: 37 },
                            end: { line: 19, column: 44 },
                          },
                          operator: ">",
                          left: {
                            type: "Identifier",
                            loc: {
                              start: { line: 19, column: 37 },
                              end: { line: 19, column: 38 },
                            },
                            name: "x",
                            key: "x$s2q4937fji9l$5",
                          },
                          right: {
                            type: "Literal",
                            loc: {
                              start: { line: 19, column: 41 },
                              end: { line: 19, column: 44 },
                            },
                            value: 100,
                          },
                        },
                        expression: true,
                      },
                    ],
                    optional: false,
                  },
                  kind: "init",
                  computed: false,
                  method: false,
                  shorthand: false,
                },
                {
                  type: "Property",
                  loc: {
                    start: { line: 20, column: 8 },
                    end: { line: 20, column: 39 },
                  },
                  key: {
                    type: "Identifier",
                    loc: {
                      start: { line: 20, column: 8 },
                      end: { line: 20, column: 16 },
                    },
                    name: "includes",
                  },
                  value: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 20, column: 18 },
                      end: { line: 20, column: 39 },
                    },
                    callee: {
                      type: "MemberExpression",
                      loc: {
                        start: { line: 20, column: 18 },
                        end: { line: 20, column: 31 },
                      },
                      object: {
                        type: "Identifier",
                        loc: {
                          start: { line: 20, column: 18 },
                          end: { line: 20, column: 22 },
                        },
                        name: "word",
                        key: "word$s2q4937fji9l$1",
                      },
                      property: {
                        type: "Identifier",
                        loc: {
                          start: { line: 20, column: 23 },
                          end: { line: 20, column: 31 },
                        },
                        name: "includes",
                      },
                      computed: false,
                      optional: false,
                    },
                    arguments: [
                      {
                        type: "Literal",
                        loc: {
                          start: { line: 20, column: 32 },
                          end: { line: 20, column: 38 },
                        },
                        value: "tick",
                      },
                    ],
                    optional: false,
                  },
                  kind: "init",
                  computed: false,
                  method: false,
                  shorthand: false,
                },
                {
                  type: "Property",
                  loc: {
                    start: { line: 21, column: 8 },
                    end: { line: 21, column: 43 },
                  },
                  key: {
                    type: "Identifier",
                    loc: {
                      start: { line: 21, column: 8 },
                      end: { line: 21, column: 18 },
                    },
                    name: "startsWith",
                  },
                  value: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 21, column: 20 },
                      end: { line: 21, column: 43 },
                    },
                    callee: {
                      type: "MemberExpression",
                      loc: {
                        start: { line: 21, column: 20 },
                        end: { line: 21, column: 35 },
                      },
                      object: {
                        type: "Identifier",
                        loc: {
                          start: { line: 21, column: 20 },
                          end: { line: 21, column: 24 },
                        },
                        name: "word",
                        key: "word$s2q4937fji9l$1",
                      },
                      property: {
                        type: "Identifier",
                        loc: {
                          start: { line: 21, column: 25 },
                          end: { line: 21, column: 35 },
                        },
                        name: "startsWith",
                      },
                      computed: false,
                      optional: false,
                    },
                    arguments: [
                      {
                        type: "Literal",
                        loc: {
                          start: { line: 21, column: 36 },
                          end: { line: 21, column: 42 },
                        },
                        value: "back",
                      },
                    ],
                    optional: false,
                  },
                  kind: "init",
                  computed: false,
                  method: false,
                  shorthand: false,
                },
                {
                  type: "Property",
                  loc: {
                    start: { line: 22, column: 8 },
                    end: { line: 22, column: 42 },
                  },
                  key: {
                    type: "Identifier",
                    loc: {
                      start: { line: 22, column: 8 },
                      end: { line: 22, column: 16 },
                    },
                    name: "endsWith",
                  },
                  value: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 22, column: 18 },
                      end: { line: 22, column: 42 },
                    },
                    callee: {
                      type: "MemberExpression",
                      loc: {
                        start: { line: 22, column: 18 },
                        end: { line: 22, column: 31 },
                      },
                      object: {
                        type: "Identifier",
                        loc: {
                          start: { line: 22, column: 18 },
                          end: { line: 22, column: 22 },
                        },
                        name: "word",
                        key: "word$s2q4937fji9l$1",
                      },
                      property: {
                        type: "Identifier",
                        loc: {
                          start: { line: 22, column: 23 },
                          end: { line: 22, column: 31 },
                        },
                        name: "endsWith",
                      },
                      computed: false,
                      optional: false,
                    },
                    arguments: [
                      {
                        type: "Literal",
                        loc: {
                          start: { line: 22, column: 32 },
                          end: { line: 22, column: 38 },
                        },
                        value: "tick",
                      },
                      {
                        type: "Literal",
                        loc: {
                          start: { line: 22, column: 40 },
                          end: { line: 22, column: 41 },
                        },
                        value: 4,
                      },
                    ],
                    optional: false,
                  },
                  kind: "init",
                  computed: false,
                  method: false,
                  shorthand: false,
                },
                {
                  type: "Property",
                  loc: {
                    start: { line: 23, column: 8 },
                    end: { line: 23, column: 32 },
                  },
                  key: {
                    type: "Identifier",
                    loc: {
                      start: { line: 23, column: 8 },
                      end: { line: 23, column: 16 },
                    },
                    name: "repeated",
                  },
                  value: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 23, column: 18 },
                      end: { line: 23, column: 32 },
                    },
                    callee: {
                      type: "MemberExpression",
                      loc: {
                        start: { line: 23, column: 18 },
                        end: { line: 23, column: 29 },
                      },
                      object: {
                        type: "Literal",
                        loc: {
                          start: { line: 23, column: 18 },
                          end: { line: 23, column: 22 },
                        },
                        value: "ab",
                      },
                      property: {
                        type: "Identifier",
                        loc: {
                          start: { line: 23, column: 23 },
                          end: { line: 23, column: 29 },
                        },
                        name: "repeat",
                      },
                      computed: false,
                      optional: false,
                    },
                    arguments: [
                      {
                        type: "Literal",
                        loc: {
                          start: { line: 23, column: 30 },
                          end: { line: 23, column: 31 },
                        },
                        value: 3,
                      },
                    ],
                    optional: false,
                  },
                  kind: "init",
                  computed: false,
                  method: false,
                  shorthand: false,
                },
                {
                  type: "Property",
                  loc: {
                    start: { line: 24, column: 8 },
                    end: { line: 24, column: 45 },
                  },
                  key: {
                    type: "Identifier",
                    loc: {
                      start: { line: 24, column: 8 },
                      end: { line: 24, column: 17 },
                    },
                    name: "codePoint",
                  },
                  value: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 24, column: 19 },
                      end: { line: 24, column: 45 },
                    },
                    callee: {
                      type: "MemberExpression",
                      loc: {
                        start: { line: 24, column: 19 },
                        end: { line: 24, column: 42 },
                      },
                      object: {
                        type: "Literal",
                        loc: {
                          start: { line: 24, column: 19 },
                          end: { line: 24, column: 30 },
                        },
                        value: "\uD83D\uDE00",
                      },
                      property: {
                        type: "Identifier",
                        loc: {
                          start: { line: 24, column: 31 },
                          end: { line: 24, column: 42 },
                        },
                        name: "codePointAt",
                      },
                      computed: false,
                      optional: false,
                    },
                    arguments: [
                      {
                        type: "Literal",
                        loc: {
                          start: { line: 24, column: 43 },
                          end: { line: 24, column: 44 },
                        },
                        value: 0,
                      },
                    ],
                    optional: false,
                  },
                  kind: "init",
                  computed: false,
                  method: false,
                  shorthand: false,
                },
                {
                  type: "Property",
                  loc: {
                    start: { line: 25, column: 8 },
                    end: { line: 25, column: 41 },
                  },
                  key: {
                    type: "Identifier",
                    loc: {
                      start: { line: 25, column: 8 },
                      end: { line: 25, column: 12 },
                    },
                    name: "keys",
                  },
                  value: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 25, column: 14 },
                      end: { line: 25, column: 41 },
                    },
                    callee: {
                      type: "MemberExpression",
                      loc: {
                        start: { line: 25, column: 14 },
                        end: { line: 25, column: 25 },
                      },
                      object: {
                        type: "Identifier",
                        loc: {
                          start: { line: 25, column: 14 },
                          end: { line: 25, column: 20 },
                        },
                        name: "Object",
                      },
                      property: {
                        type: "Identifier",
                        loc: {
                          start: { line: 25, column: 21 },
                          end: { line: 25, column: 25 },
                        },
                        name: "keys",
                      },
                      computed: false,
                      optional: false,
                    },
                    arguments: [
                      {
                        type: "ObjectExpression",
                        loc: {
                          start: { line: 25, column: 26 },
                          end: { line: 25, column: 40 },
                        },
                        properties: [
                          {
                            type: "Property",
                            loc: {
                              start: { line: 25, column: 28 },
                              end: { line: 25, column: 32 },
                            },
                            key: {
                              type: "Identifier",
                              loc: {
                                start: { line: 25, column: 28 },
                                end: { line: 25, column: 29 },
                              },
                              name: "a",
                            },
                            value: {
                              type: "Literal",
                              loc: {
                                start: { line: 25, column: 31 },
                                end: { line: 25, column: 32 },
                              },
                              value: 1,
                            },
                            kind: "init",
                            computed: false,
                            method: false,
                            shorthand: false,
                          },
                          {
                            type: "Property",
                            loc: {
                              start: { line: 25, column: 34 },
                              end: { line: 25, column: 38 },
                            },
                            key: {
                              type: "Identifier",
                              loc: {
                                start: { line: 25, column: 34 },
                                end: { line: 25, column: 35 },
                              },
                              name: "b",
                            },
                            value: {
                              type: "Literal",
                              loc: {
                                start: { line: 25, column: 37 },
                                end: { line: 25, column: 38 },
                              },
                              value: 2,
                            },
                            kind: "init",
                            computed: false,
                            method: false,
                            shorthand: false,
                          },
                        ],
                      },
                    ],
                    optional: false,
                  },
                  kind: "init",
                  computed: false,
                  method: false,
                  shorthand: false,
                },
              ],
            },
          },
        ],
      }),
      {
        code: 'export default () => {\n    const xs = [3, 8, 12, 5];\n    const word = "backtick";\n    return {\n        found: xs.find((x) => x > 7),\n        missing: xs.find((x) => x > 100) === undefined,\n        at: xs.findIndex((x) => x > 7),\n        nowhere: xs.findIndex((x) => x > 100),\n        includes: word.includes("tick"),\n        startsWith: word.startsWith("back"),\n        endsWith: word.endsWith("tick", 4),\n        repeated: "ab".repeat(3),\n        codePoint: "\\u{1F600}".codePointAt(0),\n        keys: Object.keys({ a: 1, b: 2 }),\n    };\n};',
        map: '{"version":3,"file":"stdlib-es2015.test.jsx","sourceRoot":"","sources":["stdlib-es2015.test.tsx"],"names":[],"mappings":"eAWO;IACD,MAAM,EAAE,GAAG,CAAC,CAAC,EAAE,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC,CAAC;IACzB,MAAM,IAAI,GAAG,UAAU,CAAC;IACxB,OAAO;QACL,KAAK,EAAE,EAAE,CAAC,IAAI,CAAC,CAAC,CAAC,EAAE,EAAE,CAAC,CAAC,GAAG,CAAC,CAAC;QAC5B,OAAO,EAAE,EAAE,CAAC,IAAI,CAAC,CAAC,CAAC,EAAE,EAAE,CAAC,CAAC,GAAG,GAAG,CAAC,KAAK,SAAS;QAC9C,EAAE,EAAE,EAAE,CAAC,SAAS,CAAC,CAAC,CAAC,EAAE,EAAE,CAAC,CAAC,GAAG,CAAC,CAAC;QAC9B,OAAO,EAAE,EAAE,CAAC,SAAS,CAAC,CAAC,CAAC,EAAE,EAAE,CAAC,CAAC,GAAG,GAAG,CAAC;QACrC,QAAQ,EAAE,IAAI,CAAC,QAAQ,CAAC,MAAM,CAAC;QAC/B,UAAU,EAAE,IAAI,CAAC,UAAU,CAAC,MAAM,CAAC;QACnC,QAAQ,EAAE,IAAI,CAAC,QAAQ,CAAC,MAAM,EAAE,CAAC,CAAC;QAClC,QAAQ,EAAE,IAAI,CAAC,MAAM,CAAC,CAAC,CAAC;QACxB,SAAS,EAAE,WAAW,CAAC,WAAW,CAAC,CAAC,CAAC;QACrC,IAAI,EAAE,MAAM,CAAC,IAAI,CAAC,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC;KAClC,CAAC;AACJ,CAAC"}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
