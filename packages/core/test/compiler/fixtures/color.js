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
            return cs.create(v => v.clientScript({ path: "color.tsx", start: { line: 19, character: 12 }, end: { line: 19, character: 62 } }, { splices: { $0splice0: $0splice0, $0splice1: $0splice1, $0splice2: $0splice2 }, freeVars: [] }, v.object({ path: "color.tsx", start: { line: 19, character: 16 }, end: { line: 19, character: 60 } }, { r: v.splice({ path: "color.tsx", start: { line: 19, character: 21 }, end: { line: 19, character: 30 } }, "$0splice0", $0splice0), g: v.splice({ path: "color.tsx", start: { line: 19, character: 35 }, end: { line: 19, character: 44 } }, "$0splice1", $0splice1), b: v.splice({ path: "color.tsx", start: { line: 19, character: 49 }, end: { line: 19, character: 58 } }, "$0splice2", $0splice2) })));
        })().visit(visitor);
    }
    // Client methods take and return `Client<…>` values. Called from host code
    // they build a client script; called inside a `cs` script they virtualize.
    brightness() {
        return (() => {
            const $0splice0 = this.r;
            const $0splice1 = this.g;
            const $0splice2 = this.b;
            return cs.create(v => v.clientScript({ path: "color.tsx", start: { line: 25, character: 12 }, end: { line: 25, character: 49 } }, { splices: { $0splice0: $0splice0, $0splice1: $0splice1, $0splice2: $0splice2 }, freeVars: [] }, v.binop({ path: "color.tsx", start: { line: 25, character: 15 }, end: { line: 25, character: 48 } }, v.binop({ path: "color.tsx", start: { line: 25, character: 15 }, end: { line: 25, character: 36 } }, v.splice({ path: "color.tsx", start: { line: 25, character: 15 }, end: { line: 25, character: 24 } }, "$0splice0", $0splice0), "+", v.splice({ path: "color.tsx", start: { line: 25, character: 27 }, end: { line: 25, character: 36 } }, "$0splice1", $0splice1)), "+", v.splice({ path: "color.tsx", start: { line: 25, character: 39 }, end: { line: 25, character: 48 } }, "$0splice2", $0splice2))));
        })();
    }
    isBrighterThan(threshold) {
        return (() => {
            const $0splice0 = this.brightness();
            const $0splice1 = threshold;
            return cs.create(v => v.clientScript({ path: "color.tsx", start: { line: 29, character: 12 }, end: { line: 29, character: 51 } }, { splices: { $0splice0: $0splice0, $0splice1: $0splice1 }, freeVars: [] }, v.binop({ path: "color.tsx", start: { line: 29, character: 15 }, end: { line: 29, character: 50 } }, v.splice({ path: "color.tsx", start: { line: 29, character: 15 }, end: { line: 29, character: 35 } }, "$0splice0", $0splice0), ">", v.splice({ path: "color.tsx", start: { line: 29, character: 38 }, end: { line: 29, character: 50 } }, "$0splice1", $0splice1))));
        })();
    }
}
const color = new Color(30, 144, 255);
const script = (() => {
    const $0splice0 = color;
    return cs.create(v => v.clientScript({ path: "color.tsx", start: { line: 35, character: 16 }, end: { line: 41, character: 3 } }, { splices: { $0splice0: $0splice0 }, freeVars: [] }, v.block({ path: "color.tsx", start: { line: 35, character: 19 }, end: { line: 41, character: 2 } }, [v.assignment({ path: "color.tsx", start: { line: 36, character: 3 }, end: { line: 36, character: 22 } }, v.identifier({ path: "color.tsx", start: { line: 36, character: 9 }, end: { line: 36, character: 10 } }, "c"), v.splice({ path: "color.tsx", start: { line: 36, character: 13 }, end: { line: 36, character: 21 } }, "$0splice0", $0splice0)), v.if({ path: "color.tsx", start: { line: 37, character: 3 }, end: { line: 39, character: 4 } }, v.call({ path: "color.tsx", start: { line: 37, character: 7 }, end: { line: 37, character: 28 } }, v.propertyAccess({ path: "color.tsx", start: { line: 37, character: 7 }, end: { line: 37, character: 23 } }, v.identifier({ path: "color.tsx", start: { line: 37, character: 7 }, end: { line: 37, character: 8 } }, "c"), "isBrighterThan"), [v.number({ path: "color.tsx", start: { line: 37, character: 24 }, end: { line: 37, character: 27 } }, 382)]), v.block({ path: "color.tsx", start: { line: 37, character: 30 }, end: { line: 39, character: 4 } }, [v.return({ path: "color.tsx", start: { line: 38, character: 5 }, end: { line: 38, character: 20 } }, v.string({ path: "color.tsx", start: { line: 38, character: 12 }, end: { line: 38, character: 19 } }, "light"))]), null), v.return({ path: "color.tsx", start: { line: 40, character: 3 }, end: { line: 40, character: 17 } }, v.string({ path: "color.tsx", start: { line: 40, character: 10 }, end: { line: 40, character: 16 } }, "dark"))])));
})();
print(script);
