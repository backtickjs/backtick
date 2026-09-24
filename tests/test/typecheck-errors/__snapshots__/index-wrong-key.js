import { cs } from "@backtickjs/core";
// TypeScript decides what may index a value: an array takes a number, and a
// plain object takes only a key its type names. `coins["0"]` passes, because
// TypeScript reads a numeric string literal as a numeric index.
const point = { x: 1, y: 2 };
export default cs.create(
  { start: { line: 8, column: 15 }, end: { line: 16, column: 2 } },
  {
    filePath: "typecheck-errors/index-wrong-key.test.tsx",
    fileHash: "2p3ed6wqsrdah",
    splices: { $point: { value: point, params: [] } },
    captures: [],
  },
  () => ({
    type: "ArrowFunctionExpression",
    loc: { start: { line: 8, column: 18 }, end: { line: 16, column: 1 } },
    params: [
      {
        type: "Identifier",
        loc: { start: { line: 8, column: 19 }, end: { line: 8, column: 23 } },
        name: "name",
        key: "name$2p3ed6wqsrdah$0",
      },
    ],
    body: {
      type: "BlockStatement",
      loc: { start: { line: 8, column: 36 }, end: { line: 16, column: 1 } },
      body: [
        {
          type: "VariableDeclaration",
          loc: { start: { line: 9, column: 2 }, end: { line: 9, column: 27 } },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 9, column: 8 },
                end: { line: 9, column: 26 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 9, column: 8 },
                  end: { line: 9, column: 13 },
                },
                name: "coins",
                key: "coins$2p3ed6wqsrdah$1",
              },
              init: {
                type: "ArrayExpression",
                loc: {
                  start: { line: 9, column: 16 },
                  end: { line: 9, column: 26 },
                },
                elements: [
                  {
                    type: "Literal",
                    loc: {
                      start: { line: 9, column: 17 },
                      end: { line: 9, column: 18 },
                    },
                    value: 5,
                  },
                  {
                    type: "Literal",
                    loc: {
                      start: { line: 9, column: 20 },
                      end: { line: 9, column: 22 },
                    },
                    value: 31,
                  },
                  {
                    type: "Literal",
                    loc: {
                      start: { line: 9, column: 24 },
                      end: { line: 9, column: 25 },
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
            start: { line: 10, column: 2 },
            end: { line: 10, column: 27 },
          },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 10, column: 8 },
                end: { line: 10, column: 26 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 10, column: 8 },
                  end: { line: 10, column: 13 },
                },
                name: "first",
                key: "first$2p3ed6wqsrdah$2",
              },
              init: {
                type: "MemberExpression",
                loc: {
                  start: { line: 10, column: 16 },
                  end: { line: 10, column: 26 },
                },
                object: {
                  type: "Identifier",
                  loc: {
                    start: { line: 10, column: 16 },
                    end: { line: 10, column: 21 },
                  },
                  name: "coins",
                  key: "coins$2p3ed6wqsrdah$1",
                },
                property: {
                  type: "Literal",
                  loc: {
                    start: { line: 10, column: 22 },
                    end: { line: 10, column: 25 },
                  },
                  value: "0",
                },
                computed: true,
                optional: false,
              },
            },
          ],
        },
        {
          type: "VariableDeclaration",
          loc: {
            start: { line: 12, column: 2 },
            end: { line: 12, column: 28 },
          },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 12, column: 8 },
                end: { line: 12, column: 27 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 12, column: 8 },
                  end: { line: 12, column: 13 },
                },
                name: "wrong",
                key: "wrong$2p3ed6wqsrdah$3",
              },
              init: {
                type: "MemberExpression",
                loc: {
                  start: { line: 12, column: 16 },
                  end: { line: 12, column: 27 },
                },
                object: {
                  type: "Identifier",
                  loc: {
                    start: { line: 12, column: 16 },
                    end: { line: 12, column: 21 },
                  },
                  name: "coins",
                  key: "coins$2p3ed6wqsrdah$1",
                },
                property: {
                  type: "Identifier",
                  loc: {
                    start: { line: 12, column: 22 },
                    end: { line: 12, column: 26 },
                  },
                  name: "name",
                  key: "name$2p3ed6wqsrdah$0",
                },
                computed: true,
                optional: false,
              },
            },
          ],
        },
        {
          type: "VariableDeclaration",
          loc: {
            start: { line: 14, column: 2 },
            end: { line: 14, column: 29 },
          },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 14, column: 8 },
                end: { line: 14, column: 28 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 14, column: 8 },
                  end: { line: 14, column: 13 },
                },
                name: "which",
                key: "which$2p3ed6wqsrdah$4",
              },
              init: {
                type: "MemberExpression",
                loc: {
                  start: { line: 14, column: 16 },
                  end: { line: 14, column: 28 },
                },
                object: {
                  type: "Splice",
                  loc: {
                    start: { line: 14, column: 16 },
                    end: { line: 14, column: 22 },
                  },
                  key: "$point",
                },
                property: {
                  type: "Identifier",
                  loc: {
                    start: { line: 14, column: 23 },
                    end: { line: 14, column: 27 },
                  },
                  name: "name",
                  key: "name$2p3ed6wqsrdah$0",
                },
                computed: true,
                optional: false,
              },
            },
          ],
        },
        {
          type: "ReturnStatement",
          loc: {
            start: { line: 15, column: 2 },
            end: { line: 15, column: 31 },
          },
          argument: {
            type: "BinaryExpression",
            loc: {
              start: { line: 15, column: 9 },
              end: { line: 15, column: 30 },
            },
            operator: "+",
            left: {
              type: "BinaryExpression",
              loc: {
                start: { line: 15, column: 9 },
                end: { line: 15, column: 22 },
              },
              operator: "+",
              left: {
                type: "Identifier",
                loc: {
                  start: { line: 15, column: 9 },
                  end: { line: 15, column: 14 },
                },
                name: "first",
                key: "first$2p3ed6wqsrdah$2",
              },
              right: {
                type: "Identifier",
                loc: {
                  start: { line: 15, column: 17 },
                  end: { line: 15, column: 22 },
                },
                name: "wrong",
                key: "wrong$2p3ed6wqsrdah$3",
              },
            },
            right: {
              type: "Identifier",
              loc: {
                start: { line: 15, column: 25 },
                end: { line: 15, column: 30 },
              },
              name: "which",
              key: "which$2p3ed6wqsrdah$4",
            },
          },
        },
      ],
    },
    expression: false,
  }),
  '$0 => (name) => {\n    const coins = [5, 31, 7];\n    const first = coins["0"];\n    const wrong = coins[name];\n    const which = $0()[name];\n    return first + wrong + which;\n}',
  '{"version":3,"file":"index-wrong-key.test.jsx","sourceRoot":"","sources":["index-wrong-key.test.tsx"],"names":[],"mappings":"AAOkB,MAAA,CAAC,IAAY,EAAE,EAAE;IACjC,MAAM,KAAK,GAAG,CAAC,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC,CAAC;IACzB,MAAM,KAAK,GAAG,KAAK,CAAC,GAAG,CAAC,CAAC;IAEzB,MAAM,KAAK,GAAG,KAAK,CAAC,IAAI,CAAC,CAAC;IAE1B,MAAM,KAAK,GAAG,IAAM,CAAC,IAAI,CAAC,CAAC;IAC3B,OAAO,KAAK,GAAG,KAAK,GAAG,KAAK,CAAC;AAC/B,CAAC,CAAA"}',
);
