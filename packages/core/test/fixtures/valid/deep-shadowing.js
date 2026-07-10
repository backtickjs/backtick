import { cs } from "@backtickjs/core";
// `cs`base`` is written under the outer `base`, but is threaded through two host
// functions that each shadow `base` with their own binding. The captured value
// must reach the leaf untouched, so the threaded channel is renamed away from
// every `base` it passes through.
export default (() => {
    const $0splice0 = outer((() => {
        return cs.create({ path: "deep-shadowing.ts", start: { line: 9, character: 18 }, end: { line: 9, character: 26 } }, "1peecez", { splices: [], captures: ["base$1peecez$0"], declarations: [] }, v => v.identifier({ path: "deep-shadowing.ts", start: { line: 9, character: 21 }, end: { line: 9, character: 25 } }, "base", "base$1peecez$0"));
    })());
    return cs.create({ path: "deep-shadowing.ts", start: { line: 7, character: 16 }, end: { line: 10, character: 3 } }, "1peecez", { splices: [$0splice0], captures: [], declarations: ["base$1peecez$0"] }, v => v.block({ path: "deep-shadowing.ts", start: { line: 7, character: 19 }, end: { line: 10, character: 2 } }, [v.variableDeclaration({ path: "deep-shadowing.ts", start: { line: 8, character: 3 }, end: { line: 8, character: 19 } }, "const", v.identifier({ path: "deep-shadowing.ts", start: { line: 8, character: 9 }, end: { line: 8, character: 13 } }, "base", "base$1peecez$0"), v.number({ path: "deep-shadowing.ts", start: { line: 8, character: 16 }, end: { line: 8, character: 18 } }, 10)), v.return({ path: "deep-shadowing.ts", start: { line: 9, character: 3 }, end: { line: 9, character: 29 } }, v.splice({ path: "deep-shadowing.ts", start: { line: 9, character: 10 }, end: { line: 9, character: 28 } }, 0))]));
})();
function outer(inner) {
    return (() => {
        const $0splice0 = middle(inner);
        return cs.create({ path: "deep-shadowing.ts", start: { line: 13, character: 10 }, end: { line: 16, character: 5 } }, "1peecez", { splices: [$0splice0], captures: [], declarations: ["base$1peecez$1"] }, v => v.block({ path: "deep-shadowing.ts", start: { line: 13, character: 13 }, end: { line: 16, character: 4 } }, [v.variableDeclaration({ path: "deep-shadowing.ts", start: { line: 14, character: 5 }, end: { line: 14, character: 20 } }, "const", v.identifier({ path: "deep-shadowing.ts", start: { line: 14, character: 11 }, end: { line: 14, character: 15 } }, "base", "base$1peecez$1"), v.number({ path: "deep-shadowing.ts", start: { line: 14, character: 18 }, end: { line: 14, character: 19 } }, 1)), v.return({ path: "deep-shadowing.ts", start: { line: 15, character: 5 }, end: { line: 15, character: 36 } }, v.binop({ path: "deep-shadowing.ts", start: { line: 15, character: 12 }, end: { line: 15, character: 35 } }, v.identifier({ path: "deep-shadowing.ts", start: { line: 15, character: 12 }, end: { line: 15, character: 16 } }, "base", "base$1peecez$1"), "+", v.splice({ path: "deep-shadowing.ts", start: { line: 15, character: 19 }, end: { line: 15, character: 35 } }, 0)))]));
    })();
}
function middle(inner) {
    return (() => {
        const $0splice0 = inner;
        return cs.create({ path: "deep-shadowing.ts", start: { line: 20, character: 10 }, end: { line: 23, character: 5 } }, "1peecez", { splices: [$0splice0], captures: [], declarations: ["base$1peecez$2"] }, v => v.block({ path: "deep-shadowing.ts", start: { line: 20, character: 13 }, end: { line: 23, character: 4 } }, [v.variableDeclaration({ path: "deep-shadowing.ts", start: { line: 21, character: 5 }, end: { line: 21, character: 20 } }, "const", v.identifier({ path: "deep-shadowing.ts", start: { line: 21, character: 11 }, end: { line: 21, character: 15 } }, "base", "base$1peecez$2"), v.number({ path: "deep-shadowing.ts", start: { line: 21, character: 18 }, end: { line: 21, character: 19 } }, 2)), v.return({ path: "deep-shadowing.ts", start: { line: 22, character: 5 }, end: { line: 22, character: 28 } }, v.binop({ path: "deep-shadowing.ts", start: { line: 22, character: 12 }, end: { line: 22, character: 27 } }, v.identifier({ path: "deep-shadowing.ts", start: { line: 22, character: 12 }, end: { line: 22, character: 16 } }, "base", "base$1peecez$2"), "*", v.splice({ path: "deep-shadowing.ts", start: { line: 22, character: 19 }, end: { line: 22, character: 27 } }, 0)))]));
    })();
}
