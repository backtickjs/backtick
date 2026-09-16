import { cs, state } from "@backtickjs/core";
// `update` derives the next value from the current one, so a handler needs no
// separate read. It returns `void` like `write`, which is what keeps it out of
// a value body: only a statement position accepts `void`.
async function UpdatingStepper() {
  return cs.create(
    [7, 10, 19, 5],
    {
      version: "0.0.0",
      filePath: "UpdatingStepper.tsx",
      fileHash: "eoapmhtlihqs",
      splices: { $state: { value: state, params: [] } },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [7, 13, 19, 4],
      statements: [
        {
          kind: "const",
          loc: [8, 5, 8, 29],
          name: {
            kind: "id",
            loc: [8, 11, 8, 15],
            text: "size",
            bindingKey: "size$eoapmhtlihqs$0",
          },
          initializer: {
            kind: "()",
            loc: [8, 18, 8, 28],
            expression: {
              kind: "splice",
              loc: [8, 18, 8, 24],
              key: "$state",
            },
            arguments: [
              {
                kind: "number",
                loc: [8, 25, 8, 27],
                value: 16,
              },
            ],
          },
        },
        {
          kind: "return",
          loc: [9, 5, 18, 7],
          expression: {
            kind: "jsx",
            loc: [10, 7, 17, 14],
            type: {
              kind: "string",
              loc: [10, 8, 10, 12],
              text: "span",
            },
            attributes: [
              {
                name: "style",
                initializer: {
                  kind: "binop",
                  loc: [11, 16, 11, 50],
                  left: {
                    kind: "binop",
                    loc: [11, 16, 11, 43],
                    left: {
                      kind: "string",
                      loc: [11, 16, 11, 29],
                      text: "font-size: ",
                    },
                    operatorToken: "+",
                    right: {
                      kind: "()",
                      loc: [11, 32, 11, 43],
                      expression: {
                        kind: ".",
                        loc: [11, 32, 11, 41],
                        expression: {
                          kind: "id",
                          loc: [11, 32, 11, 36],
                          text: "size",
                          bindingKey: "size$eoapmhtlihqs$0",
                        },
                        name: "read",
                      },
                      arguments: [],
                    },
                  },
                  operatorToken: "+",
                  right: {
                    kind: "string",
                    loc: [11, 46, 11, 50],
                    text: "px",
                  },
                },
              },
              {
                name: "onclick",
                initializer: {
                  kind: "=>",
                  loc: [12, 18, 14, 10],
                  parameters: [],
                  body: {
                    kind: "{}",
                    loc: [12, 24, 14, 10],
                    statements: [
                      {
                        kind: "()",
                        loc: [13, 11, 13, 56],
                        expression: {
                          kind: ".",
                          loc: [13, 11, 13, 22],
                          expression: {
                            kind: "id",
                            loc: [13, 11, 13, 15],
                            text: "size",
                            bindingKey: "size$eoapmhtlihqs$0",
                          },
                          name: "update",
                        },
                        arguments: [
                          {
                            kind: "=>",
                            loc: [13, 23, 13, 55],
                            parameters: [
                              {
                                kind: "param",
                                loc: [13, 24, 13, 39],
                                name: {
                                  kind: "id",
                                  loc: [13, 24, 13, 31],
                                  text: "current",
                                  bindingKey: "current$eoapmhtlihqs$1",
                                },
                              },
                            ],
                            body: {
                              kind: "binop",
                              loc: [13, 44, 13, 55],
                              left: {
                                kind: "id",
                                loc: [13, 44, 13, 51],
                                text: "current",
                                bindingKey: "current$eoapmhtlihqs$1",
                              },
                              operatorToken: "+",
                              right: {
                                kind: "number",
                                loc: [13, 54, 13, 55],
                                value: 1,
                              },
                            },
                          },
                        ],
                      },
                    ],
                  },
                },
              },
            ],
            children: [
              {
                kind: "string",
                loc: [16, 9, 17, 7],
                text: "press",
              },
            ],
          },
        },
      ],
    }),
  );
}
