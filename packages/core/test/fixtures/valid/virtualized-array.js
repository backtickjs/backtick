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
export default cs.create({ path: "virtualized-array.ts", start: { line: 16, character: 16 }, end: { line: 16, character: 62 } }, "3kt4rb", { splices: { $0splice0: new Wallet([cs.create({ path: "virtualized-array.ts", start: { line: 16, character: 33 }, end: { line: 16, character: 38 } }, "3kt4rb", { splices: {}, captures: [], declarations: [] }, v => v.number({ path: "virtualized-array.ts", start: { line: 16, character: 36 }, end: { line: 16, character: 37 } }, 1)), cs.create({ path: "virtualized-array.ts", start: { line: 16, character: 40 }, end: { line: 16, character: 45 } }, "3kt4rb", { splices: {}, captures: [], declarations: [] }, v => v.number({ path: "virtualized-array.ts", start: { line: 16, character: 43 }, end: { line: 16, character: 44 } }, 2))]) }, captures: [], declarations: [] }, v => v.propertyAccess({ path: "virtualized-array.ts", start: { line: 16, character: 19 }, end: { line: 16, character: 61 } }, v.propertyAccess({ path: "virtualized-array.ts", start: { line: 16, character: 19 }, end: { line: 16, character: 54 } }, v.splice({ path: "virtualized-array.ts", start: { line: 16, character: 19 }, end: { line: 16, character: 48 } }, "$0splice0"), "coins"), "length"));
