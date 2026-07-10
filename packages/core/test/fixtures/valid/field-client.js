import { cs } from "@backtickjs/core";
class Color {
    "@backtickjs/Client";
    r;
    g;
    b;
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
}
export default (() => {
    const $0splice0 = new Color((() => {
        return cs.create({ path: "field-client.ts", start: { line: 19, character: 25 }, end: { line: 19, character: 31 } }, "l6rbn3", { splices: [], captures: [], declarations: [] }, v => v.number({ path: "field-client.ts", start: { line: 19, character: 28 }, end: { line: 19, character: 30 } }, 30));
    })(), (() => {
        return cs.create({ path: "field-client.ts", start: { line: 19, character: 33 }, end: { line: 19, character: 40 } }, "l6rbn3", { splices: [], captures: [], declarations: [] }, v => v.number({ path: "field-client.ts", start: { line: 19, character: 36 }, end: { line: 19, character: 39 } }, 144));
    })(), (() => {
        return cs.create({ path: "field-client.ts", start: { line: 19, character: 42 }, end: { line: 19, character: 49 } }, "l6rbn3", { splices: [], captures: [], declarations: [] }, v => v.number({ path: "field-client.ts", start: { line: 19, character: 45 }, end: { line: 19, character: 48 } }, 255));
    })());
    return cs.create({ path: "field-client.ts", start: { line: 18, character: 16 }, end: { line: 25, character: 3 } }, "l6rbn3", { splices: [$0splice0], captures: [], declarations: ["c$l6rbn3$0", "brightness$l6rbn3$1"] }, v => v.block({ path: "field-client.ts", start: { line: 18, character: 19 }, end: { line: 25, character: 2 } }, [v.variableDeclaration({ path: "field-client.ts", start: { line: 19, character: 3 }, end: { line: 19, character: 52 } }, "const", v.identifier({ path: "field-client.ts", start: { line: 19, character: 9 }, end: { line: 19, character: 10 } }, "c", "c$l6rbn3$0"), v.splice({ path: "field-client.ts", start: { line: 19, character: 13 }, end: { line: 19, character: 51 } }, 0)), v.variableDeclaration({ path: "field-client.ts", start: { line: 20, character: 3 }, end: { line: 20, character: 38 } }, "const", v.identifier({ path: "field-client.ts", start: { line: 20, character: 9 }, end: { line: 20, character: 19 } }, "brightness", "brightness$l6rbn3$1"), v.binop({ path: "field-client.ts", start: { line: 20, character: 22 }, end: { line: 20, character: 37 } }, v.binop({ path: "field-client.ts", start: { line: 20, character: 22 }, end: { line: 20, character: 31 } }, v.propertyAccess({ path: "field-client.ts", start: { line: 20, character: 22 }, end: { line: 20, character: 25 } }, v.identifier({ path: "field-client.ts", start: { line: 20, character: 22 }, end: { line: 20, character: 23 } }, "c", "c$l6rbn3$0"), "r"), "+", v.propertyAccess({ path: "field-client.ts", start: { line: 20, character: 28 }, end: { line: 20, character: 31 } }, v.identifier({ path: "field-client.ts", start: { line: 20, character: 28 }, end: { line: 20, character: 29 } }, "c", "c$l6rbn3$0"), "g")), "+", v.propertyAccess({ path: "field-client.ts", start: { line: 20, character: 34 }, end: { line: 20, character: 37 } }, v.identifier({ path: "field-client.ts", start: { line: 20, character: 34 }, end: { line: 20, character: 35 } }, "c", "c$l6rbn3$0"), "b"))), v.if({ path: "field-client.ts", start: { line: 21, character: 3 }, end: { line: 23, character: 4 } }, v.binop({ path: "field-client.ts", start: { line: 21, character: 7 }, end: { line: 21, character: 23 } }, v.identifier({ path: "field-client.ts", start: { line: 21, character: 7 }, end: { line: 21, character: 17 } }, "brightness", "brightness$l6rbn3$1"), ">", v.number({ path: "field-client.ts", start: { line: 21, character: 20 }, end: { line: 21, character: 23 } }, 382)), v.block({ path: "field-client.ts", start: { line: 21, character: 25 }, end: { line: 23, character: 4 } }, [v.return({ path: "field-client.ts", start: { line: 22, character: 5 }, end: { line: 22, character: 20 } }, v.string({ path: "field-client.ts", start: { line: 22, character: 12 }, end: { line: 22, character: 19 } }, "light"))]), null), v.return({ path: "field-client.ts", start: { line: 24, character: 3 }, end: { line: 24, character: 17 } }, v.string({ path: "field-client.ts", start: { line: 24, character: 10 }, end: { line: 24, character: 16 } }, "dark"))]));
})();
