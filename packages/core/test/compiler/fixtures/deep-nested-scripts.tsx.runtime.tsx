import { cs, type Client } from "@backtick/core";
function add(lhs: Client<number>, rhs: Client<number>): Client<number> {
    return (() => {
        const $0splice0 = lhs;
        const $0splice1 = rhs;
        return cs.create(v => v.backtick({ start: { line: 0, character: 0 }, end: { line: 0, character: 21 } }, { splices: { $0splice0: $0splice0, $0splice1: $0splice1 }, freeVars: [] }, v.binop({ start: { line: 0, character: 0 }, end: { line: 0, character: 21 } }, v.splice({ start: { line: 0, character: 0 }, end: { line: 0, character: 9 } }, "$0splice0", $0splice0), "+", v.splice({ start: { line: 0, character: 12 }, end: { line: 0, character: 21 } }, "$0splice1", $0splice1))));
    })();
}
const script = (() => {
    const $0splice0 = add((() => {
        return cs.create(v => v.backtick({ start: { line: 0, character: 0 }, end: { line: 0, character: 1 } }, { splices: {}, freeVars: [] }, v.number({ start: { line: 0, character: 0 }, end: { line: 0, character: 1 } }, 1)));
    })(), (() => {
        return cs.create(v => v.backtick({ start: { line: 0, character: 0 }, end: { line: 0, character: 1 } }, { splices: {}, freeVars: [] }, v.number({ start: { line: 0, character: 0 }, end: { line: 0, character: 1 } }, 2)));
    })());
    return cs.create(v => v.backtick({ start: { line: 0, character: 0 }, end: { line: 0, character: 9 } }, { splices: { $0splice0: $0splice0 }, freeVars: [] }, v.splice({ start: { line: 0, character: 0 }, end: { line: 0, character: 9 } }, "$0splice0", $0splice0)));
})();
export default script;
