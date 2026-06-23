import { cs, type Client } from "@backtick/core";
function add(lhs: Client<number>, rhs: Client<number>): Client<number> {
    return (() => {
        const $0splice0 = lhs;
        const $0splice1 = rhs;
        return cs.create(v => v.backtick(null, { splices: { $0splice0: $0splice0, $0splice1: $0splice1 }, freeVars: [] }, v.binop(null, v.splice(null, "$0splice0", $0splice0), "+", v.splice(null, "$0splice1", $0splice1))));
    })();
}
const script = (() => {
    const $0splice0 = add((() => {
        return cs.create(v => v.backtick(null, { splices: {}, freeVars: [] }, v.number(null, 1)));
    })(), (() => {
        return cs.create(v => v.backtick(null, { splices: {}, freeVars: [] }, v.number(null, 2)));
    })());
    return cs.create(v => v.backtick(null, { splices: { $0splice0: $0splice0 }, freeVars: [] }, v.splice(null, "$0splice0", $0splice0)));
})();
export default script;
