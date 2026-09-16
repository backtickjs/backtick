import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
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
    kind: "=>",
    loc: [15, 48, 17, 2],
    parameters: [
      {
        kind: "param",
        loc: [15, 49, 15, 57],
        name: {
          kind: "id",
          loc: [15, 49, 15, 50],
          text: "c",
          bindingKey: "c$vlvkz8vk4fw4$0",
        },
      },
    ],
    body: {
      kind: "{}",
      loc: [15, 62, 17, 2],
      statements: [
        {
          kind: "return",
          loc: [16, 3, 16, 47],
          expression: {
            kind: "?:",
            loc: [16, 10, 16, 46],
            condition: {
              kind: "binop",
              loc: [16, 10, 16, 29],
              left: {
                kind: "id",
                loc: [16, 10, 16, 11],
                text: "c",
                bindingKey: "c$vlvkz8vk4fw4$0",
              },
              operatorToken: "===",
              right: {
                kind: "splice",
                loc: [16, 16, 16, 29],
                key: "$0splice0",
              },
            },
            whenTrue: {
              kind: "string",
              loc: [16, 32, 16, 38],
              text: "blue",
            },
            whenFalse: {
              kind: "string",
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
      kind: "{}",
      loc: [20, 13, 27, 4],
      statements: [
        {
          kind: "const",
          loc: [21, 5, 21, 39],
          name: {
            kind: "id",
            loc: [21, 11, 21, 15],
            text: "held",
            bindingKey: "held$vlvkz8vk4fw4$1",
          },
          initializer: {
            kind: "()",
            loc: [21, 18, 21, 38],
            expression: {
              kind: "splice",
              loc: [21, 18, 21, 24],
              key: "$state",
            },
            arguments: [
              {
                kind: "splice",
                loc: [21, 25, 21, 37],
                key: "$0splice0",
              },
            ],
          },
        },
        {
          kind: "return",
          loc: [22, 5, 26, 7],
          expression: {
            kind: "jsx",
            loc: [23, 7, 25, 14],
            type: {
              kind: "string",
              loc: [23, 8, 23, 12],
              text: "span",
            },
            attributes: [
              {
                name: "onclick",
                initializer: {
                  kind: "=>",
                  loc: [23, 22, 23, 53],
                  parameters: [],
                  body: {
                    kind: "()",
                    loc: [23, 28, 23, 53],
                    expression: {
                      kind: ".",
                      loc: [23, 28, 23, 38],
                      expression: {
                        kind: "id",
                        loc: [23, 28, 23, 32],
                        text: "held",
                        bindingKey: "held$vlvkz8vk4fw4$1",
                      },
                      name: "write",
                    },
                    arguments: [
                      {
                        kind: "splice",
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
                kind: "()",
                loc: [24, 10, 24, 29],
                expression: {
                  kind: "splice",
                  loc: [24, 10, 24, 16],
                  key: "$label",
                },
                arguments: [
                  {
                    kind: "()",
                    loc: [24, 17, 24, 28],
                    expression: {
                      kind: ".",
                      loc: [24, 17, 24, 26],
                      expression: {
                        kind: "id",
                        loc: [24, 17, 24, 21],
                        text: "held",
                        bindingKey: "held$vlvkz8vk4fw4$1",
                      },
                      name: "read",
                    },
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
