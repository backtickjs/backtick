import { cs } from "@backtickjs/core";
import { print } from "../print.ts";
const script = (() => {
    const $0splice0 = (() => {
        return cs.create({ path: "nested-scripts.tsx", start: { line: 6, character: 12 }, end: { line: 6, character: 17 } }, { splices: [], captures: ["x$rdd7qi_0"] }, v => v.identifier({ path: "nested-scripts.tsx", start: { line: 6, character: 15 }, end: { line: 6, character: 16 } }, "x", "x$rdd7qi_0"));
    })();
    return cs.create({ path: "nested-scripts.tsx", start: { line: 4, character: 16 }, end: { line: 7, character: 3 } }, { splices: [$0splice0], captures: [] }, v => v.block({ path: "nested-scripts.tsx", start: { line: 4, character: 19 }, end: { line: 7, character: 2 } }, [v.variableDeclaration({ path: "nested-scripts.tsx", start: { line: 5, character: 3 }, end: { line: 5, character: 15 } }, "const", v.identifier({ path: "nested-scripts.tsx", start: { line: 5, character: 9 }, end: { line: 5, character: 10 } }, "x", "x$rdd7qi_0"), v.number({ path: "nested-scripts.tsx", start: { line: 5, character: 13 }, end: { line: 5, character: 14 } }, 0)), v.return({ path: "nested-scripts.tsx", start: { line: 6, character: 3 }, end: { line: 6, character: 19 } }, v.splice({ path: "nested-scripts.tsx", start: { line: 6, character: 10 }, end: { line: 6, character: 18 } }, 0))]));
})();
print(script);
