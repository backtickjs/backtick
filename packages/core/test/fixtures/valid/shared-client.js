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
            return cs.create({ path: "shared-client.ts", start: { line: 16, character: 12 }, end: { line: 16, character: 43 } }, "bqe34n", { splices: [$0splice0, $0splice1], captures: [], declarations: [] }, v => v.arrow({ path: "shared-client.ts", start: { line: 16, character: 15 }, end: { line: 16, character: 42 } }, [], v.binop({ path: "shared-client.ts", start: { line: 16, character: 21 }, end: { line: 16, character: 42 } }, v.splice({ path: "shared-client.ts", start: { line: 16, character: 21 }, end: { line: 16, character: 30 } }, 0), "+", v.splice({ path: "shared-client.ts", start: { line: 16, character: 33 }, end: { line: 16, character: 42 } }, 1))));
        })();
    }
}
// The same instance spliced through two scripts: it must lower once and be
// shared (its getters evaluated a single time), not re-expanded per path.
const shared = new Point((() => {
    return cs.create({ path: "shared-client.ts", start: { line: 22, character: 26 }, end: { line: 22, character: 31 } }, "bqe34n", { splices: [], captures: [], declarations: [] }, v => v.number({ path: "shared-client.ts", start: { line: 22, character: 29 }, end: { line: 22, character: 30 } }, 1));
})(), (() => {
    return cs.create({ path: "shared-client.ts", start: { line: 22, character: 33 }, end: { line: 22, character: 38 } }, "bqe34n", { splices: [], captures: [], declarations: [] }, v => v.number({ path: "shared-client.ts", start: { line: 22, character: 36 }, end: { line: 22, character: 37 } }, 2));
})());
const left = (() => {
    const $0splice0 = shared;
    return cs.create({ path: "shared-client.ts", start: { line: 24, character: 14 }, end: { line: 27, character: 3 } }, "bqe34n", { splices: [$0splice0], captures: [], declarations: ["p$bqe34n$0"] }, v => v.block({ path: "shared-client.ts", start: { line: 24, character: 17 }, end: { line: 27, character: 2 } }, [v.variableDeclaration({ path: "shared-client.ts", start: { line: 25, character: 3 }, end: { line: 25, character: 23 } }, "const", v.identifier({ path: "shared-client.ts", start: { line: 25, character: 9 }, end: { line: 25, character: 10 } }, "p", "p$bqe34n$0"), v.splice({ path: "shared-client.ts", start: { line: 25, character: 13 }, end: { line: 25, character: 22 } }, 0)), v.return({ path: "shared-client.ts", start: { line: 26, character: 3 }, end: { line: 26, character: 18 } }, v.call({ path: "shared-client.ts", start: { line: 26, character: 10 }, end: { line: 26, character: 17 } }, v.propertyAccess({ path: "shared-client.ts", start: { line: 26, character: 10 }, end: { line: 26, character: 15 } }, v.identifier({ path: "shared-client.ts", start: { line: 26, character: 10 }, end: { line: 26, character: 11 } }, "p", "p$bqe34n$0"), "sum"), []))]));
})();
const right = (() => {
    const $0splice0 = shared;
    return cs.create({ path: "shared-client.ts", start: { line: 29, character: 15 }, end: { line: 32, character: 3 } }, "bqe34n", { splices: [$0splice0], captures: [], declarations: ["p$bqe34n$1"] }, v => v.block({ path: "shared-client.ts", start: { line: 29, character: 18 }, end: { line: 32, character: 2 } }, [v.variableDeclaration({ path: "shared-client.ts", start: { line: 30, character: 3 }, end: { line: 30, character: 23 } }, "const", v.identifier({ path: "shared-client.ts", start: { line: 30, character: 9 }, end: { line: 30, character: 10 } }, "p", "p$bqe34n$1"), v.splice({ path: "shared-client.ts", start: { line: 30, character: 13 }, end: { line: 30, character: 22 } }, 0)), v.return({ path: "shared-client.ts", start: { line: 31, character: 3 }, end: { line: 31, character: 14 } }, v.propertyAccess({ path: "shared-client.ts", start: { line: 31, character: 10 }, end: { line: 31, character: 13 } }, v.identifier({ path: "shared-client.ts", start: { line: 31, character: 10 }, end: { line: 31, character: 11 } }, "p", "p$bqe34n$1"), "x"))]));
})();
export default (() => {
    const $0splice0 = left;
    const $0splice1 = right;
    return cs.create({ path: "shared-client.ts", start: { line: 34, character: 16 }, end: { line: 34, character: 38 } }, "bqe34n", { splices: [$0splice0, $0splice1], captures: [], declarations: [] }, v => v.binop({ path: "shared-client.ts", start: { line: 34, character: 19 }, end: { line: 34, character: 37 } }, v.splice({ path: "shared-client.ts", start: { line: 34, character: 19 }, end: { line: 34, character: 26 } }, 0), "+", v.splice({ path: "shared-client.ts", start: { line: 34, character: 29 }, end: { line: 34, character: 37 } }, 1)));
})();
