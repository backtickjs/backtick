import { cs, state } from "@backtickjs/core";
// An action completes without returning, so `void` is what it splices as, and a
// cell holds a client value. Caught here rather than at the bundle, where
// `lowerSpliceable`'s backstop would catch it as an untyped caller.
const act = cs.create(
  [6, 13, 9, 3],
  {
    version: "0.0.0",
    filePath: "state-holds-action.ts",
    fileHash: "1itpr0p7o2slv",
    kind: "action",
    splices: { $state: state },
    captures: [],
    spliceParams: { $state: [] },
  },
  () => ({
    kind: 242,
    loc: [6, 16, 9, 2],
    statements: [
      {
        kind: 244,
        loc: [7, 3, 7, 23],
        declarationList: {
          kind: 262,
          loc: [7, 3, 7, 22],
          declarations: [
            {
              kind: 261,
              loc: [7, 9, 7, 22],
              name: {
                kind: 80,
                loc: [7, 9, 7, 10],
                text: "n",
                bindingKey: "n$1itpr0p7o2slv$0",
              },
              initializer: {
                kind: 214,
                loc: [7, 13, 7, 22],
                expression: {
                  kind: 1000,
                  loc: [7, 13, 7, 19],
                  key: "$state",
                },
                questionDotToken: false,
                arguments: [
                  {
                    kind: 9,
                    loc: [7, 20, 7, 21],
                    value: 2,
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
        loc: [8, 3, 8, 13],
        expression: {
          kind: 212,
          loc: [8, 3, 8, 10],
          expression: {
            kind: 80,
            loc: [8, 3, 8, 4],
            text: "n",
            bindingKey: "n$1itpr0p7o2slv$0",
          },
          questionDotToken: false,
          name: "write",
        },
        questionDotToken: false,
        arguments: [
          {
            kind: 9,
            loc: [8, 11, 8, 12],
            value: 3,
          },
        ],
      },
    ],
  }),
);
const script = cs.create(
  [11, 16, 14, 3],
  {
    version: "0.0.0",
    filePath: "state-holds-action.ts",
    fileHash: "1itpr0p7o2slv",
    kind: "value",
    splices: { $state: state, $act: act },
    captures: [],
    spliceParams: { $state: [], $act: [] },
  },
  () => ({
    kind: 242,
    loc: [11, 19, 14, 2],
    statements: [
      {
        kind: 244,
        loc: [12, 3, 12, 29],
        declarationList: {
          kind: 262,
          loc: [12, 3, 12, 28],
          declarations: [
            {
              kind: 261,
              loc: [12, 9, 12, 28],
              name: {
                kind: 80,
                loc: [12, 9, 12, 13],
                text: "held",
                bindingKey: "held$1itpr0p7o2slv$1",
              },
              initializer: {
                kind: 214,
                loc: [12, 16, 12, 28],
                expression: {
                  kind: 1000,
                  loc: [12, 16, 12, 22],
                  key: "$state",
                },
                questionDotToken: false,
                arguments: [
                  {
                    kind: 1000,
                    loc: [12, 23, 12, 27],
                    key: "$act",
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
        loc: [13, 3, 13, 12],
        expression: {
          kind: 9,
          loc: [13, 10, 13, 11],
          value: 1,
        },
      },
    ],
  }),
);
