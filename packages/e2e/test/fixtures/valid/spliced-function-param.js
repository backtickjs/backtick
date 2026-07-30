import { cs } from "@backtickjs/core";
// A function is never spliceable — it can't cross the host/client boundary
// as data — but an annotation can still name a function type: the parameter
// receives a client-born function (here, a spliced script), already client
// currency, and passes through the annotation untouched.
export default cs.create(
  [7, 16, 10, 3],
  {
    version: "0.0.0",
    filePath: "spliced-function-param.ts",
    fileHash: "22dvza3e0b85b",
    kind: "value",
    splices: {
      $0splice0: cs.create(
        [9, 18, 9, 29],
        {
          version: "0.0.0",
          filePath: "spliced-function-param.ts",
          fileHash: "22dvza3e0b85b",
          kind: "value",
          splices: {},
          captures: [],
          spliceParams: {},
        },
        () => ({
          kind: 220,
          loc: [9, 21, 9, 28],
          parameters: [],
          body: {
            kind: 9,
            loc: [9, 27, 9, 28],
            value: 2,
          },
        }),
      ),
    },
    captures: [],
    spliceParams: { $0splice0: [] },
  },
  () => ({
    kind: 242,
    loc: [7, 19, 10, 2],
    statements: [
      {
        kind: 261,
        loc: [8, 3, 8, 46],
        name: {
          kind: 80,
          loc: [8, 9, 8, 14],
          text: "apply",
          bindingKey: "apply$22dvza3e0b85b$0",
        },
        initializer: {
          kind: 220,
          loc: [8, 17, 8, 45],
          parameters: [
            {
              kind: 170,
              loc: [8, 18, 8, 33],
              name: {
                kind: 80,
                loc: [8, 18, 8, 19],
                text: "f",
                bindingKey: "f$22dvza3e0b85b$1",
              },
            },
          ],
          body: {
            kind: 227,
            loc: [8, 38, 8, 45],
            left: {
              kind: 214,
              loc: [8, 38, 8, 41],
              expression: {
                kind: 80,
                loc: [8, 38, 8, 39],
                text: "f",
                bindingKey: "f$22dvza3e0b85b$1",
              },
              questionDotToken: false,
              arguments: [],
            },
            operatorToken: "+",
            right: {
              kind: 9,
              loc: [8, 44, 8, 45],
              value: 1,
            },
          },
        },
        keyword: "const",
      },
      {
        kind: 254,
        loc: [9, 3, 9, 32],
        expression: {
          kind: 214,
          loc: [9, 10, 9, 31],
          expression: {
            kind: 80,
            loc: [9, 10, 9, 15],
            text: "apply",
            bindingKey: "apply$22dvza3e0b85b$0",
          },
          questionDotToken: false,
          arguments: [
            {
              kind: 1000,
              loc: [9, 16, 9, 30],
              key: "$0splice0",
            },
          ],
        },
      },
    ],
  }),
);
