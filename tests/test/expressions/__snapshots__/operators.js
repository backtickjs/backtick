import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// Every JavaScript operator, answering what JavaScript answers.
it("binaryOperators", async (t) => {
  await snapshotCase(
    t,
    "binaryOperators",
    cs.create(
      "3g7ol1xnrqdpp:10:4",
      { params: [] },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 10, column: 7 }, end: { line: 25, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 11, column: 6 },
              end: { line: 11, column: 18 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 11, column: 12 },
                  end: { line: 11, column: 17 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 11, column: 12 },
                    end: { line: 11, column: 13 },
                  },
                  name: "n",
                  key: "n$3g7ol1xnrqdpp$0",
                },
                init: {
                  type: "Literal",
                  loc: {
                    start: { line: 11, column: 16 },
                    end: { line: 11, column: 17 },
                  },
                  value: 5,
                },
              },
            ],
          },
          {
            type: "ReturnStatement",
            loc: {
              start: { line: 12, column: 6 },
              end: { line: 24, column: 8 },
            },
            argument: {
              type: "ArrayExpression",
              loc: {
                start: { line: 12, column: 13 },
                end: { line: 24, column: 7 },
              },
              elements: [
                {
                  type: "BinaryExpression",
                  loc: {
                    start: { line: 13, column: 8 },
                    end: { line: 13, column: 14 },
                  },
                  operator: "**",
                  left: {
                    type: "Identifier",
                    loc: {
                      start: { line: 13, column: 8 },
                      end: { line: 13, column: 9 },
                    },
                    name: "n",
                    key: "n$3g7ol1xnrqdpp$0",
                  },
                  right: {
                    type: "Literal",
                    loc: {
                      start: { line: 13, column: 13 },
                      end: { line: 13, column: 14 },
                    },
                    value: 2,
                  },
                },
                {
                  type: "BinaryExpression",
                  loc: {
                    start: { line: 14, column: 8 },
                    end: { line: 14, column: 13 },
                  },
                  operator: "&",
                  left: {
                    type: "Identifier",
                    loc: {
                      start: { line: 14, column: 8 },
                      end: { line: 14, column: 9 },
                    },
                    name: "n",
                    key: "n$3g7ol1xnrqdpp$0",
                  },
                  right: {
                    type: "Literal",
                    loc: {
                      start: { line: 14, column: 12 },
                      end: { line: 14, column: 13 },
                    },
                    value: 6,
                  },
                },
                {
                  type: "BinaryExpression",
                  loc: {
                    start: { line: 15, column: 8 },
                    end: { line: 15, column: 13 },
                  },
                  operator: "|",
                  left: {
                    type: "Identifier",
                    loc: {
                      start: { line: 15, column: 8 },
                      end: { line: 15, column: 9 },
                    },
                    name: "n",
                    key: "n$3g7ol1xnrqdpp$0",
                  },
                  right: {
                    type: "Literal",
                    loc: {
                      start: { line: 15, column: 12 },
                      end: { line: 15, column: 13 },
                    },
                    value: 8,
                  },
                },
                {
                  type: "BinaryExpression",
                  loc: {
                    start: { line: 16, column: 8 },
                    end: { line: 16, column: 13 },
                  },
                  operator: "^",
                  left: {
                    type: "Identifier",
                    loc: {
                      start: { line: 16, column: 8 },
                      end: { line: 16, column: 9 },
                    },
                    name: "n",
                    key: "n$3g7ol1xnrqdpp$0",
                  },
                  right: {
                    type: "Literal",
                    loc: {
                      start: { line: 16, column: 12 },
                      end: { line: 16, column: 13 },
                    },
                    value: 1,
                  },
                },
                {
                  type: "BinaryExpression",
                  loc: {
                    start: { line: 17, column: 8 },
                    end: { line: 17, column: 14 },
                  },
                  operator: "<<",
                  left: {
                    type: "Identifier",
                    loc: {
                      start: { line: 17, column: 8 },
                      end: { line: 17, column: 9 },
                    },
                    name: "n",
                    key: "n$3g7ol1xnrqdpp$0",
                  },
                  right: {
                    type: "Literal",
                    loc: {
                      start: { line: 17, column: 13 },
                      end: { line: 17, column: 14 },
                    },
                    value: 2,
                  },
                },
                {
                  type: "BinaryExpression",
                  loc: {
                    start: { line: 18, column: 8 },
                    end: { line: 18, column: 15 },
                  },
                  operator: ">>",
                  left: {
                    type: "UnaryExpression",
                    loc: {
                      start: { line: 18, column: 8 },
                      end: { line: 18, column: 10 },
                    },
                    operator: "-",
                    prefix: true,
                    argument: {
                      type: "Identifier",
                      loc: {
                        start: { line: 18, column: 9 },
                        end: { line: 18, column: 10 },
                      },
                      name: "n",
                      key: "n$3g7ol1xnrqdpp$0",
                    },
                  },
                  right: {
                    type: "Literal",
                    loc: {
                      start: { line: 18, column: 14 },
                      end: { line: 18, column: 15 },
                    },
                    value: 1,
                  },
                },
                {
                  type: "BinaryExpression",
                  loc: {
                    start: { line: 19, column: 8 },
                    end: { line: 19, column: 17 },
                  },
                  operator: ">>>",
                  left: {
                    type: "UnaryExpression",
                    loc: {
                      start: { line: 19, column: 8 },
                      end: { line: 19, column: 10 },
                    },
                    operator: "-",
                    prefix: true,
                    argument: {
                      type: "Identifier",
                      loc: {
                        start: { line: 19, column: 9 },
                        end: { line: 19, column: 10 },
                      },
                      name: "n",
                      key: "n$3g7ol1xnrqdpp$0",
                    },
                  },
                  right: {
                    type: "Literal",
                    loc: {
                      start: { line: 19, column: 15 },
                      end: { line: 19, column: 17 },
                    },
                    value: 28,
                  },
                },
                {
                  type: "BinaryExpression",
                  loc: {
                    start: { line: 20, column: 8 },
                    end: { line: 20, column: 14 },
                  },
                  operator: "==",
                  left: {
                    type: "Identifier",
                    loc: {
                      start: { line: 20, column: 8 },
                      end: { line: 20, column: 9 },
                    },
                    name: "n",
                    key: "n$3g7ol1xnrqdpp$0",
                  },
                  right: {
                    type: "Literal",
                    loc: {
                      start: { line: 20, column: 13 },
                      end: { line: 20, column: 14 },
                    },
                    value: 5,
                  },
                },
                {
                  type: "BinaryExpression",
                  loc: {
                    start: { line: 21, column: 8 },
                    end: { line: 21, column: 14 },
                  },
                  operator: "!=",
                  left: {
                    type: "Identifier",
                    loc: {
                      start: { line: 21, column: 8 },
                      end: { line: 21, column: 9 },
                    },
                    name: "n",
                    key: "n$3g7ol1xnrqdpp$0",
                  },
                  right: {
                    type: "Literal",
                    loc: {
                      start: { line: 21, column: 13 },
                      end: { line: 21, column: 14 },
                    },
                    value: 5,
                  },
                },
                {
                  type: "BinaryExpression",
                  loc: {
                    start: { line: 22, column: 8 },
                    end: { line: 22, column: 23 },
                  },
                  operator: "in",
                  left: {
                    type: "Literal",
                    loc: {
                      start: { line: 22, column: 8 },
                      end: { line: 22, column: 16 },
                    },
                    value: "length",
                  },
                  right: {
                    type: "ArrayExpression",
                    loc: {
                      start: { line: 22, column: 20 },
                      end: { line: 22, column: 23 },
                    },
                    elements: [
                      {
                        type: "Identifier",
                        loc: {
                          start: { line: 22, column: 21 },
                          end: { line: 22, column: 22 },
                        },
                        name: "n",
                        key: "n$3g7ol1xnrqdpp$0",
                      },
                    ],
                  },
                },
                {
                  type: "BinaryExpression",
                  loc: {
                    start: { line: 23, column: 8 },
                    end: { line: 23, column: 28 },
                  },
                  operator: "instanceof",
                  left: {
                    type: "ArrayExpression",
                    loc: {
                      start: { line: 23, column: 8 },
                      end: { line: 23, column: 11 },
                    },
                    elements: [
                      {
                        type: "Identifier",
                        loc: {
                          start: { line: 23, column: 9 },
                          end: { line: 23, column: 10 },
                        },
                        name: "n",
                        key: "n$3g7ol1xnrqdpp$0",
                      },
                    ],
                  },
                  right: {
                    type: "Identifier",
                    loc: {
                      start: { line: 23, column: 23 },
                      end: { line: 23, column: 28 },
                    },
                    name: "Array",
                  },
                },
              ],
            },
          },
        ],
      }),
      {
        code: 'export default () => {\n    const n = 5;\n    return [\n        n ** 2,\n        n & 6,\n        n | 8,\n        n ^ 1,\n        n << 2,\n        -n >> 1,\n        -n >>> 28,\n        n == 5,\n        n != 5,\n        "length" in [n],\n        [n] instanceof Array,\n    ];\n};',
        map: '{"version":3,"file":"operators.test.jsx","sourceRoot":"","sources":["operators.test.tsx"],"names":[],"mappings":"eASO;IACD,MAAM,CAAC,GAAG,CAAC,CAAC;IACZ,OAAO;QACL,CAAC,IAAI,CAAC;QACN,CAAC,GAAG,CAAC;QACL,CAAC,GAAG,CAAC;QACL,CAAC,GAAG,CAAC;QACL,CAAC,IAAI,CAAC;QACN,CAAC,CAAC,IAAI,CAAC;QACP,CAAC,CAAC,KAAK,EAAE;QACT,CAAC,IAAI,CAAC;QACN,CAAC,IAAI,CAAC;QACN,QAAQ,IAAI,CAAC,CAAC,CAAC;QACf,CAAC,CAAC,CAAC,YAAY,KAAK;KACrB,CAAC;AACJ,CAAC"}',
      },
    ),
  );
});
it("unaryOperators", async (t) => {
  await snapshotCase(
    t,
    "unaryOperators",
    cs.create(
      "3g7ol1xnrqdpp:33:4",
      { params: [] },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 33, column: 7 }, end: { line: 38, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 34, column: 6 },
              end: { line: 34, column: 20 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 34, column: 12 },
                  end: { line: 34, column: 19 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 34, column: 12 },
                    end: { line: 34, column: 13 },
                  },
                  name: "s",
                  key: "s$3g7ol1xnrqdpp$1",
                },
                init: {
                  type: "Literal",
                  loc: {
                    start: { line: 34, column: 16 },
                    end: { line: 34, column: 19 },
                  },
                  value: "7",
                },
              },
            ],
          },
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 35, column: 6 },
              end: { line: 35, column: 58 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 35, column: 12 },
                  end: { line: 35, column: 57 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 35, column: 12 },
                    end: { line: 35, column: 13 },
                  },
                  name: "o",
                  key: "o$3g7ol1xnrqdpp$2",
                },
                init: {
                  type: "ObjectExpression",
                  loc: {
                    start: { line: 35, column: 43 },
                    end: { line: 35, column: 57 },
                  },
                  properties: [
                    {
                      type: "Property",
                      loc: {
                        start: { line: 35, column: 45 },
                        end: { line: 35, column: 49 },
                      },
                      key: {
                        type: "Identifier",
                        loc: {
                          start: { line: 35, column: 45 },
                          end: { line: 35, column: 46 },
                        },
                        name: "a",
                      },
                      value: {
                        type: "Literal",
                        loc: {
                          start: { line: 35, column: 48 },
                          end: { line: 35, column: 49 },
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
                        start: { line: 35, column: 51 },
                        end: { line: 35, column: 55 },
                      },
                      key: {
                        type: "Identifier",
                        loc: {
                          start: { line: 35, column: 51 },
                          end: { line: 35, column: 52 },
                        },
                        name: "b",
                      },
                      value: {
                        type: "Literal",
                        loc: {
                          start: { line: 35, column: 54 },
                          end: { line: 35, column: 55 },
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
              },
            ],
          },
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 36, column: 6 },
              end: { line: 36, column: 33 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 36, column: 12 },
                  end: { line: 36, column: 32 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 36, column: 12 },
                    end: { line: 36, column: 19 },
                  },
                  name: "deleted",
                  key: "deleted$3g7ol1xnrqdpp$3",
                },
                init: {
                  type: "UnaryExpression",
                  loc: {
                    start: { line: 36, column: 22 },
                    end: { line: 36, column: 32 },
                  },
                  operator: "delete",
                  prefix: true,
                  argument: {
                    type: "MemberExpression",
                    loc: {
                      start: { line: 36, column: 29 },
                      end: { line: 36, column: 32 },
                    },
                    object: {
                      type: "Identifier",
                      loc: {
                        start: { line: 36, column: 29 },
                        end: { line: 36, column: 30 },
                      },
                      name: "o",
                      key: "o$3g7ol1xnrqdpp$2",
                    },
                    property: {
                      type: "Identifier",
                      loc: {
                        start: { line: 36, column: 31 },
                        end: { line: 36, column: 32 },
                      },
                      name: "a",
                    },
                    computed: false,
                    optional: false,
                  },
                },
              },
            ],
          },
          {
            type: "ReturnStatement",
            loc: {
              start: { line: 37, column: 6 },
              end: { line: 37, column: 58 },
            },
            argument: {
              type: "ArrayExpression",
              loc: {
                start: { line: 37, column: 13 },
                end: { line: 37, column: 57 },
              },
              elements: [
                {
                  type: "UnaryExpression",
                  loc: {
                    start: { line: 37, column: 14 },
                    end: { line: 37, column: 16 },
                  },
                  operator: "+",
                  prefix: true,
                  argument: {
                    type: "Identifier",
                    loc: {
                      start: { line: 37, column: 15 },
                      end: { line: 37, column: 16 },
                    },
                    name: "s",
                    key: "s$3g7ol1xnrqdpp$1",
                  },
                },
                {
                  type: "UnaryExpression",
                  loc: {
                    start: { line: 37, column: 18 },
                    end: { line: 37, column: 20 },
                  },
                  operator: "~",
                  prefix: true,
                  argument: {
                    type: "Literal",
                    loc: {
                      start: { line: 37, column: 19 },
                      end: { line: 37, column: 20 },
                    },
                    value: 5,
                  },
                },
                {
                  type: "BinaryExpression",
                  loc: {
                    start: { line: 37, column: 22 },
                    end: { line: 37, column: 37 },
                  },
                  operator: "===",
                  left: {
                    type: "UnaryExpression",
                    loc: {
                      start: { line: 37, column: 22 },
                      end: { line: 37, column: 28 },
                    },
                    operator: "void",
                    prefix: true,
                    argument: {
                      type: "Identifier",
                      loc: {
                        start: { line: 37, column: 27 },
                        end: { line: 37, column: 28 },
                      },
                      name: "s",
                      key: "s$3g7ol1xnrqdpp$1",
                    },
                  },
                  right: {
                    type: "Literal",
                    loc: {
                      start: { line: 37, column: 33 },
                      end: { line: 37, column: 37 },
                    },
                    value: null,
                  },
                },
                {
                  type: "Identifier",
                  loc: {
                    start: { line: 37, column: 39 },
                    end: { line: 37, column: 46 },
                  },
                  name: "deleted",
                  key: "deleted$3g7ol1xnrqdpp$3",
                },
                {
                  type: "BinaryExpression",
                  loc: {
                    start: { line: 37, column: 48 },
                    end: { line: 37, column: 56 },
                  },
                  operator: "in",
                  left: {
                    type: "Literal",
                    loc: {
                      start: { line: 37, column: 48 },
                      end: { line: 37, column: 51 },
                    },
                    value: "a",
                  },
                  right: {
                    type: "Identifier",
                    loc: {
                      start: { line: 37, column: 55 },
                      end: { line: 37, column: 56 },
                    },
                    name: "o",
                    key: "o$3g7ol1xnrqdpp$2",
                  },
                },
              ],
            },
          },
        ],
      }),
      {
        code: 'export default () => {\n    const s = "7";\n    const o = { a: 1, b: 2 };\n    const deleted = delete o.a;\n    return [+s, ~5, void s === null, deleted, "a" in o];\n};',
        map: '{"version":3,"file":"operators.test.jsx","sourceRoot":"","sources":["operators.test.tsx"],"names":[],"mappings":"eAgCO;IACD,MAAM,CAAC,GAAG,GAAG,CAAC;IACd,MAAM,CAAC,GAA8B,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC;IACpD,MAAM,OAAO,GAAG,OAAO,CAAC,CAAC,CAAC,CAAC;IAC3B,OAAO,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,KAAK,CAAC,KAAK,IAAI,EAAE,OAAO,EAAE,GAAG,IAAI,CAAC,CAAC,CAAC;AACtD,CAAC"}',
      },
    ),
  );
});
it("assignmentOperators", async (t) => {
  await snapshotCase(
    t,
    "assignmentOperators",
    cs.create(
      "3g7ol1xnrqdpp:46:4",
      { params: [] },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 46, column: 7 }, end: { line: 62, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 47, column: 6 },
              end: { line: 47, column: 16 },
            },
            kind: "let",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 47, column: 10 },
                  end: { line: 47, column: 15 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 47, column: 10 },
                    end: { line: 47, column: 11 },
                  },
                  name: "n",
                  key: "n$3g7ol1xnrqdpp$4",
                },
                init: {
                  type: "Literal",
                  loc: {
                    start: { line: 47, column: 14 },
                    end: { line: 47, column: 15 },
                  },
                  value: 3,
                },
              },
            ],
          },
          {
            type: "ExpressionStatement",
            loc: {
              start: { line: 48, column: 6 },
              end: { line: 48, column: 14 },
            },
            expression: {
              type: "AssignmentExpression",
              loc: {
                start: { line: 48, column: 6 },
                end: { line: 48, column: 13 },
              },
              operator: "**=",
              left: {
                type: "Identifier",
                loc: {
                  start: { line: 48, column: 6 },
                  end: { line: 48, column: 7 },
                },
                name: "n",
                key: "n$3g7ol1xnrqdpp$4",
              },
              right: {
                type: "Literal",
                loc: {
                  start: { line: 48, column: 12 },
                  end: { line: 48, column: 13 },
                },
                value: 2,
              },
            },
          },
          {
            type: "ExpressionStatement",
            loc: {
              start: { line: 49, column: 6 },
              end: { line: 49, column: 14 },
            },
            expression: {
              type: "AssignmentExpression",
              loc: {
                start: { line: 49, column: 6 },
                end: { line: 49, column: 13 },
              },
              operator: "<<=",
              left: {
                type: "Identifier",
                loc: {
                  start: { line: 49, column: 6 },
                  end: { line: 49, column: 7 },
                },
                name: "n",
                key: "n$3g7ol1xnrqdpp$4",
              },
              right: {
                type: "Literal",
                loc: {
                  start: { line: 49, column: 12 },
                  end: { line: 49, column: 13 },
                },
                value: 1,
              },
            },
          },
          {
            type: "ExpressionStatement",
            loc: {
              start: { line: 50, column: 6 },
              end: { line: 50, column: 14 },
            },
            expression: {
              type: "AssignmentExpression",
              loc: {
                start: { line: 50, column: 6 },
                end: { line: 50, column: 13 },
              },
              operator: ">>=",
              left: {
                type: "Identifier",
                loc: {
                  start: { line: 50, column: 6 },
                  end: { line: 50, column: 7 },
                },
                name: "n",
                key: "n$3g7ol1xnrqdpp$4",
              },
              right: {
                type: "Literal",
                loc: {
                  start: { line: 50, column: 12 },
                  end: { line: 50, column: 13 },
                },
                value: 2,
              },
            },
          },
          {
            type: "ExpressionStatement",
            loc: {
              start: { line: 51, column: 6 },
              end: { line: 51, column: 15 },
            },
            expression: {
              type: "AssignmentExpression",
              loc: {
                start: { line: 51, column: 6 },
                end: { line: 51, column: 14 },
              },
              operator: ">>>=",
              left: {
                type: "Identifier",
                loc: {
                  start: { line: 51, column: 6 },
                  end: { line: 51, column: 7 },
                },
                name: "n",
                key: "n$3g7ol1xnrqdpp$4",
              },
              right: {
                type: "Literal",
                loc: {
                  start: { line: 51, column: 13 },
                  end: { line: 51, column: 14 },
                },
                value: 1,
              },
            },
          },
          {
            type: "ExpressionStatement",
            loc: {
              start: { line: 52, column: 6 },
              end: { line: 52, column: 13 },
            },
            expression: {
              type: "AssignmentExpression",
              loc: {
                start: { line: 52, column: 6 },
                end: { line: 52, column: 12 },
              },
              operator: "&=",
              left: {
                type: "Identifier",
                loc: {
                  start: { line: 52, column: 6 },
                  end: { line: 52, column: 7 },
                },
                name: "n",
                key: "n$3g7ol1xnrqdpp$4",
              },
              right: {
                type: "Literal",
                loc: {
                  start: { line: 52, column: 11 },
                  end: { line: 52, column: 12 },
                },
                value: 7,
              },
            },
          },
          {
            type: "ExpressionStatement",
            loc: {
              start: { line: 53, column: 6 },
              end: { line: 53, column: 13 },
            },
            expression: {
              type: "AssignmentExpression",
              loc: {
                start: { line: 53, column: 6 },
                end: { line: 53, column: 12 },
              },
              operator: "|=",
              left: {
                type: "Identifier",
                loc: {
                  start: { line: 53, column: 6 },
                  end: { line: 53, column: 7 },
                },
                name: "n",
                key: "n$3g7ol1xnrqdpp$4",
              },
              right: {
                type: "Literal",
                loc: {
                  start: { line: 53, column: 11 },
                  end: { line: 53, column: 12 },
                },
                value: 8,
              },
            },
          },
          {
            type: "ExpressionStatement",
            loc: {
              start: { line: 54, column: 6 },
              end: { line: 54, column: 13 },
            },
            expression: {
              type: "AssignmentExpression",
              loc: {
                start: { line: 54, column: 6 },
                end: { line: 54, column: 12 },
              },
              operator: "^=",
              left: {
                type: "Identifier",
                loc: {
                  start: { line: 54, column: 6 },
                  end: { line: 54, column: 7 },
                },
                name: "n",
                key: "n$3g7ol1xnrqdpp$4",
              },
              right: {
                type: "Literal",
                loc: {
                  start: { line: 54, column: 11 },
                  end: { line: 54, column: 12 },
                },
                value: 1,
              },
            },
          },
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 55, column: 6 },
              end: { line: 55, column: 34 },
            },
            kind: "let",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 55, column: 10 },
                  end: { line: 55, column: 33 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 55, column: 10 },
                    end: { line: 55, column: 11 },
                  },
                  name: "a",
                  key: "a$3g7ol1xnrqdpp$5",
                },
                init: {
                  type: "Literal",
                  loc: {
                    start: { line: 55, column: 29 },
                    end: { line: 55, column: 33 },
                  },
                  value: null,
                },
              },
            ],
          },
          {
            type: "ExpressionStatement",
            loc: {
              start: { line: 56, column: 6 },
              end: { line: 56, column: 14 },
            },
            expression: {
              type: "AssignmentExpression",
              loc: {
                start: { line: 56, column: 6 },
                end: { line: 56, column: 13 },
              },
              operator: "??=",
              left: {
                type: "Identifier",
                loc: {
                  start: { line: 56, column: 6 },
                  end: { line: 56, column: 7 },
                },
                name: "a",
                key: "a$3g7ol1xnrqdpp$5",
              },
              right: {
                type: "Literal",
                loc: {
                  start: { line: 56, column: 12 },
                  end: { line: 56, column: 13 },
                },
                value: 4,
              },
            },
          },
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 57, column: 6 },
              end: { line: 57, column: 20 },
            },
            kind: "let",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 57, column: 10 },
                  end: { line: 57, column: 19 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 57, column: 10 },
                    end: { line: 57, column: 11 },
                  },
                  name: "b",
                  key: "b$3g7ol1xnrqdpp$6",
                },
                init: {
                  type: "Literal",
                  loc: {
                    start: { line: 57, column: 14 },
                    end: { line: 57, column: 19 },
                  },
                  value: false,
                },
              },
            ],
          },
          {
            type: "ExpressionStatement",
            loc: {
              start: { line: 58, column: 6 },
              end: { line: 58, column: 17 },
            },
            expression: {
              type: "AssignmentExpression",
              loc: {
                start: { line: 58, column: 6 },
                end: { line: 58, column: 16 },
              },
              operator: "||=",
              left: {
                type: "Identifier",
                loc: {
                  start: { line: 58, column: 6 },
                  end: { line: 58, column: 7 },
                },
                name: "b",
                key: "b$3g7ol1xnrqdpp$6",
              },
              right: {
                type: "Literal",
                loc: {
                  start: { line: 58, column: 12 },
                  end: { line: 58, column: 16 },
                },
                value: true,
              },
            },
          },
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 59, column: 6 },
              end: { line: 59, column: 19 },
            },
            kind: "let",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 59, column: 10 },
                  end: { line: 59, column: 18 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 59, column: 10 },
                    end: { line: 59, column: 11 },
                  },
                  name: "c",
                  key: "c$3g7ol1xnrqdpp$7",
                },
                init: {
                  type: "Literal",
                  loc: {
                    start: { line: 59, column: 14 },
                    end: { line: 59, column: 18 },
                  },
                  value: true,
                },
              },
            ],
          },
          {
            type: "ExpressionStatement",
            loc: {
              start: { line: 60, column: 6 },
              end: { line: 60, column: 18 },
            },
            expression: {
              type: "AssignmentExpression",
              loc: {
                start: { line: 60, column: 6 },
                end: { line: 60, column: 17 },
              },
              operator: "&&=",
              left: {
                type: "Identifier",
                loc: {
                  start: { line: 60, column: 6 },
                  end: { line: 60, column: 7 },
                },
                name: "c",
                key: "c$3g7ol1xnrqdpp$7",
              },
              right: {
                type: "Literal",
                loc: {
                  start: { line: 60, column: 12 },
                  end: { line: 60, column: 17 },
                },
                value: false,
              },
            },
          },
          {
            type: "ReturnStatement",
            loc: {
              start: { line: 61, column: 6 },
              end: { line: 61, column: 26 },
            },
            argument: {
              type: "ArrayExpression",
              loc: {
                start: { line: 61, column: 13 },
                end: { line: 61, column: 25 },
              },
              elements: [
                {
                  type: "Identifier",
                  loc: {
                    start: { line: 61, column: 14 },
                    end: { line: 61, column: 15 },
                  },
                  name: "n",
                  key: "n$3g7ol1xnrqdpp$4",
                },
                {
                  type: "Identifier",
                  loc: {
                    start: { line: 61, column: 17 },
                    end: { line: 61, column: 18 },
                  },
                  name: "a",
                  key: "a$3g7ol1xnrqdpp$5",
                },
                {
                  type: "Identifier",
                  loc: {
                    start: { line: 61, column: 20 },
                    end: { line: 61, column: 21 },
                  },
                  name: "b",
                  key: "b$3g7ol1xnrqdpp$6",
                },
                {
                  type: "Identifier",
                  loc: {
                    start: { line: 61, column: 23 },
                    end: { line: 61, column: 24 },
                  },
                  name: "c",
                  key: "c$3g7ol1xnrqdpp$7",
                },
              ],
            },
          },
        ],
      }),
      {
        code: "export default () => {\n    let n = 3;\n    n **= 2;\n    n <<= 1;\n    n >>= 2;\n    n >>>= 1;\n    n &= 7;\n    n |= 8;\n    n ^= 1;\n    let a = null;\n    a ??= 4;\n    let b = false;\n    b ||= true;\n    let c = true;\n    c &&= false;\n    return [n, a, b, c];\n};",
        map: '{"version":3,"file":"operators.test.jsx","sourceRoot":"","sources":["operators.test.tsx"],"names":[],"mappings":"eA6CO;IACD,IAAI,CAAC,GAAG,CAAC,CAAC;IACV,CAAC,KAAK,CAAC,CAAC;IACR,CAAC,KAAK,CAAC,CAAC;IACR,CAAC,KAAK,CAAC,CAAC;IACR,CAAC,MAAM,CAAC,CAAC;IACT,CAAC,IAAI,CAAC,CAAC;IACP,CAAC,IAAI,CAAC,CAAC;IACP,CAAC,IAAI,CAAC,CAAC;IACP,IAAI,CAAC,GAAkB,IAAI,CAAC;IAC5B,CAAC,KAAK,CAAC,CAAC;IACR,IAAI,CAAC,GAAG,KAAK,CAAC;IACd,CAAC,KAAK,IAAI,CAAC;IACX,IAAI,CAAC,GAAG,IAAI,CAAC;IACb,CAAC,KAAK,KAAK,CAAC;IACZ,OAAO,CAAC,CAAC,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,CAAC;AACtB,CAAC"}',
      },
    ),
  );
});
// Anything a reference can name is a target: a variable, a member, an element.
it("assignmentTargets", async (t) => {
  await snapshotCase(
    t,
    "assignmentTargets",
    cs.create(
      "3g7ol1xnrqdpp:71:4",
      { params: [] },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 71, column: 7 }, end: { line: 80, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 72, column: 6 },
              end: { line: 72, column: 25 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 72, column: 12 },
                  end: { line: 72, column: 24 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 72, column: 12 },
                    end: { line: 72, column: 13 },
                  },
                  name: "o",
                  key: "o$3g7ol1xnrqdpp$8",
                },
                init: {
                  type: "ObjectExpression",
                  loc: {
                    start: { line: 72, column: 16 },
                    end: { line: 72, column: 24 },
                  },
                  properties: [
                    {
                      type: "Property",
                      loc: {
                        start: { line: 72, column: 18 },
                        end: { line: 72, column: 22 },
                      },
                      key: {
                        type: "Identifier",
                        loc: {
                          start: { line: 72, column: 18 },
                          end: { line: 72, column: 19 },
                        },
                        name: "n",
                      },
                      value: {
                        type: "Literal",
                        loc: {
                          start: { line: 72, column: 21 },
                          end: { line: 72, column: 22 },
                        },
                        value: 1,
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
          },
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 73, column: 6 },
              end: { line: 73, column: 26 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 73, column: 12 },
                  end: { line: 73, column: 25 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 73, column: 12 },
                    end: { line: 73, column: 16 },
                  },
                  name: "list",
                  key: "list$3g7ol1xnrqdpp$9",
                },
                init: {
                  type: "ArrayExpression",
                  loc: {
                    start: { line: 73, column: 19 },
                    end: { line: 73, column: 25 },
                  },
                  elements: [
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 73, column: 20 },
                        end: { line: 73, column: 21 },
                      },
                      value: 1,
                    },
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 73, column: 23 },
                        end: { line: 73, column: 24 },
                      },
                      value: 2,
                    },
                  ],
                },
              },
            ],
          },
          {
            type: "ExpressionStatement",
            loc: {
              start: { line: 74, column: 6 },
              end: { line: 74, column: 15 },
            },
            expression: {
              type: "AssignmentExpression",
              loc: {
                start: { line: 74, column: 6 },
                end: { line: 74, column: 14 },
              },
              operator: "+=",
              left: {
                type: "MemberExpression",
                loc: {
                  start: { line: 74, column: 6 },
                  end: { line: 74, column: 9 },
                },
                object: {
                  type: "Identifier",
                  loc: {
                    start: { line: 74, column: 6 },
                    end: { line: 74, column: 7 },
                  },
                  name: "o",
                  key: "o$3g7ol1xnrqdpp$8",
                },
                property: {
                  type: "Identifier",
                  loc: {
                    start: { line: 74, column: 8 },
                    end: { line: 74, column: 9 },
                  },
                  name: "n",
                },
                computed: false,
                optional: false,
              },
              right: {
                type: "Literal",
                loc: {
                  start: { line: 74, column: 13 },
                  end: { line: 74, column: 14 },
                },
                value: 1,
              },
            },
          },
          {
            type: "ExpressionStatement",
            loc: {
              start: { line: 75, column: 6 },
              end: { line: 75, column: 12 },
            },
            expression: {
              type: "UpdateExpression",
              loc: {
                start: { line: 75, column: 6 },
                end: { line: 75, column: 11 },
              },
              operator: "++",
              prefix: false,
              argument: {
                type: "MemberExpression",
                loc: {
                  start: { line: 75, column: 6 },
                  end: { line: 75, column: 9 },
                },
                object: {
                  type: "Identifier",
                  loc: {
                    start: { line: 75, column: 6 },
                    end: { line: 75, column: 7 },
                  },
                  name: "o",
                  key: "o$3g7ol1xnrqdpp$8",
                },
                property: {
                  type: "Identifier",
                  loc: {
                    start: { line: 75, column: 8 },
                    end: { line: 75, column: 9 },
                  },
                  name: "n",
                },
                computed: false,
                optional: false,
              },
            },
          },
          {
            type: "ExpressionStatement",
            loc: {
              start: { line: 76, column: 6 },
              end: { line: 76, column: 19 },
            },
            expression: {
              type: "AssignmentExpression",
              loc: {
                start: { line: 76, column: 6 },
                end: { line: 76, column: 18 },
              },
              operator: "=",
              left: {
                type: "MemberExpression",
                loc: {
                  start: { line: 76, column: 6 },
                  end: { line: 76, column: 13 },
                },
                object: {
                  type: "Identifier",
                  loc: {
                    start: { line: 76, column: 6 },
                    end: { line: 76, column: 10 },
                  },
                  name: "list",
                  key: "list$3g7ol1xnrqdpp$9",
                },
                property: {
                  type: "Literal",
                  loc: {
                    start: { line: 76, column: 11 },
                    end: { line: 76, column: 12 },
                  },
                  value: 0,
                },
                computed: true,
                optional: false,
              },
              right: {
                type: "Literal",
                loc: {
                  start: { line: 76, column: 16 },
                  end: { line: 76, column: 18 },
                },
                value: 10,
              },
            },
          },
          {
            type: "ExpressionStatement",
            loc: {
              start: { line: 77, column: 6 },
              end: { line: 77, column: 20 },
            },
            expression: {
              type: "AssignmentExpression",
              loc: {
                start: { line: 77, column: 6 },
                end: { line: 77, column: 19 },
              },
              operator: "**=",
              left: {
                type: "MemberExpression",
                loc: {
                  start: { line: 77, column: 6 },
                  end: { line: 77, column: 13 },
                },
                object: {
                  type: "Identifier",
                  loc: {
                    start: { line: 77, column: 6 },
                    end: { line: 77, column: 10 },
                  },
                  name: "list",
                  key: "list$3g7ol1xnrqdpp$9",
                },
                property: {
                  type: "Literal",
                  loc: {
                    start: { line: 77, column: 11 },
                    end: { line: 77, column: 12 },
                  },
                  value: 1,
                },
                computed: true,
                optional: false,
              },
              right: {
                type: "Literal",
                loc: {
                  start: { line: 77, column: 18 },
                  end: { line: 77, column: 19 },
                },
                value: 3,
              },
            },
          },
          {
            type: "ExpressionStatement",
            loc: {
              start: { line: 78, column: 6 },
              end: { line: 78, column: 16 },
            },
            expression: {
              type: "UpdateExpression",
              loc: {
                start: { line: 78, column: 6 },
                end: { line: 78, column: 15 },
              },
              operator: "--",
              prefix: true,
              argument: {
                type: "MemberExpression",
                loc: {
                  start: { line: 78, column: 8 },
                  end: { line: 78, column: 15 },
                },
                object: {
                  type: "Identifier",
                  loc: {
                    start: { line: 78, column: 8 },
                    end: { line: 78, column: 12 },
                  },
                  name: "list",
                  key: "list$3g7ol1xnrqdpp$9",
                },
                property: {
                  type: "Literal",
                  loc: {
                    start: { line: 78, column: 13 },
                    end: { line: 78, column: 14 },
                  },
                  value: 1,
                },
                computed: true,
                optional: false,
              },
            },
          },
          {
            type: "ReturnStatement",
            loc: {
              start: { line: 79, column: 6 },
              end: { line: 79, column: 25 },
            },
            argument: {
              type: "ArrayExpression",
              loc: {
                start: { line: 79, column: 13 },
                end: { line: 79, column: 24 },
              },
              elements: [
                {
                  type: "MemberExpression",
                  loc: {
                    start: { line: 79, column: 14 },
                    end: { line: 79, column: 17 },
                  },
                  object: {
                    type: "Identifier",
                    loc: {
                      start: { line: 79, column: 14 },
                      end: { line: 79, column: 15 },
                    },
                    name: "o",
                    key: "o$3g7ol1xnrqdpp$8",
                  },
                  property: {
                    type: "Identifier",
                    loc: {
                      start: { line: 79, column: 16 },
                      end: { line: 79, column: 17 },
                    },
                    name: "n",
                  },
                  computed: false,
                  optional: false,
                },
                {
                  type: "Identifier",
                  loc: {
                    start: { line: 79, column: 19 },
                    end: { line: 79, column: 23 },
                  },
                  name: "list",
                  key: "list$3g7ol1xnrqdpp$9",
                },
              ],
            },
          },
        ],
      }),
      {
        code: "export default () => {\n    const o = { n: 1 };\n    const list = [1, 2];\n    o.n += 1;\n    o.n++;\n    list[0] = 10;\n    list[1] **= 3;\n    --list[1];\n    return [o.n, list];\n};",
        map: '{"version":3,"file":"operators.test.jsx","sourceRoot":"","sources":["operators.test.tsx"],"names":[],"mappings":"eAsEO;IACD,MAAM,CAAC,GAAG,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC;IACnB,MAAM,IAAI,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC;IACpB,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC;IACT,CAAC,CAAC,CAAC,EAAE,CAAC;IACN,IAAI,CAAC,CAAC,CAAC,GAAG,EAAE,CAAC;IACb,IAAI,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC;IACd,EAAE,IAAI,CAAC,CAAC,CAAC,CAAC;IACV,OAAO,CAAC,CAAC,CAAC,CAAC,EAAE,IAAI,CAAC,CAAC;AACrB,CAAC"}',
      },
    ),
  );
});
// `,` evaluates both sides and answers the right one.
it("commaOperator", async (t) => {
  await snapshotCase(
    t,
    "commaOperator",
    cs.create(
      "3g7ol1xnrqdpp:89:4",
      { params: [] },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 89, column: 7 }, end: { line: 93, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 90, column: 6 },
              end: { line: 90, column: 16 },
            },
            kind: "let",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 90, column: 10 },
                  end: { line: 90, column: 15 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 90, column: 10 },
                    end: { line: 90, column: 11 },
                  },
                  name: "n",
                  key: "n$3g7ol1xnrqdpp$10",
                },
                init: {
                  type: "Literal",
                  loc: {
                    start: { line: 90, column: 14 },
                    end: { line: 90, column: 15 },
                  },
                  value: 0,
                },
              },
            ],
          },
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 91, column: 6 },
              end: { line: 91, column: 33 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 91, column: 12 },
                  end: { line: 91, column: 32 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 91, column: 12 },
                    end: { line: 91, column: 16 },
                  },
                  name: "last",
                  key: "last$3g7ol1xnrqdpp$11",
                },
                init: {
                  type: "SequenceExpression",
                  loc: {
                    start: { line: 91, column: 20 },
                    end: { line: 91, column: 31 },
                  },
                  expressions: [
                    {
                      type: "UpdateExpression",
                      loc: {
                        start: { line: 91, column: 20 },
                        end: { line: 91, column: 23 },
                      },
                      operator: "++",
                      prefix: false,
                      argument: {
                        type: "Identifier",
                        loc: {
                          start: { line: 91, column: 20 },
                          end: { line: 91, column: 21 },
                        },
                        name: "n",
                        key: "n$3g7ol1xnrqdpp$10",
                      },
                    },
                    {
                      type: "BinaryExpression",
                      loc: {
                        start: { line: 91, column: 25 },
                        end: { line: 91, column: 31 },
                      },
                      operator: "+",
                      left: {
                        type: "Identifier",
                        loc: {
                          start: { line: 91, column: 25 },
                          end: { line: 91, column: 26 },
                        },
                        name: "n",
                        key: "n$3g7ol1xnrqdpp$10",
                      },
                      right: {
                        type: "Literal",
                        loc: {
                          start: { line: 91, column: 29 },
                          end: { line: 91, column: 31 },
                        },
                        value: 10,
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
              start: { line: 92, column: 6 },
              end: { line: 92, column: 23 },
            },
            argument: {
              type: "ArrayExpression",
              loc: {
                start: { line: 92, column: 13 },
                end: { line: 92, column: 22 },
              },
              elements: [
                {
                  type: "Identifier",
                  loc: {
                    start: { line: 92, column: 14 },
                    end: { line: 92, column: 15 },
                  },
                  name: "n",
                  key: "n$3g7ol1xnrqdpp$10",
                },
                {
                  type: "Identifier",
                  loc: {
                    start: { line: 92, column: 17 },
                    end: { line: 92, column: 21 },
                  },
                  name: "last",
                  key: "last$3g7ol1xnrqdpp$11",
                },
              ],
            },
          },
        ],
      }),
      {
        code: "export default () => {\n    let n = 0;\n    const last = (n++, n + 10);\n    return [n, last];\n};",
        map: '{"version":3,"file":"operators.test.jsx","sourceRoot":"","sources":["operators.test.tsx"],"names":[],"mappings":"eAwFO;IACD,IAAI,CAAC,GAAG,CAAC,CAAC;IACV,MAAM,IAAI,GAAG,CAAC,CAAC,EAAE,EAAE,CAAC,GAAG,EAAE,CAAC,CAAC;IAC3B,OAAO,CAAC,CAAC,EAAE,IAAI,CAAC,CAAC;AACnB,CAAC"}',
      },
    ),
  );
});
