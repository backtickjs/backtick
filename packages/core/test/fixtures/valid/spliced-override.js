import { cs } from "@backtickjs/core";
// The `spliced()` escape hatch: instead of reflecting its members, the
// instance splices as the spliceable `spliced()` returns — here a plain
// object renaming the member and baking in a unit — lowered by the normal
// rules, at the type level and at bundle time alike.
class Temperature {
    "@backtickjs" = "ClientObject";
    celsius;
    constructor(celsius) {
        this.celsius = celsius;
    }
    spliced() {
        return { unit: "C", value: this.celsius };
    }
}
export default (() => {
    const $0splice0 = new Temperature((() => {
        return cs.create({ path: "spliced-override.ts", start: { line: 22, character: 37 }, end: { line: 22, character: 43 } }, "13j3bny", { splices: [], captures: [], declarations: [] }, v => v.number({ path: "spliced-override.ts", start: { line: 22, character: 40 }, end: { line: 22, character: 42 } }, 21));
    })());
    return cs.create({ path: "spliced-override.ts", start: { line: 22, character: 16 }, end: { line: 22, character: 56 } }, "13j3bny", { splices: [$0splice0], captures: [], declarations: [] }, v => v.binop({ path: "spliced-override.ts", start: { line: 22, character: 19 }, end: { line: 22, character: 55 } }, v.propertyAccess({ path: "spliced-override.ts", start: { line: 22, character: 19 }, end: { line: 22, character: 51 } }, v.splice({ path: "spliced-override.ts", start: { line: 22, character: 19 }, end: { line: 22, character: 45 } }, 0), "value"), "+", v.number({ path: "spliced-override.ts", start: { line: 22, character: 54 }, end: { line: 22, character: 55 } }, 1)));
})();
