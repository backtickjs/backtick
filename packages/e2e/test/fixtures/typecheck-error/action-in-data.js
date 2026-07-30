import { cs } from "@backtickjs/core";
// A container ships verbatim, so an action inside one has no place — the
// splice rejects it.
const action = cs.create(
  [5, 16, 7, 3],
  {
    version: "0.0.0",
    filePath: "action-in-data.ts",
    fileHash: "1937kl3l6y7n7",
    kind: "action",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: "AstScriptBlock",
    loc: [5, 19, 7, 2],
    statements: [
      {
        kind: "AstScriptVariableDeclaration",
        loc: [6, 3, 6, 15],
        name: {
          kind: "AstScriptIdentifier",
          loc: [6, 9, 6, 10],
          text: "x",
          bindingKey: "x$1937kl3l6y7n7$0",
        },
        initializer: {
          kind: "AstScriptNumericLiteral",
          loc: [6, 13, 6, 14],
          value: 1,
        },
        keyword: "const",
      },
    ],
  }),
);
export const listed = cs.create(
  [9, 23, 12, 3],
  {
    version: "0.0.0",
    filePath: "action-in-data.ts",
    fileHash: "1937kl3l6y7n7",
    kind: "value",
    splices: { $0splice0: [action] },
    captures: [],
    spliceParams: { $0splice0: [] },
  },
  () => ({
    kind: "AstScriptBlock",
    loc: [9, 26, 12, 2],
    statements: [
      {
        kind: "AstScriptVariableDeclaration",
        loc: [10, 3, 10, 28],
        name: {
          kind: "AstScriptIdentifier",
          loc: [10, 9, 10, 13],
          text: "list",
          bindingKey: "list$1937kl3l6y7n7$1",
        },
        initializer: {
          kind: "AstScriptSplice",
          loc: [10, 16, 10, 27],
          key: "$0splice0",
        },
        keyword: "const",
      },
      {
        kind: "AstScriptReturnStatement",
        loc: [11, 3, 11, 12],
        expression: {
          kind: "AstScriptNumericLiteral",
          loc: [11, 10, 11, 11],
          value: 1,
        },
      },
    ],
  }),
);
export const keyed = cs.create(
  [14, 22, 17, 3],
  {
    version: "0.0.0",
    filePath: "action-in-data.ts",
    fileHash: "1937kl3l6y7n7",
    kind: "value",
    splices: { $0splice0: { press: action } },
    captures: [],
    spliceParams: { $0splice0: [] },
  },
  () => ({
    kind: "AstScriptBlock",
    loc: [14, 25, 17, 2],
    statements: [
      {
        kind: "AstScriptVariableDeclaration",
        loc: [15, 3, 15, 36],
        name: {
          kind: "AstScriptIdentifier",
          loc: [15, 9, 15, 12],
          text: "map",
          bindingKey: "map$1937kl3l6y7n7$2",
        },
        initializer: {
          kind: "AstScriptSplice",
          loc: [15, 15, 15, 35],
          key: "$0splice0",
        },
        keyword: "const",
      },
      {
        kind: "AstScriptReturnStatement",
        loc: [16, 3, 16, 12],
        expression: {
          kind: "AstScriptNumericLiteral",
          loc: [16, 10, 16, 11],
          value: 1,
        },
      },
    ],
  }),
);
