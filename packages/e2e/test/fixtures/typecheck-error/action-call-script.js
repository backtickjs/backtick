import { cs } from "@backtickjs/core";
// An expression-form script is a value script — a bare splice included: an
// effectful call belongs in an action block, cs`{ $ping(); }`, and an
// action composes as cs`{ $action; }`, never as the expression itself.
const ping = cs.create(
  [6, 14, 8, 3],
  {
    version: "0.0.0",
    filePath: "action-call-script.ts",
    fileHash: "17wdcvct95tpn",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: "AstScriptArrowFunction",
    loc: [6, 17, 8, 2],
    parameters: [],
    body: {
      kind: "AstScriptBlock",
      loc: [6, 23, 8, 2],
      statements: [
        {
          kind: "AstScriptVariableDeclaration",
          loc: [7, 3, 7, 15],
          name: {
            kind: "AstScriptIdentifier",
            loc: [7, 9, 7, 10],
            text: "x",
            bindingKey: "x$17wdcvct95tpn$0",
          },
          initializer: {
            kind: "AstScriptNumericLiteral",
            loc: [7, 13, 7, 14],
            value: 1,
          },
          keyword: "const",
        },
      ],
    },
  }),
);
export const called = cs.create(
  [10, 23, 10, 34],
  {
    version: "0.0.0",
    filePath: "action-call-script.ts",
    fileHash: "17wdcvct95tpn",
    kind: "value",
    splices: { $ping: ping },
    captures: [],
    spliceParams: { $ping: [] },
  },
  () => ({
    kind: "AstScriptCallExpression",
    loc: [10, 26, 10, 33],
    expression: {
      kind: "AstScriptSplice",
      loc: [10, 26, 10, 31],
      key: "$ping",
    },
    questionDotToken: false,
    arguments: [],
  }),
);
const action = cs.create(
  [12, 16, 14, 3],
  {
    version: "0.0.0",
    filePath: "action-call-script.ts",
    fileHash: "17wdcvct95tpn",
    kind: "action",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: "AstScriptBlock",
    loc: [12, 19, 14, 2],
    statements: [
      {
        kind: "AstScriptVariableDeclaration",
        loc: [13, 3, 13, 15],
        name: {
          kind: "AstScriptIdentifier",
          loc: [13, 9, 13, 10],
          text: "x",
          bindingKey: "x$17wdcvct95tpn$1",
        },
        initializer: {
          kind: "AstScriptNumericLiteral",
          loc: [13, 13, 13, 14],
          value: 1,
        },
        keyword: "const",
      },
    ],
  }),
);
export const spliced = cs.create(
  [16, 24, 16, 35],
  {
    version: "0.0.0",
    filePath: "action-call-script.ts",
    fileHash: "17wdcvct95tpn",
    kind: "value",
    splices: { $action: action },
    captures: [],
    spliceParams: { $action: [] },
  },
  () => ({
    kind: "AstScriptSplice",
    loc: [16, 27, 16, 34],
    key: "$action",
  }),
);
