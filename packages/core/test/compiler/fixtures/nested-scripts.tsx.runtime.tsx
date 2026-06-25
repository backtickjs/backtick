import { cs } from "@backtick/core";
const script = (() => {
    const $0splice0 = (() => {
        return cs.create(v => v.backtick({ start: { line: 0, character: 0 }, end: { line: 0, character: 1 } }, { splices: {}, freeVars: ["x"] }, v.identifier({ start: { line: 0, character: 0 }, end: { line: 0, character: 1 } }, "x")));
    })();
    return cs.create(v => v.backtick({ start: { line: 0, character: 0 }, end: { line: 3, character: 1 } }, { splices: { $0splice0: $0splice0 }, freeVars: [] }, v.block({ start: { line: 0, character: 0 }, end: { line: 3, character: 1 } }, [v.assignment({ start: { line: 1, character: 2 }, end: { line: 1, character: 14 } }, v.identifier({ start: { line: 1, character: 8 }, end: { line: 1, character: 9 } }, "x"), v.number({ start: { line: 1, character: 12 }, end: { line: 1, character: 13 } }, 0)), v.return({ start: { line: 2, character: 2 }, end: { line: 2, character: 19 } }, v.splice({ start: { line: 2, character: 9 }, end: { line: 2, character: 18 } }, "$0splice0", $0splice0))])));
})();
export default script;
