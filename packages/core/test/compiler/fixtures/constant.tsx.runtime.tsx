import { cs } from "@backtick/core";
const script = (() => {
    return cs.create(v => v.backtick({ start: { line: 0, character: 0 }, end: { line: 0, character: 1 } }, { splices: {}, freeVars: [] }, v.number({ start: { line: 0, character: 0 }, end: { line: 0, character: 1 } }, 1)));
})();
export default script;
