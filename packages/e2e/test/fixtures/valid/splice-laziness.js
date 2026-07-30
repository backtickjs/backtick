import { cs } from "@backtickjs/core";
// A host helper reused with different splices makes its script polymorphic:
// the holes can't be inlined, so every call site passes its splice as a
// thunk and the body evaluates `$0()` at the hole. The thunk is what keeps
// the hole as lazy as an inlined splice: `guard(broken)(false)` never
// reaches its hole, so the broken fragment must never evaluate — passed
// eagerly (by value instead of by thunk) it would throw before `flag` was
// even tested.
function guard(fragment) {
  return cs.create(
    [11, 10, 16, 5],
    {
      version: "0.0.0",
      filePath: "splice-laziness.ts",
      fileHash: "23k9adtpaouck",
      kind: "value",
      splices: { $fragment: fragment },
      captures: [],
      spliceParams: { $fragment: [] },
    },
    () => ({
      kind: "AstScriptArrowFunction",
      loc: [11, 13, 16, 4],
      parameters: [
        {
          kind: "AstScriptParameterDeclaration",
          loc: [11, 14, 11, 27],
          name: {
            kind: "AstScriptIdentifier",
            loc: [11, 14, 11, 18],
            text: "flag",
            bindingKey: "flag$23k9adtpaouck$0",
          },
        },
      ],
      body: {
        kind: "AstScriptBlock",
        loc: [11, 32, 16, 4],
        statements: [
          {
            kind: "AstScriptIfStatement",
            loc: [12, 5, 14, 6],
            expression: {
              kind: "AstScriptIdentifier",
              loc: [12, 9, 12, 13],
              text: "flag",
              bindingKey: "flag$23k9adtpaouck$0",
            },
            thenStatement: {
              kind: "AstScriptBlock",
              loc: [12, 15, 14, 6],
              statements: [
                {
                  kind: "AstScriptReturnStatement",
                  loc: [13, 7, 13, 24],
                  expression: {
                    kind: "AstScriptSplice",
                    loc: [13, 14, 13, 23],
                    key: "$fragment",
                  },
                },
              ],
            },
            elseStatement: null,
          },
          {
            kind: "AstScriptReturnStatement",
            loc: [15, 5, 15, 22],
            expression: {
              kind: "AstScriptStringLiteral",
              loc: [15, 12, 15, 21],
              text: "skipped",
            },
          },
        ],
      },
    }),
  );
}
const ok = cs.create(
  [19, 12, 19, 27],
  {
    version: "0.0.0",
    filePath: "splice-laziness.ts",
    fileHash: "23k9adtpaouck",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: "AstScriptStringLiteral",
    loc: [19, 15, 19, 26],
    text: "evaluated",
  }),
);
const broken = cs.create(
  [20, 16, 22, 3],
  {
    version: "0.0.0",
    filePath: "splice-laziness.ts",
    fileHash: "23k9adtpaouck",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: "AstScriptBlock",
    loc: [20, 19, 22, 2],
    statements: [
      {
        kind: "AstScriptThrowStatement",
        loc: [21, 3, 21, 52],
        expression: {
          kind: "AstScriptStringLiteral",
          loc: [21, 9, 21, 51],
          text: "the guarded fragment must never evaluate",
        },
      },
    ],
  }),
);
export default cs.create(
  [24, 16, 27, 4],
  {
    version: "0.0.0",
    filePath: "splice-laziness.ts",
    fileHash: "23k9adtpaouck",
    kind: "value",
    splices: { $0splice0: guard(ok), $0splice1: guard(broken) },
    captures: [],
    spliceParams: { $0splice0: [], $0splice1: [] },
  },
  () => ({
    kind: "AstScriptObjectLiteralExpression",
    loc: [24, 20, 27, 2],
    properties: [
      {
        kind: "AstScriptPropertyAssignment",
        loc: [25, 3, 25, 28],
        name: "taken",
        initializer: {
          kind: "AstScriptCallExpression",
          loc: [25, 10, 25, 28],
          expression: {
            kind: "AstScriptSplice",
            loc: [25, 10, 25, 22],
            key: "$0splice0",
          },
          questionDotToken: false,
          arguments: [
            {
              kind: "AstScriptTrueLiteral",
              loc: [25, 23, 25, 27],
            },
          ],
        },
      },
      {
        kind: "AstScriptPropertyAssignment",
        loc: [26, 3, 26, 35],
        name: "skipped",
        initializer: {
          kind: "AstScriptCallExpression",
          loc: [26, 12, 26, 35],
          expression: {
            kind: "AstScriptSplice",
            loc: [26, 12, 26, 28],
            key: "$0splice1",
          },
          questionDotToken: false,
          arguments: [
            {
              kind: "AstScriptFalseLiteral",
              loc: [26, 29, 26, 34],
            },
          ],
        },
      },
    ],
  }),
);
