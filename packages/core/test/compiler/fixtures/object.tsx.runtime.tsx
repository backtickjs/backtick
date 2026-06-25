import { cs } from "@backtick/core";
const obj = (() => {
    return cs.create(v => v.backtick({ start: { line: 0, character: 0 }, end: { line: 0, character: 8 } }, { splices: {}, freeVars: [] }, v.object({ start: { line: 0, character: 1 }, end: { line: 0, character: 7 } }, { a: v.number({ start: { line: 0, character: 5 }, end: { line: 0, character: 6 } }, 4) })));
})();
const script = (() => {
    const $0splice0 = obj;
    const $0splice1 = (() => {
        return cs.create(v => v.backtick({ start: { line: 0, character: 0 }, end: { line: 0, character: 5 } }, { splices: {}, freeVars: ["obj"] }, v.propertyAccess({ start: { line: 0, character: 0 }, end: { line: 0, character: 5 } }, v.identifier({ start: { line: 0, character: 0 }, end: { line: 0, character: 3 } }, "obj"), "a")));
    })();
    return cs.create(v => v.backtick({ start: { line: 0, character: 0 }, end: { line: 3, character: 1 } }, { splices: { $0splice0: $0splice0, $0splice1: $0splice1 }, freeVars: [] }, v.block({ start: { line: 0, character: 0 }, end: { line: 3, character: 1 } }, [v.assignment({ start: { line: 1, character: 2 }, end: { line: 1, character: 24 } }, v.identifier({ start: { line: 1, character: 8 }, end: { line: 1, character: 11 } }, "obj"), v.splice({ start: { line: 1, character: 14 }, end: { line: 1, character: 23 } }, "$0splice0", $0splice0)), v.return({ start: { line: 2, character: 2 }, end: { line: 2, character: 19 } }, v.splice({ start: { line: 2, character: 9 }, end: { line: 2, character: 18 } }, "$0splice1", $0splice1))])));
})();
export default script;
