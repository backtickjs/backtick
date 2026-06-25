import { cs } from "@backtick/core";
const obj = (() => {
    return cs.create(v => v.backtick({ path: "object.tsx", start: { line: 3, character: 16 }, end: { line: 3, character: 26 } }, { splices: {}, freeVars: [] }, v.object({ path: "object.tsx", start: { line: 3, character: 17 }, end: { line: 3, character: 25 } }, { a: v.number({ path: "object.tsx", start: { line: 3, character: 22 }, end: { line: 3, character: 23 } }, 4) })));
})();
const script = (() => {
    const $0splice0 = obj;
    const $0splice1 = (() => {
        return cs.create(v => v.backtick({ path: "object.tsx", start: { line: 6, character: 15 }, end: { line: 6, character: 20 } }, { splices: {}, freeVars: ["obj"] }, v.propertyAccess({ path: "object.tsx", start: { line: 6, character: 15 }, end: { line: 6, character: 20 } }, v.identifier({ path: "object.tsx", start: { line: 6, character: 15 }, end: { line: 6, character: 18 } }, "obj"), "a")));
    })();
    return cs.create(v => v.backtick({ path: "object.tsx", start: { line: 4, character: 19 }, end: { line: 7, character: 2 } }, { splices: { $0splice0: $0splice0, $0splice1: $0splice1 }, freeVars: [] }, v.block({ path: "object.tsx", start: { line: 4, character: 19 }, end: { line: 7, character: 2 } }, [v.assignment({ path: "object.tsx", start: { line: 5, character: 3 }, end: { line: 5, character: 22 } }, v.identifier({ path: "object.tsx", start: { line: 5, character: 9 }, end: { line: 5, character: 12 } }, "obj"), v.splice({ path: "object.tsx", start: { line: 5, character: 15 }, end: { line: 5, character: 21 } }, "$0splice0", $0splice0)), v.return({ path: "object.tsx", start: { line: 6, character: 3 }, end: { line: 6, character: 23 } }, v.splice({ path: "object.tsx", start: { line: 6, character: 10 }, end: { line: 6, character: 22 } }, "$0splice1", $0splice1))])));
})();
export default script;
