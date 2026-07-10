import { cs } from "@backtickjs/core";
export default (() => {
    const $0splice0 = (() => {
        return cs.create({ path: "nested-scripts.ts", start: { line: 5, character: 12 }, end: { line: 5, character: 17 } }, "1603vuu", { splices: [], captures: ["x$1603vuu$0"], declarations: [] }, v => v.identifier({ path: "nested-scripts.ts", start: { line: 5, character: 15 }, end: { line: 5, character: 16 } }, "x", "x$1603vuu$0"));
    })();
    return cs.create({ path: "nested-scripts.ts", start: { line: 3, character: 16 }, end: { line: 6, character: 3 } }, "1603vuu", { splices: [$0splice0], captures: [], declarations: ["x$1603vuu$0"] }, v => v.block({ path: "nested-scripts.ts", start: { line: 3, character: 19 }, end: { line: 6, character: 2 } }, [v.variableDeclaration({ path: "nested-scripts.ts", start: { line: 4, character: 3 }, end: { line: 4, character: 15 } }, "const", v.identifier({ path: "nested-scripts.ts", start: { line: 4, character: 9 }, end: { line: 4, character: 10 } }, "x", "x$1603vuu$0"), v.number({ path: "nested-scripts.ts", start: { line: 4, character: 13 }, end: { line: 4, character: 14 } }, 0)), v.return({ path: "nested-scripts.ts", start: { line: 5, character: 3 }, end: { line: 5, character: 19 } }, v.splice({ path: "nested-scripts.ts", start: { line: 5, character: 10 }, end: { line: 5, character: 18 } }, 0))]));
})();
