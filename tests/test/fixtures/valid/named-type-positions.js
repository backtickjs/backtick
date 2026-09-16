import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { cs, For, state } from "@backtickjs/core";
async function Rows() {
  return cs.create(
    [16, 10, 34, 5],
    {
      version: "0.0.0",
      filePath: "named-type-positions.tsx",
      fileHash: "2tgsecr7whml2",
      splices: {
        $state: { value: state, params: [] },
        $For: { value: For, params: [] },
      },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [16, 13, 34, 4],
      statements: [
        {
          kind: "const",
          loc: [17, 5, 17, 36],
          name: {
            kind: "id",
            loc: [17, 11, 17, 15],
            text: "rows",
            bindingKey: "rows$2tgsecr7whml2$0",
          },
          initializer: {
            kind: "()",
            loc: [17, 18, 17, 35],
            expression: {
              kind: "splice",
              loc: [17, 18, 17, 24],
              key: "$state",
            },
            arguments: [
              {
                kind: "arr",
                loc: [17, 32, 17, 34],
                elements: [],
              },
            ],
          },
        },
        {
          kind: "const",
          loc: [18, 5, 20, 7],
          name: {
            kind: "id",
            loc: [18, 11, 18, 14],
            text: "add",
            bindingKey: "add$2tgsecr7whml2$1",
          },
          initializer: {
            kind: "=>",
            loc: [18, 17, 20, 6],
            parameters: [
              {
                kind: "param",
                loc: [18, 18, 18, 26],
                name: {
                  kind: "id",
                  loc: [18, 18, 18, 21],
                  text: "row",
                  bindingKey: "row$2tgsecr7whml2$3",
                },
              },
            ],
            body: {
              kind: "{}",
              loc: [18, 31, 20, 6],
              statements: [
                {
                  kind: "()",
                  loc: [19, 7, 19, 24],
                  expression: {
                    kind: ".",
                    loc: [19, 7, 19, 17],
                    expression: {
                      kind: "id",
                      loc: [19, 7, 19, 11],
                      text: "rows",
                      bindingKey: "rows$2tgsecr7whml2$0",
                    },
                    name: "write",
                  },
                  arguments: [
                    {
                      kind: "arr",
                      loc: [19, 18, 19, 23],
                      elements: [
                        {
                          kind: "id",
                          loc: [19, 19, 19, 22],
                          text: "row",
                          bindingKey: "row$2tgsecr7whml2$3",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          },
        },
        {
          kind: "const",
          loc: [21, 5, 23, 7],
          name: {
            kind: "id",
            loc: [21, 11, 21, 16],
            text: "label",
            bindingKey: "label$2tgsecr7whml2$2",
          },
          initializer: {
            kind: "=>",
            loc: [21, 19, 23, 6],
            parameters: [
              {
                kind: "param",
                loc: [21, 20, 21, 28],
                name: {
                  kind: "id",
                  loc: [21, 20, 21, 23],
                  text: "row",
                  bindingKey: "row$2tgsecr7whml2$4",
                },
              },
            ],
            body: {
              kind: "{}",
              loc: [21, 33, 23, 6],
              statements: [
                {
                  kind: "return",
                  loc: [22, 7, 22, 24],
                  expression: {
                    kind: ".",
                    loc: [22, 14, 22, 23],
                    expression: {
                      kind: "id",
                      loc: [22, 14, 22, 17],
                      text: "row",
                      bindingKey: "row$2tgsecr7whml2$4",
                    },
                    name: "label",
                  },
                },
              ],
            },
          },
        },
        {
          kind: "return",
          loc: [24, 5, 33, 7],
          expression: {
            kind: "jsx",
            loc: [25, 7, 32, 13],
            type: {
              kind: "string",
              loc: [25, 8, 25, 11],
              text: "div",
            },
            attributes: [],
            children: [
              {
                kind: "jsx",
                loc: [26, 9, 26, 70],
                type: {
                  kind: "string",
                  loc: [26, 10, 26, 14],
                  text: "span",
                },
                attributes: [
                  {
                    name: "onclick",
                    initializer: {
                      kind: "=>",
                      loc: [26, 24, 26, 58],
                      parameters: [],
                      body: {
                        kind: "()",
                        loc: [26, 30, 26, 58],
                        expression: {
                          kind: "id",
                          loc: [26, 30, 26, 33],
                          text: "add",
                          bindingKey: "add$2tgsecr7whml2$1",
                        },
                        arguments: [
                          {
                            kind: "obj",
                            loc: [26, 34, 26, 57],
                            properties: [
                              {
                                kind: ":",
                                loc: [26, 36, 26, 41],
                                name: "id",
                                initializer: {
                                  kind: "number",
                                  loc: [26, 40, 26, 41],
                                  value: 1,
                                },
                              },
                              {
                                kind: ":",
                                loc: [26, 43, 26, 55],
                                name: "label",
                                initializer: {
                                  kind: "string",
                                  loc: [26, 50, 26, 55],
                                  text: "one",
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
                    loc: [26, 60, 26, 63],
                    text: "add",
                  },
                ],
              },
              {
                kind: "jsx",
                loc: [27, 9, 31, 15],
                type: {
                  kind: "string",
                  loc: [27, 10, 27, 13],
                  text: "div",
                },
                attributes: [],
                children: [
                  {
                    kind: "jsx",
                    loc: [28, 11, 30, 17],
                    type: {
                      kind: "splice",
                      loc: [28, 12, 28, 15],
                      key: "$For",
                    },
                    attributes: [
                      {
                        name: "each",
                        initializer: {
                          kind: "()",
                          loc: [28, 22, 28, 33],
                          expression: {
                            kind: ".",
                            loc: [28, 22, 28, 31],
                            expression: {
                              kind: "id",
                              loc: [28, 22, 28, 26],
                              text: "rows",
                              bindingKey: "rows$2tgsecr7whml2$0",
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
                        loc: [29, 14, 29, 53],
                        parameters: [
                          {
                            kind: "param",
                            loc: [29, 15, 29, 23],
                            name: {
                              kind: "id",
                              loc: [29, 15, 29, 18],
                              text: "row",
                              bindingKey: "row$2tgsecr7whml2$5",
                            },
                          },
                        ],
                        body: {
                          kind: "jsx",
                          loc: [29, 28, 29, 53],
                          type: {
                            kind: "string",
                            loc: [29, 29, 29, 33],
                            text: "span",
                          },
                          attributes: [],
                          children: [
                            {
                              kind: "()",
                              loc: [29, 35, 29, 45],
                              expression: {
                                kind: "id",
                                loc: [29, 35, 29, 40],
                                text: "label",
                                bindingKey: "label$2tgsecr7whml2$2",
                              },
                              arguments: [
                                {
                                  kind: "id",
                                  loc: [29, 41, 29, 44],
                                  text: "row",
                                  bindingKey: "row$2tgsecr7whml2$5",
                                },
                              ],
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
