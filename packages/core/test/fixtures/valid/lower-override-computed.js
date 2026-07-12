import { cs } from "@backtickjs/core";
// A `lower()` override replaces reflection: the returned shape ships —
// computed at bundle time — and the class's own members (`f`) don't.
class Fahrenheit {
    "@backtickjs" = "ClientObject";
    f;
    constructor(f) {
        this.f = f;
    }
    lower() {
        return { celsius: ((this.f - 32) * 5) / 9 };
    }
}
export default (() => {
    const $0splice0 = new Fahrenheit(212);
    return cs.create({ path: "lower-override-computed.ts", start: { line: 20, character: 16 }, end: { line: 20, character: 50 } }, "138m118", { splices: [$0splice0], captures: [], declarations: [] }, v => v.propertyAccess({ path: "lower-override-computed.ts", start: { line: 20, character: 19 }, end: { line: 20, character: 49 } }, v.splice({ path: "lower-override-computed.ts", start: { line: 20, character: 19 }, end: { line: 20, character: 41 } }, 0), "celsius"));
})();
