import { cs } from "@backtickjs/core";
// A script parameter annotated with a host class type: inside the script the
// value is the *lowered* shape — `c.r` is a number, not a `Client<number>` —
// so the returned sum only typechecks if the annotation is lowered too.
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
            return cs.create({ path: "lowered-param.ts", start: { line: 19, character: 12 }, end: { line: 19, character: 35 } }, "9bzp49", { splices: [$0splice0], captures: [], declarations: [] }, v => v.arrow({ path: "lowered-param.ts", start: { line: 19, character: 15 }, end: { line: 19, character: 34 } }, [], v.binop({ path: "lowered-param.ts", start: { line: 19, character: 21 }, end: { line: 19, character: 34 } }, v.splice({ path: "lowered-param.ts", start: { line: 19, character: 21 }, end: { line: 19, character: 30 } }, 0), "+", v.number({ path: "lowered-param.ts", start: { line: 19, character: 33 }, end: { line: 19, character: 34 } }, 2))));
        })();
    }
}
export default (() => {
    const $0splice0 = new Color((() => {
        return cs.create({ path: "lowered-param.ts", start: { line: 25, character: 27 }, end: { line: 25, character: 32 } }, "9bzp49", { splices: [], captures: [], declarations: [] }, v => v.number({ path: "lowered-param.ts", start: { line: 25, character: 30 }, end: { line: 25, character: 31 } }, 7));
    })(), "#123");
    return cs.create({ path: "lowered-param.ts", start: { line: 23, character: 16 }, end: { line: 26, character: 3 } }, "9bzp49", { splices: [$0splice0], captures: [], declarations: ["pick$9bzp49$0", "c$9bzp49$1"] }, v => v.block({ path: "lowered-param.ts", start: { line: 23, character: 19 }, end: { line: 26, character: 2 } }, [v.variableDeclaration({ path: "lowered-param.ts", start: { line: 24, character: 3 }, end: { line: 24, character: 38 } }, "const", v.identifier({ path: "lowered-param.ts", start: { line: 24, character: 9 }, end: { line: 24, character: 13 } }, "pick", "pick$9bzp49$0"), v.arrow({ path: "lowered-param.ts", start: { line: 24, character: 16 }, end: { line: 24, character: 37 } }, [v.identifier({ path: "lowered-param.ts", start: { line: 24, character: 17 }, end: { line: 24, character: 18 } }, "c", "c$9bzp49$1")], v.binop({ path: "lowered-param.ts", start: { line: 24, character: 30 }, end: { line: 24, character: 37 } }, v.propertyAccess({ path: "lowered-param.ts", start: { line: 24, character: 30 }, end: { line: 24, character: 33 } }, v.identifier({ path: "lowered-param.ts", start: { line: 24, character: 30 }, end: { line: 24, character: 31 } }, "c", "c$9bzp49$1"), "r"), "+", v.number({ path: "lowered-param.ts", start: { line: 24, character: 36 }, end: { line: 24, character: 37 } }, 1)))), v.return({ path: "lowered-param.ts", start: { line: 25, character: 3 }, end: { line: 25, character: 44 } }, v.call({ path: "lowered-param.ts", start: { line: 25, character: 10 }, end: { line: 25, character: 43 } }, v.identifier({ path: "lowered-param.ts", start: { line: 25, character: 10 }, end: { line: 25, character: 14 } }, "pick", "pick$9bzp49$0"), [v.splice({ path: "lowered-param.ts", start: { line: 25, character: 15 }, end: { line: 25, character: 42 } }, 0)]))]));
})();
