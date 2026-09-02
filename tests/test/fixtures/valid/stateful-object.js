import { cs, state } from "@backtickjs/core";
// An object with storage of its own, made by a client function: `state` holds
// what it is, arrows are what may be done to it, and the object hands them over
// together. Reading is a value, so it stands in a children position; writing is
// an action, so it stands in a handler.
const counter = cs.create(
  [7, 17, 15, 3],
  {
    version: "0.0.0",
    filePath: "stateful-object.tsx",
    fileHash: "1dleixj3nmlt2",
    splices: { $state: state },
    captures: [],
    spliceParams: { $state: [] },
  },
  () => ({
    kind: 220,
    loc: [7, 20, 15, 2],
    parameters: [
      {
        kind: 170,
        loc: [7, 21, 7, 36],
        name: {
          kind: 80,
          loc: [7, 21, 7, 28],
          text: "initial",
          bindingKey: "initial$1dleixj3nmlt2$0",
        },
      },
    ],
    body: {
      kind: 242,
      loc: [7, 41, 15, 2],
      statements: [
        {
          kind: 244,
          loc: [8, 3, 8, 33],
          declarationList: {
            kind: 262,
            loc: [8, 3, 8, 32],
            declarations: [
              {
                kind: 261,
                loc: [8, 9, 8, 32],
                name: {
                  kind: 80,
                  loc: [8, 9, 8, 14],
                  text: "count",
                  bindingKey: "count$1dleixj3nmlt2$1",
                },
                initializer: {
                  kind: 214,
                  loc: [8, 17, 8, 32],
                  expression: {
                    kind: 1000,
                    loc: [8, 17, 8, 23],
                    key: "$state",
                  },
                  questionDotToken: false,
                  arguments: [
                    {
                      kind: 80,
                      loc: [8, 24, 8, 31],
                      text: "initial",
                      bindingKey: "initial$1dleixj3nmlt2$0",
                    },
                  ],
                },
              },
            ],
            keyword: "const",
          },
        },
        {
          kind: 254,
          loc: [9, 3, 14, 5],
          expression: {
            kind: 211,
            loc: [9, 10, 14, 4],
            properties: [
              {
                kind: 304,
                loc: [10, 5, 10, 29],
                name: "read",
                initializer: {
                  kind: 220,
                  loc: [10, 11, 10, 29],
                  parameters: [],
                  body: {
                    kind: 214,
                    loc: [10, 17, 10, 29],
                    expression: {
                      kind: 212,
                      loc: [10, 17, 10, 27],
                      expression: {
                        kind: 80,
                        loc: [10, 17, 10, 22],
                        text: "count",
                        bindingKey: "count$1dleixj3nmlt2$1",
                      },
                      questionDotToken: false,
                      name: "read",
                    },
                    questionDotToken: false,
                    arguments: [],
                  },
                },
              },
              {
                kind: 304,
                loc: [11, 5, 13, 6],
                name: "add",
                initializer: {
                  kind: 220,
                  loc: [11, 10, 13, 6],
                  parameters: [
                    {
                      kind: 170,
                      loc: [11, 11, 11, 20],
                      name: {
                        kind: 80,
                        loc: [11, 11, 11, 12],
                        text: "n",
                        bindingKey: "n$1dleixj3nmlt2$2",
                      },
                    },
                  ],
                  body: {
                    kind: 242,
                    loc: [11, 25, 13, 6],
                    statements: [
                      {
                        kind: 214,
                        loc: [12, 7, 12, 36],
                        expression: {
                          kind: 212,
                          loc: [12, 7, 12, 18],
                          expression: {
                            kind: 80,
                            loc: [12, 7, 12, 12],
                            text: "count",
                            bindingKey: "count$1dleixj3nmlt2$1",
                          },
                          questionDotToken: false,
                          name: "write",
                        },
                        questionDotToken: false,
                        arguments: [
                          {
                            kind: 227,
                            loc: [12, 19, 12, 35],
                            left: {
                              kind: 214,
                              loc: [12, 19, 12, 31],
                              expression: {
                                kind: 212,
                                loc: [12, 19, 12, 29],
                                expression: {
                                  kind: 80,
                                  loc: [12, 19, 12, 24],
                                  text: "count",
                                  bindingKey: "count$1dleixj3nmlt2$1",
                                },
                                questionDotToken: false,
                                name: "read",
                              },
                              questionDotToken: false,
                              arguments: [],
                            },
                            operatorToken: "+",
                            right: {
                              kind: 80,
                              loc: [12, 34, 12, 35],
                              text: "n",
                              bindingKey: "n$1dleixj3nmlt2$2",
                            },
                          },
                        ],
                      },
                    ],
                  },
                },
              },
            ],
          },
        },
      ],
    },
  }),
);
export default cs.create(
  [17, 16, 28, 3],
  {
    version: "0.0.0",
    filePath: "stateful-object.tsx",
    fileHash: "1dleixj3nmlt2",
    splices: { $counter: counter },
    captures: [],
    spliceParams: { $counter: [] },
  },
  () => ({
    kind: 242,
    loc: [17, 19, 28, 2],
    statements: [
      {
        kind: 244,
        loc: [18, 3, 18, 26],
        declarationList: {
          kind: 262,
          loc: [18, 3, 18, 25],
          declarations: [
            {
              kind: 261,
              loc: [18, 9, 18, 25],
              name: {
                kind: 80,
                loc: [18, 9, 18, 10],
                text: "c",
                bindingKey: "c$1dleixj3nmlt2$3",
              },
              initializer: {
                kind: 214,
                loc: [18, 13, 18, 25],
                expression: {
                  kind: 1000,
                  loc: [18, 13, 18, 21],
                  key: "$counter",
                },
                questionDotToken: false,
                arguments: [
                  {
                    kind: 9,
                    loc: [18, 22, 18, 24],
                    value: 10,
                  },
                ],
              },
            },
          ],
          keyword: "const",
        },
      },
      {
        kind: 254,
        loc: [19, 3, 27, 5],
        expression: {
          kind: 285,
          loc: [20, 5, 26, 14],
          type: {
            kind: 11,
            loc: [20, 6, 20, 12],
            text: "button",
          },
          attributes: [
            {
              name: "onclick",
              initializer: {
                kind: 220,
                loc: [21, 16, 23, 8],
                parameters: [],
                body: {
                  kind: 242,
                  loc: [21, 22, 23, 8],
                  statements: [
                    {
                      kind: 214,
                      loc: [22, 9, 22, 17],
                      expression: {
                        kind: 212,
                        loc: [22, 9, 22, 14],
                        expression: {
                          kind: 80,
                          loc: [22, 9, 22, 10],
                          text: "c",
                          bindingKey: "c$1dleixj3nmlt2$3",
                        },
                        questionDotToken: false,
                        name: "add",
                      },
                      questionDotToken: false,
                      arguments: [
                        {
                          kind: 9,
                          loc: [22, 15, 22, 16],
                          value: 5,
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
              kind: 214,
              loc: [25, 8, 25, 16],
              expression: {
                kind: 212,
                loc: [25, 8, 25, 14],
                expression: {
                  kind: 80,
                  loc: [25, 8, 25, 9],
                  text: "c",
                  bindingKey: "c$1dleixj3nmlt2$3",
                },
                questionDotToken: false,
                name: "read",
              },
              questionDotToken: false,
              arguments: [],
            },
          ],
        },
      },
    ],
  }),
);
