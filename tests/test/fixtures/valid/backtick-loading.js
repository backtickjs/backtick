import { cs, state } from "@backtickjs/core";
// A bundle a page does not have yet, and what stands in until it does.
//
// Both reads are where they stand, inside the drawing: that is what makes the
// condition follow the cell. Reading it once into a `const` would narrow the
// type and freeze the drawing — the script body runs once, so the loading state
// would never resolve.
export default cs.create(
  [10, 16, 22, 3],
  {
    version: "0.0.0",
    filePath: "backtick-loading.tsx",
    fileHash: "2m7uau18bs02p",
    splices: { $state: { value: state, params: [] } },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [10, 19, 22, 2],
    statements: [
      {
        kind: "const",
        loc: [11, 3, 11, 61],
        name: {
          kind: "id",
          loc: [11, 9, 11, 13],
          text: "held",
          bindingKey: "held$2m7uau18bs02p$0",
        },
        initializer: {
          kind: "()",
          loc: [11, 16, 11, 60],
          expression: {
            kind: "splice",
            loc: [11, 16, 11, 22],
            key: "$state",
          },
          arguments: [
            {
              kind: "null",
              loc: [11, 55, 11, 59],
            },
          ],
        },
      },
      {
        kind: "return",
        loc: [13, 3, 21, 5],
        expression: {
          kind: "jsx",
          loc: [14, 5, 20, 11],
          type: {
            kind: "string",
            loc: [14, 6, 14, 9],
            text: "div",
          },
          attributes: [],
          children: [
            {
              kind: "?:",
              loc: [15, 8, 19, 8],
              condition: {
                kind: "binop",
                loc: [15, 8, 15, 28],
                left: {
                  kind: "()",
                  loc: [15, 8, 15, 19],
                  expression: {
                    kind: ".",
                    loc: [15, 8, 15, 17],
                    expression: {
                      kind: "id",
                      loc: [15, 8, 15, 12],
                      text: "held",
                      bindingKey: "held$2m7uau18bs02p$0",
                    },
                    name: "read",
                  },
                  arguments: [],
                },
                operatorToken: "===",
                right: {
                  kind: "null",
                  loc: [15, 24, 15, 28],
                },
              },
              whenTrue: {
                kind: "jsx",
                loc: [16, 9, 16, 30],
                type: {
                  kind: "string",
                  loc: [16, 10, 16, 14],
                  text: "span",
                },
                attributes: [],
                children: [
                  {
                    kind: "string",
                    loc: [16, 15, 16, 23],
                    text: "loading\u2026",
                  },
                ],
              },
              whenFalse: {
                kind: "jsx",
                loc: [18, 9, 18, 42],
                type: {
                  kind: "string",
                  loc: [18, 10, 18, 18],
                  text: "backtick",
                },
                attributes: [
                  {
                    name: "bundle",
                    initializer: {
                      kind: "()",
                      loc: [18, 27, 18, 38],
                      expression: {
                        kind: ".",
                        loc: [18, 27, 18, 36],
                        expression: {
                          kind: "id",
                          loc: [18, 27, 18, 31],
                          text: "held",
                          bindingKey: "held$2m7uau18bs02p$0",
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
