import { cs, state } from "@backtickjs/core";
// An object with storage of its own, made by a client function: `state` holds
// what it is, arrows are what may be done to it, and the object hands them over
// together. Reading is a value, so it stands in a children position; writing is
// an action, so it stands in a handler.
const counter = cs.create(
  [7, 17, 15, 3],
  {
    version: "0.0.0",
    filePath: "statefulObject.tsx",
    fileHash: "a0al5l79c40",
    splices: { $state: { value: state, params: [] } },
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [7, 20, 15, 2],
    parameters: [
      {
        kind: "param",
        loc: [7, 21, 7, 36],
        name: {
          kind: "id",
          loc: [7, 21, 7, 28],
          text: "initial",
          bindingKey: "initial$a0al5l79c40$0",
        },
      },
    ],
    body: {
      kind: "{}",
      loc: [7, 41, 15, 2],
      statements: [
        {
          kind: "const",
          loc: [8, 3, 8, 33],
          name: {
            kind: "id",
            loc: [8, 9, 8, 14],
            text: "count",
            bindingKey: "count$a0al5l79c40$1",
          },
          initializer: {
            kind: "()",
            loc: [8, 17, 8, 32],
            expression: {
              kind: "splice",
              loc: [8, 17, 8, 23],
              key: "$state",
            },
            arguments: [
              {
                kind: "id",
                loc: [8, 24, 8, 31],
                text: "initial",
                bindingKey: "initial$a0al5l79c40$0",
              },
            ],
          },
        },
        {
          kind: "return",
          loc: [9, 3, 14, 5],
          expression: {
            kind: "obj",
            loc: [9, 10, 14, 4],
            properties: [
              {
                kind: ":",
                loc: [10, 5, 10, 29],
                name: "read",
                initializer: {
                  kind: "=>",
                  loc: [10, 11, 10, 29],
                  parameters: [],
                  body: {
                    kind: "()",
                    loc: [10, 17, 10, 29],
                    expression: {
                      kind: ".",
                      loc: [10, 17, 10, 27],
                      expression: {
                        kind: "id",
                        loc: [10, 17, 10, 22],
                        text: "count",
                        bindingKey: "count$a0al5l79c40$1",
                      },
                      name: "read",
                    },
                    arguments: [],
                  },
                },
              },
              {
                kind: ":",
                loc: [11, 5, 13, 6],
                name: "add",
                initializer: {
                  kind: "=>",
                  loc: [11, 10, 13, 6],
                  parameters: [
                    {
                      kind: "param",
                      loc: [11, 11, 11, 20],
                      name: {
                        kind: "id",
                        loc: [11, 11, 11, 12],
                        text: "n",
                        bindingKey: "n$a0al5l79c40$2",
                      },
                    },
                  ],
                  body: {
                    kind: "{}",
                    loc: [11, 25, 13, 6],
                    statements: [
                      {
                        kind: "()",
                        loc: [12, 7, 12, 36],
                        expression: {
                          kind: ".",
                          loc: [12, 7, 12, 18],
                          expression: {
                            kind: "id",
                            loc: [12, 7, 12, 12],
                            text: "count",
                            bindingKey: "count$a0al5l79c40$1",
                          },
                          name: "write",
                        },
                        arguments: [
                          {
                            kind: "binop",
                            loc: [12, 19, 12, 35],
                            left: {
                              kind: "()",
                              loc: [12, 19, 12, 31],
                              expression: {
                                kind: ".",
                                loc: [12, 19, 12, 29],
                                expression: {
                                  kind: "id",
                                  loc: [12, 19, 12, 24],
                                  text: "count",
                                  bindingKey: "count$a0al5l79c40$1",
                                },
                                name: "read",
                              },
                              arguments: [],
                            },
                            operatorToken: "+",
                            right: {
                              kind: "id",
                              loc: [12, 34, 12, 35],
                              text: "n",
                              bindingKey: "n$a0al5l79c40$2",
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
const statefulObject = cs.create(
  [17, 24, 28, 3],
  {
    version: "0.0.0",
    filePath: "statefulObject.tsx",
    fileHash: "a0al5l79c40",
    splices: { $counter: { value: counter, params: [] } },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [17, 27, 28, 2],
    statements: [
      {
        kind: "const",
        loc: [18, 3, 18, 26],
        name: {
          kind: "id",
          loc: [18, 9, 18, 10],
          text: "c",
          bindingKey: "c$a0al5l79c40$3",
        },
        initializer: {
          kind: "()",
          loc: [18, 13, 18, 25],
          expression: {
            kind: "splice",
            loc: [18, 13, 18, 21],
            key: "$counter",
          },
          arguments: [
            {
              kind: "number",
              loc: [18, 22, 18, 24],
              value: 10,
            },
          ],
        },
      },
      {
        kind: "return",
        loc: [19, 3, 27, 5],
        expression: {
          kind: "jsx",
          loc: [20, 5, 26, 14],
          type: {
            kind: "string",
            loc: [20, 6, 20, 12],
            text: "button",
          },
          attributes: [
            {
              name: "onclick",
              initializer: {
                kind: "=>",
                loc: [21, 16, 23, 8],
                parameters: [],
                body: {
                  kind: "{}",
                  loc: [21, 22, 23, 8],
                  statements: [
                    {
                      kind: "()",
                      loc: [22, 9, 22, 17],
                      expression: {
                        kind: ".",
                        loc: [22, 9, 22, 14],
                        expression: {
                          kind: "id",
                          loc: [22, 9, 22, 10],
                          text: "c",
                          bindingKey: "c$a0al5l79c40$3",
                        },
                        name: "add",
                      },
                      arguments: [
                        {
                          kind: "number",
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
              kind: "()",
              loc: [25, 8, 25, 16],
              expression: {
                kind: ".",
                loc: [25, 8, 25, 14],
                expression: {
                  kind: "id",
                  loc: [25, 8, 25, 9],
                  text: "c",
                  bindingKey: "c$a0al5l79c40$3",
                },
                name: "read",
              },
              arguments: [],
            },
          ],
        },
      },
    ],
  }),
);
