import { cs } from "@backtickjs/core";
// Annotations pass into the virtual verbatim, so a parameter receiving a
// spliced instance is written in lowered terms: `Lower<Color>` is the plain
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
            return cs.create({ path: "lowered-param.ts", start: { line: 19, character: 12 }, end: { line: 19, character: 35 } }, "hviqsc", { splices: [$0splice0], captures: [], declarations: [] }, v => v.arrow({ path: "lowered-param.ts", start: { line: 19, character: 15 }, end: { line: 19, character: 34 } }, [], v.binop({ path: "lowered-param.ts", start: { line: 19, character: 21 }, end: { line: 19, character: 34 } }, v.splice({ path: "lowered-param.ts", start: { line: 19, character: 21 }, end: { line: 19, character: 30 } }, 0), "+", v.number({ path: "lowered-param.ts", start: { line: 19, character: 33 }, end: { line: 19, character: 34 } }, 2))));
        })();
    }
}
export default (() => {
    const $0splice0 = new Color((() => {
        return cs.create({ path: "lowered-param.ts", start: { line: 25, character: 27 }, end: { line: 25, character: 32 } }, "hviqsc", { splices: [], captures: [], declarations: [] }, v => v.number({ path: "lowered-param.ts", start: { line: 25, character: 30 }, end: { line: 25, character: 31 } }, 7));
    })(), "#123");
    return cs.create({ path: "lowered-param.ts", start: { line: 23, character: 16 }, end: { line: 26, character: 3 } }, "hviqsc", { splices: [$0splice0], captures: [], declarations: ["pick$hviqsc$0", "c$hviqsc$1"] }, v => v.block({ path: "lowered-param.ts", start: { line: 23, character: 19 }, end: { line: 26, character: 2 } }, [v.variableDeclaration({ path: "lowered-param.ts", start: { line: 24, character: 3 }, end: { line: 24, character: 45 } }, "const", v.identifier({ path: "lowered-param.ts", start: { line: 24, character: 9 }, end: { line: 24, character: 13 } }, "pick", "pick$hviqsc$0"), v.arrow({ path: "lowered-param.ts", start: { line: 24, character: 16 }, end: { line: 24, character: 44 } }, [v.identifier({ path: "lowered-param.ts", start: { line: 24, character: 17 }, end: { line: 24, character: 18 } }, "c", "c$hviqsc$1")], v.binop({ path: "lowered-param.ts", start: { line: 24, character: 37 }, end: { line: 24, character: 44 } }, v.propertyAccess({ path: "lowered-param.ts", start: { line: 24, character: 37 }, end: { line: 24, character: 40 } }, v.identifier({ path: "lowered-param.ts", start: { line: 24, character: 37 }, end: { line: 24, character: 38 } }, "c", "c$hviqsc$1"), "r"), "+", v.number({ path: "lowered-param.ts", start: { line: 24, character: 43 }, end: { line: 24, character: 44 } }, 1)))), v.return({ path: "lowered-param.ts", start: { line: 25, character: 3 }, end: { line: 25, character: 44 } }, v.call({ path: "lowered-param.ts", start: { line: 25, character: 10 }, end: { line: 25, character: 43 } }, v.identifier({ path: "lowered-param.ts", start: { line: 25, character: 10 }, end: { line: 25, character: 14 } }, "pick", "pick$hviqsc$0"), [v.splice({ path: "lowered-param.ts", start: { line: 25, character: 15 }, end: { line: 25, character: 42 } }, 0)]))]));
})();
