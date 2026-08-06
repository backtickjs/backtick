import { jsx as _jsx } from "@backtickjs/core/jsx-runtime";
import { cs, state, View } from "@backtickjs/core";
// An element a script writes, rather than one the host wrote and the script
// spliced in. What it lowers to is the node a tree entry builds, so the two
// spellings draw the same thing — the difference is where the element is
// written, not what it is.
async function Card() {
  const label = state("hi");
  // A handler written inline and one held under a name: both are client code,
  // and a handler prop takes `Client<() => void>` and nothing else.
  const row = cs.create(
    [12, 15, 28, 5],
    {
      version: "0.0.0",
      filePath: "script-element.tsx",
      fileHash: "38xnrt94rygy7",
      kind: "value",
      splices: { $label: label },
      captures: [],
      spliceParams: { $label: [] },
    },
    () => ({
      kind: 220,
      loc: [12, 18, 28, 4],
      parameters: [
        {
          kind: 170,
          loc: [12, 19, 12, 31],
          name: {
            kind: 80,
            loc: [12, 19, 12, 23],
            text: "size",
            bindingKey: "size$38xnrt94rygy7$0",
          },
        },
      ],
      body: {
        kind: 242,
        loc: [12, 36, 28, 4],
        statements: [
          {
            kind: 244,
            loc: [13, 5, 13, 46],
            declarationList: {
              kind: 262,
              loc: [13, 5, 13, 45],
              declarations: [
                {
                  kind: 261,
                  loc: [13, 11, 13, 45],
                  name: {
                    kind: 80,
                    loc: [13, 11, 13, 16],
                    text: "press",
                    bindingKey: "press$38xnrt94rygy7$1",
                  },
                  initializer: {
                    kind: 220,
                    loc: [13, 19, 13, 45],
                    parameters: [],
                    body: {
                      kind: 214,
                      loc: [13, 25, 13, 45],
                      expression: {
                        kind: 212,
                        loc: [13, 25, 13, 37],
                        expression: {
                          kind: 1000,
                          loc: [13, 25, 13, 31],
                          key: "$label",
                        },
                        questionDotToken: false,
                        name: "write",
                      },
                      questionDotToken: false,
                      arguments: [
                        {
                          kind: 11,
                          loc: [13, 38, 13, 44],
                          text: "held",
                        },
                      ],
                    },
                  },
                },
              ],
              keyword: "const",
            },
          },
          {
            kind: 254,
            loc: [14, 5, 27, 7],
            expression: {
              kind: 285,
              loc: [15, 7, 26, 14],
              tagName: {
                kind: 11,
                loc: [15, 8, 15, 12],
                text: "View",
              },
              attributes: [
                {
                  name: "style",
                  initializer: {
                    kind: 211,
                    loc: [15, 20, 15, 37],
                    properties: [
                      {
                        kind: 304,
                        loc: [15, 22, 15, 35],
                        name: "padding",
                        initializer: {
                          kind: 80,
                          loc: [15, 31, 15, 35],
                          text: "size",
                          bindingKey: "size$38xnrt94rygy7$0",
                        },
                      },
                    ],
                  },
                },
              ],
              children: [
                {
                  kind: 285,
                  loc: [16, 9, 21, 16],
                  tagName: {
                    kind: 11,
                    loc: [16, 10, 16, 14],
                    text: "Text",
                  },
                  attributes: [
                    {
                      name: "style",
                      initializer: {
                        kind: 211,
                        loc: [17, 18, 17, 36],
                        properties: [
                          {
                            kind: 304,
                            loc: [17, 20, 17, 34],
                            name: "fontSize",
                            initializer: {
                              kind: 80,
                              loc: [17, 30, 17, 34],
                              text: "size",
                              bindingKey: "size$38xnrt94rygy7$0",
                            },
                          },
                        ],
                      },
                    },
                    {
                      name: "onPress",
                      initializer: {
                        kind: 220,
                        loc: [18, 20, 18, 49],
                        parameters: [],
                        body: {
                          kind: 214,
                          loc: [18, 26, 18, 49],
                          expression: {
                            kind: 212,
                            loc: [18, 26, 18, 38],
                            expression: {
                              kind: 1000,
                              loc: [18, 26, 18, 32],
                              key: "$label",
                            },
                            questionDotToken: false,
                            name: "write",
                          },
                          questionDotToken: false,
                          arguments: [
                            {
                              kind: 11,
                              loc: [18, 39, 18, 48],
                              text: "pressed",
                            },
                          ],
                        },
                      },
                    },
                  ],
                  children: [
                    {
                      kind: 214,
                      loc: [20, 12, 20, 25],
                      expression: {
                        kind: 212,
                        loc: [20, 12, 20, 23],
                        expression: {
                          kind: 1000,
                          loc: [20, 12, 20, 18],
                          key: "$label",
                        },
                        questionDotToken: false,
                        name: "read",
                      },
                      questionDotToken: false,
                      arguments: [],
                    },
                  ],
                },
                {
                  kind: 285,
                  loc: [22, 9, 22, 51],
                  tagName: {
                    kind: 11,
                    loc: [22, 10, 22, 14],
                    text: "Text",
                  },
                  attributes: [
                    {
                      name: "style",
                      initializer: {
                        kind: 211,
                        loc: [22, 22, 22, 37],
                        properties: [
                          {
                            kind: 304,
                            loc: [22, 24, 22, 35],
                            name: "fontSize",
                            initializer: {
                              kind: 9,
                              loc: [22, 34, 22, 35],
                              value: 8,
                            },
                          },
                        ],
                      },
                    },
                  ],
                  children: [
                    {
                      kind: 11,
                      loc: [22, 39, 22, 44],
                      text: "fixed",
                    },
                  ],
                },
                {
                  kind: 285,
                  loc: [23, 9, 25, 16],
                  tagName: {
                    kind: 11,
                    loc: [23, 10, 23, 14],
                    text: "Text",
                  },
                  attributes: [
                    {
                      name: "style",
                      initializer: {
                        kind: 211,
                        loc: [23, 22, 23, 40],
                        properties: [
                          {
                            kind: 304,
                            loc: [23, 24, 23, 38],
                            name: "fontSize",
                            initializer: {
                              kind: 80,
                              loc: [23, 34, 23, 38],
                              text: "size",
                              bindingKey: "size$38xnrt94rygy7$0",
                            },
                          },
                        ],
                      },
                    },
                    {
                      name: "onPress",
                      initializer: {
                        kind: 80,
                        loc: [23, 51, 23, 56],
                        text: "press",
                        bindingKey: "press$38xnrt94rygy7$1",
                      },
                    },
                  ],
                  children: [
                    {
                      kind: 11,
                      loc: [24, 11, 25, 9],
                      text: "held",
                    },
                  ],
                },
              ],
            },
          },
        ],
      },
    }),
  );
  return _jsx(View, {
    style: { padding: 0 },
    children: cs.create(
      [30, 40, 30, 52],
      {
        version: "0.0.0",
        filePath: "script-element.tsx",
        fileHash: "38xnrt94rygy7",
        kind: "value",
        splices: { $row: row },
        captures: [],
        spliceParams: { $row: [] },
      },
      () => ({
        kind: 214,
        loc: [30, 43, 30, 51],
        expression: {
          kind: 1000,
          loc: [30, 43, 30, 47],
          key: "$row",
        },
        questionDotToken: false,
        arguments: [
          {
            kind: 9,
            loc: [30, 48, 30, 50],
            value: 12,
          },
        ],
      }),
    ),
  });
}
export default _jsx(Card, {});
