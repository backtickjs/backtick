import { cs, For, state } from "@backtickjs/core";
// A list whose every row reads the cell the selection is held in. A write
// re-runs the `href` of all three rows and moves it on two of them — the row
// selected, and the row that no longer is. The third recomputes the href it
// already had, and the host must not hear about it.
async function SelectableRows() {
  return cs.create(
    [8, 10, 24, 5],
    {
      version: "0.0.0",
      filePath: "SelectableRows.tsx",
      fileHash: "2jq2xlatun4hj",
      splices: {
        $state: { value: state, params: [] },
        $For: { value: For, params: [] },
      },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [8, 13, 24, 4],
      statements: [
        {
          kind: "const",
          loc: [9, 5, 9, 32],
          name: {
            kind: "id",
            loc: [9, 11, 9, 19],
            text: "selected",
            bindingKey: "selected$2jq2xlatun4hj$0",
          },
          initializer: {
            kind: "()",
            loc: [9, 22, 9, 31],
            expression: {
              kind: "splice",
              loc: [9, 22, 9, 28],
              key: "$state",
            },
            arguments: [
              {
                kind: "number",
                loc: [9, 29, 9, 30],
                value: 0,
              },
            ],
          },
        },
        {
          kind: "return",
          loc: [10, 5, 23, 7],
          expression: {
            kind: "jsx",
            loc: [11, 7, 22, 13],
            type: {
              kind: "string",
              loc: [11, 8, 11, 11],
              text: "div",
            },
            attributes: [],
            children: [
              {
                kind: "jsx",
                loc: [12, 9, 12, 62],
                type: {
                  kind: "string",
                  loc: [12, 10, 12, 14],
                  text: "span",
                },
                attributes: [
                  {
                    name: "onclick",
                    initializer: {
                      kind: "=>",
                      loc: [12, 24, 12, 47],
                      parameters: [],
                      body: {
                        kind: "()",
                        loc: [12, 30, 12, 47],
                        expression: {
                          kind: ".",
                          loc: [12, 30, 12, 44],
                          expression: {
                            kind: "id",
                            loc: [12, 30, 12, 38],
                            text: "selected",
                            bindingKey: "selected$2jq2xlatun4hj$0",
                          },
                          name: "write",
                        },
                        arguments: [
                          {
                            kind: "number",
                            loc: [12, 45, 12, 46],
                            value: 1,
                          },
                        ],
                      },
                    },
                  },
                ],
                children: [
                  {
                    kind: "string",
                    loc: [12, 49, 12, 55],
                    text: "select",
                  },
                ],
              },
              {
                kind: "jsx",
                loc: [13, 9, 21, 15],
                type: {
                  kind: "string",
                  loc: [13, 10, 13, 13],
                  text: "div",
                },
                attributes: [],
                children: [
                  {
                    kind: "jsx",
                    loc: [14, 11, 20, 17],
                    type: {
                      kind: "splice",
                      loc: [14, 12, 14, 15],
                      key: "$For",
                    },
                    attributes: [
                      {
                        name: "each",
                        initializer: {
                          kind: "arr",
                          loc: [14, 22, 14, 31],
                          elements: [
                            {
                              kind: "number",
                              loc: [14, 23, 14, 24],
                              value: 0,
                            },
                            {
                              kind: "number",
                              loc: [14, 26, 14, 27],
                              value: 1,
                            },
                            {
                              kind: "number",
                              loc: [14, 29, 14, 30],
                              value: 2,
                            },
                          ],
                        },
                      },
                    ],
                    children: [
                      {
                        kind: "=>",
                        loc: [15, 14, 19, 14],
                        parameters: [
                          {
                            kind: "param",
                            loc: [15, 15, 15, 25],
                            name: {
                              kind: "id",
                              loc: [15, 15, 15, 17],
                              text: "id",
                              bindingKey: "id$2jq2xlatun4hj$1",
                            },
                          },
                        ],
                        body: {
                          kind: "jsx",
                          loc: [16, 15, 18, 19],
                          type: {
                            kind: "string",
                            loc: [16, 16, 16, 17],
                            text: "a",
                          },
                          attributes: [
                            {
                              name: "href",
                              initializer: {
                                kind: "?:",
                                loc: [16, 24, 16, 68],
                                condition: {
                                  kind: "binop",
                                  loc: [16, 24, 16, 46],
                                  left: {
                                    kind: "()",
                                    loc: [16, 24, 16, 39],
                                    expression: {
                                      kind: ".",
                                      loc: [16, 24, 16, 37],
                                      expression: {
                                        kind: "id",
                                        loc: [16, 24, 16, 32],
                                        text: "selected",
                                        bindingKey: "selected$2jq2xlatun4hj$0",
                                      },
                                      name: "read",
                                    },
                                    arguments: [],
                                  },
                                  operatorToken: "===",
                                  right: {
                                    kind: "id",
                                    loc: [16, 44, 16, 46],
                                    text: "id",
                                    bindingKey: "id$2jq2xlatun4hj$1",
                                  },
                                },
                                whenTrue: {
                                  kind: "string",
                                  loc: [16, 49, 16, 56],
                                  text: "#open",
                                },
                                whenFalse: {
                                  kind: "string",
                                  loc: [16, 59, 16, 68],
                                  text: "#closed",
                                },
                              },
                            },
                          ],
                          children: [
                            {
                              kind: "binop",
                              loc: [17, 18, 17, 29],
                              left: {
                                kind: "string",
                                loc: [17, 18, 17, 24],
                                text: "row ",
                              },
                              operatorToken: "+",
                              right: {
                                kind: "id",
                                loc: [17, 27, 17, 29],
                                text: "id",
                                bindingKey: "id$2jq2xlatun4hj$1",
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        },
      ],
    }),
  );
}
