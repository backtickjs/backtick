import { cs } from "@backtickjs/core";
// A `spliced()` override's result lowers by the normal rules: the array
// recurses, and the nested reflected instance reflects as usual.
class Inner {
    "@backtickjs" = "ClientObject";
    label = "inner";
}
class Outer {
    "@backtickjs" = "ClientObject";
    spliced() {
        return [new Inner()];
    }
}
export default (() => {
    const $0splice0 = new Outer();
    return cs.create({ path: "spliced-override-recursive.ts", start: { line: 20, character: 16 }, end: { line: 20, character: 34 } }, "1sp7nvo", { splices: [$0splice0], captures: [], declarations: [] }, v => v.splice({ path: "spliced-override-recursive.ts", start: { line: 20, character: 19 }, end: { line: 20, character: 33 } }, 0));
})();
