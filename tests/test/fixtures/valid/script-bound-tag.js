import { bundler } from "@backtickjs/bundler";
import { cs, state, vm } from "@backtickjs/core";
// A tag naming a function the script holds — here a bundle that takes props,
// evaluated. It is called with its props read on access, the way a component's
// are, so `count` follows the cell without the badge being drawn again.
const badge = await bundler.run(
  cs.create(
    [8, 3, 8, 68],
    {
      version: "0.0.0",
      filePath: "script-bound-tag.tsx",
      fileHash: "weqn41pz2w6s",
      splices: {},
      captures: [],
    },
    () => ({
      kind: "=>",
      loc: [8, 6, 8, 67],
      parameters: [
        {
          kind: "param",
          loc: [8, 7, 8, 31],
          name: {
            kind: "id",
            loc: [8, 7, 8, 12],
            text: "props",
            bindingKey: "props$weqn41pz2w6s$0",
          },
        },
      ],
      body: {
        kind: "jsx",
        loc: [8, 36, 8, 67],
        type: {
          kind: "string",
          loc: [8, 37, 8, 38],
          text: "b",
        },
        attributes: [],
        children: [
          {
            kind: "binop",
            loc: [8, 40, 8, 62],
            left: {
              kind: "string",
              loc: [8, 40, 8, 48],
              text: "count ",
            },
            operatorToken: "+",
            right: {
              kind: ".",
              loc: [8, 51, 8, 62],
              expression: {
                kind: "id",
                loc: [8, 51, 8, 56],
                text: "props",
                bindingKey: "props$weqn41pz2w6s$0",
              },
              name: "count",
            },
          },
        ],
      },
    }),
  ),
);
export default cs.create(
  [11, 16, 21, 3],
  {
    version: "0.0.0",
    filePath: "script-bound-tag.tsx",
    fileHash: "weqn41pz2w6s",
    splices: {
      $state: { value: state, params: [] },
      $vm: { value: vm, params: [] },
      $badge: { value: badge, params: [] },
    },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [11, 19, 21, 2],
    statements: [
      {
        kind: "const",
        loc: [12, 3, 12, 27],
        name: {
          kind: "id",
          loc: [12, 9, 12, 14],
          text: "count",
          bindingKey: "count$weqn41pz2w6s$1",
        },
        initializer: {
          kind: "()",
          loc: [12, 17, 12, 26],
          expression: {
            kind: "splice",
            loc: [12, 17, 12, 23],
            key: "$state",
          },
          arguments: [
            {
              kind: "number",
              loc: [12, 24, 12, 25],
              value: 0,
            },
          ],
        },
      },
      {
        kind: "const",
        loc: [13, 3, 13, 34],
        name: {
          kind: "id",
          loc: [13, 9, 13, 14],
          text: "Badge",
          bindingKey: "Badge$weqn41pz2w6s$2",
        },
        initializer: {
          kind: "()",
          loc: [13, 17, 13, 33],
          expression: {
            kind: ".",
            loc: [13, 17, 13, 25],
            expression: {
              kind: "splice",
              loc: [13, 17, 13, 20],
              key: "$vm",
            },
            name: "eval",
          },
          arguments: [
            {
              kind: "splice",
              loc: [13, 26, 13, 32],
              key: "$badge",
            },
          ],
        },
      },
      {
        kind: "return",
        loc: [15, 3, 20, 5],
        expression: {
          kind: "jsx",
          loc: [16, 5, 19, 11],
          type: {
            kind: "string",
            loc: [16, 6, 16, 9],
            text: "div",
          },
          attributes: [],
          children: [
            {
              kind: "jsx",
              loc: [17, 7, 17, 37],
              type: {
                kind: "id",
                loc: [17, 8, 17, 13],
                text: "Badge",
                bindingKey: "Badge$weqn41pz2w6s$2",
              },
              attributes: [
                {
                  name: "count",
                  initializer: {
                    kind: "()",
                    loc: [17, 21, 17, 33],
                    expression: {
                      kind: ".",
                      loc: [17, 21, 17, 31],
                      expression: {
                        kind: "id",
                        loc: [17, 21, 17, 26],
                        text: "count",
                        bindingKey: "count$weqn41pz2w6s$1",
                      },
                      name: "read",
                    },
                    arguments: [],
                  },
                },
              ],
              children: [],
            },
            {
              kind: "jsx",
              loc: [18, 7, 18, 74],
              type: {
                kind: "string",
                loc: [18, 8, 18, 14],
                text: "button",
              },
              attributes: [
                {
                  name: "onclick",
                  initializer: {
                    kind: "=>",
                    loc: [18, 24, 18, 59],
                    parameters: [],
                    body: {
                      kind: "()",
                      loc: [18, 30, 18, 59],
                      expression: {
                        kind: ".",
                        loc: [18, 30, 18, 41],
                        expression: {
                          kind: "id",
                          loc: [18, 30, 18, 35],
                          text: "count",
                          bindingKey: "count$weqn41pz2w6s$1",
                        },
                        name: "write",
                      },
                      arguments: [
                        {
                          kind: "binop",
                          loc: [18, 42, 18, 58],
                          left: {
                            kind: "()",
                            loc: [18, 42, 18, 54],
                            expression: {
                              kind: ".",
                              loc: [18, 42, 18, 52],
                              expression: {
                                kind: "id",
                                loc: [18, 42, 18, 47],
                                text: "count",
                                bindingKey: "count$weqn41pz2w6s$1",
                              },
                              name: "read",
                            },
                            arguments: [],
                          },
                          operatorToken: "+",
                          right: {
                            kind: "number",
                            loc: [18, 57, 18, 58],
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
                  loc: [18, 61, 18, 65],
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
