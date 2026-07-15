import { cs } from "@backtickjs/core";
class Point {
    "@backtickjs" = "ClientObject";
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    get sum() {
        return cs.create({ path: "nested-client.ts", start: { line: 20, character: 12 }, end: { line: 20, character: 43 } }, "o5q0mg", { splices: { $0splice0: this.x, $0splice1: this.y }, captures: [], declarations: [] }, v => v.arrow({ path: "nested-client.ts", start: { line: 20, character: 15 }, end: { line: 20, character: 42 } }, [], v.binop({ path: "nested-client.ts", start: { line: 20, character: 21 }, end: { line: 20, character: 42 } }, v.splice({ path: "nested-client.ts", start: { line: 20, character: 21 }, end: { line: 20, character: 30 } }, "$0splice0"), "+", v.splice({ path: "nested-client.ts", start: { line: 20, character: 33 }, end: { line: 20, character: 42 } }, "$0splice1"))));
    }
}
// A client object nested inside another: `Segment` holds `Point` fragments,
// so the script reaches `s.to.sum` two levels deep.
class Segment {
    "@backtickjs" = "ClientObject";
    from;
    to;
    constructor(from, to) {
        this.from = from;
        this.to = to;
    }
}
export default cs.create({ path: "nested-client.ts", start: { line: 38, character: 16 }, end: { line: 41, character: 3 } }, "o5q0mg", { splices: { $Segment: Segment, $Point: Point }, captures: [], declarations: ["s$o5q0mg$0"] }, v => v.block({ path: "nested-client.ts", start: { line: 38, character: 19 }, end: { line: 41, character: 2 } }, [v.variableDeclaration({ path: "nested-client.ts", start: { line: 39, character: 3 }, end: { line: 39, character: 62 } }, "const", v.identifier({ path: "nested-client.ts", start: { line: 39, character: 9 }, end: { line: 39, character: 10 } }, "s", "s$o5q0mg$0"), v.new({ path: "nested-client.ts", start: { line: 39, character: 13 }, end: { line: 39, character: 61 } }, v.splice({ path: "nested-client.ts", start: { line: 39, character: 17 }, end: { line: 39, character: 25 } }, "$Segment"), [v.new({ path: "nested-client.ts", start: { line: 39, character: 26 }, end: { line: 39, character: 42 } }, v.splice({ path: "nested-client.ts", start: { line: 39, character: 30 }, end: { line: 39, character: 36 } }, "$Point"), [v.number({ path: "nested-client.ts", start: { line: 39, character: 37 }, end: { line: 39, character: 38 } }, 1), v.number({ path: "nested-client.ts", start: { line: 39, character: 40 }, end: { line: 39, character: 41 } }, 2)]), v.new({ path: "nested-client.ts", start: { line: 39, character: 44 }, end: { line: 39, character: 60 } }, v.splice({ path: "nested-client.ts", start: { line: 39, character: 48 }, end: { line: 39, character: 54 } }, "$Point"), [v.number({ path: "nested-client.ts", start: { line: 39, character: 55 }, end: { line: 39, character: 56 } }, 1), v.number({ path: "nested-client.ts", start: { line: 39, character: 58 }, end: { line: 39, character: 59 } }, 2)])])), v.return({ path: "nested-client.ts", start: { line: 40, character: 3 }, end: { line: 40, character: 36 } }, v.binop({ path: "nested-client.ts", start: { line: 40, character: 10 }, end: { line: 40, character: 35 } }, v.call({ path: "nested-client.ts", start: { line: 40, character: 10 }, end: { line: 40, character: 20 } }, v.propertyAccess({ path: "nested-client.ts", start: { line: 40, character: 10 }, end: { line: 40, character: 18 } }, v.propertyAccess({ path: "nested-client.ts", start: { line: 40, character: 10 }, end: { line: 40, character: 14 } }, v.identifier({ path: "nested-client.ts", start: { line: 40, character: 10 }, end: { line: 40, character: 11 } }, "s", "s$o5q0mg$0"), "to"), "sum"), []), "-", v.call({ path: "nested-client.ts", start: { line: 40, character: 23 }, end: { line: 40, character: 35 } }, v.propertyAccess({ path: "nested-client.ts", start: { line: 40, character: 23 }, end: { line: 40, character: 33 } }, v.propertyAccess({ path: "nested-client.ts", start: { line: 40, character: 23 }, end: { line: 40, character: 29 } }, v.identifier({ path: "nested-client.ts", start: { line: 40, character: 23 }, end: { line: 40, character: 24 } }, "s", "s$o5q0mg$0"), "from"), "sum"), [])))]));
