import { cs } from "@backtick/core";
const script = (() => {
    const $0splice0 = (() => {
        return cs.create(v => v.backtick(null, { splices: {}, freeVars: ["x"] }, v.identifier(null, "x")));
    })();
    return cs.create(v => v.backtick(null, { splices: { $0splice0: $0splice0 }, freeVars: [] }, v.block(null, [v.assignment(null, v.identifier(null, "x"), v.number(null, 0)), v.return(null, v.splice(null, "$0splice0", $0splice0))])));
})();
