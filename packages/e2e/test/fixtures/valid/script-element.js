import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { cs, state } from "@backtickjs/core";
// An element a script writes, rather than one the host wrote and the script
// spliced in. What it lowers to is the node a tree entry builds, so the two
// spellings draw the same thing — the difference is where the element is
// written, not what it is.
async function Card() {
  const label = state("hi");
  // A handler written inline and one held under a name: both are client code,
  // and a handler prop takes `Client<() => void>` and nothing else.
  const row = cs.create(
    [12, 15, 26, 5],
    {
      version: "0.0.0",
      filePath: "script-element.tsx",
      fileHash: "kj57tcnfhdwx",
      kind: "value",
      splices: { $label: label },
      captures: [],
      spliceParams: { $label: [] },
    },
    () => ({
      kind: 220,
      loc: [12, 18, 26, 4],
      parameters: [
        {
          kind: 170,
          loc: [12, 19, 12, 31],
          name: {
            kind: 80,
            loc: [12, 19, 12, 23],
            text: "size",
            bindingKey: "size$kj57tcnfhdwx$0",
          },
        },
      ],
      body: {
        kind: 242,
        loc: [12, 36, 26, 4],
        statements: [
          {
            kind: 244,
            loc: [13, 5, 13, 45],
            declarationList: {
              kind: 262,
              loc: [13, 5, 13, 44],
              declarations: [
                {
                  kind: 261,
                  loc: [13, 11, 13, 44],
                  name: {
                    kind: 80,
                    loc: [13, 11, 13, 14],
                    text: "css",
                    bindingKey: "css$kj57tcnfhdwx$1",
                  },
                  initializer: {
                    kind: 227,
                    loc: [13, 17, 13, 44],
                    left: {
                      kind: 227,
                      loc: [13, 17, 13, 37],
                      left: {
                        kind: 11,
                        loc: [13, 17, 13, 30],
                        text: "font-size: ",
                      },
                      operatorToken: "+",
                      right: {
                        kind: 80,
                        loc: [13, 33, 13, 37],
                        text: "size",
                        bindingKey: "size$kj57tcnfhdwx$0",
                      },
                    },
                    operatorToken: "+",
                    right: {
                      kind: 11,
                      loc: [13, 40, 13, 44],
                      text: "px",
                    },
                  },
                },
              ],
              keyword: "const",
            },
          },
          {
            kind: 244,
            loc: [14, 5, 14, 46],
            declarationList: {
              kind: 262,
              loc: [14, 5, 14, 45],
              declarations: [
                {
                  kind: 261,
                  loc: [14, 11, 14, 45],
                  name: {
                    kind: 80,
                    loc: [14, 11, 14, 16],
                    text: "press",
                    bindingKey: "press$kj57tcnfhdwx$2",
                  },
                  initializer: {
                    kind: 220,
                    loc: [14, 19, 14, 45],
                    parameters: [],
                    body: {
                      kind: 214,
                      loc: [14, 25, 14, 45],
                      expression: {
                        kind: 212,
                        loc: [14, 25, 14, 37],
                        expression: {
                          kind: 1000,
                          loc: [14, 25, 14, 31],
                          key: "$label",
                        },
                        questionDotToken: false,
                        name: "write",
                      },
                      questionDotToken: false,
                      arguments: [
                        {
                          kind: 11,
                          loc: [14, 38, 14, 44],
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
            loc: [15, 5, 25, 7],
            expression: {
              kind: 285,
              loc: [16, 7, 24, 13],
              tagName: {
                kind: 11,
                loc: [16, 8, 16, 11],
                text: "div",
              },
              attributes: [
                {
                  name: "style",
                  initializer: {
                    kind: 80,
                    loc: [16, 19, 16, 22],
                    text: "css",
                    bindingKey: "css$kj57tcnfhdwx$1",
                  },
                },
              ],
              children: [
                {
                  kind: 285,
                  loc: [17, 9, 19, 16],
                  tagName: {
                    kind: 11,
                    loc: [17, 10, 17, 14],
                    text: "span",
                  },
                  attributes: [
                    {
                      name: "style",
                      initializer: {
                        kind: 80,
                        loc: [17, 22, 17, 25],
                        text: "css",
                        bindingKey: "css$kj57tcnfhdwx$1",
                      },
                    },
                    {
                      name: "onclick",
                      initializer: {
                        kind: 220,
                        loc: [17, 36, 17, 65],
                        parameters: [],
                        body: {
                          kind: 214,
                          loc: [17, 42, 17, 65],
                          expression: {
                            kind: 212,
                            loc: [17, 42, 17, 54],
                            expression: {
                              kind: 1000,
                              loc: [17, 42, 17, 48],
                              key: "$label",
                            },
                            questionDotToken: false,
                            name: "write",
                          },
                          questionDotToken: false,
                          arguments: [
                            {
                              kind: 11,
                              loc: [17, 55, 17, 64],
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
                      loc: [18, 12, 18, 25],
                      expression: {
                        kind: 212,
                        loc: [18, 12, 18, 23],
                        expression: {
                          kind: 1000,
                          loc: [18, 12, 18, 18],
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
                  loc: [20, 9, 20, 50],
                  tagName: {
                    kind: 11,
                    loc: [20, 10, 20, 14],
                    text: "span",
                  },
                  attributes: [
                    {
                      name: "style",
                      initializer: {
                        kind: 11,
                        loc: [20, 21, 20, 37],
                        text: "font-size: 8px",
                      },
                    },
                  ],
                  children: [
                    {
                      kind: 11,
                      loc: [20, 38, 20, 43],
                      text: "fixed",
                    },
                  ],
                },
                {
                  kind: 285,
                  loc: [21, 9, 23, 16],
                  tagName: {
                    kind: 11,
                    loc: [21, 10, 21, 14],
                    text: "span",
                  },
                  attributes: [
                    {
                      name: "style",
                      initializer: {
                        kind: 80,
                        loc: [21, 22, 21, 25],
                        text: "css",
                        bindingKey: "css$kj57tcnfhdwx$1",
                      },
                    },
                    {
                      name: "onclick",
                      initializer: {
                        kind: 80,
                        loc: [21, 36, 21, 41],
                        text: "press",
                        bindingKey: "press$kj57tcnfhdwx$2",
                      },
                    },
                  ],
                  children: [
                    {
                      kind: 11,
                      loc: [22, 11, 23, 9],
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
  return _jsx("div", {
    style: "padding: 0",
    children: cs.create(
      [28, 35, 28, 47],
      {
        version: "0.0.0",
        filePath: "script-element.tsx",
        fileHash: "kj57tcnfhdwx",
        kind: "value",
        splices: { $row: row },
        captures: [],
        spliceParams: { $row: [] },
      },
      () => ({
        kind: 214,
        loc: [28, 38, 28, 46],
        expression: {
          kind: 1000,
          loc: [28, 38, 28, 42],
          key: "$row",
        },
        questionDotToken: false,
        arguments: [
          {
            kind: 9,
            loc: [28, 43, 28, 45],
            value: 12,
          },
        ],
      }),
    ),
  });
}
export default _jsx(Card, {});
