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
            return cs.create({ path: "nested-client.ts", start: { line: 16, character: 12 }, end: { line: 16, character: 43 } }, "1aeshym", { splices: [$0splice0, $0splice1], captures: [], declarations: [] }, v => v.arrow({ path: "nested-client.ts", start: { line: 16, character: 15 }, end: { line: 16, character: 42 } }, [], v.binop({ path: "nested-client.ts", start: { line: 16, character: 21 }, end: { line: 16, character: 42 } }, v.splice({ path: "nested-client.ts", start: { line: 16, character: 21 }, end: { line: 16, character: 30 } }, 0), "+", v.splice({ path: "nested-client.ts", start: { line: 16, character: 33 }, end: { line: 16, character: 42 } }, 1))));
        })();
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
export default (() => {
    const $0splice0 = new Segment((() => {
        return cs.create({ path: "nested-client.ts", start: { line: 35, character: 60 }, end: { line: 35, character: 68 } }, "1aeshym", { splices: [], captures: ["arg0$1aeshym$2"], declarations: [] }, v => v.identifier({ path: "nested-client.ts", start: { line: 35, character: 63 }, end: { line: 35, character: 67 } }, "arg0", "arg0$1aeshym$2"));
    })(), (() => {
        return cs.create({ path: "nested-client.ts", start: { line: 35, character: 70 }, end: { line: 35, character: 78 } }, "1aeshym", { splices: [], captures: ["arg1$1aeshym$3"], declarations: [] }, v => v.identifier({ path: "nested-client.ts", start: { line: 35, character: 73 }, end: { line: 35, character: 77 } }, "arg1", "arg1$1aeshym$3"));
    })());
    const $0splice1 = new Segment((() => {
        const $0splice0 = new Point((() => {
            return cs.create({ path: "nested-client.ts", start: { line: 36, character: 42 }, end: { line: 36, character: 47 } }, "1aeshym", { splices: [], captures: [], declarations: [] }, v => v.number({ path: "nested-client.ts", start: { line: 36, character: 45 }, end: { line: 36, character: 46 } }, 1));
        })(), (() => {
            return cs.create({ path: "nested-client.ts", start: { line: 36, character: 49 }, end: { line: 36, character: 54 } }, "1aeshym", { splices: [], captures: [], declarations: [] }, v => v.number({ path: "nested-client.ts", start: { line: 36, character: 52 }, end: { line: 36, character: 53 } }, 2));
        })());
        return cs.create({ path: "nested-client.ts", start: { line: 36, character: 27 }, end: { line: 36, character: 57 } }, "1aeshym", { splices: [$0splice0], captures: [], declarations: [] }, v => v.splice({ path: "nested-client.ts", start: { line: 36, character: 30 }, end: { line: 36, character: 56 } }, 0));
    })(), (() => {
        const $0splice0 = new Point((() => {
            return cs.create({ path: "nested-client.ts", start: { line: 36, character: 74 }, end: { line: 36, character: 79 } }, "1aeshym", { splices: [], captures: [], declarations: [] }, v => v.number({ path: "nested-client.ts", start: { line: 36, character: 77 }, end: { line: 36, character: 78 } }, 3));
        })(), (() => {
            return cs.create({ path: "nested-client.ts", start: { line: 36, character: 81 }, end: { line: 36, character: 86 } }, "1aeshym", { splices: [], captures: [], declarations: [] }, v => v.number({ path: "nested-client.ts", start: { line: 36, character: 84 }, end: { line: 36, character: 85 } }, 4));
        })());
        return cs.create({ path: "nested-client.ts", start: { line: 36, character: 59 }, end: { line: 36, character: 89 } }, "1aeshym", { splices: [$0splice0], captures: [], declarations: [] }, v => v.splice({ path: "nested-client.ts", start: { line: 36, character: 62 }, end: { line: 36, character: 88 } }, 0));
    })());
    return cs.create({ path: "nested-client.ts", start: { line: 34, character: 16 }, end: { line: 38, character: 3 } }, "1aeshym", { splices: [$0splice0, $0splice1], captures: [], declarations: ["init$1aeshym$0", "s$1aeshym$1", "arg0$1aeshym$2", "arg1$1aeshym$3"] }, v => v.block({ path: "nested-client.ts", start: { line: 34, character: 19 }, end: { line: 38, character: 2 } }, [v.variableDeclaration({ path: "nested-client.ts", start: { line: 35, character: 3 }, end: { line: 35, character: 81 } }, "const", v.identifier({ path: "nested-client.ts", start: { line: 35, character: 9 }, end: { line: 35, character: 13 } }, "init", "init$1aeshym$0"), v.arrow({ path: "nested-client.ts", start: { line: 35, character: 16 }, end: { line: 35, character: 80 } }, [v.identifier({ path: "nested-client.ts", start: { line: 35, character: 17 }, end: { line: 35, character: 21 } }, "arg0", "arg0$1aeshym$2"), v.identifier({ path: "nested-client.ts", start: { line: 35, character: 30 }, end: { line: 35, character: 34 } }, "arg1", "arg1$1aeshym$3")], v.splice({ path: "nested-client.ts", start: { line: 35, character: 46 }, end: { line: 35, character: 80 } }, 0))), v.variableDeclaration({ path: "nested-client.ts", start: { line: 36, character: 3 }, end: { line: 36, character: 92 } }, "const", v.identifier({ path: "nested-client.ts", start: { line: 36, character: 9 }, end: { line: 36, character: 10 } }, "s", "s$1aeshym$1"), v.splice({ path: "nested-client.ts", start: { line: 36, character: 13 }, end: { line: 36, character: 91 } }, 1)), v.return({ path: "nested-client.ts", start: { line: 37, character: 3 }, end: { line: 37, character: 36 } }, v.binop({ path: "nested-client.ts", start: { line: 37, character: 10 }, end: { line: 37, character: 35 } }, v.call({ path: "nested-client.ts", start: { line: 37, character: 10 }, end: { line: 37, character: 20 } }, v.propertyAccess({ path: "nested-client.ts", start: { line: 37, character: 10 }, end: { line: 37, character: 18 } }, v.propertyAccess({ path: "nested-client.ts", start: { line: 37, character: 10 }, end: { line: 37, character: 14 } }, v.identifier({ path: "nested-client.ts", start: { line: 37, character: 10 }, end: { line: 37, character: 11 } }, "s", "s$1aeshym$1"), "to"), "sum"), []), "-", v.call({ path: "nested-client.ts", start: { line: 37, character: 23 }, end: { line: 37, character: 35 } }, v.propertyAccess({ path: "nested-client.ts", start: { line: 37, character: 23 }, end: { line: 37, character: 33 } }, v.propertyAccess({ path: "nested-client.ts", start: { line: 37, character: 23 }, end: { line: 37, character: 29 } }, v.identifier({ path: "nested-client.ts", start: { line: 37, character: 23 }, end: { line: 37, character: 24 } }, "s", "s$1aeshym$1"), "from"), "sum"), [])))]));
})();
