import { cs } from "@backtickjs/core";
// One helper builds the fragment for both classes, so the script is a single
// source location referenced from two expansions with different holes: the
// entry goes polymorphic, and each expansion body passes its own holes as
// thunks written where they are in scope.
function sum(a, b) {
    return cs.create([9, 10, 9, 31], { filePath: "expansion-splice-sharing.ts", fileHash: "17kc3uc", splices: { $0splice0: a, $0splice1: b }, captures: [], declarations: [] }, v => v.arrow([9, 13, 9, 30], [], v.binop([9, 19, 9, 30], v.splice([9, 19, 9, 23], "$0splice0"), "+", v.splice([9, 26, 9, 30], "$0splice1"))));
}
class Point {
    "@backtickjs" = "ClientObject";
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    get sum() {
        return sum(this.x, this.y);
    }
}
class Size {
    "@backtickjs" = "ClientObject";
    width;
    height;
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    get sum() {
        return sum(this.width, this.height);
    }
}
export default cs.create([44, 16, 48, 3], { filePath: "expansion-splice-sharing.ts", fileHash: "17kc3uc", splices: { $0splice0: Point, $0splice1: Size }, captures: [], declarations: ["p$17kc3uc$0", "s$17kc3uc$1"] }, v => v.block([44, 19, 48, 2], [v.variableDeclaration([45, 3, 45, 32], "const", v.identifier([45, 9, 45, 10], "p", "p$17kc3uc$0"), v.new([45, 13, 45, 31], v.splice([45, 17, 45, 25], "$0splice0"), [v.number([45, 26, 45, 27], 1), v.number([45, 29, 45, 30], 2)])), v.variableDeclaration([46, 3, 46, 31], "const", v.identifier([46, 9, 46, 10], "s", "s$17kc3uc$1"), v.new([46, 13, 46, 30], v.splice([46, 17, 46, 24], "$0splice1"), [v.number([46, 25, 46, 26], 3), v.number([46, 28, 46, 29], 4)])), v.return([47, 3, 47, 28], v.binop([47, 10, 47, 27], v.call([47, 10, 47, 17], v.propertyAccess([47, 10, 47, 15], v.identifier([47, 10, 47, 11], "p", "p$17kc3uc$0"), "sum"), []), "+", v.call([47, 20, 47, 27], v.propertyAccess([47, 20, 47, 25], v.identifier([47, 20, 47, 21], "s", "s$17kc3uc$1"), "sum"), [])))]));
