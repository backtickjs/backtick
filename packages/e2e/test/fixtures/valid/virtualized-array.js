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
            declarations: [],
            spliceScopes: {},
          },
          (v) => v.number([16, 36, 16, 37], 1),
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
            declarations: [],
            spliceScopes: {},
          },
          (v) => v.number([16, 43, 16, 44], 2),
        ),
      ]),
    },
    captures: [],
    declarations: [],
    spliceScopes: { $0splice0: [] },
  },
  (v) =>
    v.propertyAccess(
      [16, 19, 16, 61],
      v.propertyAccess(
        [16, 19, 16, 54],
        v.splice([16, 19, 16, 48], "$0splice0"),
        "coins",
      ),
      "length",
    ),
);
