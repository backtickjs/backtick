import { cs } from "@backtick/core";
const script = (() => {
    return cs.create(v => v.backtick({ start: { line: 3, character: 19 }, end: { line: 3, character: 20 } }, { splices: {}, freeVars: [] }, v.number({ start: { line: 3, character: 19 }, end: { line: 3, character: 20 } }, 1)));
})();
export default script;
