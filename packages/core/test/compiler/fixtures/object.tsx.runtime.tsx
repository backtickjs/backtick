import { cs } from "@backtick/core";
const obj = (() => {
    return cs.create(v => v.backtick(null, { splices: {}, freeVars: [] }, v.object(null, { a: v.number(null, 4) })));
})();
const script = (() => {
    const $0splice0 = obj;
    const $0splice1 = (() => {
        return cs.create(v => v.backtick(null, { splices: {}, freeVars: ["obj"] }, v.propertyAccess(null, v.identifier(null, "obj"), "a")));
    })();
    return cs.create(v => v.backtick(null, { splices: { $0splice0: $0splice0, $0splice1: $0splice1 }, freeVars: [] }, v.block(null, [v.assignment(null, v.identifier(null, "obj"), v.splice(null, "$0splice0", $0splice0)), v.return(null, v.splice(null, "$0splice1", $0splice1))])));
})();
export default script;
