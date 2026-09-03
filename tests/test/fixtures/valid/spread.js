import { cs } from "@backtickjs/core";
// `...xs` where an element goes: it has no value of its own, it contributes
// however many the array it spreads has. An empty one contributes nothing, a
// list may hold several, and what it spreads is an ordinary expression.
export default cs.create(
  [6, 16, 13, 3],
  {
    version: "0.0.0",
    filePath: "spread.ts",
    fileHash: "30rj5a18hyrfq",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [6, 19, 13, 2],
    statements: [
      {
        kind: "const",
        loc: [7, 3, 7, 24],
        name: {
          kind: "id",
          loc: [7, 9, 7, 14],
          text: "front",
          bindingKey: "front$30rj5a18hyrfq$0",
        },
        initializer: {
          kind: "arr",
          loc: [7, 17, 7, 23],
          elements: [
            {
              kind: "number",
              loc: [7, 18, 7, 19],
              value: 1,
            },
            {
              kind: "number",
              loc: [7, 21, 7, 22],
              value: 2,
            },
          ],
        },
      },
      {
        kind: "const",
        loc: [8, 3, 8, 20],
        name: {
          kind: "id",
          loc: [8, 9, 8, 13],
          text: "back",
          bindingKey: "back$30rj5a18hyrfq$1",
        },
        initializer: {
          kind: "arr",
          loc: [8, 16, 8, 19],
          elements: [
            {
              kind: "number",
              loc: [8, 17, 8, 18],
              value: 3,
            },
          ],
        },
      },
      {
        kind: "const",
        loc: [9, 3, 9, 19],
        name: {
          kind: "id",
          loc: [9, 9, 9, 13],
          text: "none",
          bindingKey: "none$30rj5a18hyrfq$2",
        },
        initializer: {
          kind: "arr",
          loc: [9, 16, 9, 18],
          elements: [],
        },
      },
      {
        kind: "const",
        loc: [10, 3, 10, 50],
        name: {
          kind: "id",
          loc: [10, 9, 10, 12],
          text: "all",
          bindingKey: "all$30rj5a18hyrfq$3",
        },
        initializer: {
          kind: "arr",
          loc: [10, 15, 10, 49],
          elements: [
            {
              kind: "number",
              loc: [10, 16, 10, 17],
              value: 0,
            },
            {
              kind: "...",
              loc: [10, 19, 10, 27],
              expression: {
                kind: "id",
                loc: [10, 22, 10, 27],
                text: "front",
                bindingKey: "front$30rj5a18hyrfq$0",
              },
            },
            {
              kind: "...",
              loc: [10, 29, 10, 36],
              expression: {
                kind: "id",
                loc: [10, 32, 10, 36],
                text: "none",
                bindingKey: "none$30rj5a18hyrfq$2",
              },
            },
            {
              kind: "...",
              loc: [10, 38, 10, 45],
              expression: {
                kind: "id",
                loc: [10, 41, 10, 45],
                text: "back",
                bindingKey: "back$30rj5a18hyrfq$1",
              },
            },
            {
              kind: "number",
              loc: [10, 47, 10, 48],
              value: 4,
            },
          ],
        },
      },
      {
        kind: "const",
        loc: [11, 3, 11, 34],
        name: {
          kind: "id",
          loc: [11, 9, 11, 14],
          text: "twice",
          bindingKey: "twice$30rj5a18hyrfq$4",
        },
        initializer: {
          kind: "arr",
          loc: [11, 17, 11, 33],
          elements: [
            {
              kind: "...",
              loc: [11, 18, 11, 24],
              expression: {
                kind: "id",
                loc: [11, 21, 11, 24],
                text: "all",
                bindingKey: "all$30rj5a18hyrfq$3",
              },
            },
            {
              kind: "...",
              loc: [11, 26, 11, 32],
              expression: {
                kind: "id",
                loc: [11, 29, 11, 32],
                text: "all",
                bindingKey: "all$30rj5a18hyrfq$3",
              },
            },
          ],
        },
      },
      {
        kind: "return",
        loc: [12, 3, 12, 45],
        expression: {
          kind: "binop",
          loc: [12, 10, 12, 44],
          left: {
            kind: "binop",
            loc: [12, 10, 12, 29],
            left: {
              kind: "()",
              loc: [12, 10, 12, 23],
              expression: {
                kind: ".",
                loc: [12, 10, 12, 18],
                expression: {
                  kind: "id",
                  loc: [12, 10, 12, 13],
                  text: "all",
                  bindingKey: "all$30rj5a18hyrfq$3",
                },
                name: "join",
              },
              arguments: [
                {
                  kind: "string",
                  loc: [12, 19, 12, 22],
                  text: ",",
                },
              ],
            },
            operatorToken: "+",
            right: {
              kind: "string",
              loc: [12, 26, 12, 29],
              text: "|",
            },
          },
          operatorToken: "+",
          right: {
            kind: ".",
            loc: [12, 32, 12, 44],
            expression: {
              kind: "id",
              loc: [12, 32, 12, 37],
              text: "twice",
              bindingKey: "twice$30rj5a18hyrfq$4",
            },
            name: "length",
          },
        },
      },
    ],
  }),
);
