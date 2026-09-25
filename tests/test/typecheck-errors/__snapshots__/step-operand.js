import { cs } from "@backtickjs/core";
// A step is checked as TypeScript checks one: a number, in a variable that
// isn't `const`.
export const constant = cs.create(
  "3iw6lzhko8e0n:5:24",
  { params: [] },
  () => ({
    type: "BlockStatement",
    loc: { start: { line: 5, column: 27 }, end: { line: 10, column: 1 } },
    body: [
      {
        type: "VariableDeclaration",
        loc: { start: { line: 6, column: 2 }, end: { line: 6, column: 14 } },
        kind: "const",
        declarations: [
          {
            type: "VariableDeclarator",
            loc: {
              start: { line: 6, column: 8 },
              end: { line: 6, column: 13 },
            },
            id: {
              type: "Identifier",
              loc: {
                start: { line: 6, column: 8 },
                end: { line: 6, column: 9 },
              },
              name: "i",
              key: "i$3iw6lzhko8e0n$0",
            },
            init: {
              type: "Literal",
              loc: {
                start: { line: 6, column: 12 },
                end: { line: 6, column: 13 },
              },
              value: 0,
            },
          },
        ],
      },
      {
        type: "ExpressionStatement",
        loc: { start: { line: 8, column: 2 }, end: { line: 8, column: 6 } },
        expression: {
          type: "UpdateExpression",
          loc: { start: { line: 8, column: 2 }, end: { line: 8, column: 5 } },
          operator: "++",
          prefix: false,
          argument: {
            type: "Identifier",
            loc: { start: { line: 8, column: 2 }, end: { line: 8, column: 3 } },
            name: "i",
            key: "i$3iw6lzhko8e0n$0",
          },
        },
      },
      {
        type: "ReturnStatement",
        loc: { start: { line: 9, column: 2 }, end: { line: 9, column: 11 } },
        argument: {
          type: "Identifier",
          loc: { start: { line: 9, column: 9 }, end: { line: 9, column: 10 } },
          name: "i",
          key: "i$3iw6lzhko8e0n$0",
        },
      },
    ],
  }),
  "export default () => {\n    const i = 0;\n    i++;\n    return i;\n};",
  '{"version":3,"file":"step-operand.test.jsx","sourceRoot":"","sources":["step-operand.test.tsx"],"names":[],"mappings":"eAI2B;IACzB,MAAM,CAAC,GAAG,CAAC,CAAC;IAEZ,CAAC,EAAE,CAAC;IACJ,OAAO,CAAC,CAAC;AACX,CAAC"}',
);
export const text = cs.create(
  "3iw6lzhko8e0n:12:20",
  { params: [] },
  () => ({
    type: "BlockStatement",
    loc: { start: { line: 12, column: 23 }, end: { line: 17, column: 1 } },
    body: [
      {
        type: "VariableDeclaration",
        loc: { start: { line: 13, column: 2 }, end: { line: 13, column: 14 } },
        kind: "let",
        declarations: [
          {
            type: "VariableDeclarator",
            loc: {
              start: { line: 13, column: 6 },
              end: { line: 13, column: 13 },
            },
            id: {
              type: "Identifier",
              loc: {
                start: { line: 13, column: 6 },
                end: { line: 13, column: 7 },
              },
              name: "s",
              key: "s$3iw6lzhko8e0n$1",
            },
            init: {
              type: "Literal",
              loc: {
                start: { line: 13, column: 10 },
                end: { line: 13, column: 13 },
              },
              value: "a",
            },
          },
        ],
      },
      {
        type: "ExpressionStatement",
        loc: { start: { line: 15, column: 2 }, end: { line: 15, column: 6 } },
        expression: {
          type: "UpdateExpression",
          loc: { start: { line: 15, column: 2 }, end: { line: 15, column: 5 } },
          operator: "++",
          prefix: false,
          argument: {
            type: "Identifier",
            loc: {
              start: { line: 15, column: 2 },
              end: { line: 15, column: 3 },
            },
            name: "s",
            key: "s$3iw6lzhko8e0n$1",
          },
        },
      },
      {
        type: "ReturnStatement",
        loc: { start: { line: 16, column: 2 }, end: { line: 16, column: 11 } },
        argument: {
          type: "Identifier",
          loc: {
            start: { line: 16, column: 9 },
            end: { line: 16, column: 10 },
          },
          name: "s",
          key: "s$3iw6lzhko8e0n$1",
        },
      },
    ],
  }),
  'export default () => {\n    let s = "a";\n    s++;\n    return s;\n};',
  '{"version":3,"file":"step-operand.test.jsx","sourceRoot":"","sources":["step-operand.test.tsx"],"names":[],"mappings":"eAWuB;IACrB,IAAI,CAAC,GAAG,GAAG,CAAC;IAEZ,CAAC,EAAE,CAAC;IACJ,OAAO,CAAC,CAAC;AACX,CAAC"}',
);
