import { cs } from "@backtickjs/core";
// The script between them binds `Badge` to a number, and the nearest binding is
// the one a tag names: the innermost `<Badge />` calls a number.
export default cs.create(
  [5, 16, 11, 3],
  {
    version: "0.0.0",
    filePath: "script-bound-tag-shadowed.tsx",
    fileHash: "3i7yndiimyjru",
    splices: {
      $0splice0: {
        value: cs.create(
          [7, 12, 10, 5],
          {
            version: "0.0.0",
            filePath: "script-bound-tag-shadowed.tsx",
            fileHash: "3i7yndiimyjru",
            splices: {
              $0splice0: {
                value: cs.create(
                  [9, 14, 9, 33],
                  {
                    version: "0.0.0",
                    filePath: "script-bound-tag-shadowed.tsx",
                    fileHash: "3i7yndiimyjru",
                    splices: {},
                    captures: ["Badge$3i7yndiimyjru$2"],
                  },
                  () => ({
                    kind: "jsx",
                    loc: [9, 17, 9, 32],
                    type: {
                      kind: "id",
                      loc: [9, 18, 9, 23],
                      text: "Badge",
                      bindingKey: "Badge$3i7yndiimyjru$2",
                    },
                    attributes: [
                      {
                        name: "n",
                        initializer: {
                          kind: "number",
                          loc: [9, 27, 9, 28],
                          value: 1,
                        },
                      },
                    ],
                    children: [],
                  }),
                ),
                params: ["Badge$3i7yndiimyjru$2"],
              },
            },
            captures: [],
          },
          () => ({
            kind: "{}",
            loc: [7, 15, 10, 4],
            statements: [
              {
                kind: "const",
                loc: [8, 5, 8, 21],
                name: {
                  kind: "id",
                  loc: [8, 11, 8, 16],
                  text: "Badge",
                  bindingKey: "Badge$3i7yndiimyjru$2",
                },
                initializer: {
                  kind: "number",
                  loc: [8, 19, 8, 20],
                  value: 5,
                },
              },
              {
                kind: "return",
                loc: [9, 5, 9, 35],
                expression: {
                  kind: "splice",
                  loc: [9, 12, 9, 34],
                  key: "$0splice0",
                },
              },
            ],
          }),
        ),
        params: [],
      },
    },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [5, 19, 11, 2],
    statements: [
      {
        kind: "const",
        loc: [6, 3, 6, 59],
        name: {
          kind: "id",
          loc: [6, 9, 6, 14],
          text: "Badge",
          bindingKey: "Badge$3i7yndiimyjru$0",
        },
        initializer: {
          kind: "=>",
          loc: [6, 17, 6, 58],
          parameters: [
            {
              kind: "param",
              loc: [6, 18, 6, 34],
              name: {
                kind: "id",
                loc: [6, 18, 6, 19],
                text: "p",
                bindingKey: "p$3i7yndiimyjru$1",
              },
            },
          ],
          body: {
            kind: "jsx",
            loc: [6, 39, 6, 58],
            type: {
              kind: "string",
              loc: [6, 40, 6, 41],
              text: "b",
            },
            attributes: [],
            children: [
              {
                kind: "binop",
                loc: [6, 43, 6, 53],
                left: {
                  kind: "string",
                  loc: [6, 43, 6, 47],
                  text: "n ",
                },
                operatorToken: "+",
                right: {
                  kind: ".",
                  loc: [6, 50, 6, 53],
                  expression: {
                    kind: "id",
                    loc: [6, 50, 6, 51],
                    text: "p",
                    bindingKey: "p$3i7yndiimyjru$1",
                  },
                  name: "n",
                },
              },
            ],
          },
        },
      },
      {
        kind: "return",
        loc: [7, 3, 10, 7],
        expression: {
          kind: "splice",
          loc: [7, 10, 10, 6],
          key: "$0splice0",
        },
      },
    ],
  }),
);
