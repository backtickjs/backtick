import { cs } from "@backtickjs/core";
// Each turn of a `for` gets its own copy of the header binding, so the arrow
// built on the last turn reads 2 — the value that turn had — and not the 3 the
// loop stopped at.
const forPerTurnBinding = cs.create(
  [6, 27, 12, 3],
  {
    version: "0.0.0",
    filePath: "forPerTurnBinding.tsx",
    fileHash: "34303ze2oq14p",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [6, 30, 12, 2],
    statements: [
      {
        kind: "let",
        loc: [7, 3, 7, 36],
        name: {
          kind: "id",
          loc: [7, 7, 7, 11],
          text: "last",
          bindingKey: "last$34303ze2oq14p$0",
        },
        initializer: {
          kind: "=>",
          loc: [7, 28, 7, 35],
          parameters: [],
          body: {
            kind: "number",
            loc: [7, 34, 7, 35],
            value: 0,
          },
        },
      },
      {
        kind: "for",
        loc: [8, 3, 10, 4],
        initializer: {
          kind: "let",
          loc: [8, 8, 8, 17],
          name: {
            kind: "id",
            loc: [8, 12, 8, 13],
            text: "i",
            bindingKey: "i$34303ze2oq14p$1",
          },
          initializer: {
            kind: "number",
            loc: [8, 16, 8, 17],
            value: 0,
          },
        },
        condition: {
          kind: "binop",
          loc: [8, 19, 8, 24],
          left: {
            kind: "id",
            loc: [8, 19, 8, 20],
            text: "i",
            bindingKey: "i$34303ze2oq14p$1",
          },
          operatorToken: "<",
          right: {
            kind: "number",
            loc: [8, 23, 8, 24],
            value: 3,
          },
        },
        incrementor: {
          kind: "binop",
          loc: [8, 26, 8, 35],
          left: {
            kind: "id",
            loc: [8, 26, 8, 27],
            text: "i",
            bindingKey: "i$34303ze2oq14p$1",
          },
          operatorToken: "=",
          right: {
            kind: "binop",
            loc: [8, 30, 8, 35],
            left: {
              kind: "id",
              loc: [8, 30, 8, 31],
              text: "i",
              bindingKey: "i$34303ze2oq14p$1",
            },
            operatorToken: "+",
            right: {
              kind: "number",
              loc: [8, 34, 8, 35],
              value: 1,
            },
          },
        },
        statement: {
          kind: "{}",
          loc: [8, 37, 10, 4],
          statements: [
            {
              kind: "binop",
              loc: [9, 5, 9, 19],
              left: {
                kind: "id",
                loc: [9, 5, 9, 9],
                text: "last",
                bindingKey: "last$34303ze2oq14p$0",
              },
              operatorToken: "=",
              right: {
                kind: "=>",
                loc: [9, 12, 9, 19],
                parameters: [],
                body: {
                  kind: "id",
                  loc: [9, 18, 9, 19],
                  text: "i",
                  bindingKey: "i$34303ze2oq14p$1",
                },
              },
            },
          ],
        },
      },
      {
        kind: "return",
        loc: [11, 3, 11, 17],
        expression: {
          kind: "()",
          loc: [11, 10, 11, 16],
          expression: {
            kind: "id",
            loc: [11, 10, 11, 14],
            text: "last",
            bindingKey: "last$34303ze2oq14p$0",
          },
          arguments: [],
        },
      },
    ],
  }),
);
