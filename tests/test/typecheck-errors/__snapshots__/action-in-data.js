import { cs } from "@backtickjs/core";
// A container ships verbatim, so an action inside one has no place — the
// splice rejects it.
const action = cs.create(
  { start: { line: 5, column: 15 }, end: { line: 7, column: 2 } },
  {
    filePath: "typecheck-errors/action-in-data.test.tsx",
    fileHash: "23leqy4opwht7",
    splices: {},
    captures: [],
  },
  () => ({
    type: "BlockStatement",
    loc: { start: { line: 5, column: 18 }, end: { line: 7, column: 1 } },
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
              name: "x",
              key: "x$23leqy4opwht7$0",
            },
            init: {
              type: "Literal",
              loc: {
                start: { line: 6, column: 12 },
                end: { line: 6, column: 13 },
              },
              value: 1,
            },
          },
        ],
      },
    ],
  }),
  "() => {\n    const x = 1;\n}",
  '{"version":3,"file":"action-in-data.test.jsx","sourceRoot":"","sources":["action-in-data.test.tsx"],"names":[],"mappings":"AAIkB;IAChB,MAAM,CAAC,GAAG,CAAC,CAAC;AACd,CAAC,CAAA"}',
);
export const listed = cs.create(
  { start: { line: 9, column: 22 }, end: { line: 13, column: 2 } },
  {
    filePath: "typecheck-errors/action-in-data.test.tsx",
    fileHash: "23leqy4opwht7",
    splices: { $0splice0: { value: [action], params: [] } },
    captures: [],
  },
  () => ({
    type: "BlockStatement",
    loc: { start: { line: 9, column: 25 }, end: { line: 13, column: 1 } },
    body: [
      {
        type: "VariableDeclaration",
        loc: { start: { line: 11, column: 2 }, end: { line: 11, column: 27 } },
        kind: "const",
        declarations: [
          {
            type: "VariableDeclarator",
            loc: {
              start: { line: 11, column: 8 },
              end: { line: 11, column: 26 },
            },
            id: {
              type: "Identifier",
              loc: {
                start: { line: 11, column: 8 },
                end: { line: 11, column: 12 },
              },
              name: "list",
              key: "list$23leqy4opwht7$1",
            },
            init: {
              type: "Splice",
              loc: {
                start: { line: 11, column: 15 },
                end: { line: 11, column: 26 },
              },
              key: "$0splice0",
            },
          },
        ],
      },
      {
        type: "ReturnStatement",
        loc: { start: { line: 12, column: 2 }, end: { line: 12, column: 11 } },
        argument: {
          type: "Literal",
          loc: {
            start: { line: 12, column: 9 },
            end: { line: 12, column: 10 },
          },
          value: 1,
        },
      },
    ],
  }),
  "$0 => {\n    const list = $0();\n    return 1;\n}",
  '{"version":3,"file":"action-in-data.test.jsx","sourceRoot":"","sources":["action-in-data.test.tsx"],"names":[],"mappings":"AAQyB;IAEvB,MAAM,IAAI,GAAG,IAAC,CAAW;IACzB,OAAO,CAAC,CAAC;AACX,CAAC,CAAA"}',
);
export const keyed = cs.create(
  { start: { line: 15, column: 21 }, end: { line: 19, column: 2 } },
  {
    filePath: "typecheck-errors/action-in-data.test.tsx",
    fileHash: "23leqy4opwht7",
    splices: { $0splice0: { value: { press: action }, params: [] } },
    captures: [],
  },
  () => ({
    type: "BlockStatement",
    loc: { start: { line: 15, column: 24 }, end: { line: 19, column: 1 } },
    body: [
      {
        type: "VariableDeclaration",
        loc: { start: { line: 17, column: 2 }, end: { line: 17, column: 35 } },
        kind: "const",
        declarations: [
          {
            type: "VariableDeclarator",
            loc: {
              start: { line: 17, column: 8 },
              end: { line: 17, column: 34 },
            },
            id: {
              type: "Identifier",
              loc: {
                start: { line: 17, column: 8 },
                end: { line: 17, column: 11 },
              },
              name: "map",
              key: "map$23leqy4opwht7$2",
            },
            init: {
              type: "Splice",
              loc: {
                start: { line: 17, column: 14 },
                end: { line: 17, column: 34 },
              },
              key: "$0splice0",
            },
          },
        ],
      },
      {
        type: "ReturnStatement",
        loc: { start: { line: 18, column: 2 }, end: { line: 18, column: 11 } },
        argument: {
          type: "Literal",
          loc: {
            start: { line: 18, column: 9 },
            end: { line: 18, column: 10 },
          },
          value: 1,
        },
      },
    ],
  }),
  "$0 => {\n    const map = $0();\n    return 1;\n}",
  '{"version":3,"file":"action-in-data.test.jsx","sourceRoot":"","sources":["action-in-data.test.tsx"],"names":[],"mappings":"AAcwB;IAEtB,MAAM,GAAG,GAAG,IAAC,CAAoB;IACjC,OAAO,CAAC,CAAC;AACX,CAAC,CAAA"}',
);
