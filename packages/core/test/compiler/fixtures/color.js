import { cs } from "@backtickjs/core";
import { print } from "../print.ts";
class Color {
    r;
    g;
    b;
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
    $$type = this;
    visit(visitor) {
        return (() => {
            const $0splice0 = this.r;
            const $0splice1 = this.g;
            const $0splice2 = this.b;
            return cs.create({ path: "color.tsx", start: { line: 19, character: 12 }, end: { line: 19, character: 62 } }, { splices: [$0splice0, $0splice1, $0splice2], freeVars: [] }, v => v.object({ path: "color.tsx", start: { line: 19, character: 16 }, end: { line: 19, character: 60 } }, { r: v.splice({ path: "color.tsx", start: { line: 19, character: 21 }, end: { line: 19, character: 30 } }, 0), g: v.splice({ path: "color.tsx", start: { line: 19, character: 35 }, end: { line: 19, character: 44 } }, 1), b: v.splice({ path: "color.tsx", start: { line: 19, character: 49 }, end: { line: 19, character: 58 } }, 2) }));
        })().visit(visitor);
    }
}
const color = new Color(30, 144, 255);
const script = (() => {
    const $0splice0 = color;
    return cs.create({ path: "color.tsx", start: { line: 25, character: 16 }, end: { line: 32, character: 3 } }, { splices: [$0splice0], freeVars: [] }, v => v.block({ path: "color.tsx", start: { line: 25, character: 19 }, end: { line: 32, character: 2 } }, [v.variableDeclaration({ path: "color.tsx", start: { line: 26, character: 3 }, end: { line: 26, character: 22 } }, "const", v.identifier({ path: "color.tsx", start: { line: 26, character: 9 }, end: { line: 26, character: 10 } }, "c", "c$goyd1d_0"), v.splice({ path: "color.tsx", start: { line: 26, character: 13 }, end: { line: 26, character: 21 } }, 0)), v.variableDeclaration({ path: "color.tsx", start: { line: 27, character: 3 }, end: { line: 27, character: 38 } }, "const", v.identifier({ path: "color.tsx", start: { line: 27, character: 9 }, end: { line: 27, character: 19 } }, "brightness", "brightness$goyd1d_1"), v.binop({ path: "color.tsx", start: { line: 27, character: 22 }, end: { line: 27, character: 37 } }, v.binop({ path: "color.tsx", start: { line: 27, character: 22 }, end: { line: 27, character: 31 } }, v.propertyAccess({ path: "color.tsx", start: { line: 27, character: 22 }, end: { line: 27, character: 25 } }, v.identifier({ path: "color.tsx", start: { line: 27, character: 22 }, end: { line: 27, character: 23 } }, "c", "c$goyd1d_0"), "r"), "+", v.propertyAccess({ path: "color.tsx", start: { line: 27, character: 28 }, end: { line: 27, character: 31 } }, v.identifier({ path: "color.tsx", start: { line: 27, character: 28 }, end: { line: 27, character: 29 } }, "c", "c$goyd1d_0"), "g")), "+", v.propertyAccess({ path: "color.tsx", start: { line: 27, character: 34 }, end: { line: 27, character: 37 } }, v.identifier({ path: "color.tsx", start: { line: 27, character: 34 }, end: { line: 27, character: 35 } }, "c", "c$goyd1d_0"), "b"))), v.if({ path: "color.tsx", start: { line: 28, character: 3 }, end: { line: 30, character: 4 } }, v.binop({ path: "color.tsx", start: { line: 28, character: 7 }, end: { line: 28, character: 23 } }, v.identifier({ path: "color.tsx", start: { line: 28, character: 7 }, end: { line: 28, character: 17 } }, "brightness", "brightness$goyd1d_1"), ">", v.number({ path: "color.tsx", start: { line: 28, character: 20 }, end: { line: 28, character: 23 } }, 382)), v.block({ path: "color.tsx", start: { line: 28, character: 25 }, end: { line: 30, character: 4 } }, [v.return({ path: "color.tsx", start: { line: 29, character: 5 }, end: { line: 29, character: 20 } }, v.string({ path: "color.tsx", start: { line: 29, character: 12 }, end: { line: 29, character: 19 } }, "light"))]), null), v.return({ path: "color.tsx", start: { line: 31, character: 3 }, end: { line: 31, character: 17 } }, v.string({ path: "color.tsx", start: { line: 31, character: 10 }, end: { line: 31, character: 16 } }, "dark"))]));
})();
print(script);
