import { jsx as _jsx } from "@backtickjs/web-schema/jsx-runtime";
import { cs, state } from "@backtickjs/core";
// A cell holding an enum, handed to a function whose parameter is that enum.
//
// The member is spliced as itself and the cell holds `Color` rather than
// `Color.Red`, so the other member is a value it takes. What a splice hands
// over keeps the width the host gave it: `cs.splice` reads it back unbound, and
// the binding it lands in decides the width the way TypeScript decides every
// other one — a member to its enum, as a `let` would.
var Color;
(function (Color) {
  Color[(Color["Red"] = 0)] = "Red";
  Color[(Color["Blue"] = 1)] = "Blue";
})(Color || (Color = {}));
const label = cs.create(
  [15, 45, 17, 3],
  {
    version: "0.0.0",
    filePath: "state-enum.tsx",
    fileHash: "vlvkz8vk4fw4",
    splices: { $0splice0: { value: Color.Blue, params: [] } },
    captures: [],
  },
  () => ({
    kind: 220,
    loc: [15, 48, 17, 2],
    parameters: [
      {
        kind: 170,
        loc: [15, 49, 15, 57],
        name: {
          kind: 80,
          loc: [15, 49, 15, 50],
          text: "c",
          bindingKey: "c$vlvkz8vk4fw4$0",
        },
      },
    ],
    body: {
      kind: 242,
      loc: [15, 62, 17, 2],
      statements: [
        {
          kind: 254,
          loc: [16, 3, 16, 47],
          expression: {
            kind: 228,
            loc: [16, 10, 16, 46],
            condition: {
              kind: 227,
              loc: [16, 10, 16, 29],
              left: {
                kind: 80,
                loc: [16, 10, 16, 11],
                text: "c",
                bindingKey: "c$vlvkz8vk4fw4$0",
              },
              operatorToken: "===",
              right: {
                kind: 1000,
                loc: [16, 16, 16, 29],
                key: "$0splice0",
              },
            },
            whenTrue: {
              kind: 11,
              loc: [16, 32, 16, 38],
              text: "blue",
            },
            whenFalse: {
              kind: 11,
              loc: [16, 41, 16, 46],
              text: "red",
            },
          },
        },
      ],
    },
  }),
);
async function Swatch() {
  return cs.create(
    [20, 10, 27, 5],
    {
      version: "0.0.0",
      filePath: "state-enum.tsx",
      fileHash: "vlvkz8vk4fw4",
      splices: {
        $state: { value: state, params: [] },
        $0splice0: { value: Color.Red, params: [] },
        $0splice1: { value: Color.Blue, params: [] },
        $label: { value: label, params: [] },
      },
      captures: [],
    },
    () => ({
      kind: 242,
      loc: [20, 13, 27, 4],
      statements: [
        {
          kind: 244,
          loc: [21, 5, 21, 39],
          declarationList: {
            kind: 262,
            loc: [21, 5, 21, 38],
            declarations: [
              {
                kind: 261,
                loc: [21, 11, 21, 38],
                name: {
                  kind: 80,
                  loc: [21, 11, 21, 15],
                  text: "held",
                  bindingKey: "held$vlvkz8vk4fw4$1",
                },
                initializer: {
                  kind: 214,
                  loc: [21, 18, 21, 38],
                  expression: {
                    kind: 1000,
                    loc: [21, 18, 21, 24],
                    key: "$state",
                  },
                  questionDotToken: false,
                  arguments: [
                    {
                      kind: 1000,
                      loc: [21, 25, 21, 37],
                      key: "$0splice0",
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
          loc: [22, 5, 26, 7],
          expression: {
            kind: 285,
            loc: [23, 7, 25, 14],
            type: {
              kind: 11,
              loc: [23, 8, 23, 12],
              text: "span",
            },
            attributes: [
              {
                name: "onclick",
                initializer: {
                  kind: 220,
                  loc: [23, 22, 23, 53],
                  parameters: [],
                  body: {
                    kind: 214,
                    loc: [23, 28, 23, 53],
                    expression: {
                      kind: 212,
                      loc: [23, 28, 23, 38],
                      expression: {
                        kind: 80,
                        loc: [23, 28, 23, 32],
                        text: "held",
                        bindingKey: "held$vlvkz8vk4fw4$1",
                      },
                      questionDotToken: false,
                      name: "write",
                    },
                    questionDotToken: false,
                    arguments: [
                      {
                        kind: 1000,
                        loc: [23, 39, 23, 52],
                        key: "$0splice1",
                      },
                    ],
                  },
                },
              },
            ],
            children: [
              {
                kind: 214,
                loc: [24, 10, 24, 29],
                expression: {
                  kind: 1000,
                  loc: [24, 10, 24, 16],
                  key: "$label",
                },
                questionDotToken: false,
                arguments: [
                  {
                    kind: 214,
                    loc: [24, 17, 24, 28],
                    expression: {
                      kind: 212,
                      loc: [24, 17, 24, 26],
                      expression: {
                        kind: 80,
                        loc: [24, 17, 24, 21],
                        text: "held",
                        bindingKey: "held$vlvkz8vk4fw4$1",
                      },
                      questionDotToken: false,
                      name: "read",
                    },
                    questionDotToken: false,
                    arguments: [],
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
export default _jsx(Swatch, {});
