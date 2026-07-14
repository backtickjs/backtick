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
            return cs.create({ path: "nested-client.ts", start: { line: 20, character: 12 }, end: { line: 20, character: 43 } }, "zx26oe", { splices: [$0splice0, $0splice1], captures: [], declarations: [] }, v => v.arrow({ path: "nested-client.ts", start: { line: 20, character: 15 }, end: { line: 20, character: 42 } }, [], v.binop({ path: "nested-client.ts", start: { line: 20, character: 21 }, end: { line: 20, character: 42 } }, v.splice({ path: "nested-client.ts", start: { line: 20, character: 21 }, end: { line: 20, character: 30 } }, 0), "+", v.splice({ path: "nested-client.ts", start: { line: 20, character: 33 }, end: { line: 20, character: 42 } }, 1))));
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
function new0(Cls) {
    return (() => {
        const $0splice0 = new Cls();
        return cs.create({ path: "nested-client.ts", start: { line: 39, character: 10 }, end: { line: 39, character: 32 } }, "zx26oe", { splices: [$0splice0], captures: [], declarations: [] }, v => v.arrow({ path: "nested-client.ts", start: { line: 39, character: 13 }, end: { line: 39, character: 31 } }, [], v.splice({ path: "nested-client.ts", start: { line: 39, character: 19 }, end: { line: 39, character: 31 } }, 0)));
    })();
}
function new1(Obj) {
    return (() => {
        const $0splice0 = new Obj((() => {
            return cs.create({ path: "nested-client.ts", start: { line: 45, character: 40 }, end: { line: 45, character: 48 } }, "zx26oe", { splices: [], captures: ["arg0$zx26oe$0"], declarations: [] }, v => v.identifier({ path: "nested-client.ts", start: { line: 45, character: 43 }, end: { line: 45, character: 47 } }, "arg0", "arg0$zx26oe$0"));
        })());
        return cs.create({ path: "nested-client.ts", start: { line: 45, character: 10 }, end: { line: 45, character: 51 } }, "zx26oe", { splices: [$0splice0], captures: [], declarations: ["arg0$zx26oe$0"] }, v => v.arrow({ path: "nested-client.ts", start: { line: 45, character: 13 }, end: { line: 45, character: 50 } }, [v.identifier({ path: "nested-client.ts", start: { line: 45, character: 14 }, end: { line: 45, character: 18 } }, "arg0", "arg0$zx26oe$0")], v.splice({ path: "nested-client.ts", start: { line: 45, character: 30 }, end: { line: 45, character: 50 } }, 0)));
    })();
}
function new2(Obj) {
    return (() => {
        const $0splice0 = new Obj((() => {
            return cs.create({ path: "nested-client.ts", start: { line: 55, character: 53 }, end: { line: 55, character: 61 } }, "zx26oe", { splices: [], captures: ["arg0$zx26oe$1"], declarations: [] }, v => v.identifier({ path: "nested-client.ts", start: { line: 55, character: 56 }, end: { line: 55, character: 60 } }, "arg0", "arg0$zx26oe$1"));
        })(), (() => {
            return cs.create({ path: "nested-client.ts", start: { line: 55, character: 63 }, end: { line: 55, character: 71 } }, "zx26oe", { splices: [], captures: ["arg1$zx26oe$2"], declarations: [] }, v => v.identifier({ path: "nested-client.ts", start: { line: 55, character: 66 }, end: { line: 55, character: 70 } }, "arg1", "arg1$zx26oe$2"));
        })());
        return cs.create({ path: "nested-client.ts", start: { line: 55, character: 10 }, end: { line: 55, character: 74 } }, "zx26oe", { splices: [$0splice0], captures: [], declarations: ["arg0$zx26oe$1", "arg1$zx26oe$2"] }, v => v.arrow({ path: "nested-client.ts", start: { line: 55, character: 13 }, end: { line: 55, character: 73 } }, [v.identifier({ path: "nested-client.ts", start: { line: 55, character: 14 }, end: { line: 55, character: 18 } }, "arg0", "arg0$zx26oe$1"), v.identifier({ path: "nested-client.ts", start: { line: 55, character: 27 }, end: { line: 55, character: 31 } }, "arg1", "arg1$zx26oe$2")], v.splice({ path: "nested-client.ts", start: { line: 55, character: 43 }, end: { line: 55, character: 73 } }, 0)));
    })();
}
export default (() => {
    const $0splice0 = new2(Segment);
    const $0splice1 = new2(Point);
    const $0splice2 = new2(Point);
    return cs.create({ path: "nested-client.ts", start: { line: 58, character: 16 }, end: { line: 61, character: 3 } }, "zx26oe", { splices: [$0splice0, $0splice1, $0splice2], captures: [], declarations: ["s$zx26oe$3"] }, v => v.block({ path: "nested-client.ts", start: { line: 58, character: 19 }, end: { line: 61, character: 2 } }, [v.variableDeclaration({ path: "nested-client.ts", start: { line: 59, character: 3 }, end: { line: 59, character: 74 } }, "const", v.identifier({ path: "nested-client.ts", start: { line: 59, character: 9 }, end: { line: 59, character: 10 } }, "s", "s$zx26oe$3"), v.call({ path: "nested-client.ts", start: { line: 59, character: 13 }, end: { line: 59, character: 73 } }, v.splice({ path: "nested-client.ts", start: { line: 59, character: 13 }, end: { line: 59, character: 29 } }, 0), [v.call({ path: "nested-client.ts", start: { line: 59, character: 30 }, end: { line: 59, character: 50 } }, v.splice({ path: "nested-client.ts", start: { line: 59, character: 30 }, end: { line: 59, character: 44 } }, 1), [v.number({ path: "nested-client.ts", start: { line: 59, character: 45 }, end: { line: 59, character: 46 } }, 1), v.number({ path: "nested-client.ts", start: { line: 59, character: 48 }, end: { line: 59, character: 49 } }, 2)]), v.call({ path: "nested-client.ts", start: { line: 59, character: 52 }, end: { line: 59, character: 72 } }, v.splice({ path: "nested-client.ts", start: { line: 59, character: 52 }, end: { line: 59, character: 66 } }, 2), [v.number({ path: "nested-client.ts", start: { line: 59, character: 67 }, end: { line: 59, character: 68 } }, 1), v.number({ path: "nested-client.ts", start: { line: 59, character: 70 }, end: { line: 59, character: 71 } }, 2)])])), v.return({ path: "nested-client.ts", start: { line: 60, character: 3 }, end: { line: 60, character: 36 } }, v.binop({ path: "nested-client.ts", start: { line: 60, character: 10 }, end: { line: 60, character: 35 } }, v.call({ path: "nested-client.ts", start: { line: 60, character: 10 }, end: { line: 60, character: 20 } }, v.propertyAccess({ path: "nested-client.ts", start: { line: 60, character: 10 }, end: { line: 60, character: 18 } }, v.propertyAccess({ path: "nested-client.ts", start: { line: 60, character: 10 }, end: { line: 60, character: 14 } }, v.identifier({ path: "nested-client.ts", start: { line: 60, character: 10 }, end: { line: 60, character: 11 } }, "s", "s$zx26oe$3"), "to"), "sum"), []), "-", v.call({ path: "nested-client.ts", start: { line: 60, character: 23 }, end: { line: 60, character: 35 } }, v.propertyAccess({ path: "nested-client.ts", start: { line: 60, character: 23 }, end: { line: 60, character: 33 } }, v.propertyAccess({ path: "nested-client.ts", start: { line: 60, character: 23 }, end: { line: 60, character: 29 } }, v.identifier({ path: "nested-client.ts", start: { line: 60, character: 23 }, end: { line: 60, character: 24 } }, "s", "s$zx26oe$3"), "from"), "sum"), [])))]));
})();
