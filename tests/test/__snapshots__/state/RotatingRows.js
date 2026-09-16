import { cs, For, state } from "@backtickjs/core";
// A list whose drawing reads where a member sits as well as what it is.
//
// The index is storage, not a number: a rotation moves every member without
// changing any of them, so a row keeps the node it had and only what read
// `index` runs again. Reading it eagerly — the number at the moment the row was
// drawn — leaves all three stale.
async function RotatingRows() {
  return cs.create(
    [11, 10, 28, 5],
    {
      version: "0.0.0",
      filePath: "RotatingRows.tsx",
      fileHash: "1it9dyapjr8zn",
      splices: {
        $state: { value: state, params: [] },
        $For: { value: For, params: [] },
      },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [11, 13, 28, 4],
      statements: [
        {
          kind: "const",
          loc: [12, 5, 12, 53],
          name: {
            kind: "id",
            loc: [12, 11, 12, 16],
            text: "names",
            bindingKey: "names$1it9dyapjr8zn$0",
          },
          initializer: {
            kind: "()",
            loc: [12, 19, 12, 52],
            expression: {
              kind: "splice",
              loc: [12, 19, 12, 25],
              key: "$state",
            },
            arguments: [
              {
                kind: "arr",
                loc: [12, 36, 12, 51],
                elements: [
                  {
                    kind: "string",
                    loc: [12, 37, 12, 40],
                    text: "a",
                  },
                  {
                    kind: "string",
                    loc: [12, 42, 12, 45],
                    text: "b",
                  },
                  {
                    kind: "string",
                    loc: [12, 47, 12, 50],
                    text: "c",
                  },
                ],
              },
            ],
          },
        },
        {
          kind: "const",
          loc: [13, 5, 15, 7],
          name: {
            kind: "id",
            loc: [13, 11, 13, 17],
            text: "rotate",
            bindingKey: "rotate$1it9dyapjr8zn$1",
          },
          initializer: {
            kind: "=>",
            loc: [13, 20, 15, 6],
            parameters: [],
            body: {
              kind: "{}",
              loc: [13, 26, 15, 6],
              statements: [
                {
                  kind: "()",
                  loc: [14, 7, 14, 58],
                  expression: {
                    kind: ".",
                    loc: [14, 7, 14, 19],
                    expression: {
                      kind: "id",
                      loc: [14, 7, 14, 12],
                      text: "names",
                      bindingKey: "names$1it9dyapjr8zn$0",
                    },
                    name: "update",
                  },
                  arguments: [
                    {
                      kind: "=>",
                      loc: [14, 20, 14, 57],
                      parameters: [
                        {
                          kind: "param",
                          loc: [14, 21, 14, 25],
                          name: {
                            kind: "id",
                            loc: [14, 21, 14, 25],
                            text: "held",
                            bindingKey: "held$1it9dyapjr8zn$2",
                          },
                        },
                      ],
                      body: {
                        kind: "arr",
                        loc: [14, 30, 14, 57],
                        elements: [
                          {
                            kind: "[]",
                            loc: [14, 31, 14, 38],
                            expression: {
                              kind: "id",
                              loc: [14, 31, 14, 35],
                              text: "held",
                              bindingKey: "held$1it9dyapjr8zn$2",
                            },
                            argumentExpression: {
                              kind: "number",
                              loc: [14, 36, 14, 37],
                              value: 2,
                            },
                          },
                          {
                            kind: "[]",
                            loc: [14, 40, 14, 47],
                            expression: {
                              kind: "id",
                              loc: [14, 40, 14, 44],
                              text: "held",
                              bindingKey: "held$1it9dyapjr8zn$2",
                            },
                            argumentExpression: {
                              kind: "number",
                              loc: [14, 45, 14, 46],
                              value: 0,
                            },
                          },
                          {
                            kind: "[]",
                            loc: [14, 49, 14, 56],
                            expression: {
                              kind: "id",
                              loc: [14, 49, 14, 53],
                              text: "held",
                              bindingKey: "held$1it9dyapjr8zn$2",
                            },
                            argumentExpression: {
                              kind: "number",
                              loc: [14, 54, 14, 55],
                              value: 1,
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              ],
            },
          },
        },
        {
          kind: "return",
          loc: [16, 5, 27, 7],
          expression: {
            kind: "jsx",
            loc: [17, 7, 26, 13],
            type: {
              kind: "string",
              loc: [17, 8, 17, 11],
              text: "div",
            },
            attributes: [],
            children: [
              {
                kind: "jsx",
                loc: [18, 9, 18, 45],
                type: {
                  kind: "string",
                  loc: [18, 10, 18, 14],
                  text: "span",
                },
                attributes: [
                  {
                    name: "onclick",
                    initializer: {
                      kind: "id",
                      loc: [18, 24, 18, 30],
                      text: "rotate",
                      bindingKey: "rotate$1it9dyapjr8zn$1",
                    },
                  },
                ],
                children: [
                  {
                    kind: "string",
                    loc: [18, 32, 18, 38],
                    text: "rotate",
                  },
                ],
              },
              {
                kind: "jsx",
                loc: [19, 9, 25, 15],
                type: {
                  kind: "string",
                  loc: [19, 10, 19, 13],
                  text: "div",
                },
                attributes: [],
                children: [
                  {
                    kind: "jsx",
                    loc: [20, 11, 24, 17],
                    type: {
                      kind: "splice",
                      loc: [20, 12, 20, 15],
                      key: "$For",
                    },
                    attributes: [
                      {
                        name: "each",
                        initializer: {
                          kind: "()",
                          loc: [20, 22, 20, 34],
                          expression: {
                            kind: ".",
                            loc: [20, 22, 20, 32],
                            expression: {
                              kind: "id",
                              loc: [20, 22, 20, 27],
                              text: "names",
                              bindingKey: "names$1it9dyapjr8zn$0",
                            },
                            name: "read",
                          },
                          arguments: [],
                        },
                      },
                    ],
                    children: [
                      {
                        kind: "=>",
                        loc: [21, 14, 23, 14],
                        parameters: [
                          {
                            kind: "param",
                            loc: [21, 15, 21, 27],
                            name: {
                              kind: "id",
                              loc: [21, 15, 21, 19],
                              text: "name",
                              bindingKey: "name$1it9dyapjr8zn$3",
                            },
                          },
                          {
                            kind: "param",
                            loc: [21, 29, 21, 57],
                            name: {
                              kind: "id",
                              loc: [21, 29, 21, 34],
                              text: "index",
                              bindingKey: "index$1it9dyapjr8zn$4",
                            },
                          },
                        ],
                        body: {
                          kind: "jsx",
                          loc: [22, 15, 22, 58],
                          type: {
                            kind: "string",
                            loc: [22, 16, 22, 20],
                            text: "span",
                          },
                          attributes: [],
                          children: [
                            {
                              kind: "binop",
                              loc: [22, 22, 22, 50],
                              left: {
                                kind: "binop",
                                loc: [22, 22, 22, 35],
                                left: {
                                  kind: "id",
                                  loc: [22, 22, 22, 26],
                                  text: "name",
                                  bindingKey: "name$1it9dyapjr8zn$3",
                                },
                                operatorToken: "+",
                                right: {
                                  kind: "string",
                                  loc: [22, 29, 22, 35],
                                  text: " at ",
                                },
                              },
                              operatorToken: "+",
                              right: {
                                kind: "()",
                                loc: [22, 38, 22, 50],
                                expression: {
                                  kind: ".",
                                  loc: [22, 38, 22, 48],
                                  expression: {
                                    kind: "id",
                                    loc: [22, 38, 22, 43],
                                    text: "index",
                                    bindingKey: "index$1it9dyapjr8zn$4",
                                  },
                                  name: "read",
                                },
                                arguments: [],
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
