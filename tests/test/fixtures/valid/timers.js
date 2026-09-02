import { cs } from "@backtickjs/core";
// A clock, and the shape of a name that is not a front.
//
// `Math.floor` is a namespace and a member folded into one name the client
// answers; these arrive whole, so they read as a value where a front cannot —
// bound to a variable and handed on, the same as any builtin function.
//
// An action rather than a value, and not by preference: starting a timer is a
// side effect, and a script that returns one cannot have those. Which is where
// a timer is started anyway — a handler is an action.
//
// Started and stopped in the one body, so nothing is left ticking after this is
// evaluated: what it pins is the lowering and the names, not the waiting. And
// either `clear` cancels either kind, which is why one of them is reached
// through the other's id.
export default cs.create(
  [17, 16, 22, 3],
  {
    version: "0.0.0",
    filePath: "timers.ts",
    fileHash: "2rhi7uq99hpbq",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: 242,
    loc: [17, 19, 22, 2],
    statements: [
      {
        kind: 244,
        loc: [18, 3, 18, 30],
        declarationList: {
          kind: 262,
          loc: [18, 3, 18, 29],
          declarations: [
            {
              kind: 261,
              loc: [18, 9, 18, 29],
              name: {
                kind: 80,
                loc: [18, 9, 18, 13],
                text: "stop",
                bindingKey: "stop$2rhi7uq99hpbq$0",
              },
              initializer: {
                kind: 1001,
                loc: [18, 16, 18, 29],
                name: "clearInterval",
              },
            },
          ],
          keyword: "const",
        },
      },
      {
        kind: 244,
        loc: [19, 3, 19, 48],
        declarationList: {
          kind: 262,
          loc: [19, 3, 19, 47],
          declarations: [
            {
              kind: 261,
              loc: [19, 9, 19, 47],
              name: {
                kind: 80,
                loc: [19, 9, 19, 18],
                text: "repeating",
                bindingKey: "repeating$2rhi7uq99hpbq$1",
              },
              initializer: {
                kind: 214,
                loc: [19, 21, 19, 47],
                expression: {
                  kind: 1001,
                  loc: [19, 21, 19, 32],
                  name: "setInterval",
                },
                questionDotToken: false,
                arguments: [
                  {
                    kind: 220,
                    loc: [19, 33, 19, 40],
                    parameters: [],
                    body: {
                      kind: 9,
                      loc: [19, 39, 19, 40],
                      value: 0,
                    },
                  },
                  {
                    kind: 9,
                    loc: [19, 42, 19, 46],
                    value: 1000,
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
        loc: [20, 3, 20, 18],
        expression: {
          kind: 80,
          loc: [20, 3, 20, 7],
          text: "stop",
          bindingKey: "stop$2rhi7uq99hpbq$0",
        },
        questionDotToken: false,
        arguments: [
          {
            kind: 80,
            loc: [20, 8, 20, 17],
            text: "repeating",
            bindingKey: "repeating$2rhi7uq99hpbq$1",
          },
        ],
      },
      {
        kind: 214,
        loc: [21, 3, 21, 42],
        expression: {
          kind: 1001,
          loc: [21, 3, 21, 15],
          name: "clearTimeout",
        },
        questionDotToken: false,
        arguments: [
          {
            kind: 214,
            loc: [21, 16, 21, 41],
            expression: {
              kind: 1001,
              loc: [21, 16, 21, 26],
              name: "setTimeout",
            },
            questionDotToken: false,
            arguments: [
              {
                kind: 220,
                loc: [21, 27, 21, 34],
                parameters: [],
                body: {
                  kind: 9,
                  loc: [21, 33, 21, 34],
                  value: 0,
                },
              },
              {
                kind: 9,
                loc: [21, 36, 21, 40],
                value: 1000,
              },
            ],
          },
        ],
      },
    ],
  }),
);
