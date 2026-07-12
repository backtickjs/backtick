import { cs } from "@backtickjs/core";
// Annotations pass into the virtual verbatim, so a parameter receiving a
// spliced instance is written in spliced terms: `Spliced<Color>` is the plain
// object the client sees — `c.r` is a number, not a `Client<number>`.
class Color {
    "@backtickjs" = "ClientObject";
    r;
    hex;
    constructor(r, hex) {
        this.r = r;
        this.hex = hex;
    }
    get update() {
        return (() => {
            const $0splice0 = this.r;
            return cs.create({ path: "spliced-param.ts", start: { line: 19, character: 12 }, end: { line: 19, character: 35 } }, "5y3bfp", { splices: [$0splice0], captures: [], declarations: [] }, v => v.arrow({ path: "spliced-param.ts", start: { line: 19, character: 15 }, end: { line: 19, character: 34 } }, [], v.binop({ path: "spliced-param.ts", start: { line: 19, character: 21 }, end: { line: 19, character: 34 } }, v.splice({ path: "spliced-param.ts", start: { line: 19, character: 21 }, end: { line: 19, character: 30 } }, 0), "+", v.number({ path: "spliced-param.ts", start: { line: 19, character: 33 }, end: { line: 19, character: 34 } }, 2))));
        })();
    }
}
export default (() => {
    const $0splice0 = new Color((() => {
        return cs.create({ path: "spliced-param.ts", start: { line: 25, character: 27 }, end: { line: 25, character: 32 } }, "5y3bfp", { splices: [], captures: [], declarations: [] }, v => v.number({ path: "spliced-param.ts", start: { line: 25, character: 30 }, end: { line: 25, character: 31 } }, 7));
    })(), "#123");
    return cs.create({ path: "spliced-param.ts", start: { line: 23, character: 16 }, end: { line: 26, character: 3 } }, "5y3bfp", { splices: [$0splice0], captures: [], declarations: ["pick$5y3bfp$0", "c$5y3bfp$1"] }, v => v.block({ path: "spliced-param.ts", start: { line: 23, character: 19 }, end: { line: 26, character: 2 } }, [v.variableDeclaration({ path: "spliced-param.ts", start: { line: 24, character: 3 }, end: { line: 24, character: 47 } }, "const", v.identifier({ path: "spliced-param.ts", start: { line: 24, character: 9 }, end: { line: 24, character: 13 } }, "pick", "pick$5y3bfp$0"), v.arrow({ path: "spliced-param.ts", start: { line: 24, character: 16 }, end: { line: 24, character: 46 } }, [v.identifier({ path: "spliced-param.ts", start: { line: 24, character: 17 }, end: { line: 24, character: 18 } }, "c", "c$5y3bfp$1")], v.binop({ path: "spliced-param.ts", start: { line: 24, character: 39 }, end: { line: 24, character: 46 } }, v.propertyAccess({ path: "spliced-param.ts", start: { line: 24, character: 39 }, end: { line: 24, character: 42 } }, v.identifier({ path: "spliced-param.ts", start: { line: 24, character: 39 }, end: { line: 24, character: 40 } }, "c", "c$5y3bfp$1"), "r"), "+", v.number({ path: "spliced-param.ts", start: { line: 24, character: 45 }, end: { line: 24, character: 46 } }, 1)))), v.return({ path: "spliced-param.ts", start: { line: 25, character: 3 }, end: { line: 25, character: 44 } }, v.call({ path: "spliced-param.ts", start: { line: 25, character: 10 }, end: { line: 25, character: 43 } }, v.identifier({ path: "spliced-param.ts", start: { line: 25, character: 10 }, end: { line: 25, character: 14 } }, "pick", "pick$5y3bfp$0"), [v.splice({ path: "spliced-param.ts", start: { line: 25, character: 15 }, end: { line: 25, character: 42 } }, 0)]))]));
})();
