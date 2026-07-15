import { cs } from "@backtickjs/core";
// A client-constructible class. The compiled script passes the class itself
// to `v.new`, and the bundle carries its name — the client resolves that
// name on its global object, so the class is registered there for the test
// client. The constructor parameters are `Client<…>`-typed for the script's
// type-level view; at client runtime they receive the evaluated raw values.
class Point {
    "@backtickjs" = "ClientObject";
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
export default (() => {
    const $0splice0 = Point;
    return cs.create({ path: "new-expression.ts", start: { line: 21, character: 16 }, end: { line: 24, character: 3 } }, "m1fesz", { splices: [$0splice0], captures: [], declarations: ["p$m1fesz$0"] }, v => v.block({ path: "new-expression.ts", start: { line: 21, character: 19 }, end: { line: 24, character: 2 } }, [v.variableDeclaration({ path: "new-expression.ts", start: { line: 22, character: 3 }, end: { line: 22, character: 32 } }, "const", v.identifier({ path: "new-expression.ts", start: { line: 22, character: 9 }, end: { line: 22, character: 10 } }, "p", "p$m1fesz$0"), v.macro(null, ($0, $1) => new $0splice0($0, $1), [v.number({ path: "new-expression.ts", start: { line: 22, character: 26 }, end: { line: 22, character: 27 } }, 1), v.number({ path: "new-expression.ts", start: { line: 22, character: 29 }, end: { line: 22, character: 30 } }, 2)])), v.return({ path: "new-expression.ts", start: { line: 23, character: 3 }, end: { line: 23, character: 20 } }, v.binop({ path: "new-expression.ts", start: { line: 23, character: 10 }, end: { line: 23, character: 19 } }, v.propertyAccess({ path: "new-expression.ts", start: { line: 23, character: 10 }, end: { line: 23, character: 13 } }, v.identifier({ path: "new-expression.ts", start: { line: 23, character: 10 }, end: { line: 23, character: 11 } }, "p", "p$m1fesz$0"), "x"), "+", v.propertyAccess({ path: "new-expression.ts", start: { line: 23, character: 16 }, end: { line: 23, character: 19 } }, v.identifier({ path: "new-expression.ts", start: { line: 23, character: 16 }, end: { line: 23, character: 17 } }, "p", "p$m1fesz$0"), "y")))]));
})();
