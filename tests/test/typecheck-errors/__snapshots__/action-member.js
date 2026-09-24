import { cs } from "@backtickjs/core";
// Typed code can't put an action in a container (see `Spliceable`), but an
// untyped caller can; the lowering backstop refuses to ship it.
const action = cs.create(
  { start: { line: 5, column: 15 }, end: { line: 7, column: 2 } },
  {
    version: "0.0.0",
    filePath: "typecheck-errors/action-member.test.tsx",
    fileHash: "wf1ni21eddai",
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
              bindingKey: "x$wf1ni21eddai$0",
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
);
export default cs.create(
  { start: { line: 9, column: 15 }, end: { line: 13, column: 2 } },
  {
    version: "0.0.0",
    filePath: "typecheck-errors/action-member.test.tsx",
    fileHash: "wf1ni21eddai",
    splices: { $0splice0: { value: [action], params: [] } },
    captures: [],
  },
  () => ({
    type: "BlockStatement",
    loc: { start: { line: 9, column: 18 }, end: { line: 13, column: 1 } },
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
              bindingKey: "list$wf1ni21eddai$1",
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
);
