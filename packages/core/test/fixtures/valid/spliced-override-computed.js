import { cs } from "@backtickjs/core";
// A `spliced()` override replaces reflection: the returned shape ships —
// computed at bundle time — and the class's own members (`f`) don't.
class Fahrenheit {
    "@backtickjs" = "ClientObject";
    f;
    constructor(f) {
        this.f = f;
    }
    spliced() {
        return { celsius: ((this.f - 32) * 5) / 9 };
    }
}
export default (() => {
    const $0splice0 = new Fahrenheit(212);
    return cs.create({ path: "spliced-override-computed.ts", start: { line: 20, character: 16 }, end: { line: 20, character: 50 } }, "1tva2rs", { splices: [$0splice0], captures: [], declarations: [] }, v => v.propertyAccess({ path: "spliced-override-computed.ts", start: { line: 20, character: 19 }, end: { line: 20, character: 49 } }, v.splice({ path: "spliced-override-computed.ts", start: { line: 20, character: 19 }, end: { line: 20, character: 41 } }, 0), "celsius"));
})();
