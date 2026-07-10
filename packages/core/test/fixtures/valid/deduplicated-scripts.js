import { cs } from "@backtickjs/core";
// The same `cs\`7\`` literal spliced twice is one client script, so it collapses
// into a single function-table entry referenced twice.
const leaf = (() => {
    return cs.create({ path: "deduplicated-scripts.ts", start: { line: 5, character: 14 }, end: { line: 5, character: 19 } }, "nxqrdj", { splices: [], captures: [], declarations: [] }, v => v.number({ path: "deduplicated-scripts.ts", start: { line: 5, character: 17 }, end: { line: 5, character: 18 } }, 7));
})();
export default (() => {
    const $0splice0 = leaf;
    const $0splice1 = leaf;
    return cs.create({ path: "deduplicated-scripts.ts", start: { line: 7, character: 16 }, end: { line: 7, character: 48 } }, "nxqrdj", { splices: [$0splice0, $0splice1], captures: [], declarations: [] }, v => v.object({ path: "deduplicated-scripts.ts", start: { line: 7, character: 20 }, end: { line: 7, character: 46 } }, { a: v.splice({ path: "deduplicated-scripts.ts", start: { line: 7, character: 25 }, end: { line: 7, character: 32 } }, 0), b: v.splice({ path: "deduplicated-scripts.ts", start: { line: 7, character: 37 }, end: { line: 7, character: 44 } }, 1) }));
})();
