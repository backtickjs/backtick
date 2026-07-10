import { cs } from "@backtickjs/core";
const script = (() => {
    const $0splice0 = (() => {
        return cs.create({ path: "nested-scripts.tsx", start: { line: 5, character: 12 }, end: { line: 5, character: 17 } }, "1w6kq2c", { splices: [], captures: ["x$1w6kq2c$0"], declarations: [] }, v => v.identifier({ path: "nested-scripts.tsx", start: { line: 5, character: 15 }, end: { line: 5, character: 16 } }, "x", "x$1w6kq2c$0"));
    })();
    return cs.create({ path: "nested-scripts.tsx", start: { line: 3, character: 16 }, end: { line: 6, character: 3 } }, "1w6kq2c", { splices: [$0splice0], captures: [], declarations: ["x$1w6kq2c$0"] }, v => v.block({ path: "nested-scripts.tsx", start: { line: 3, character: 19 }, end: { line: 6, character: 2 } }, [v.variableDeclaration({ path: "nested-scripts.tsx", start: { line: 4, character: 3 }, end: { line: 4, character: 15 } }, "const", v.identifier({ path: "nested-scripts.tsx", start: { line: 4, character: 9 }, end: { line: 4, character: 10 } }, "x", "x$1w6kq2c$0"), v.number({ path: "nested-scripts.tsx", start: { line: 4, character: 13 }, end: { line: 4, character: 14 } }, 0)), v.return({ path: "nested-scripts.tsx", start: { line: 5, character: 3 }, end: { line: 5, character: 19 } }, v.splice({ path: "nested-scripts.tsx", start: { line: 5, character: 10 }, end: { line: 5, character: 18 } }, 0))]));
})();
