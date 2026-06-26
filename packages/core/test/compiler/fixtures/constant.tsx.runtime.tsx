import { cs } from "@backtick/core";
const script = (() => {
    return cs.create(v => v.clientScript({ path: "constant.tsx", start: { line: 3, character: 16 }, end: { line: 3, character: 21 } }, { splices: {}, freeVars: [] }, v.number({ path: "constant.tsx", start: { line: 3, character: 19 }, end: { line: 3, character: 20 } }, 1)));
})();
export default script;
