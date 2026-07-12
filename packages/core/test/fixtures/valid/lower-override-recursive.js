import { cs } from "@backtickjs/core";
// A `lower()` override's result lowers by the normal rules: the array
// recurses, and the nested reflected instance reflects as usual.
class Inner {
    "@backtickjs" = "ClientObject";
    label = "inner";
}
class Outer {
    "@backtickjs" = "ClientObject";
    lower() {
        return [new Inner()];
    }
}
export default (() => {
    const $0splice0 = new Outer();
    return cs.create({ path: "lower-override-recursive.ts", start: { line: 20, character: 16 }, end: { line: 20, character: 34 } }, "b9l0we", { splices: [$0splice0], captures: [], declarations: [] }, v => v.splice({ path: "lower-override-recursive.ts", start: { line: 20, character: 19 }, end: { line: 20, character: 33 } }, 0));
})();
