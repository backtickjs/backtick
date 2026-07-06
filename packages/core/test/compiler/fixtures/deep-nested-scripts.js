import { cs } from "@backtickjs/core";
import { print } from "../print.ts";
function add(lhs, rhs) {
    return (() => {
        const $0splice0 = lhs;
        const $0splice1 = rhs;
        return cs.create({ path: "deep-nested-scripts.tsx", start: { line: 5, character: 10 }, end: { line: 5, character: 29 } }, { splices: [$0splice0, $0splice1], captures: [] }, v => v.binop({ path: "deep-nested-scripts.tsx", start: { line: 5, character: 13 }, end: { line: 5, character: 28 } }, v.splice({ path: "deep-nested-scripts.tsx", start: { line: 5, character: 13 }, end: { line: 5, character: 19 } }, 0), "+", v.splice({ path: "deep-nested-scripts.tsx", start: { line: 5, character: 22 }, end: { line: 5, character: 28 } }, 1)));
    })();
}
const script = (() => {
    const $0splice0 = add((() => {
        return cs.create({ path: "deep-nested-scripts.tsx", start: { line: 8, character: 25 }, end: { line: 8, character: 30 } }, { splices: [], captures: [] }, v => v.number({ path: "deep-nested-scripts.tsx", start: { line: 8, character: 28 }, end: { line: 8, character: 29 } }, 1));
    })(), (() => {
        return cs.create({ path: "deep-nested-scripts.tsx", start: { line: 8, character: 32 }, end: { line: 8, character: 37 } }, { splices: [], captures: [] }, v => v.number({ path: "deep-nested-scripts.tsx", start: { line: 8, character: 35 }, end: { line: 8, character: 36 } }, 2));
    })());
    return cs.create({ path: "deep-nested-scripts.tsx", start: { line: 8, character: 16 }, end: { line: 8, character: 40 } }, { splices: [$0splice0], captures: [] }, v => v.splice({ path: "deep-nested-scripts.tsx", start: { line: 8, character: 19 }, end: { line: 8, character: 39 } }, 0));
})();
print(script);
