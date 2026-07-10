import { cs } from "@backtickjs/core";
class Point {
    "@backtickjs";
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
            return cs.create({ path: "reflected-client.tsx", start: { line: 16, character: 12 }, end: { line: 16, character: 43 } }, "3u9mzp", { splices: [$0splice0, $0splice1], captures: [], declarations: [] }, v => v.arrow({ path: "reflected-client.tsx", start: { line: 16, character: 15 }, end: { line: 16, character: 42 } }, [], v.binop({ path: "reflected-client.tsx", start: { line: 16, character: 21 }, end: { line: 16, character: 42 } }, v.splice({ path: "reflected-client.tsx", start: { line: 16, character: 21 }, end: { line: 16, character: 30 } }, 0), "+", v.splice({ path: "reflected-client.tsx", start: { line: 16, character: 33 }, end: { line: 16, character: 42 } }, 1))));
        })();
    }
}
class Segment {
    "@backtickjs";
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
            return cs.create({ path: "reflected-client.tsx", start: { line: 32, character: 12 }, end: { line: 32, character: 53 } }, "3u9mzp", { splices: [$0splice0, $0splice1], captures: [], declarations: [] }, v => v.arrow({ path: "reflected-client.tsx", start: { line: 32, character: 15 }, end: { line: 32, character: 52 } }, [], v.binop({ path: "reflected-client.tsx", start: { line: 32, character: 21 }, end: { line: 32, character: 52 } }, v.splice({ path: "reflected-client.tsx", start: { line: 32, character: 21 }, end: { line: 32, character: 35 } }, 0), "===", v.splice({ path: "reflected-client.tsx", start: { line: 32, character: 40 }, end: { line: 32, character: 52 } }, 1))));
        })();
    }
}
const segment = new Segment(new Point((() => {
    return cs.create({ path: "reflected-client.tsx", start: { line: 37, character: 13 }, end: { line: 37, character: 18 } }, "3u9mzp", { splices: [], captures: [], declarations: [] }, v => v.number({ path: "reflected-client.tsx", start: { line: 37, character: 16 }, end: { line: 37, character: 17 } }, 1));
})(), (() => {
    return cs.create({ path: "reflected-client.tsx", start: { line: 37, character: 20 }, end: { line: 37, character: 25 } }, "3u9mzp", { splices: [], captures: [], declarations: [] }, v => v.number({ path: "reflected-client.tsx", start: { line: 37, character: 23 }, end: { line: 37, character: 24 } }, 2));
})()), new Point((() => {
    return cs.create({ path: "reflected-client.tsx", start: { line: 38, character: 13 }, end: { line: 38, character: 18 } }, "3u9mzp", { splices: [], captures: [], declarations: [] }, v => v.number({ path: "reflected-client.tsx", start: { line: 38, character: 16 }, end: { line: 38, character: 17 } }, 1));
})(), (() => {
    return cs.create({ path: "reflected-client.tsx", start: { line: 38, character: 20 }, end: { line: 38, character: 25 } }, "3u9mzp", { splices: [], captures: [], declarations: [] }, v => v.number({ path: "reflected-client.tsx", start: { line: 38, character: 23 }, end: { line: 38, character: 24 } }, 8));
})()));
const script = (() => {
    const $0splice0 = segment;
    return cs.create({ path: "reflected-client.tsx", start: { line: 41, character: 16 }, end: { line: 48, character: 3 } }, "3u9mzp", { splices: [$0splice0], captures: [], declarations: ["s$3u9mzp$0", "rise$3u9mzp$1"] }, v => v.block({ path: "reflected-client.tsx", start: { line: 41, character: 19 }, end: { line: 48, character: 2 } }, [v.variableDeclaration({ path: "reflected-client.tsx", start: { line: 42, character: 3 }, end: { line: 42, character: 24 } }, "const", v.identifier({ path: "reflected-client.tsx", start: { line: 42, character: 9 }, end: { line: 42, character: 10 } }, "s", "s$3u9mzp$0"), v.splice({ path: "reflected-client.tsx", start: { line: 42, character: 13 }, end: { line: 42, character: 23 } }, 0)), v.variableDeclaration({ path: "reflected-client.tsx", start: { line: 43, character: 3 }, end: { line: 43, character: 34 } }, "const", v.identifier({ path: "reflected-client.tsx", start: { line: 43, character: 9 }, end: { line: 43, character: 13 } }, "rise", "rise$3u9mzp$1"), v.binop({ path: "reflected-client.tsx", start: { line: 43, character: 16 }, end: { line: 43, character: 33 } }, v.propertyAccess({ path: "reflected-client.tsx", start: { line: 43, character: 16 }, end: { line: 43, character: 22 } }, v.propertyAccess({ path: "reflected-client.tsx", start: { line: 43, character: 16 }, end: { line: 43, character: 20 } }, v.identifier({ path: "reflected-client.tsx", start: { line: 43, character: 16 }, end: { line: 43, character: 17 } }, "s", "s$3u9mzp$0"), "to"), "y"), "-", v.propertyAccess({ path: "reflected-client.tsx", start: { line: 43, character: 25 }, end: { line: 43, character: 33 } }, v.propertyAccess({ path: "reflected-client.tsx", start: { line: 43, character: 25 }, end: { line: 43, character: 31 } }, v.identifier({ path: "reflected-client.tsx", start: { line: 43, character: 25 }, end: { line: 43, character: 26 } }, "s", "s$3u9mzp$0"), "from"), "y"))), v.if({ path: "reflected-client.tsx", start: { line: 44, character: 3 }, end: { line: 46, character: 4 } }, v.call({ path: "reflected-client.tsx", start: { line: 44, character: 7 }, end: { line: 44, character: 19 } }, v.propertyAccess({ path: "reflected-client.tsx", start: { line: 44, character: 7 }, end: { line: 44, character: 17 } }, v.identifier({ path: "reflected-client.tsx", start: { line: 44, character: 7 }, end: { line: 44, character: 8 } }, "s", "s$3u9mzp$0"), "vertical"), []), v.block({ path: "reflected-client.tsx", start: { line: 44, character: 21 }, end: { line: 46, character: 4 } }, [v.return({ path: "reflected-client.tsx", start: { line: 45, character: 5 }, end: { line: 45, character: 17 } }, v.identifier({ path: "reflected-client.tsx", start: { line: 45, character: 12 }, end: { line: 45, character: 16 } }, "rise", "rise$3u9mzp$1"))]), null), v.return({ path: "reflected-client.tsx", start: { line: 47, character: 3 }, end: { line: 47, character: 36 } }, v.binop({ path: "reflected-client.tsx", start: { line: 47, character: 10 }, end: { line: 47, character: 35 } }, v.call({ path: "reflected-client.tsx", start: { line: 47, character: 10 }, end: { line: 47, character: 20 } }, v.propertyAccess({ path: "reflected-client.tsx", start: { line: 47, character: 10 }, end: { line: 47, character: 18 } }, v.propertyAccess({ path: "reflected-client.tsx", start: { line: 47, character: 10 }, end: { line: 47, character: 14 } }, v.identifier({ path: "reflected-client.tsx", start: { line: 47, character: 10 }, end: { line: 47, character: 11 } }, "s", "s$3u9mzp$0"), "to"), "sum"), []), "-", v.call({ path: "reflected-client.tsx", start: { line: 47, character: 23 }, end: { line: 47, character: 35 } }, v.propertyAccess({ path: "reflected-client.tsx", start: { line: 47, character: 23 }, end: { line: 47, character: 33 } }, v.propertyAccess({ path: "reflected-client.tsx", start: { line: 47, character: 23 }, end: { line: 47, character: 29 } }, v.identifier({ path: "reflected-client.tsx", start: { line: 47, character: 23 }, end: { line: 47, character: 24 } }, "s", "s$3u9mzp$0"), "from"), "sum"), [])))]));
})();
