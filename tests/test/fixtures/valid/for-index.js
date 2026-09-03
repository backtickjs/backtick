import { jsx as _jsx } from "@backtickjs/web-schema/jsx-runtime";
import { cs, For, state } from "@backtickjs/core";
// A list whose drawing reads where a member sits as well as what it is.
//
// The index is storage, not a number, and this is the case that says why: a
// rotation moves every member without changing any of them, so a row keeps the
// node it had and only what read `index` runs again. Reading it eagerly — the
// number at the moment the row was drawn — leaves all three stale, which is the
// bug this pins.
async function Rows() {
  return cs.create(
    [12, 10, 29, 5],
    {
      version: "0.0.0",
      filePath: "for-index.tsx",
      fileHash: "1suvpn3mvnkvg",
      splices: {
        $state: { value: state, params: [] },
        $For: { value: For, params: [] },
      },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [12, 13, 29, 4],
      statements: [
        {
          kind: "const",
          loc: [13, 5, 13, 53],
          name: {
            kind: "id",
            loc: [13, 11, 13, 16],
            text: "names",
            bindingKey: "names$1suvpn3mvnkvg$0",
          },
          initializer: {
            kind: "()",
            loc: [13, 19, 13, 52],
            expression: {
              kind: "splice",
              loc: [13, 19, 13, 25],
              key: "$state",
            },
            arguments: [
              {
                kind: "arr",
                loc: [13, 36, 13, 51],
                elements: [
                  {
                    kind: "string",
                    loc: [13, 37, 13, 40],
                    text: "a",
                  },
                  {
                    kind: "string",
                    loc: [13, 42, 13, 45],
                    text: "b",
                  },
                  {
                    kind: "string",
                    loc: [13, 47, 13, 50],
                    text: "c",
                  },
                ],
              },
            ],
          },
        },
        {
          kind: "const",
          loc: [14, 5, 16, 7],
          name: {
            kind: "id",
            loc: [14, 11, 14, 17],
            text: "rotate",
            bindingKey: "rotate$1suvpn3mvnkvg$1",
          },
          initializer: {
            kind: "=>",
            loc: [14, 20, 16, 6],
            parameters: [],
            body: {
              kind: "{}",
              loc: [14, 26, 16, 6],
              statements: [
                {
                  kind: "()",
                  loc: [15, 7, 15, 58],
                  expression: {
                    kind: ".",
                    loc: [15, 7, 15, 19],
                    expression: {
                      kind: "id",
                      loc: [15, 7, 15, 12],
                      text: "names",
                      bindingKey: "names$1suvpn3mvnkvg$0",
                    },
                    name: "update",
                  },
                  arguments: [
                    {
                      kind: "=>",
                      loc: [15, 20, 15, 57],
                      parameters: [
                        {
                          kind: "param",
                          loc: [15, 21, 15, 25],
                          name: {
                            kind: "id",
                            loc: [15, 21, 15, 25],
                            text: "held",
                            bindingKey: "held$1suvpn3mvnkvg$2",
                          },
                        },
                      ],
                      body: {
                        kind: "arr",
                        loc: [15, 30, 15, 57],
                        elements: [
                          {
                            kind: "[]",
                            loc: [15, 31, 15, 38],
                            expression: {
                              kind: "id",
                              loc: [15, 31, 15, 35],
                              text: "held",
                              bindingKey: "held$1suvpn3mvnkvg$2",
                            },
                            argumentExpression: {
                              kind: "number",
                              loc: [15, 36, 15, 37],
                              value: 2,
                            },
                          },
                          {
                            kind: "[]",
                            loc: [15, 40, 15, 47],
                            expression: {
                              kind: "id",
                              loc: [15, 40, 15, 44],
                              text: "held",
                              bindingKey: "held$1suvpn3mvnkvg$2",
                            },
                            argumentExpression: {
                              kind: "number",
                              loc: [15, 45, 15, 46],
                              value: 0,
                            },
                          },
                          {
                            kind: "[]",
                            loc: [15, 49, 15, 56],
                            expression: {
                              kind: "id",
                              loc: [15, 49, 15, 53],
                              text: "held",
                              bindingKey: "held$1suvpn3mvnkvg$2",
                            },
                            argumentExpression: {
                              kind: "number",
                              loc: [15, 54, 15, 55],
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
          loc: [17, 5, 28, 7],
          expression: {
            kind: "jsx",
            loc: [18, 7, 27, 13],
            type: {
              kind: "string",
              loc: [18, 8, 18, 11],
              text: "div",
            },
            attributes: [],
            children: [
              {
                kind: "jsx",
                loc: [19, 9, 19, 45],
                type: {
                  kind: "string",
                  loc: [19, 10, 19, 14],
                  text: "span",
                },
                attributes: [
                  {
                    name: "onclick",
                    initializer: {
                      kind: "id",
                      loc: [19, 24, 19, 30],
                      text: "rotate",
                      bindingKey: "rotate$1suvpn3mvnkvg$1",
                    },
                  },
                ],
                children: [
                  {
                    kind: "string",
                    loc: [19, 32, 19, 38],
                    text: "rotate",
                  },
                ],
              },
              {
                kind: "jsx",
                loc: [20, 9, 26, 15],
                type: {
                  kind: "string",
                  loc: [20, 10, 20, 13],
                  text: "div",
                },
                attributes: [],
                children: [
                  {
                    kind: "jsx",
                    loc: [21, 11, 25, 17],
                    type: {
                      kind: "splice",
                      loc: [21, 12, 21, 15],
                      key: "$For",
                    },
                    attributes: [
                      {
                        name: "each",
                        initializer: {
                          kind: "()",
                          loc: [21, 22, 21, 34],
                          expression: {
                            kind: ".",
                            loc: [21, 22, 21, 32],
                            expression: {
                              kind: "id",
                              loc: [21, 22, 21, 27],
                              text: "names",
                              bindingKey: "names$1suvpn3mvnkvg$0",
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
                        loc: [22, 14, 24, 14],
                        parameters: [
                          {
                            kind: "param",
                            loc: [22, 15, 22, 27],
                            name: {
                              kind: "id",
                              loc: [22, 15, 22, 19],
                              text: "name",
                              bindingKey: "name$1suvpn3mvnkvg$3",
                            },
                          },
                          {
                            kind: "param",
                            loc: [22, 29, 22, 57],
                            name: {
                              kind: "id",
                              loc: [22, 29, 22, 34],
                              text: "index",
                              bindingKey: "index$1suvpn3mvnkvg$4",
                            },
                          },
                        ],
                        body: {
                          kind: "jsx",
                          loc: [23, 15, 23, 58],
                          type: {
                            kind: "string",
                            loc: [23, 16, 23, 20],
                            text: "span",
                          },
                          attributes: [],
                          children: [
                            {
                              kind: "binop",
                              loc: [23, 22, 23, 50],
                              left: {
                                kind: "binop",
                                loc: [23, 22, 23, 35],
                                left: {
                                  kind: "id",
                                  loc: [23, 22, 23, 26],
                                  text: "name",
                                  bindingKey: "name$1suvpn3mvnkvg$3",
                                },
                                operatorToken: "+",
                                right: {
                                  kind: "string",
                                  loc: [23, 29, 23, 35],
                                  text: " at ",
                                },
                              },
                              operatorToken: "+",
                              right: {
                                kind: "()",
                                loc: [23, 38, 23, 50],
                                expression: {
                                  kind: ".",
                                  loc: [23, 38, 23, 48],
                                  expression: {
                                    kind: "id",
                                    loc: [23, 38, 23, 43],
                                    text: "index",
                                    bindingKey: "index$1suvpn3mvnkvg$4",
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
export default _jsx(Rows, {});
