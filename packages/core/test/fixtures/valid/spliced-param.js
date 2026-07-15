import { cs } from "@backtickjs/core";
// A script parameter annotated with the host class directly: the spliced
// argument stays typed `Color`, and member access virtualizes — `c.r` reads
// the `Client<number>` field as `number` — so the natural spelling checks.
class Color {
    "@backtickjs" = "ClientObject";
    r;
    hex;
    constructor(r, hex) {
        this.r = r;
        this.hex = hex;
    }
    get update() {
        return cs.create({ path: "spliced-param.ts", start: { line: 19, character: 12 }, end: { line: 19, character: 35 } }, "1ksz4nc", { splices: { $0splice0: this.r }, captures: [], declarations: [] }, v => v.arrow({ path: "spliced-param.ts", start: { line: 19, character: 15 }, end: { line: 19, character: 34 } }, [], v.binop({ path: "spliced-param.ts", start: { line: 19, character: 21 }, end: { line: 19, character: 34 } }, v.splice({ path: "spliced-param.ts", start: { line: 19, character: 21 }, end: { line: 19, character: 30 } }, "$0splice0"), "+", v.number({ path: "spliced-param.ts", start: { line: 19, character: 33 }, end: { line: 19, character: 34 } }, 2))));
    }
}
export default cs.create({ path: "spliced-param.ts", start: { line: 23, character: 16 }, end: { line: 26, character: 3 } }, "1ksz4nc", { splices: { $0splice0: new Color(cs.create({ path: "spliced-param.ts", start: { line: 25, character: 27 }, end: { line: 25, character: 32 } }, "1ksz4nc", { splices: {}, captures: [], declarations: [] }, v => v.number({ path: "spliced-param.ts", start: { line: 25, character: 30 }, end: { line: 25, character: 31 } }, 7)), "#123") }, captures: [], declarations: ["pick$1ksz4nc$0", "c$1ksz4nc$1"] }, v => v.block({ path: "spliced-param.ts", start: { line: 23, character: 19 }, end: { line: 26, character: 2 } }, [v.variableDeclaration({ path: "spliced-param.ts", start: { line: 24, character: 3 }, end: { line: 24, character: 38 } }, "const", v.identifier({ path: "spliced-param.ts", start: { line: 24, character: 9 }, end: { line: 24, character: 13 } }, "pick", "pick$1ksz4nc$0"), v.arrow({ path: "spliced-param.ts", start: { line: 24, character: 16 }, end: { line: 24, character: 37 } }, [v.identifier({ path: "spliced-param.ts", start: { line: 24, character: 17 }, end: { line: 24, character: 18 } }, "c", "c$1ksz4nc$1")], v.binop({ path: "spliced-param.ts", start: { line: 24, character: 30 }, end: { line: 24, character: 37 } }, v.propertyAccess({ path: "spliced-param.ts", start: { line: 24, character: 30 }, end: { line: 24, character: 33 } }, v.identifier({ path: "spliced-param.ts", start: { line: 24, character: 30 }, end: { line: 24, character: 31 } }, "c", "c$1ksz4nc$1"), "r"), "+", v.number({ path: "spliced-param.ts", start: { line: 24, character: 36 }, end: { line: 24, character: 37 } }, 1)))), v.return({ path: "spliced-param.ts", start: { line: 25, character: 3 }, end: { line: 25, character: 44 } }, v.call({ path: "spliced-param.ts", start: { line: 25, character: 10 }, end: { line: 25, character: 43 } }, v.identifier({ path: "spliced-param.ts", start: { line: 25, character: 10 }, end: { line: 25, character: 14 } }, "pick", "pick$1ksz4nc$0"), [v.splice({ path: "spliced-param.ts", start: { line: 25, character: 15 }, end: { line: 25, character: 42 } }, "$0splice0")]))]));
