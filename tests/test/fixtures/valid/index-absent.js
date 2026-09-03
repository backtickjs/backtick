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
    splices: { $table: { value: table, params: [] } },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [8, 19, 12, 2],
    statements: [
      {
        kind: "const",
        loc: [9, 3, 9, 33],
        name: {
          kind: "id",
          loc: [9, 9, 9, 14],
          text: "names",
          bindingKey: "names$2bxuydarg0iof$0",
        },
        initializer: {
          kind: "arr",
          loc: [9, 17, 9, 32],
          elements: [
            {
              kind: "string",
              loc: [9, 18, 9, 24],
              text: "zero",
            },
            {
              kind: "string",
              loc: [9, 26, 9, 31],
              text: "one",
            },
          ],
        },
      },
      {
        kind: "const",
        loc: [10, 3, 10, 47],
        name: {
          kind: "id",
          loc: [10, 9, 10, 16],
          text: "missing",
          bindingKey: "missing$2bxuydarg0iof$1",
        },
        initializer: {
          kind: "binop",
          loc: [10, 19, 10, 46],
          left: {
            kind: "[]",
            loc: [10, 19, 10, 36],
            expression: {
              kind: "splice",
              loc: [10, 19, 10, 25],
              key: "$table",
            },
            argumentExpression: {
              kind: "string",
              loc: [10, 26, 10, 35],
              text: "nowhere",
            },
          },
          operatorToken: "??",
          right: {
            kind: "string",
            loc: [10, 40, 10, 46],
            text: "gone",
          },
        },
      },
      {
        kind: "return",
        loc: [11, 3, 11, 35],
        expression: {
          kind: "binop",
          loc: [11, 10, 11, 34],
          left: {
            kind: "binop",
            loc: [11, 10, 11, 24],
            left: {
              kind: "[]",
              loc: [11, 10, 11, 18],
              expression: {
                kind: "id",
                loc: [11, 10, 11, 15],
                text: "names",
                bindingKey: "names$2bxuydarg0iof$0",
              },
              argumentExpression: {
                kind: "number",
                loc: [11, 16, 11, 17],
                value: 1,
              },
            },
            operatorToken: "+",
            right: {
              kind: "string",
              loc: [11, 21, 11, 24],
              text: "/",
            },
          },
          operatorToken: "+",
          right: {
            kind: "id",
            loc: [11, 27, 11, 34],
            text: "missing",
            bindingKey: "missing$2bxuydarg0iof$1",
          },
        },
      },
    ],
  }),
);
