import { cs } from "@backtickjs/core";
// A spread in an object literal, which is the one place the format cannot ship
// an object as the data it spells: an object in a value slot *is* its own keys
// and none of them is reserved, so there is nowhere to write "and every key of
// that one". A literal a spread runs through is a node instead — a name slot of
// `null` marking the spread — and a literal without one is data still.
//
// Later wins, both ways round, the way it does in the language this mirrors.
export default cs.create(
  [10, 16, 18, 3],
  {
    version: "0.0.0",
    filePath: "object-spread.ts",
    fileHash: "1c48itx0y147v",
    splices: {},
    captures: [],
  },
  () => ({
    kind: 242,
    loc: [10, 19, 18, 2],
    statements: [
      {
        kind: 244,
        loc: [11, 3, 11, 31],
        declarationList: {
          kind: 262,
          loc: [11, 3, 11, 30],
          declarations: [
            {
              kind: 261,
              loc: [11, 9, 11, 30],
              name: {
                kind: 80,
                loc: [11, 9, 11, 13],
                text: "base",
                bindingKey: "base$1c48itx0y147v$0",
              },
              initializer: {
                kind: 211,
                loc: [11, 16, 11, 30],
                properties: [
                  {
                    kind: 304,
                    loc: [11, 18, 11, 22],
                    name: "a",
                    initializer: {
                      kind: 9,
                      loc: [11, 21, 11, 22],
                      value: 1,
                    },
                  },
                  {
                    kind: 304,
                    loc: [11, 24, 11, 28],
                    name: "b",
                    initializer: {
                      kind: 9,
                      loc: [11, 27, 11, 28],
                      value: 2,
                    },
                  },
                ],
              },
            },
          ],
          keyword: "const",
        },
      },
      {
        kind: 244,
        loc: [12, 3, 12, 25],
        declarationList: {
          kind: 262,
          loc: [12, 3, 12, 24],
          declarations: [
            {
              kind: 261,
              loc: [12, 9, 12, 24],
              name: {
                kind: 80,
                loc: [12, 9, 12, 13],
                text: "over",
                bindingKey: "over$1c48itx0y147v$1",
              },
              initializer: {
                kind: 211,
                loc: [12, 16, 12, 24],
                properties: [
                  {
                    kind: 304,
                    loc: [12, 18, 12, 22],
                    name: "b",
                    initializer: {
                      kind: 9,
                      loc: [12, 21, 12, 22],
                      value: 9,
                    },
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
        loc: [13, 3, 17, 5],
        expression: {
          kind: 211,
          loc: [13, 10, 17, 4],
          properties: [
            {
              kind: 231,
              loc: [14, 5, 14, 12],
              expression: {
                kind: 80,
                loc: [14, 8, 14, 12],
                text: "base",
                bindingKey: "base$1c48itx0y147v$0",
              },
            },
            {
              kind: 231,
              loc: [15, 5, 15, 12],
              expression: {
                kind: 80,
                loc: [15, 8, 15, 12],
                text: "over",
                bindingKey: "over$1c48itx0y147v$1",
              },
            },
            {
              kind: 304,
              loc: [16, 5, 16, 9],
              name: "c",
              initializer: {
                kind: 9,
                loc: [16, 8, 16, 9],
                value: 3,
              },
            },
          ],
        },
      },
    ],
  }),
);
