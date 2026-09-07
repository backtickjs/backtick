import { cs, state } from "@backtickjs/core";
// A bundle a page does not have yet, and what stands in until it does.
//
// Both reads are where they stand, inside the drawing: that is what makes the
// condition follow the cell. Reading it once into a `const` would narrow the
// type and freeze the drawing — the script body runs once, so the loading state
// would never resolve.
export default cs.create(
  [9, 16, 21, 3],
  {
    version: "0.0.0",
    filePath: "backtick-loading.tsx",
    fileHash: "g9k8a6x7uznn",
    splices: { $state: { value: state, params: [] } },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [9, 19, 21, 2],
    statements: [
      {
        kind: "const",
        loc: [10, 3, 10, 44],
        name: {
          kind: "id",
          loc: [10, 9, 10, 13],
          text: "held",
          bindingKey: "held$g9k8a6x7uznn$0",
        },
        initializer: {
          kind: "()",
          loc: [10, 16, 10, 43],
          expression: {
            kind: "splice",
            loc: [10, 16, 10, 22],
            key: "$state",
          },
          arguments: [
            {
              kind: "null",
              loc: [10, 38, 10, 42],
            },
          ],
        },
      },
      {
        kind: "return",
        loc: [12, 3, 20, 5],
        expression: {
          kind: "jsx",
          loc: [13, 5, 19, 11],
          type: {
            kind: "string",
            loc: [13, 6, 13, 9],
            text: "div",
          },
          attributes: [],
          children: [
            {
              kind: "?:",
              loc: [14, 8, 18, 8],
              condition: {
                kind: "binop",
                loc: [14, 8, 14, 28],
                left: {
                  kind: "()",
                  loc: [14, 8, 14, 19],
                  expression: {
                    kind: ".",
                    loc: [14, 8, 14, 17],
                    expression: {
                      kind: "id",
                      loc: [14, 8, 14, 12],
                      text: "held",
                      bindingKey: "held$g9k8a6x7uznn$0",
                    },
                    name: "read",
                  },
                  arguments: [],
                },
                operatorToken: "===",
                right: {
                  kind: "null",
                  loc: [14, 24, 14, 28],
                },
              },
              whenTrue: {
                kind: "jsx",
                loc: [15, 9, 15, 30],
                type: {
                  kind: "string",
                  loc: [15, 10, 15, 14],
                  text: "span",
                },
                attributes: [],
                children: [
                  {
                    kind: "string",
                    loc: [15, 15, 15, 23],
                    text: "loading\u2026",
                  },
                ],
              },
              whenFalse: {
                kind: "jsx",
                loc: [17, 9, 17, 42],
                type: {
                  kind: "string",
                  loc: [17, 10, 17, 18],
                  text: "backtick",
                },
                attributes: [
                  {
                    name: "bundle",
                    initializer: {
                      kind: "()",
                      loc: [17, 27, 17, 38],
                      expression: {
                        kind: ".",
                        loc: [17, 27, 17, 36],
                        expression: {
                          kind: "id",
                          loc: [17, 27, 17, 31],
                          text: "held",
                          bindingKey: "held$g9k8a6x7uznn$0",
                        },
                        name: "read",
                      },
                      arguments: [],
                    },
                  },
                ],
                children: [],
              },
            },
          ],
        },
      },
    ],
  }),
);
