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
        return (() => {
            const $0splice0 = this.x;
            const $0splice1 = this.y;
            return cs.create({ path: "nested-client.ts", start: { line: 16, character: 12 }, end: { line: 16, character: 43 } }, "13xhtw0", { splices: [$0splice0, $0splice1], captures: [], declarations: [] }, v => v.arrow({ path: "nested-client.ts", start: { line: 16, character: 15 }, end: { line: 16, character: 42 } }, [], v.binop({ path: "nested-client.ts", start: { line: 16, character: 21 }, end: { line: 16, character: 42 } }, v.splice({ path: "nested-client.ts", start: { line: 16, character: 21 }, end: { line: 16, character: 30 } }, 0), "+", v.splice({ path: "nested-client.ts", start: { line: 16, character: 33 }, end: { line: 16, character: 42 } }, 1))));
        })();
    }
}
// A client object nested inside another: `Segment` reflects its `Point`
// members recursively, so the script reaches `s.to.sum` two levels deep.
class Segment {
    "@backtickjs" = "ClientObject";
    from;
    to;
    constructor(from, to) {
        this.from = from;
        this.to = to;
    }
}
export default (() => {
    const $0splice0 = new Segment(new Point((() => {
        return cs.create({ path: "nested-client.ts", start: { line: 35, character: 37 }, end: { line: 35, character: 42 } }, "13xhtw0", { splices: [], captures: [], declarations: [] }, v => v.number({ path: "nested-client.ts", start: { line: 35, character: 40 }, end: { line: 35, character: 41 } }, 1));
    })(), (() => {
        return cs.create({ path: "nested-client.ts", start: { line: 35, character: 44 }, end: { line: 35, character: 49 } }, "13xhtw0", { splices: [], captures: [], declarations: [] }, v => v.number({ path: "nested-client.ts", start: { line: 35, character: 47 }, end: { line: 35, character: 48 } }, 2));
    })()), new Point((() => {
        return cs.create({ path: "nested-client.ts", start: { line: 35, character: 62 }, end: { line: 35, character: 67 } }, "13xhtw0", { splices: [], captures: [], declarations: [] }, v => v.number({ path: "nested-client.ts", start: { line: 35, character: 65 }, end: { line: 35, character: 66 } }, 3));
    })(), (() => {
        return cs.create({ path: "nested-client.ts", start: { line: 35, character: 69 }, end: { line: 35, character: 74 } }, "13xhtw0", { splices: [], captures: [], declarations: [] }, v => v.number({ path: "nested-client.ts", start: { line: 35, character: 72 }, end: { line: 35, character: 73 } }, 4));
    })()));
    return cs.create({ path: "nested-client.ts", start: { line: 34, character: 16 }, end: { line: 37, character: 3 } }, "13xhtw0", { splices: [$0splice0], captures: [], declarations: ["s$13xhtw0$0"] }, v => v.block({ path: "nested-client.ts", start: { line: 34, character: 19 }, end: { line: 37, character: 2 } }, [v.variableDeclaration({ path: "nested-client.ts", start: { line: 35, character: 3 }, end: { line: 35, character: 78 } }, "const", v.identifier({ path: "nested-client.ts", start: { line: 35, character: 9 }, end: { line: 35, character: 10 } }, "s", "s$13xhtw0$0"), v.splice({ path: "nested-client.ts", start: { line: 35, character: 13 }, end: { line: 35, character: 77 } }, 0)), v.return({ path: "nested-client.ts", start: { line: 36, character: 3 }, end: { line: 36, character: 36 } }, v.binop({ path: "nested-client.ts", start: { line: 36, character: 10 }, end: { line: 36, character: 35 } }, v.call({ path: "nested-client.ts", start: { line: 36, character: 10 }, end: { line: 36, character: 20 } }, v.propertyAccess({ path: "nested-client.ts", start: { line: 36, character: 10 }, end: { line: 36, character: 18 } }, v.propertyAccess({ path: "nested-client.ts", start: { line: 36, character: 10 }, end: { line: 36, character: 14 } }, v.identifier({ path: "nested-client.ts", start: { line: 36, character: 10 }, end: { line: 36, character: 11 } }, "s", "s$13xhtw0$0"), "to"), "sum"), []), "-", v.call({ path: "nested-client.ts", start: { line: 36, character: 23 }, end: { line: 36, character: 35 } }, v.propertyAccess({ path: "nested-client.ts", start: { line: 36, character: 23 }, end: { line: 36, character: 33 } }, v.propertyAccess({ path: "nested-client.ts", start: { line: 36, character: 23 }, end: { line: 36, character: 29 } }, v.identifier({ path: "nested-client.ts", start: { line: 36, character: 23 }, end: { line: 36, character: 24 } }, "s", "s$13xhtw0$0"), "from"), "sum"), [])))]));
})();
