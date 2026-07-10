import { cs } from "@backtickjs/core";
// Each level splices the level below it twice, so the composition graph is a
// diamond lattice with exponentially many root-to-leaf paths. The bundler shares
// each script rather than re-expanding it per path, so the payload has one entry
// per level (linear) — not one per path, which would blow up as 2^depth.
const d0 = (() => {
    return cs.create({ path: "diamond.ts", start: { line: 7, character: 12 }, end: { line: 7, character: 17 } }, "1l5kpgf", { splices: [], captures: [], declarations: [] }, v => v.number({ path: "diamond.ts", start: { line: 7, character: 15 }, end: { line: 7, character: 16 } }, 1));
})();
const d1 = (() => {
    const $0splice0 = d0;
    const $0splice1 = d0;
    return cs.create({ path: "diamond.ts", start: { line: 8, character: 12 }, end: { line: 10, character: 3 } }, "1l5kpgf", { splices: [$0splice0, $0splice1], captures: [], declarations: [] }, v => v.block({ path: "diamond.ts", start: { line: 8, character: 15 }, end: { line: 10, character: 2 } }, [v.return({ path: "diamond.ts", start: { line: 9, character: 3 }, end: { line: 9, character: 24 } }, v.binop({ path: "diamond.ts", start: { line: 9, character: 10 }, end: { line: 9, character: 23 } }, v.splice({ path: "diamond.ts", start: { line: 9, character: 10 }, end: { line: 9, character: 15 } }, 0), "+", v.splice({ path: "diamond.ts", start: { line: 9, character: 18 }, end: { line: 9, character: 23 } }, 1)))]));
})();
const d2 = (() => {
    const $0splice0 = d1;
    const $0splice1 = d1;
    return cs.create({ path: "diamond.ts", start: { line: 11, character: 12 }, end: { line: 13, character: 3 } }, "1l5kpgf", { splices: [$0splice0, $0splice1], captures: [], declarations: [] }, v => v.block({ path: "diamond.ts", start: { line: 11, character: 15 }, end: { line: 13, character: 2 } }, [v.return({ path: "diamond.ts", start: { line: 12, character: 3 }, end: { line: 12, character: 24 } }, v.binop({ path: "diamond.ts", start: { line: 12, character: 10 }, end: { line: 12, character: 23 } }, v.splice({ path: "diamond.ts", start: { line: 12, character: 10 }, end: { line: 12, character: 15 } }, 0), "+", v.splice({ path: "diamond.ts", start: { line: 12, character: 18 }, end: { line: 12, character: 23 } }, 1)))]));
})();
const d3 = (() => {
    const $0splice0 = d2;
    const $0splice1 = d2;
    return cs.create({ path: "diamond.ts", start: { line: 14, character: 12 }, end: { line: 16, character: 3 } }, "1l5kpgf", { splices: [$0splice0, $0splice1], captures: [], declarations: [] }, v => v.block({ path: "diamond.ts", start: { line: 14, character: 15 }, end: { line: 16, character: 2 } }, [v.return({ path: "diamond.ts", start: { line: 15, character: 3 }, end: { line: 15, character: 24 } }, v.binop({ path: "diamond.ts", start: { line: 15, character: 10 }, end: { line: 15, character: 23 } }, v.splice({ path: "diamond.ts", start: { line: 15, character: 10 }, end: { line: 15, character: 15 } }, 0), "+", v.splice({ path: "diamond.ts", start: { line: 15, character: 18 }, end: { line: 15, character: 23 } }, 1)))]));
})();
const d4 = (() => {
    const $0splice0 = d3;
    const $0splice1 = d3;
    return cs.create({ path: "diamond.ts", start: { line: 17, character: 12 }, end: { line: 19, character: 3 } }, "1l5kpgf", { splices: [$0splice0, $0splice1], captures: [], declarations: [] }, v => v.block({ path: "diamond.ts", start: { line: 17, character: 15 }, end: { line: 19, character: 2 } }, [v.return({ path: "diamond.ts", start: { line: 18, character: 3 }, end: { line: 18, character: 24 } }, v.binop({ path: "diamond.ts", start: { line: 18, character: 10 }, end: { line: 18, character: 23 } }, v.splice({ path: "diamond.ts", start: { line: 18, character: 10 }, end: { line: 18, character: 15 } }, 0), "+", v.splice({ path: "diamond.ts", start: { line: 18, character: 18 }, end: { line: 18, character: 23 } }, 1)))]));
})();
export default d4;
