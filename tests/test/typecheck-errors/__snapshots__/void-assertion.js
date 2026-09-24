import { cs } from "@backtickjs/core";
const one = 1;
// An assertion needs no check of its own: TypeScript already refuses to
// assert a value to `void`.
const asserted = cs.create(
  { start: { line: 7, column: 17 }, end: { line: 11, column: 2 } },
  {
    filePath: "typecheck-errors/void-assertion.test.tsx",
    fileHash: "3mgqg6v7h2mni",
    splices: { $one: { value: one, params: [] } },
    captures: [],
  },
  () => ({
    type: "BlockStatement",
    loc: { start: { line: 7, column: 20 }, end: { line: 11, column: 1 } },
    body: [
      {
        type: "VariableDeclaration",
        loc: { start: { line: 9, column: 2 }, end: { line: 9, column: 25 } },
        kind: "const",
        declarations: [
          {
            type: "VariableDeclarator",
            loc: {
              start: { line: 9, column: 8 },
              end: { line: 9, column: 24 },
            },
            id: {
              type: "Identifier",
              loc: {
                start: { line: 9, column: 8 },
                end: { line: 9, column: 9 },
              },
              name: "a",
              key: "a$3mgqg6v7h2mni$0",
            },
            init: {
              type: "Splice",
              loc: {
                start: { line: 9, column: 12 },
                end: { line: 9, column: 16 },
              },
              key: "$one",
            },
          },
        ],
      },
      {
        type: "ReturnStatement",
        loc: { start: { line: 10, column: 2 }, end: { line: 10, column: 16 } },
        argument: {
          type: "BinaryExpression",
          loc: {
            start: { line: 10, column: 9 },
            end: { line: 10, column: 15 },
          },
          operator: "+",
          left: {
            type: "Literal",
            loc: {
              start: { line: 10, column: 9 },
              end: { line: 10, column: 11 },
            },
            value: "",
          },
          right: {
            type: "Identifier",
            loc: {
              start: { line: 10, column: 14 },
              end: { line: 10, column: 15 },
            },
            name: "a",
            key: "a$3mgqg6v7h2mni$0",
          },
        },
      },
    ],
  }),
  '$0 => {\n    const a = $0();\n    return "" + a;\n}',
  '{"version":3,"file":"void-assertion.test.jsx","sourceRoot":"","sources":["void-assertion.test.tsx"],"names":[],"mappings":"AAMoB;IAElB,MAAM,CAAC,GAAG,IAAY,CAAC;IACvB,OAAO,EAAE,GAAG,CAAC,CAAC;AAChB,CAAC,CAAA"}',
);
