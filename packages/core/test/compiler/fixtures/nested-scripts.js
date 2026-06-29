import { cs } from "@backtick/core";
const script = (() => {
    const $0splice0 = (() => {
        return cs.create(v => v.clientScript({ path: "nested-scripts.tsx", start: { line: 5, character: 12 }, end: { line: 5, character: 17 } }, { splices: {}, freeVars: ["x"] }, v.identifier({ path: "nested-scripts.tsx", start: { line: 5, character: 15 }, end: { line: 5, character: 16 } }, "x")));
    })();
    return cs.create(v => v.clientScript({ path: "nested-scripts.tsx", start: { line: 3, character: 16 }, end: { line: 6, character: 3 } }, { splices: { $0splice0: $0splice0 }, freeVars: [] }, v.block({ path: "nested-scripts.tsx", start: { line: 3, character: 19 }, end: { line: 6, character: 2 } }, [v.assignment({ path: "nested-scripts.tsx", start: { line: 4, character: 3 }, end: { line: 4, character: 15 } }, v.identifier({ path: "nested-scripts.tsx", start: { line: 4, character: 9 }, end: { line: 4, character: 10 } }, "x"), v.number({ path: "nested-scripts.tsx", start: { line: 4, character: 13 }, end: { line: 4, character: 14 } }, 0)), v.return({ path: "nested-scripts.tsx", start: { line: 5, character: 3 }, end: { line: 5, character: 19 } }, v.splice({ path: "nested-scripts.tsx", start: { line: 5, character: 10 }, end: { line: 5, character: 18 } }, "$0splice0", $0splice0))])));
})();
export default script;
