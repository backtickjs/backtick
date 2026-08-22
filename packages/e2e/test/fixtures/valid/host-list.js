import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { cs, state, For } from "@backtickjs/core";
// The drawing `script-component` makes, written the other way: the cell is one
// the component declares and the client owns, and `<For />` is a tag the host
// wrote. The pair is there to be read side by side — same rows, same handler,
// same markup — so what differs between the two bundles is where a thing was
// written and nothing else.
//
// Everything the client does still crosses as a script, because that is what a
// prop admits: `each` is one, the child is one, and the handler inside the
// child is one. The difference is that here each of them is a `cs` template the
// source spelled, where in the other the tag's props are expressions the script
// already held and the compiler passes to what the component drew.
async function Rows() {
  const build = cs.create(
    [20, 17, 24, 5],
    {
      version: "0.0.0",
      filePath: "host-list.tsx",
      fileHash: "13mbjijmr5w0d",
      kind: "value",
      splices: {},
      captures: [],
      spliceParams: {},
    },
    () => ({
      kind: 220,
      loc: [20, 20, 24, 4],
      parameters: [
        {
          kind: 170,
          loc: [20, 21, 20, 33],
          name: {
            kind: 80,
            loc: [20, 21, 20, 25],
            text: "from",
            bindingKey: "from$13mbjijmr5w0d$0",
          },
        },
      ],
      body: {
        kind: 242,
        loc: [20, 38, 24, 4],
        statements: [
          {
            kind: 254,
            loc: [21, 5, 23, 8],
            expression: {
              kind: 214,
              loc: [21, 12, 23, 7],
              expression: {
                kind: 1001,
                loc: [21, 12, 21, 22],
                name: "Array.from",
              },
              questionDotToken: false,
              arguments: [
                {
                  kind: 211,
                  loc: [21, 23, 21, 36],
                  properties: [
                    {
                      kind: 304,
                      loc: [21, 25, 21, 34],
                      name: "length",
                      initializer: {
                        kind: 9,
                        loc: [21, 33, 21, 34],
                        value: 3,
                      },
                    },
                  ],
                },
                {
                  kind: 220,
                  loc: [21, 38, 23, 6],
                  parameters: [
                    {
                      kind: 170,
                      loc: [21, 39, 21, 40],
                      name: {
                        kind: 80,
                        loc: [21, 39, 21, 40],
                        text: "_",
                        bindingKey: "_$13mbjijmr5w0d$1",
                      },
                    },
                    {
                      kind: 170,
                      loc: [21, 42, 21, 44],
                      name: {
                        kind: 80,
                        loc: [21, 42, 21, 44],
                        text: "at",
                        bindingKey: "at$13mbjijmr5w0d$2",
                      },
                    },
                  ],
                  body: {
                    kind: 242,
                    loc: [21, 49, 23, 6],
                    statements: [
                      {
                        kind: 254,
                        loc: [22, 7, 22, 68],
                        expression: {
                          kind: 211,
                          loc: [22, 14, 22, 67],
                          properties: [
                            {
                              kind: 304,
                              loc: [22, 16, 22, 29],
                              name: "id",
                              initializer: {
                                kind: 227,
                                loc: [22, 20, 22, 29],
                                left: {
                                  kind: 80,
                                  loc: [22, 20, 22, 24],
                                  text: "from",
                                  bindingKey: "from$13mbjijmr5w0d$0",
                                },
                                operatorToken: "+",
                                right: {
                                  kind: 80,
                                  loc: [22, 27, 22, 29],
                                  text: "at",
                                  bindingKey: "at$13mbjijmr5w0d$2",
                                },
                              },
                            },
                            {
                              kind: 304,
                              loc: [22, 31, 22, 65],
                              name: "label",
                              initializer: {
                                kind: 214,
                                loc: [22, 38, 22, 65],
                                expression: {
                                  kind: 1001,
                                  loc: [22, 38, 22, 43],
                                  name: "state",
                                },
                                questionDotToken: false,
                                arguments: [
                                  {
                                    kind: 227,
                                    loc: [22, 44, 22, 64],
                                    left: {
                                      kind: 11,
                                      loc: [22, 44, 22, 50],
                                      text: "row ",
                                    },
                                    operatorToken: "+",
                                    right: {
                                      kind: 227,
                                      loc: [22, 54, 22, 63],
                                      left: {
                                        kind: 80,
                                        loc: [22, 54, 22, 58],
                                        text: "from",
                                        bindingKey: "from$13mbjijmr5w0d$0",
                                      },
                                      operatorToken: "+",
                                      right: {
                                        kind: 80,
                                        loc: [22, 61, 22, 63],
                                        text: "at",
                                        bindingKey: "at$13mbjijmr5w0d$2",
                                      },
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    }),
  );
  const held = state(
    cs.create(
      [26, 22, 26, 35],
      {
        version: "0.0.0",
        filePath: "host-list.tsx",
        fileHash: "13mbjijmr5w0d",
        kind: "value",
        splices: { $build: build },
        captures: [],
        spliceParams: { $build: [] },
      },
      () => ({
        kind: 214,
        loc: [26, 25, 26, 34],
        expression: {
          kind: 1000,
          loc: [26, 25, 26, 31],
          key: "$build",
        },
        questionDotToken: false,
        arguments: [
          {
            kind: 9,
            loc: [26, 32, 26, 33],
            value: 1,
          },
        ],
      }),
    ),
  );
  return _jsx("div", {
    children: _jsx("ul", {
      class: "rows",
      children: _jsx(For, {
        each: cs.create(
          [31, 20, 31, 36],
          {
            version: "0.0.0",
            filePath: "host-list.tsx",
            fileHash: "13mbjijmr5w0d",
            kind: "value",
            splices: { $held: held },
            captures: [],
            spliceParams: { $held: [] },
          },
          () => ({
            kind: 214,
            loc: [31, 23, 31, 35],
            expression: {
              kind: 212,
              loc: [31, 23, 31, 33],
              expression: {
                kind: 1000,
                loc: [31, 23, 31, 28],
                key: "$held",
              },
              questionDotToken: false,
              name: "read",
            },
            questionDotToken: false,
            arguments: [],
          }),
        ),
        children: cs.create(
          [32, 12, 36, 14],
          {
            version: "0.0.0",
            filePath: "host-list.tsx",
            fileHash: "13mbjijmr5w0d",
            kind: "value",
            splices: {},
            captures: [],
            spliceParams: {},
          },
          () => ({
            kind: 220,
            loc: [32, 15, 36, 12],
            parameters: [
              {
                kind: 170,
                loc: [32, 16, 32, 24],
                name: {
                  kind: 80,
                  loc: [32, 16, 32, 19],
                  text: "row",
                  bindingKey: "row$13mbjijmr5w0d$3",
                },
              },
            ],
            body: {
              kind: 285,
              loc: [33, 13, 35, 18],
              type: {
                kind: 11,
                loc: [33, 14, 33, 16],
                text: "li",
              },
              attributes: [
                {
                  name: "onclick",
                  initializer: {
                    kind: 220,
                    loc: [33, 26, 33, 58],
                    parameters: [],
                    body: {
                      kind: 214,
                      loc: [33, 32, 33, 58],
                      expression: {
                        kind: 212,
                        loc: [33, 32, 33, 47],
                        expression: {
                          kind: 212,
                          loc: [33, 32, 33, 41],
                          expression: {
                            kind: 80,
                            loc: [33, 32, 33, 35],
                            text: "row",
                            bindingKey: "row$13mbjijmr5w0d$3",
                          },
                          questionDotToken: false,
                          name: "label",
                        },
                        questionDotToken: false,
                        name: "write",
                      },
                      questionDotToken: false,
                      arguments: [
                        {
                          kind: 11,
                          loc: [33, 48, 33, 57],
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
                  loc: [34, 16, 34, 32],
                  expression: {
                    kind: 212,
                    loc: [34, 16, 34, 30],
                    expression: {
                      kind: 212,
                      loc: [34, 16, 34, 25],
                      expression: {
                        kind: 80,
                        loc: [34, 16, 34, 19],
                        text: "row",
                        bindingKey: "row$13mbjijmr5w0d$3",
                      },
                      questionDotToken: false,
                      name: "label",
                    },
                    questionDotToken: false,
                    name: "read",
                  },
                  questionDotToken: false,
                  arguments: [],
                },
              ],
            },
          }),
        ),
      }),
    }),
  });
}
export default _jsx(Rows, {});
