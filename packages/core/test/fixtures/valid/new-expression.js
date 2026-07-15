import { cs } from "@backtickjs/core";
// A client-constructible class. The bundler expands the construction at
// bundle time: the constructor runs once with one opaque hole per
// argument, and the instance it returns is serialized with the holes marking
// where the client's argument values bind. The constructor parameters are
// `Client<…>`-typed to say exactly that: the values are opaque on the host —
// stored, never computed with — and exist only when the client runs.
class Point {
    "@backtickjs" = "ClientObject";
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
export default cs.create({ path: "new-expression.ts", start: { line: 22, character: 16 }, end: { line: 25, character: 3 } }, "84hp58", { splices: { $0splice0: Point }, captures: [], declarations: ["p$84hp58$0"] }, v => v.block({ path: "new-expression.ts", start: { line: 22, character: 19 }, end: { line: 25, character: 2 } }, [v.variableDeclaration({ path: "new-expression.ts", start: { line: 23, character: 3 }, end: { line: 23, character: 32 } }, "const", v.identifier({ path: "new-expression.ts", start: { line: 23, character: 9 }, end: { line: 23, character: 10 } }, "p", "p$84hp58$0"), v.new({ path: "new-expression.ts", start: { line: 23, character: 13 }, end: { line: 23, character: 31 } }, v.splice({ path: "new-expression.ts", start: { line: 23, character: 17 }, end: { line: 23, character: 25 } }, "$0splice0"), [v.number({ path: "new-expression.ts", start: { line: 23, character: 26 }, end: { line: 23, character: 27 } }, 1), v.number({ path: "new-expression.ts", start: { line: 23, character: 29 }, end: { line: 23, character: 30 } }, 2)])), v.return({ path: "new-expression.ts", start: { line: 24, character: 3 }, end: { line: 24, character: 20 } }, v.binop({ path: "new-expression.ts", start: { line: 24, character: 10 }, end: { line: 24, character: 19 } }, v.propertyAccess({ path: "new-expression.ts", start: { line: 24, character: 10 }, end: { line: 24, character: 13 } }, v.identifier({ path: "new-expression.ts", start: { line: 24, character: 10 }, end: { line: 24, character: 11 } }, "p", "p$84hp58$0"), "x"), "+", v.propertyAccess({ path: "new-expression.ts", start: { line: 24, character: 16 }, end: { line: 24, character: 19 } }, v.identifier({ path: "new-expression.ts", start: { line: 24, character: 16 }, end: { line: 24, character: 17 } }, "p", "p$84hp58$0"), "y")))]));
