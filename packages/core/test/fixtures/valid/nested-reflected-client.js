import { cs } from "@backtickjs/core";
class Point {
    "@backtickjs/Client";
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
            return cs.create({ path: "nested-reflected-client.ts", start: { line: 16, character: 12 }, end: { line: 16, character: 43 } }, "cccucd", { splices: [$0splice0, $0splice1], captures: [], declarations: [] }, v => v.arrow({ path: "nested-reflected-client.ts", start: { line: 16, character: 15 }, end: { line: 16, character: 42 } }, [], v.binop({ path: "nested-reflected-client.ts", start: { line: 16, character: 21 }, end: { line: 16, character: 42 } }, v.splice({ path: "nested-reflected-client.ts", start: { line: 16, character: 21 }, end: { line: 16, character: 30 } }, 0), "+", v.splice({ path: "nested-reflected-client.ts", start: { line: 16, character: 33 }, end: { line: 16, character: 42 } }, 1))));
        })();
    }
}
class Segment {
    "@backtickjs/Client";
    from;
    to;
    constructor(from, to) {
        this.from = from;
        this.to = to;
    }
    get vertical() {
        return (() => {
            const $0splice0 = this.from.x;
            const $0splice1 = this.to.x;
            return cs.create({ path: "nested-reflected-client.ts", start: { line: 32, character: 12 }, end: { line: 32, character: 53 } }, "cccucd", { splices: [$0splice0, $0splice1], captures: [], declarations: [] }, v => v.arrow({ path: "nested-reflected-client.ts", start: { line: 32, character: 15 }, end: { line: 32, character: 52 } }, [], v.binop({ path: "nested-reflected-client.ts", start: { line: 32, character: 21 }, end: { line: 32, character: 52 } }, v.splice({ path: "nested-reflected-client.ts", start: { line: 32, character: 21 }, end: { line: 32, character: 35 } }, 0), "===", v.splice({ path: "nested-reflected-client.ts", start: { line: 32, character: 40 }, end: { line: 32, character: 52 } }, 1))));
        })();
    }
}
const segment = new Segment(new Point((() => {
    return cs.create({ path: "nested-reflected-client.ts", start: { line: 36, character: 39 }, end: { line: 36, character: 44 } }, "cccucd", { splices: [], captures: [], declarations: [] }, v => v.number({ path: "nested-reflected-client.ts", start: { line: 36, character: 42 }, end: { line: 36, character: 43 } }, 1));
})(), (() => {
    return cs.create({ path: "nested-reflected-client.ts", start: { line: 36, character: 46 }, end: { line: 36, character: 51 } }, "cccucd", { splices: [], captures: [], declarations: [] }, v => v.number({ path: "nested-reflected-client.ts", start: { line: 36, character: 49 }, end: { line: 36, character: 50 } }, 2));
})()), new Point((() => {
    return cs.create({ path: "nested-reflected-client.ts", start: { line: 36, character: 64 }, end: { line: 36, character: 69 } }, "cccucd", { splices: [], captures: [], declarations: [] }, v => v.number({ path: "nested-reflected-client.ts", start: { line: 36, character: 67 }, end: { line: 36, character: 68 } }, 1));
})(), (() => {
    return cs.create({ path: "nested-reflected-client.ts", start: { line: 36, character: 71 }, end: { line: 36, character: 76 } }, "cccucd", { splices: [], captures: [], declarations: [] }, v => v.number({ path: "nested-reflected-client.ts", start: { line: 36, character: 74 }, end: { line: 36, character: 75 } }, 8));
})()));
export default (() => {
    const $0splice0 = segment;
    return cs.create({ path: "nested-reflected-client.ts", start: { line: 38, character: 16 }, end: { line: 45, character: 3 } }, "cccucd", { splices: [$0splice0], captures: [], declarations: ["s$cccucd$0", "rise$cccucd$1"] }, v => v.block({ path: "nested-reflected-client.ts", start: { line: 38, character: 19 }, end: { line: 45, character: 2 } }, [v.variableDeclaration({ path: "nested-reflected-client.ts", start: { line: 39, character: 3 }, end: { line: 39, character: 24 } }, "const", v.identifier({ path: "nested-reflected-client.ts", start: { line: 39, character: 9 }, end: { line: 39, character: 10 } }, "s", "s$cccucd$0"), v.splice({ path: "nested-reflected-client.ts", start: { line: 39, character: 13 }, end: { line: 39, character: 23 } }, 0)), v.variableDeclaration({ path: "nested-reflected-client.ts", start: { line: 40, character: 3 }, end: { line: 40, character: 34 } }, "const", v.identifier({ path: "nested-reflected-client.ts", start: { line: 40, character: 9 }, end: { line: 40, character: 13 } }, "rise", "rise$cccucd$1"), v.binop({ path: "nested-reflected-client.ts", start: { line: 40, character: 16 }, end: { line: 40, character: 33 } }, v.propertyAccess({ path: "nested-reflected-client.ts", start: { line: 40, character: 16 }, end: { line: 40, character: 22 } }, v.propertyAccess({ path: "nested-reflected-client.ts", start: { line: 40, character: 16 }, end: { line: 40, character: 20 } }, v.identifier({ path: "nested-reflected-client.ts", start: { line: 40, character: 16 }, end: { line: 40, character: 17 } }, "s", "s$cccucd$0"), "to"), "y"), "-", v.propertyAccess({ path: "nested-reflected-client.ts", start: { line: 40, character: 25 }, end: { line: 40, character: 33 } }, v.propertyAccess({ path: "nested-reflected-client.ts", start: { line: 40, character: 25 }, end: { line: 40, character: 31 } }, v.identifier({ path: "nested-reflected-client.ts", start: { line: 40, character: 25 }, end: { line: 40, character: 26 } }, "s", "s$cccucd$0"), "from"), "y"))), v.if({ path: "nested-reflected-client.ts", start: { line: 41, character: 3 }, end: { line: 43, character: 4 } }, v.call({ path: "nested-reflected-client.ts", start: { line: 41, character: 7 }, end: { line: 41, character: 19 } }, v.propertyAccess({ path: "nested-reflected-client.ts", start: { line: 41, character: 7 }, end: { line: 41, character: 17 } }, v.identifier({ path: "nested-reflected-client.ts", start: { line: 41, character: 7 }, end: { line: 41, character: 8 } }, "s", "s$cccucd$0"), "vertical"), []), v.block({ path: "nested-reflected-client.ts", start: { line: 41, character: 21 }, end: { line: 43, character: 4 } }, [v.return({ path: "nested-reflected-client.ts", start: { line: 42, character: 5 }, end: { line: 42, character: 17 } }, v.identifier({ path: "nested-reflected-client.ts", start: { line: 42, character: 12 }, end: { line: 42, character: 16 } }, "rise", "rise$cccucd$1"))]), null), v.return({ path: "nested-reflected-client.ts", start: { line: 44, character: 3 }, end: { line: 44, character: 36 } }, v.binop({ path: "nested-reflected-client.ts", start: { line: 44, character: 10 }, end: { line: 44, character: 35 } }, v.call({ path: "nested-reflected-client.ts", start: { line: 44, character: 10 }, end: { line: 44, character: 20 } }, v.propertyAccess({ path: "nested-reflected-client.ts", start: { line: 44, character: 10 }, end: { line: 44, character: 18 } }, v.propertyAccess({ path: "nested-reflected-client.ts", start: { line: 44, character: 10 }, end: { line: 44, character: 14 } }, v.identifier({ path: "nested-reflected-client.ts", start: { line: 44, character: 10 }, end: { line: 44, character: 11 } }, "s", "s$cccucd$0"), "to"), "sum"), []), "-", v.call({ path: "nested-reflected-client.ts", start: { line: 44, character: 23 }, end: { line: 44, character: 35 } }, v.propertyAccess({ path: "nested-reflected-client.ts", start: { line: 44, character: 23 }, end: { line: 44, character: 33 } }, v.propertyAccess({ path: "nested-reflected-client.ts", start: { line: 44, character: 23 }, end: { line: 44, character: 29 } }, v.identifier({ path: "nested-reflected-client.ts", start: { line: 44, character: 23 }, end: { line: 44, character: 24 } }, "s", "s$cccucd$0"), "from"), "sum"), [])))]));
})();
