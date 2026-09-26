import { cs } from "@backtickjs/core";
const stored = cs.create(
  "2ybl4zwhlhjta:13:15",
  { params: [] },
  () => ({
    type: "ArrowFunctionExpression",
    loc: { start: { line: 13, column: 18 }, end: { line: 16, column: 1 } },
    params: [
      {
        type: "Identifier",
        loc: { start: { line: 13, column: 19 }, end: { line: 13, column: 20 } },
        name: "x",
        key: "x$2ybl4zwhlhjta$0",
      },
    ],
    body: {
      type: "BlockStatement",
      loc: { start: { line: 13, column: 32 }, end: { line: 16, column: 1 } },
      body: [
        {
          type: "VariableDeclaration",
          loc: {
            start: { line: 14, column: 2 },
            end: { line: 14, column: 14 },
          },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 14, column: 8 },
                end: { line: 14, column: 13 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 14, column: 8 },
                  end: { line: 14, column: 9 },
                },
                name: "y",
                key: "y$2ybl4zwhlhjta$1",
              },
              init: {
                type: "Identifier",
                loc: {
                  start: { line: 14, column: 12 },
                  end: { line: 14, column: 13 },
                },
                name: "x",
                key: "x$2ybl4zwhlhjta$0",
              },
            },
          ],
        },
        {
          type: "ReturnStatement",
          loc: {
            start: { line: 15, column: 2 },
            end: { line: 15, column: 11 },
          },
          argument: {
            type: "Literal",
            loc: {
              start: { line: 15, column: 9 },
              end: { line: 15, column: 10 },
            },
            value: 1,
          },
        },
      ],
    },
    expression: false,
  }),
  {
    code: "export default () => (x) => {\n    const y = x;\n    return 1;\n};",
    map: '{"version":3,"file":"undefined-annotation.test.jsx","sourceRoot":"","sources":["undefined-annotation.test.tsx"],"names":[],"mappings":"eAYkB,MAAA,CAAC,CAAQ,EAAE,EAAE;IAC7B,MAAM,CAAC,GAAG,CAAC,CAAC;IACZ,OAAO,CAAC,CAAC;AACX,CAAC"}',
  },
);
const written = cs.create(
  "2ybl4zwhlhjta:18:16",
  { params: [] },
  () => ({
    type: "ArrowFunctionExpression",
    loc: { start: { line: 18, column: 19 }, end: { line: 23, column: 1 } },
    params: [
      {
        type: "Identifier",
        loc: { start: { line: 18, column: 20 }, end: { line: 18, column: 21 } },
        name: "x",
        key: "x$2ybl4zwhlhjta$2",
      },
    ],
    body: {
      type: "BlockStatement",
      loc: { start: { line: 18, column: 33 }, end: { line: 23, column: 1 } },
      body: [
        {
          type: "VariableDeclaration",
          loc: {
            start: { line: 19, column: 2 },
            end: { line: 19, column: 13 },
          },
          kind: "let",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 19, column: 6 },
                end: { line: 19, column: 12 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 19, column: 6 },
                  end: { line: 19, column: 7 },
                },
                name: "y",
                key: "y$2ybl4zwhlhjta$3",
              },
              init: {
                type: "Literal",
                loc: {
                  start: { line: 19, column: 10 },
                  end: { line: 19, column: 12 },
                },
                value: "",
              },
            },
          ],
        },
        {
          type: "ExpressionStatement",
          loc: { start: { line: 21, column: 2 }, end: { line: 21, column: 8 } },
          expression: {
            type: "AssignmentExpression",
            loc: {
              start: { line: 21, column: 2 },
              end: { line: 21, column: 7 },
            },
            operator: "=",
            left: {
              type: "Identifier",
              loc: {
                start: { line: 21, column: 2 },
                end: { line: 21, column: 3 },
              },
              name: "y",
              key: "y$2ybl4zwhlhjta$3",
            },
            right: {
              type: "Identifier",
              loc: {
                start: { line: 21, column: 6 },
                end: { line: 21, column: 7 },
              },
              name: "x",
              key: "x$2ybl4zwhlhjta$2",
            },
          },
        },
        {
          type: "ReturnStatement",
          loc: {
            start: { line: 22, column: 2 },
            end: { line: 22, column: 11 },
          },
          argument: {
            type: "Literal",
            loc: {
              start: { line: 22, column: 9 },
              end: { line: 22, column: 10 },
            },
            value: 1,
          },
        },
      ],
    },
    expression: false,
  }),
  {
    code: 'export default () => (x) => {\n    let y = "";\n    y = x;\n    return 1;\n};',
    map: '{"version":3,"file":"undefined-annotation.test.jsx","sourceRoot":"","sources":["undefined-annotation.test.tsx"],"names":[],"mappings":"eAiBmB,MAAA,CAAC,CAAQ,EAAE,EAAE;IAC9B,IAAI,CAAC,GAAG,EAAE,CAAC;IAEX,CAAC,GAAG,CAAC,CAAC;IACN,OAAO,CAAC,CAAC;AACX,CAAC"}',
  },
);
