import { jsx as _jsx } from "@backtickjs/core/jsx-runtime";
import { cs } from "@backtickjs/core";
// A polymorphic fragment whose splice captures the template's own binding,
// referenced from tree props: the hole's thunk ships in JSON position with
// `params`, so `base` threads from the entry's scope into the splice.
function offset(by) {
    return (() => {
        const $0splice0 = (() => {
            return cs.create({ path: "polymorphic-tree-captures.tsx", start: { line: 8, character: 33 }, end: { line: 8, character: 41 } }, "x4aj8x", { splices: [], captures: ["base$x4aj8x$0"], declarations: [] }, v => v.identifier({ path: "polymorphic-tree-captures.tsx", start: { line: 8, character: 36 }, end: { line: 8, character: 40 } }, "base", "base$x4aj8x$0"));
        })();
        const $0splice1 = by;
        return cs.create({ path: "polymorphic-tree-captures.tsx", start: { line: 8, character: 10 }, end: { line: 8, character: 51 } }, "x4aj8x", { splices: [$0splice0, $0splice1], captures: [], declarations: ["base$x4aj8x$0"] }, v => v.arrow({ path: "polymorphic-tree-captures.tsx", start: { line: 8, character: 13 }, end: { line: 8, character: 50 } }, [v.identifier({ path: "polymorphic-tree-captures.tsx", start: { line: 8, character: 14 }, end: { line: 8, character: 18 } }, "base", "base$x4aj8x$0")], v.binop({ path: "polymorphic-tree-captures.tsx", start: { line: 8, character: 31 }, end: { line: 8, character: 50 } }, v.splice({ path: "polymorphic-tree-captures.tsx", start: { line: 8, character: 31 }, end: { line: 8, character: 42 } }, 0), "+", v.splice({ path: "polymorphic-tree-captures.tsx", start: { line: 8, character: 45 }, end: { line: 8, character: 50 } }, 1))));
    })();
}
export default _jsx("button", { onA: offset((() => {
        return cs.create({ path: "polymorphic-tree-captures.tsx", start: { line: 11, character: 36 }, end: { line: 11, character: 41 } }, "x4aj8x", { splices: [], captures: [], declarations: [] }, v => v.number({ path: "polymorphic-tree-captures.tsx", start: { line: 11, character: 39 }, end: { line: 11, character: 40 } }, 1));
    })()), onB: offset((() => {
        return cs.create({ path: "polymorphic-tree-captures.tsx", start: { line: 11, character: 56 }, end: { line: 11, character: 61 } }, "x4aj8x", { splices: [], captures: [], declarations: [] }, v => v.number({ path: "polymorphic-tree-captures.tsx", start: { line: 11, character: 59 }, end: { line: 11, character: 60 } }, 2));
    })()) });
