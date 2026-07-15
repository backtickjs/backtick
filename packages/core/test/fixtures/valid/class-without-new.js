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
// A construction and a plain call lower identically — a spliced class is a
// function with holes by the time the client runs — so the typechecker is
// what keeps them apart: the virtual code types a spliced class as the
// class itself, and calling a constructor without `new` is a type error.
export default cs.create({ path: "class-without-new.tsx", start: { line: 20, character: 16 }, end: { line: 23, character: 3 } }, "1usi7c1", { splices: { $0splice0: Point }, captures: [], declarations: ["C$1usi7c1$0"] }, v => v.block({ path: "class-without-new.tsx", start: { line: 20, character: 19 }, end: { line: 23, character: 2 } }, [v.variableDeclaration({ path: "class-without-new.tsx", start: { line: 21, character: 3 }, end: { line: 21, character: 22 } }, "const", v.identifier({ path: "class-without-new.tsx", start: { line: 21, character: 9 }, end: { line: 21, character: 10 } }, "C", "C$1usi7c1$0"), v.splice({ path: "class-without-new.tsx", start: { line: 21, character: 13 }, end: { line: 21, character: 21 } }, "$0splice0")), v.return({ path: "class-without-new.tsx", start: { line: 22, character: 3 }, end: { line: 22, character: 18 } }, v.call({ path: "class-without-new.tsx", start: { line: 22, character: 10 }, end: { line: 22, character: 17 } }, v.identifier({ path: "class-without-new.tsx", start: { line: 22, character: 10 }, end: { line: 22, character: 11 } }, "C", "C$1usi7c1$0"), [v.number({ path: "class-without-new.tsx", start: { line: 22, character: 12 }, end: { line: 22, character: 13 } }, 1), v.number({ path: "class-without-new.tsx", start: { line: 22, character: 15 }, end: { line: 22, character: 16 } }, 2)]))]));
