import { jsx as _jsx } from "@backtickjs/web-schema/jsx-runtime";
import { cs, state } from "@backtickjs/core";
// Storage a script declares for itself, rather than one a component owns and
// splices in. `$state(...)` is an ordinary call of an imported value, and the
// cell is what the call answers with: each time it is evaluated there is
// another cell, which is what lets a script build a row that carries its own.
async function Rows() {
  const build = cs.create(
    [8, 17, 10, 5],
    {
      version: "0.0.0",
      filePath: "script-state.tsx",
      fileHash: "2s2nt4oke8yg5",
      kind: "value",
      splices: { $state: state },
      captures: [],
      spliceParams: { $state: [] },
    },
    () => ({
      kind: 220,
      loc: [8, 20, 10, 4],
      parameters: [
        {
          kind: 170,
          loc: [8, 21, 8, 34],
          name: {
            kind: 80,
            loc: [8, 21, 8, 26],
            text: "label",
            bindingKey: "label$2s2nt4oke8yg5$0",
          },
        },
      ],
      body: {
        kind: 242,
        loc: [8, 39, 10, 4],
        statements: [
          {
            kind: 254,
            loc: [9, 5, 9, 37],
            expression: {
              kind: 211,
              loc: [9, 12, 9, 36],
              properties: [
                {
                  kind: 304,
                  loc: [9, 14, 9, 34],
                  name: "label",
                  initializer: {
                    kind: 214,
                    loc: [9, 21, 9, 34],
                    expression: {
                      kind: 1000,
                      loc: [9, 21, 9, 27],
                      key: "$state",
                    },
                    questionDotToken: false,
                    arguments: [
                      {
                        kind: 80,
                        loc: [9, 28, 9, 33],
                        text: "label",
                        bindingKey: "label$2s2nt4oke8yg5$0",
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
  return _jsx("span", {
    style: cs.create(
      [14, 14, 14, 35],
      {
        version: "0.0.0",
        filePath: "script-state.tsx",
        fileHash: "2s2nt4oke8yg5",
        kind: "value",
        splices: {},
        captures: [],
        spliceParams: {},
      },
      () => ({
        kind: 11,
        loc: [14, 17, 14, 34],
        text: "font-size: 16px",
      }),
    ),
    onclick: cs.create(
      [15, 16, 18, 9],
      {
        version: "0.0.0",
        filePath: "script-state.tsx",
        fileHash: "2s2nt4oke8yg5",
        kind: "value",
        splices: { $build: build },
        captures: [],
        spliceParams: { $build: [] },
      },
      () => ({
        kind: 220,
        loc: [15, 19, 18, 8],
        parameters: [],
        body: {
          kind: 242,
          loc: [15, 25, 18, 8],
          statements: [
            {
              kind: 244,
              loc: [16, 9, 16, 35],
              declarationList: {
                kind: 262,
                loc: [16, 9, 16, 34],
                declarations: [
                  {
                    kind: 261,
                    loc: [16, 15, 16, 34],
                    name: {
                      kind: 80,
                      loc: [16, 15, 16, 18],
                      text: "row",
                      bindingKey: "row$2s2nt4oke8yg5$1",
                    },
                    initializer: {
                      kind: 214,
                      loc: [16, 21, 16, 34],
                      expression: {
                        kind: 1000,
                        loc: [16, 21, 16, 27],
                        key: "$build",
                      },
                      questionDotToken: false,
                      arguments: [
                        {
                          kind: 11,
                          loc: [16, 28, 16, 33],
                          text: "one",
                        },
                      ],
                    },
                  },
                ],
                keyword: "const",
              },
            },
            {
              kind: 214,
              loc: [17, 9, 17, 51],
              expression: {
                kind: 212,
                loc: [17, 9, 17, 24],
                expression: {
                  kind: 212,
                  loc: [17, 9, 17, 18],
                  expression: {
                    kind: 80,
                    loc: [17, 9, 17, 12],
                    text: "row",
                    bindingKey: "row$2s2nt4oke8yg5$1",
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
                  kind: 227,
                  loc: [17, 25, 17, 50],
                  left: {
                    kind: 214,
                    loc: [17, 25, 17, 41],
                    expression: {
                      kind: 212,
                      loc: [17, 25, 17, 39],
                      expression: {
                        kind: 212,
                        loc: [17, 25, 17, 34],
                        expression: {
                          kind: 80,
                          loc: [17, 25, 17, 28],
                          text: "row",
                          bindingKey: "row$2s2nt4oke8yg5$1",
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
                  operatorToken: "+",
                  right: {
                    kind: 11,
                    loc: [17, 44, 17, 50],
                    text: " !!!",
                  },
                },
              ],
            },
          ],
        },
      }),
    ),
    children: cs.create(
      [20, 8, 20, 38],
      {
        version: "0.0.0",
        filePath: "script-state.tsx",
        fileHash: "2s2nt4oke8yg5",
        kind: "value",
        splices: { $build: build },
        captures: [],
        spliceParams: { $build: [] },
      },
      () => ({
        kind: 214,
        loc: [20, 11, 20, 37],
        expression: {
          kind: 212,
          loc: [20, 11, 20, 35],
          expression: {
            kind: 212,
            loc: [20, 11, 20, 30],
            expression: {
              kind: 214,
              loc: [20, 11, 20, 24],
              expression: {
                kind: 1000,
                loc: [20, 11, 20, 17],
                key: "$build",
              },
              questionDotToken: false,
              arguments: [
                {
                  kind: 11,
                  loc: [20, 18, 20, 23],
                  text: "one",
                },
              ],
            },
            questionDotToken: false,
            name: "label",
          },
          questionDotToken: false,
          name: "read",
        },
        questionDotToken: false,
        arguments: [],
      }),
    ),
  });
}
export default _jsx(Rows, {});
