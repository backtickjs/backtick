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
const colorName = cs.create(
  [16, 49, 18, 3],
  {
    version: "0.0.0",
    filePath: "Swatch.tsx",
    fileHash: "1hmlov0wizylu",
    splices: { $0splice0: { value: Color.Blue, params: [] } },
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [16, 52, 18, 2],
    parameters: [
      {
        kind: "param",
        loc: [16, 53, 16, 61],
        name: {
          kind: "id",
          loc: [16, 53, 16, 54],
          text: "c",
          bindingKey: "c$1hmlov0wizylu$0",
        },
      },
    ],
    body: {
      kind: "{}",
      loc: [16, 66, 18, 2],
      statements: [
        {
          kind: "return",
          loc: [17, 3, 17, 47],
          expression: {
            kind: "?:",
            loc: [17, 10, 17, 46],
            condition: {
              kind: "binop",
              loc: [17, 10, 17, 29],
              left: {
                kind: "id",
                loc: [17, 10, 17, 11],
                text: "c",
                bindingKey: "c$1hmlov0wizylu$0",
              },
              operatorToken: "===",
              right: {
                kind: "splice",
                loc: [17, 16, 17, 29],
                key: "$0splice0",
              },
            },
            whenTrue: {
              kind: "string",
              loc: [17, 32, 17, 38],
              text: "blue",
            },
            whenFalse: {
              kind: "string",
              loc: [17, 41, 17, 46],
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
    [21, 10, 28, 5],
    {
      version: "0.0.0",
      filePath: "Swatch.tsx",
      fileHash: "1hmlov0wizylu",
      splices: {
        $state: { value: state, params: [] },
        $0splice0: { value: Color.Red, params: [] },
        $0splice1: { value: Color.Blue, params: [] },
        $colorName: { value: colorName, params: [] },
      },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [21, 13, 28, 4],
      statements: [
        {
          kind: "const",
          loc: [22, 5, 22, 39],
          name: {
            kind: "id",
            loc: [22, 11, 22, 15],
            text: "held",
            bindingKey: "held$1hmlov0wizylu$1",
          },
          initializer: {
            kind: "()",
            loc: [22, 18, 22, 38],
            expression: {
              kind: "splice",
              loc: [22, 18, 22, 24],
              key: "$state",
            },
            arguments: [
              {
                kind: "splice",
                loc: [22, 25, 22, 37],
                key: "$0splice0",
              },
            ],
          },
        },
        {
          kind: "return",
          loc: [23, 5, 27, 7],
          expression: {
            kind: "jsx",
            loc: [24, 7, 26, 14],
            type: {
              kind: "string",
              loc: [24, 8, 24, 12],
              text: "span",
            },
            attributes: [
              {
                name: "onclick",
                initializer: {
                  kind: "=>",
                  loc: [24, 22, 24, 53],
                  parameters: [],
                  body: {
                    kind: "()",
                    loc: [24, 28, 24, 53],
                    expression: {
                      kind: ".",
                      loc: [24, 28, 24, 38],
                      expression: {
                        kind: "id",
                        loc: [24, 28, 24, 32],
                        text: "held",
                        bindingKey: "held$1hmlov0wizylu$1",
                      },
                      name: "write",
                    },
                    arguments: [
                      {
                        kind: "splice",
                        loc: [24, 39, 24, 52],
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
                loc: [25, 10, 25, 33],
                expression: {
                  kind: "splice",
                  loc: [25, 10, 25, 20],
                  key: "$colorName",
                },
                arguments: [
                  {
                    kind: "()",
                    loc: [25, 21, 25, 32],
                    expression: {
                      kind: ".",
                      loc: [25, 21, 25, 30],
                      expression: {
                        kind: "id",
                        loc: [25, 21, 25, 25],
                        text: "held",
                        bindingKey: "held$1hmlov0wizylu$1",
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
