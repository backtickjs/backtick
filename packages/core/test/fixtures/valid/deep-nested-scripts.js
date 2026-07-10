import { cs } from "@backtickjs/core";
function add(lhs, rhs) {
    return (() => {
        const $0splice0 = lhs;
        const $0splice1 = rhs;
        return cs.create({ path: "deep-nested-scripts.ts", start: { line: 4, character: 10 }, end: { line: 4, character: 29 } }, "cawehg", { splices: [$0splice0, $0splice1], captures: [], declarations: [] }, v => v.binop({ path: "deep-nested-scripts.ts", start: { line: 4, character: 13 }, end: { line: 4, character: 28 } }, v.splice({ path: "deep-nested-scripts.ts", start: { line: 4, character: 13 }, end: { line: 4, character: 19 } }, 0), "+", v.splice({ path: "deep-nested-scripts.ts", start: { line: 4, character: 22 }, end: { line: 4, character: 28 } }, 1)));
    })();
}
export default (() => {
    const $0splice0 = add((() => {
        return cs.create({ path: "deep-nested-scripts.ts", start: { line: 7, character: 25 }, end: { line: 7, character: 30 } }, "cawehg", { splices: [], captures: [], declarations: [] }, v => v.number({ path: "deep-nested-scripts.ts", start: { line: 7, character: 28 }, end: { line: 7, character: 29 } }, 1));
    })(), (() => {
        return cs.create({ path: "deep-nested-scripts.ts", start: { line: 7, character: 32 }, end: { line: 7, character: 37 } }, "cawehg", { splices: [], captures: [], declarations: [] }, v => v.number({ path: "deep-nested-scripts.ts", start: { line: 7, character: 35 }, end: { line: 7, character: 36 } }, 2));
    })());
    return cs.create({ path: "deep-nested-scripts.ts", start: { line: 7, character: 16 }, end: { line: 7, character: 40 } }, "cawehg", { splices: [$0splice0], captures: [], declarations: [] }, v => v.splice({ path: "deep-nested-scripts.ts", start: { line: 7, character: 19 }, end: { line: 7, character: 39 } }, 0));
})();
