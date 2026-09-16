import { cs, state, vm } from "@backtickjs/core";
// A bundle a page does not have yet, and what stands in until it does.
//
// Both reads are where they stand, inside the drawing: that is what makes the
// condition follow the cell. Reading it once into a `const` would narrow the
// type and freeze the drawing — the script body runs once, so the loading state
// would never resolve. So the second read is asserted instead, which the
// condition beside it is what makes true.
const vmEvalLoading = cs.create(
  [11, 23, 23, 3],
  {
    version: "0.0.0",
    filePath: "vmEvalLoading.tsx",
    fileHash: "1t5xbn2j04bav",
    splices: {
      $state: { value: state, params: [] },
      $vm: { value: vm, params: [] },
    },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [11, 26, 23, 2],
    statements: [
      {
        kind: "const",
        loc: [12, 3, 12, 61],
        name: {
          kind: "id",
          loc: [12, 9, 12, 13],
          text: "held",
          bindingKey: "held$1t5xbn2j04bav$0",
        },
        initializer: {
          kind: "()",
          loc: [12, 16, 12, 60],
          expression: {
            kind: "splice",
            loc: [12, 16, 12, 22],
            key: "$state",
          },
          arguments: [
            {
              kind: "null",
              loc: [12, 55, 12, 59],
            },
          ],
        },
      },
      {
        kind: "return",
        loc: [14, 3, 22, 5],
        expression: {
          kind: "jsx",
          loc: [15, 5, 21, 11],
          type: {
            kind: "string",
            loc: [15, 6, 15, 9],
            text: "div",
          },
          attributes: [],
          children: [
            {
              kind: "?:",
              loc: [16, 8, 20, 8],
              condition: {
                kind: "binop",
                loc: [16, 8, 16, 28],
                left: {
                  kind: "()",
                  loc: [16, 8, 16, 19],
                  expression: {
                    kind: ".",
                    loc: [16, 8, 16, 17],
                    expression: {
                      kind: "id",
                      loc: [16, 8, 16, 12],
                      text: "held",
                      bindingKey: "held$1t5xbn2j04bav$0",
                    },
                    name: "read",
                  },
                  arguments: [],
                },
                operatorToken: "===",
                right: {
                  kind: "null",
                  loc: [16, 24, 16, 28],
                },
              },
              whenTrue: {
                kind: "jsx",
                loc: [17, 9, 17, 30],
                type: {
                  kind: "string",
                  loc: [17, 10, 17, 14],
                  text: "span",
                },
                attributes: [],
                children: [
                  {
                    kind: "string",
                    loc: [17, 15, 17, 23],
                    text: "loading\u2026",
                  },
                ],
              },
              whenFalse: {
                kind: "()",
                loc: [19, 9, 19, 57],
                expression: {
                  kind: ".",
                  loc: [19, 9, 19, 17],
                  expression: {
                    kind: "splice",
                    loc: [19, 9, 19, 12],
                    key: "$vm",
                  },
                  name: "eval",
                },
                arguments: [
                  {
                    kind: "()",
                    loc: [19, 18, 19, 29],
                    expression: {
                      kind: ".",
                      loc: [19, 18, 19, 27],
                      expression: {
                        kind: "id",
                        loc: [19, 18, 19, 22],
                        text: "held",
                        bindingKey: "held$1t5xbn2j04bav$0",
                      },
                      name: "read",
                    },
                    arguments: [],
                  },
                ],
              },
            },
          ],
        },
      },
    ],
  }),
);
