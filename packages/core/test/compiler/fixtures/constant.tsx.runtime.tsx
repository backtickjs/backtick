import { cs } from "@backtick/core";
const script = (() => {
    return cs.create(v => v.backtick(null, { splices: {}, freeVars: [] }, v.number(null, 1)));
})();
export default script;
