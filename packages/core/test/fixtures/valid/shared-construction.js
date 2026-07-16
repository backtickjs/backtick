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
    return cs.create([23, 10, 23, 29], { filePath: "shared-construction.ts", fileHash: "17lx2e4", splices: { $0splice0: Shape }, captures: [], declarations: [] }, v => v.new([23, 13, 23, 28], v.splice([23, 17, 23, 25], "$0splice0"), [v.number([23, 26, 23, 27], 5)]));
}
const a = make(Circle);
const b = make(Square);
const c = make(Square);
const d = make(Square);
export default cs.create([31, 16, 33, 3], { filePath: "shared-construction.ts", fileHash: "17lx2e4", splices: { $0splice0: a, $0splice1: b, $0splice2: c, $0splice3: d }, captures: [], declarations: [] }, v => v.block([31, 19, 33, 2], [v.return([32, 3, 32, 67], v.object([32, 10, 32, 66], { first: v.splice([32, 19, 32, 23], "$0splice0"), second: v.splice([32, 33, 32, 37], "$0splice1"), third: v.splice([32, 46, 32, 50], "$0splice2"), fourth: v.splice([32, 60, 32, 64], "$0splice3") }))]));
