import { cs, state } from "@backtickjs/core";
// A host component whose script declares its own `Badge`, and draws what it was
// handed beside it.
async function Panel(props) {
  return cs.create(
    [7, 10, 15, 5],
    {
      version: "0.0.0",
      filePath: "scriptBoundTagCarried.tsx",
      fileHash: "39hfasgguatal",
      splices: { $props: { value: props, params: [] } },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [7, 13, 15, 4],
      statements: [
        {
          kind: "const",
          loc: [8, 5, 8, 65],
          name: {
            kind: "id",
            loc: [8, 11, 8, 16],
            text: "Badge",
            bindingKey: "Badge$39hfasgguatal$0",
          },
          initializer: {
            kind: "=>",
            loc: [8, 19, 8, 64],
            parameters: [
              {
                kind: "param",
                loc: [8, 20, 8, 36],
                name: {
                  kind: "id",
                  loc: [8, 20, 8, 21],
                  text: "p",
                  bindingKey: "p$39hfasgguatal$1",
                },
              },
            ],
            body: {
              kind: "jsx",
              loc: [8, 41, 8, 64],
              type: {
                kind: "string",
                loc: [8, 42, 8, 43],
                text: "i",
              },
              attributes: [],
              children: [
                {
                  kind: "binop",
                  loc: [8, 45, 8, 59],
                  left: {
                    kind: "string",
                    loc: [8, 45, 8, 53],
                    text: "panel ",
                  },
                  operatorToken: "+",
                  right: {
                    kind: ".",
                    loc: [8, 56, 8, 59],
                    expression: {
                      kind: "id",
                      loc: [8, 56, 8, 57],
                      text: "p",
                      bindingKey: "p$39hfasgguatal$1",
                    },
                    name: "n",
                  },
                },
              ],
            },
          },
        },
        {
          kind: "return",
          loc: [9, 5, 14, 7],
          expression: {
            kind: "jsx",
            loc: [10, 7, 13, 17],
            type: {
              kind: "string",
              loc: [10, 8, 10, 15],
              text: "section",
            },
            attributes: [],
            children: [
              {
                kind: "jsx",
                loc: [11, 9, 11, 24],
                type: {
                  kind: "id",
                  loc: [11, 10, 11, 15],
                  text: "Badge",
                  bindingKey: "Badge$39hfasgguatal$0",
                },
                attributes: [
                  {
                    name: "n",
                    initializer: {
                      kind: "number",
                      loc: [11, 19, 11, 20],
                      value: 0,
                    },
                  },
                ],
                children: [],
              },
              {
                kind: ".",
                loc: [12, 10, 12, 21],
                expression: {
                  kind: "splice",
                  loc: [12, 10, 12, 16],
                  key: "$props",
                },
                name: "body",
              },
            ],
          },
        },
      ],
    }),
  );
}
// A script handed to `Panel` as a prop, naming a function the script around it
// holds. It lands inside `Panel`'s script, whose own `Badge` is in scope there
// — and still calls the one it was written under, since that is the binding it
// carries. The tag holds children too, read through the same record.
const scriptBoundTagCarried = cs.create(
  [22, 31, 43, 3],
  {
    version: "0.0.0",
    filePath: "scriptBoundTagCarried.tsx",
    fileHash: "39hfasgguatal",
    splices: {
      $state: { value: state, params: [] },
      $0splice0: {
        value: cs.create(
          [35, 13, 37, 20],
          {
            version: "0.0.0",
            filePath: "scriptBoundTagCarried.tsx",
            fileHash: "39hfasgguatal",
            splices: {},
            captures: ["Badge$39hfasgguatal$3", "count$39hfasgguatal$2"],
          },
          () => ({
            kind: "jsx",
            loc: [35, 16, 37, 19],
            type: {
              kind: "id",
              loc: [35, 17, 35, 22],
              text: "Badge",
              bindingKey: "Badge$39hfasgguatal$3",
            },
            attributes: [
              {
                name: "n",
                initializer: {
                  kind: "()",
                  loc: [35, 26, 35, 38],
                  expression: {
                    kind: ".",
                    loc: [35, 26, 35, 36],
                    expression: {
                      kind: "id",
                      loc: [35, 26, 35, 31],
                      text: "count",
                      bindingKey: "count$39hfasgguatal$2",
                    },
                    name: "read",
                  },
                  arguments: [],
                },
              },
            ],
            children: [
              {
                kind: "jsx",
                loc: [36, 13, 36, 43],
                type: {
                  kind: "string",
                  loc: [36, 14, 36, 15],
                  text: "u",
                },
                attributes: [],
                children: [
                  {
                    kind: "binop",
                    loc: [36, 17, 36, 38],
                    left: {
                      kind: "string",
                      loc: [36, 17, 36, 23],
                      text: "kid ",
                    },
                    operatorToken: "+",
                    right: {
                      kind: "()",
                      loc: [36, 26, 36, 38],
                      expression: {
                        kind: ".",
                        loc: [36, 26, 36, 36],
                        expression: {
                          kind: "id",
                          loc: [36, 26, 36, 31],
                          text: "count",
                          bindingKey: "count$39hfasgguatal$2",
                        },
                        name: "read",
                      },
                      arguments: [],
                    },
                  },
                ],
              },
            ],
          }),
        ),
        params: ["count$39hfasgguatal$2", "Badge$39hfasgguatal$3"],
      },
      $Panel: { value: Panel, params: [] },
    },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [22, 34, 43, 2],
    statements: [
      {
        kind: "const",
        loc: [23, 3, 23, 27],
        name: {
          kind: "id",
          loc: [23, 9, 23, 14],
          text: "count",
          bindingKey: "count$39hfasgguatal$2",
        },
        initializer: {
          kind: "()",
          loc: [23, 17, 23, 26],
          expression: {
            kind: "splice",
            loc: [23, 17, 23, 23],
            key: "$state",
          },
          arguments: [
            {
              kind: "number",
              loc: [23, 24, 23, 25],
              value: 0,
            },
          ],
        },
      },
      {
        kind: "const",
        loc: [24, 3, 29, 5],
        name: {
          kind: "id",
          loc: [24, 9, 24, 14],
          text: "Badge",
          bindingKey: "Badge$39hfasgguatal$3",
        },
        initializer: {
          kind: "=>",
          loc: [24, 17, 29, 4],
          parameters: [
            {
              kind: "param",
              loc: [24, 18, 24, 61],
              name: {
                kind: "id",
                loc: [24, 18, 24, 19],
                text: "p",
                bindingKey: "p$39hfasgguatal$4",
              },
            },
          ],
          body: {
            kind: "jsx",
            loc: [25, 5, 28, 9],
            type: {
              kind: "string",
              loc: [25, 6, 25, 7],
              text: "b",
            },
            attributes: [],
            children: [
              {
                kind: "binop",
                loc: [26, 8, 26, 22],
                left: {
                  kind: "string",
                  loc: [26, 8, 26, 16],
                  text: "outer ",
                },
                operatorToken: "+",
                right: {
                  kind: ".",
                  loc: [26, 19, 26, 22],
                  expression: {
                    kind: "id",
                    loc: [26, 19, 26, 20],
                    text: "p",
                    bindingKey: "p$39hfasgguatal$4",
                  },
                  name: "n",
                },
              },
              {
                kind: ".",
                loc: [27, 8, 27, 18],
                expression: {
                  kind: "id",
                  loc: [27, 8, 27, 9],
                  text: "p",
                  bindingKey: "p$39hfasgguatal$4",
                },
                name: "children",
              },
            ],
          },
        },
      },
      {
        kind: "return",
        loc: [31, 3, 42, 5],
        expression: {
          kind: "jsx",
          loc: [32, 5, 41, 11],
          type: {
            kind: "string",
            loc: [32, 6, 32, 9],
            text: "div",
          },
          attributes: [],
          children: [
            {
              kind: "jsx",
              loc: [33, 7, 39, 9],
              type: {
                kind: "splice",
                loc: [33, 8, 33, 13],
                key: "$Panel",
              },
              attributes: [
                {
                  name: "body",
                  initializer: {
                    kind: "splice",
                    loc: [35, 11, 37, 21],
                    key: "$0splice0",
                  },
                },
              ],
              children: [],
            },
            {
              kind: "jsx",
              loc: [40, 7, 40, 74],
              type: {
                kind: "string",
                loc: [40, 8, 40, 14],
                text: "button",
              },
              attributes: [
                {
                  name: "onclick",
                  initializer: {
                    kind: "=>",
                    loc: [40, 24, 40, 59],
                    parameters: [],
                    body: {
                      kind: "()",
                      loc: [40, 30, 40, 59],
                      expression: {
                        kind: ".",
                        loc: [40, 30, 40, 41],
                        expression: {
                          kind: "id",
                          loc: [40, 30, 40, 35],
                          text: "count",
                          bindingKey: "count$39hfasgguatal$2",
                        },
                        name: "write",
                      },
                      arguments: [
                        {
                          kind: "binop",
                          loc: [40, 42, 40, 58],
                          left: {
                            kind: "()",
                            loc: [40, 42, 40, 54],
                            expression: {
                              kind: ".",
                              loc: [40, 42, 40, 52],
                              expression: {
                                kind: "id",
                                loc: [40, 42, 40, 47],
                                text: "count",
                                bindingKey: "count$39hfasgguatal$2",
                              },
                              name: "read",
                            },
                            arguments: [],
                          },
                          operatorToken: "+",
                          right: {
                            kind: "number",
                            loc: [40, 57, 40, 58],
                            value: 1,
                          },
                        },
                      ],
                    },
                  },
                },
              ],
              children: [
                {
                  kind: "string",
                  loc: [40, 61, 40, 65],
                  text: "more",
                },
              ],
            },
          ],
        },
      },
    ],
  }),
);
