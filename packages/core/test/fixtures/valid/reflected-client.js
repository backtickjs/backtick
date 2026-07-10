import { cs } from "@backtickjs/core";
class Point {
    "@backtickjs";
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    get valid() {
        return (() => {
            const $0splice0 = this.x;
            const $0splice1 = this.y;
            return cs.create({ path: "reflected-client.ts", start: { line: 16, character: 12 }, end: { line: 16, character: 43 } }, "1imui3m", { splices: [$0splice0, $0splice1], captures: [], declarations: [] }, v => v.arrow({ path: "reflected-client.ts", start: { line: 16, character: 15 }, end: { line: 16, character: 42 } }, [], v.binop({ path: "reflected-client.ts", start: { line: 16, character: 21 }, end: { line: 16, character: 42 } }, v.splice({ path: "reflected-client.ts", start: { line: 16, character: 21 }, end: { line: 16, character: 30 } }, 0), "+", v.splice({ path: "reflected-client.ts", start: { line: 16, character: 33 }, end: { line: 16, character: 42 } }, 1))));
        })();
    }
    get invalid() {
        return;
    }
}
export default (() => {
    const $0splice0 = new Point((() => {
        return cs.create({ path: "reflected-client.ts", start: { line: 25, character: 25 }, end: { line: 25, character: 30 } }, "1imui3m", { splices: [], captures: [], declarations: [] }, v => v.number({ path: "reflected-client.ts", start: { line: 25, character: 28 }, end: { line: 25, character: 29 } }, 1));
    })(), (() => {
        return cs.create({ path: "reflected-client.ts", start: { line: 25, character: 32 }, end: { line: 25, character: 37 } }, "1imui3m", { splices: [], captures: [], declarations: [] }, v => v.number({ path: "reflected-client.ts", start: { line: 25, character: 35 }, end: { line: 25, character: 36 } }, 2));
    })());
    const $0splice1 = new Point((() => {
        return cs.create({ path: "reflected-client.ts", start: { line: 26, character: 25 }, end: { line: 26, character: 30 } }, "1imui3m", { splices: [], captures: [], declarations: [] }, v => v.number({ path: "reflected-client.ts", start: { line: 26, character: 28 }, end: { line: 26, character: 29 } }, 3));
    })(), (() => {
        return cs.create({ path: "reflected-client.ts", start: { line: 26, character: 32 }, end: { line: 26, character: 37 } }, "1imui3m", { splices: [], captures: [], declarations: [] }, v => v.number({ path: "reflected-client.ts", start: { line: 26, character: 35 }, end: { line: 26, character: 36 } }, 4));
    })());
    return cs.create({ path: "reflected-client.ts", start: { line: 24, character: 16 }, end: { line: 28, character: 3 } }, "1imui3m", { splices: [$0splice0, $0splice1], captures: [], declarations: ["a$1imui3m$0", "b$1imui3m$1"] }, v => v.block({ path: "reflected-client.ts", start: { line: 24, character: 19 }, end: { line: 28, character: 2 } }, [v.variableDeclaration({ path: "reflected-client.ts", start: { line: 25, character: 3 }, end: { line: 25, character: 40 } }, "const", v.identifier({ path: "reflected-client.ts", start: { line: 25, character: 9 }, end: { line: 25, character: 10 } }, "a", "a$1imui3m$0"), v.splice({ path: "reflected-client.ts", start: { line: 25, character: 13 }, end: { line: 25, character: 39 } }, 0)), v.variableDeclaration({ path: "reflected-client.ts", start: { line: 26, character: 3 }, end: { line: 26, character: 40 } }, "const", v.identifier({ path: "reflected-client.ts", start: { line: 26, character: 9 }, end: { line: 26, character: 10 } }, "b", "b$1imui3m$1"), v.splice({ path: "reflected-client.ts", start: { line: 26, character: 13 }, end: { line: 26, character: 39 } }, 1)), v.call({ path: "reflected-client.ts", start: { line: 27, character: 3 }, end: { line: 27, character: 12 } }, v.propertyAccess({ path: "reflected-client.ts", start: { line: 27, character: 3 }, end: { line: 27, character: 10 } }, v.identifier({ path: "reflected-client.ts", start: { line: 27, character: 3 }, end: { line: 27, character: 4 } }, "a", "a$1imui3m$0"), "valid"), [])]));
})();
