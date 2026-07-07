import { cs } from "@backtickjs/core";
import { print } from "../print.ts";
class Color {
    "@backtickjs";
    r;
    g;
    b;
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
}
const script = (() => {
    const $0splice0 = new Color((() => {
        return cs.create({ path: "color.tsx", start: { line: 20, character: 25 }, end: { line: 20, character: 31 } }, { splices: [], captures: [], declarations: [] }, v => v.number({ path: "color.tsx", start: { line: 20, character: 28 }, end: { line: 20, character: 30 } }, 30));
    })(), (() => {
        return cs.create({ path: "color.tsx", start: { line: 20, character: 33 }, end: { line: 20, character: 40 } }, { splices: [], captures: [], declarations: [] }, v => v.number({ path: "color.tsx", start: { line: 20, character: 36 }, end: { line: 20, character: 39 } }, 144));
    })(), (() => {
        return cs.create({ path: "color.tsx", start: { line: 20, character: 42 }, end: { line: 20, character: 49 } }, { splices: [], captures: [], declarations: [] }, v => v.number({ path: "color.tsx", start: { line: 20, character: 45 }, end: { line: 20, character: 48 } }, 255));
    })());
    return cs.create({ path: "color.tsx", start: { line: 19, character: 16 }, end: { line: 26, character: 3 } }, { splices: [$0splice0], captures: [], declarations: ["c$cr701e$0", "brightness$cr701e$1"] }, v => v.block({ path: "color.tsx", start: { line: 19, character: 19 }, end: { line: 26, character: 2 } }, [v.variableDeclaration({ path: "color.tsx", start: { line: 20, character: 3 }, end: { line: 20, character: 52 } }, "const", v.identifier({ path: "color.tsx", start: { line: 20, character: 9 }, end: { line: 20, character: 10 } }, "c", "c$cr701e$0"), v.splice({ path: "color.tsx", start: { line: 20, character: 13 }, end: { line: 20, character: 51 } }, 0)), v.variableDeclaration({ path: "color.tsx", start: { line: 21, character: 3 }, end: { line: 21, character: 38 } }, "const", v.identifier({ path: "color.tsx", start: { line: 21, character: 9 }, end: { line: 21, character: 19 } }, "brightness", "brightness$cr701e$1"), v.binop({ path: "color.tsx", start: { line: 21, character: 22 }, end: { line: 21, character: 37 } }, v.binop({ path: "color.tsx", start: { line: 21, character: 22 }, end: { line: 21, character: 31 } }, v.propertyAccess({ path: "color.tsx", start: { line: 21, character: 22 }, end: { line: 21, character: 25 } }, v.identifier({ path: "color.tsx", start: { line: 21, character: 22 }, end: { line: 21, character: 23 } }, "c", "c$cr701e$0"), "r"), "+", v.propertyAccess({ path: "color.tsx", start: { line: 21, character: 28 }, end: { line: 21, character: 31 } }, v.identifier({ path: "color.tsx", start: { line: 21, character: 28 }, end: { line: 21, character: 29 } }, "c", "c$cr701e$0"), "g")), "+", v.propertyAccess({ path: "color.tsx", start: { line: 21, character: 34 }, end: { line: 21, character: 37 } }, v.identifier({ path: "color.tsx", start: { line: 21, character: 34 }, end: { line: 21, character: 35 } }, "c", "c$cr701e$0"), "b"))), v.if({ path: "color.tsx", start: { line: 22, character: 3 }, end: { line: 24, character: 4 } }, v.binop({ path: "color.tsx", start: { line: 22, character: 7 }, end: { line: 22, character: 23 } }, v.identifier({ path: "color.tsx", start: { line: 22, character: 7 }, end: { line: 22, character: 17 } }, "brightness", "brightness$cr701e$1"), ">", v.number({ path: "color.tsx", start: { line: 22, character: 20 }, end: { line: 22, character: 23 } }, 382)), v.block({ path: "color.tsx", start: { line: 22, character: 25 }, end: { line: 24, character: 4 } }, [v.return({ path: "color.tsx", start: { line: 23, character: 5 }, end: { line: 23, character: 20 } }, v.string({ path: "color.tsx", start: { line: 23, character: 12 }, end: { line: 23, character: 19 } }, "light"))]), null), v.return({ path: "color.tsx", start: { line: 25, character: 3 }, end: { line: 25, character: 17 } }, v.string({ path: "color.tsx", start: { line: 25, character: 10 }, end: { line: 25, character: 16 } }, "dark"))]));
})();
print(script);
