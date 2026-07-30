import { cs } from "@backtickjs/core";
// A key an object hasn't got reads as the language's one absent value. A
// record's member reads as `string | null` — a record says nothing about which
// keys it has — so this one is answered rather than assumed.
const table = { here: "yes" };
export default cs.create(
  [8, 16, 12, 3],
  {
    version: "0.0.0",
    filePath: "index-absent.ts",
    fileHash: "2bxuydarg0iof",
    kind: "value",
    splices: { $table: table },
    captures: [],
    spliceParams: { $table: [] },
  },
  () => ({
    kind: "AstScriptBlock",
    loc: [8, 19, 12, 2],
    statements: [
      {
        kind: "AstScriptVariableDeclaration",
        loc: [9, 3, 9, 33],
        name: {
          kind: "AstScriptIdentifier",
          loc: [9, 9, 9, 14],
          text: "names",
          bindingKey: "names$2bxuydarg0iof$0",
        },
        initializer: {
          kind: "AstScriptArrayLiteralExpression",
          loc: [9, 17, 9, 32],
          elements: [
            {
              kind: "AstScriptStringLiteral",
              loc: [9, 18, 9, 24],
              text: "zero",
            },
            {
              kind: "AstScriptStringLiteral",
              loc: [9, 26, 9, 31],
              text: "one",
            },
          ],
        },
        keyword: "const",
      },
      {
        kind: "AstScriptVariableDeclaration",
        loc: [10, 3, 10, 47],
        name: {
          kind: "AstScriptIdentifier",
          loc: [10, 9, 10, 16],
          text: "missing",
          bindingKey: "missing$2bxuydarg0iof$1",
        },
        initializer: {
          kind: "AstScriptBinaryExpression",
          loc: [10, 19, 10, 46],
          left: {
            kind: "AstScriptElementAccessExpression",
            loc: [10, 19, 10, 36],
            expression: {
              kind: "AstScriptSplice",
              loc: [10, 19, 10, 25],
              key: "$table",
            },
            argumentExpression: {
              kind: "AstScriptStringLiteral",
              loc: [10, 26, 10, 35],
              text: "nowhere",
            },
          },
          operatorToken: "??",
          right: {
            kind: "AstScriptStringLiteral",
            loc: [10, 40, 10, 46],
            text: "gone",
          },
        },
        keyword: "const",
      },
      {
        kind: "AstScriptReturnStatement",
        loc: [11, 3, 11, 35],
        expression: {
          kind: "AstScriptBinaryExpression",
          loc: [11, 10, 11, 34],
          left: {
            kind: "AstScriptBinaryExpression",
            loc: [11, 10, 11, 24],
            left: {
              kind: "AstScriptElementAccessExpression",
              loc: [11, 10, 11, 18],
              expression: {
                kind: "AstScriptIdentifier",
                loc: [11, 10, 11, 15],
                text: "names",
                bindingKey: "names$2bxuydarg0iof$0",
              },
              argumentExpression: {
                kind: "AstScriptNumericLiteral",
                loc: [11, 16, 11, 17],
                value: 1,
              },
            },
            operatorToken: "+",
            right: {
              kind: "AstScriptStringLiteral",
              loc: [11, 21, 11, 24],
              text: "/",
            },
          },
          operatorToken: "+",
          right: {
            kind: "AstScriptIdentifier",
            loc: [11, 27, 11, 34],
            text: "missing",
            bindingKey: "missing$2bxuydarg0iof$1",
          },
        },
      },
    ],
  }),
);
