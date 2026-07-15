import { cs } from "@backtickjs/core";
class Point {
    "@backtickjs" = "ClientObject";
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
// A spliced class lowers to a function with one hole per constructor
// parameter, and a construction is a plain call of that value — so the
// class can pass through a local and be instantiated on another line.
export default cs.create({ path: "new-local-class.tsx", start: { line: 19, character: 16 }, end: { line: 23, character: 3 } }, "2onwhy", { splices: { $0splice0: Point }, captures: [], declarations: ["C$2onwhy$0", "p$2onwhy$1"] }, v => v.block({ path: "new-local-class.tsx", start: { line: 19, character: 19 }, end: { line: 23, character: 2 } }, [v.variableDeclaration({ path: "new-local-class.tsx", start: { line: 20, character: 3 }, end: { line: 20, character: 22 } }, "const", v.identifier({ path: "new-local-class.tsx", start: { line: 20, character: 9 }, end: { line: 20, character: 10 } }, "C", "C$2onwhy$0"), v.splice({ path: "new-local-class.tsx", start: { line: 20, character: 13 }, end: { line: 20, character: 21 } }, "$0splice0")), v.variableDeclaration({ path: "new-local-class.tsx", start: { line: 21, character: 3 }, end: { line: 21, character: 25 } }, "const", v.identifier({ path: "new-local-class.tsx", start: { line: 21, character: 9 }, end: { line: 21, character: 10 } }, "p", "p$2onwhy$1"), v.new({ path: "new-local-class.tsx", start: { line: 21, character: 13 }, end: { line: 21, character: 24 } }, v.identifier({ path: "new-local-class.tsx", start: { line: 21, character: 17 }, end: { line: 21, character: 18 } }, "C", "C$2onwhy$0"), [v.number({ path: "new-local-class.tsx", start: { line: 21, character: 19 }, end: { line: 21, character: 20 } }, 1), v.number({ path: "new-local-class.tsx", start: { line: 21, character: 22 }, end: { line: 21, character: 23 } }, 2)])), v.return({ path: "new-local-class.tsx", start: { line: 22, character: 3 }, end: { line: 22, character: 20 } }, v.binop({ path: "new-local-class.tsx", start: { line: 22, character: 10 }, end: { line: 22, character: 19 } }, v.propertyAccess({ path: "new-local-class.tsx", start: { line: 22, character: 10 }, end: { line: 22, character: 13 } }, v.identifier({ path: "new-local-class.tsx", start: { line: 22, character: 10 }, end: { line: 22, character: 11 } }, "p", "p$2onwhy$1"), "x"), "+", v.propertyAccess({ path: "new-local-class.tsx", start: { line: 22, character: 16 }, end: { line: 22, character: 19 } }, v.identifier({ path: "new-local-class.tsx", start: { line: 22, character: 16 }, end: { line: 22, character: 17 } }, "p", "p$2onwhy$1"), "y")))]));
