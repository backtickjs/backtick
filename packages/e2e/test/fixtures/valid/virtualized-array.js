import { cs } from "@backtickjs/core";
// A member holding an array of fragments: the script reaches through it —
// `coins` virtualizes to `number[]`, so `length` reads normally.
class Wallet {
  "@backtickjs" = "ClientObject";
  coins;
  constructor(coins) {
    this.coins = coins;
  }
}
export default cs.create(
  [16, 16, 16, 62],
  {
    version: "0.0.0",
    filePath: "virtualized-array.ts",
    fileHash: "2se071q56i4uf",
    kind: "value",
    splices: {
      $0splice0: new Wallet([
        cs.create(
          [16, 33, 16, 38],
          {
            version: "0.0.0",
            filePath: "virtualized-array.ts",
            fileHash: "2se071q56i4uf",
            kind: "value",
            splices: {},
            captures: [],
            spliceParams: {},
          },
          () => ({
            kind: 9,
            loc: [16, 36, 16, 37],
            value: 1,
          }),
        ),
        cs.create(
          [16, 40, 16, 45],
          {
            version: "0.0.0",
            filePath: "virtualized-array.ts",
            fileHash: "2se071q56i4uf",
            kind: "value",
            splices: {},
            captures: [],
            spliceParams: {},
          },
          () => ({
            kind: 9,
            loc: [16, 43, 16, 44],
            value: 2,
          }),
        ),
      ]),
    },
    captures: [],
    spliceParams: { $0splice0: [] },
  },
  () => ({
    kind: 212,
    loc: [16, 19, 16, 61],
    expression: {
      kind: 212,
      loc: [16, 19, 16, 54],
      expression: {
        kind: 1000,
        loc: [16, 19, 16, 48],
        key: "$0splice0",
      },
      questionDotToken: false,
      name: "coins",
    },
    questionDotToken: false,
    name: "length",
  }),
);
