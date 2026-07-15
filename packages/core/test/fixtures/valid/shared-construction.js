import { cs } from "@backtickjs/core";
class Circle {
    "@backtickjs" = "ClientObject";
    r;
    constructor(r) {
        this.r = r;
    }
}
class Square {
    "@backtickjs" = "ClientObject";
    side;
    constructor(side) {
        this.side = side;
    }
}
// ONE template, ONE source location — but each call splices a different
// class into it.
function make(Shape) {
    return cs.create({ path: "shared-construction.ts", start: { line: 23, character: 10 }, end: { line: 23, character: 29 } }, "17lx2e4", { splices: { $0splice0: Shape }, captures: [], declarations: [] }, v => v.new({ path: "shared-construction.ts", start: { line: 23, character: 13 }, end: { line: 23, character: 28 } }, v.splice({ path: "shared-construction.ts", start: { line: 23, character: 17 }, end: { line: 23, character: 25 } }, "$0splice0"), [v.number({ path: "shared-construction.ts", start: { line: 23, character: 26 }, end: { line: 23, character: 27 } }, 5)]));
}
const a = make(Circle);
const b = make(Square);
const c = make(Square);
const d = make(Square);
export default cs.create({ path: "shared-construction.ts", start: { line: 31, character: 16 }, end: { line: 33, character: 3 } }, "17lx2e4", { splices: { $0splice0: a, $0splice1: b, $0splice2: c, $0splice3: d }, captures: [], declarations: [] }, v => v.block({ path: "shared-construction.ts", start: { line: 31, character: 19 }, end: { line: 33, character: 2 } }, [v.return({ path: "shared-construction.ts", start: { line: 32, character: 3 }, end: { line: 32, character: 67 } }, v.object({ path: "shared-construction.ts", start: { line: 32, character: 10 }, end: { line: 32, character: 66 } }, { first: v.splice({ path: "shared-construction.ts", start: { line: 32, character: 19 }, end: { line: 32, character: 23 } }, "$0splice0"), second: v.splice({ path: "shared-construction.ts", start: { line: 32, character: 33 }, end: { line: 32, character: 37 } }, "$0splice1"), third: v.splice({ path: "shared-construction.ts", start: { line: 32, character: 46 }, end: { line: 32, character: 50 } }, "$0splice2"), fourth: v.splice({ path: "shared-construction.ts", start: { line: 32, character: 60 }, end: { line: 32, character: 64 } }, "$0splice3") }))]));
