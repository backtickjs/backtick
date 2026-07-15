import { cs } from "@backtickjs/core";
// One helper builds the fragment for both classes, so the script is a single
// source location referenced from two expansions with different holes: the
// entry goes polymorphic, and each expansion body passes its own holes as
// thunks written where they are in scope.
function sum(a, b) {
    return cs.create({ path: "expansion-splice-sharing.ts", start: { line: 9, character: 10 }, end: { line: 9, character: 31 } }, "17kc3uc", { splices: { $0splice0: a, $0splice1: b }, captures: [], declarations: [] }, v => v.arrow({ path: "expansion-splice-sharing.ts", start: { line: 9, character: 13 }, end: { line: 9, character: 30 } }, [], v.binop({ path: "expansion-splice-sharing.ts", start: { line: 9, character: 19 }, end: { line: 9, character: 30 } }, v.splice({ path: "expansion-splice-sharing.ts", start: { line: 9, character: 19 }, end: { line: 9, character: 23 } }, "$0splice0"), "+", v.splice({ path: "expansion-splice-sharing.ts", start: { line: 9, character: 26 }, end: { line: 9, character: 30 } }, "$0splice1"))));
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
export default cs.create({ path: "expansion-splice-sharing.ts", start: { line: 44, character: 16 }, end: { line: 48, character: 3 } }, "17kc3uc", { splices: { $0splice0: Point, $0splice1: Size }, captures: [], declarations: ["p$17kc3uc$0", "s$17kc3uc$1"] }, v => v.block({ path: "expansion-splice-sharing.ts", start: { line: 44, character: 19 }, end: { line: 48, character: 2 } }, [v.variableDeclaration({ path: "expansion-splice-sharing.ts", start: { line: 45, character: 3 }, end: { line: 45, character: 32 } }, "const", v.identifier({ path: "expansion-splice-sharing.ts", start: { line: 45, character: 9 }, end: { line: 45, character: 10 } }, "p", "p$17kc3uc$0"), v.new({ path: "expansion-splice-sharing.ts", start: { line: 45, character: 13 }, end: { line: 45, character: 31 } }, v.splice({ path: "expansion-splice-sharing.ts", start: { line: 45, character: 17 }, end: { line: 45, character: 25 } }, "$0splice0"), [v.number({ path: "expansion-splice-sharing.ts", start: { line: 45, character: 26 }, end: { line: 45, character: 27 } }, 1), v.number({ path: "expansion-splice-sharing.ts", start: { line: 45, character: 29 }, end: { line: 45, character: 30 } }, 2)])), v.variableDeclaration({ path: "expansion-splice-sharing.ts", start: { line: 46, character: 3 }, end: { line: 46, character: 31 } }, "const", v.identifier({ path: "expansion-splice-sharing.ts", start: { line: 46, character: 9 }, end: { line: 46, character: 10 } }, "s", "s$17kc3uc$1"), v.new({ path: "expansion-splice-sharing.ts", start: { line: 46, character: 13 }, end: { line: 46, character: 30 } }, v.splice({ path: "expansion-splice-sharing.ts", start: { line: 46, character: 17 }, end: { line: 46, character: 24 } }, "$0splice1"), [v.number({ path: "expansion-splice-sharing.ts", start: { line: 46, character: 25 }, end: { line: 46, character: 26 } }, 3), v.number({ path: "expansion-splice-sharing.ts", start: { line: 46, character: 28 }, end: { line: 46, character: 29 } }, 4)])), v.return({ path: "expansion-splice-sharing.ts", start: { line: 47, character: 3 }, end: { line: 47, character: 28 } }, v.binop({ path: "expansion-splice-sharing.ts", start: { line: 47, character: 10 }, end: { line: 47, character: 27 } }, v.call({ path: "expansion-splice-sharing.ts", start: { line: 47, character: 10 }, end: { line: 47, character: 17 } }, v.propertyAccess({ path: "expansion-splice-sharing.ts", start: { line: 47, character: 10 }, end: { line: 47, character: 15 } }, v.identifier({ path: "expansion-splice-sharing.ts", start: { line: 47, character: 10 }, end: { line: 47, character: 11 } }, "p", "p$17kc3uc$0"), "sum"), []), "+", v.call({ path: "expansion-splice-sharing.ts", start: { line: 47, character: 20 }, end: { line: 47, character: 27 } }, v.propertyAccess({ path: "expansion-splice-sharing.ts", start: { line: 47, character: 20 }, end: { line: 47, character: 25 } }, v.identifier({ path: "expansion-splice-sharing.ts", start: { line: 47, character: 20 }, end: { line: 47, character: 21 } }, "s", "s$17kc3uc$1"), "sum"), [])))]));
