import { cs } from "@backtickjs/core";
function add(lhs, rhs) {
    return (() => {
        const $0splice0 = lhs;
        const $0splice1 = rhs;
        return cs.create({ path: "splice-sharing.ts", start: { line: 4, character: 10 }, end: { line: 4, character: 29 } }, "3w34yn", { splices: [$0splice0, $0splice1], captures: [], declarations: [] }, v => v.binop({ path: "splice-sharing.ts", start: { line: 4, character: 13 }, end: { line: 4, character: 28 } }, v.splice({ path: "splice-sharing.ts", start: { line: 4, character: 13 }, end: { line: 4, character: 19 } }, 0), "+", v.splice({ path: "splice-sharing.ts", start: { line: 4, character: 22 }, end: { line: 4, character: 28 } }, 1)));
    })();
}
export default (() => {
    const $0splice0 = add((() => {
        return cs.create({ path: "splice-sharing.ts", start: { line: 8, character: 12 }, end: { line: 8, character: 17 } }, "3w34yn", { splices: [], captures: [], declarations: [] }, v => v.number({ path: "splice-sharing.ts", start: { line: 8, character: 15 }, end: { line: 8, character: 16 } }, 1));
    })(), (() => {
        return cs.create({ path: "splice-sharing.ts", start: { line: 8, character: 19 }, end: { line: 8, character: 24 } }, "3w34yn", { splices: [], captures: [], declarations: [] }, v => v.number({ path: "splice-sharing.ts", start: { line: 8, character: 22 }, end: { line: 8, character: 23 } }, 2));
    })());
    const $0splice1 = add((() => {
        return cs.create({ path: "splice-sharing.ts", start: { line: 9, character: 12 }, end: { line: 9, character: 17 } }, "3w34yn", { splices: [], captures: [], declarations: [] }, v => v.number({ path: "splice-sharing.ts", start: { line: 9, character: 15 }, end: { line: 9, character: 16 } }, 3));
    })(), (() => {
        return cs.create({ path: "splice-sharing.ts", start: { line: 9, character: 19 }, end: { line: 9, character: 24 } }, "3w34yn", { splices: [], captures: [], declarations: [] }, v => v.number({ path: "splice-sharing.ts", start: { line: 9, character: 22 }, end: { line: 9, character: 23 } }, 4));
    })());
    return cs.create({ path: "splice-sharing.ts", start: { line: 7, character: 16 }, end: { line: 10, character: 4 } }, "3w34yn", { splices: [$0splice0, $0splice1], captures: [], declarations: [] }, v => v.object({ path: "splice-sharing.ts", start: { line: 7, character: 20 }, end: { line: 10, character: 2 } }, { x: v.splice({ path: "splice-sharing.ts", start: { line: 8, character: 6 }, end: { line: 8, character: 26 } }, 0), y: v.splice({ path: "splice-sharing.ts", start: { line: 9, character: 6 }, end: { line: 9, character: 26 } }, 1) }));
})();
