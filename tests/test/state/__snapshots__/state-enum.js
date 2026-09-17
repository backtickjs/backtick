import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
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
  [18, 49, 20, 3],
  {
    version: "0.0.0",
    filePath: "state/state-enum.test.tsx",
    fileHash: "30a9wee2eidm4",
    splices: { $0splice0: { value: Color.Blue, params: [] } },
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [18, 52, 20, 2],
    parameters: [
      {
        kind: "param",
        loc: [18, 53, 18, 61],
        name: {
          kind: "id",
          loc: [18, 53, 18, 54],
          text: "c",
          bindingKey: "c$30a9wee2eidm4$0",
        },
      },
    ],
    body: {
      kind: "{}",
      loc: [18, 66, 20, 2],
      statements: [
        {
          kind: "return",
          loc: [19, 3, 19, 47],
          expression: {
            kind: "?:",
            loc: [19, 10, 19, 46],
            condition: {
              kind: "binop",
              loc: [19, 10, 19, 29],
              left: {
                kind: "id",
                loc: [19, 10, 19, 11],
                text: "c",
                bindingKey: "c$30a9wee2eidm4$0",
              },
              operatorToken: "===",
              right: {
                kind: "splice",
                loc: [19, 16, 19, 29],
                key: "$0splice0",
              },
            },
            whenTrue: {
              kind: "string",
              loc: [19, 32, 19, 38],
              text: "blue",
            },
            whenFalse: {
              kind: "string",
              loc: [19, 41, 19, 46],
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
    [23, 10, 30, 5],
    {
      version: "0.0.0",
      filePath: "state/state-enum.test.tsx",
      fileHash: "30a9wee2eidm4",
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
      loc: [23, 13, 30, 4],
      statements: [
        {
          kind: "const",
          loc: [24, 5, 24, 39],
          name: {
            kind: "id",
            loc: [24, 11, 24, 15],
            text: "held",
            bindingKey: "held$30a9wee2eidm4$1",
          },
          initializer: {
            kind: "()",
            loc: [24, 18, 24, 38],
            expression: {
              kind: "splice",
              loc: [24, 18, 24, 24],
              key: "$state",
            },
            arguments: [
              {
                kind: "splice",
                loc: [24, 25, 24, 37],
                key: "$0splice0",
              },
            ],
          },
        },
        {
          kind: "return",
          loc: [25, 5, 29, 7],
          expression: {
            kind: "jsx",
            loc: [26, 7, 28, 14],
            type: {
              kind: "string",
              loc: [26, 8, 26, 12],
              text: "span",
            },
            attributes: [
              {
                name: "onclick",
                initializer: {
                  kind: "=>",
                  loc: [26, 22, 26, 51],
                  parameters: [],
                  body: {
                    kind: "()",
                    loc: [26, 28, 26, 51],
                    expression: {
                      kind: ".",
                      loc: [26, 28, 26, 36],
                      expression: {
                        kind: "id",
                        loc: [26, 28, 26, 32],
                        text: "held",
                        bindingKey: "held$30a9wee2eidm4$1",
                      },
                      name: "set",
                    },
                    arguments: [
                      {
                        kind: "splice",
                        loc: [26, 37, 26, 50],
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
                loc: [27, 10, 27, 32],
                expression: {
                  kind: "splice",
                  loc: [27, 10, 27, 20],
                  key: "$colorName",
                },
                arguments: [
                  {
                    kind: "()",
                    loc: [27, 21, 27, 31],
                    expression: {
                      kind: ".",
                      loc: [27, 21, 27, 29],
                      expression: {
                        kind: "id",
                        loc: [27, 21, 27, 25],
                        text: "held",
                        bindingKey: "held$30a9wee2eidm4$1",
                      },
                      name: "get",
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
it("Swatch", async (t) => {
  await snapshotCase(t, "Swatch", _jsx(Swatch, {}));
});
