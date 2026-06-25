import { cs, type Client } from "@backtick/core";
function add(lhs: Client<number>, rhs: Client<number>): Client<number> {
    return (() => {
        const $0splice0 = lhs;
        const $0splice1 = rhs;
        return cs.create(v => v.backtick({ path: "deep-nested-scripts.tsx", start: { line: 4, character: 13 }, end: { line: 4, character: 28 } }, { splices: { $0splice0: $0splice0, $0splice1: $0splice1 }, freeVars: [] }, v.binop({ path: "deep-nested-scripts.tsx", start: { line: 4, character: 13 }, end: { line: 4, character: 28 } }, v.splice({ path: "deep-nested-scripts.tsx", start: { line: 4, character: 13 }, end: { line: 4, character: 19 } }, "$0splice0", $0splice0), "+", v.splice({ path: "deep-nested-scripts.tsx", start: { line: 4, character: 22 }, end: { line: 4, character: 28 } }, "$0splice1", $0splice1))));
    })();
}
const script = (() => {
    const $0splice0 = add((() => {
        return cs.create(v => v.backtick({ path: "deep-nested-scripts.tsx", start: { line: 7, character: 28 }, end: { line: 7, character: 29 } }, { splices: {}, freeVars: [] }, v.number({ path: "deep-nested-scripts.tsx", start: { line: 7, character: 28 }, end: { line: 7, character: 29 } }, 1)));
    })(), (() => {
        return cs.create(v => v.backtick({ path: "deep-nested-scripts.tsx", start: { line: 7, character: 35 }, end: { line: 7, character: 36 } }, { splices: {}, freeVars: [] }, v.number({ path: "deep-nested-scripts.tsx", start: { line: 7, character: 35 }, end: { line: 7, character: 36 } }, 2)));
    })());
    return cs.create(v => v.backtick({ path: "deep-nested-scripts.tsx", start: { line: 7, character: 19 }, end: { line: 7, character: 39 } }, { splices: { $0splice0: $0splice0 }, freeVars: [] }, v.splice({ path: "deep-nested-scripts.tsx", start: { line: 7, character: 19 }, end: { line: 7, character: 39 } }, "$0splice0", $0splice0)));
})();
export default script;
