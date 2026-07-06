import { cs } from "@backtickjs/core";
import { print } from "../print.ts";
const script = (() => {
    return cs.create({ path: "unsupported-multi-var.error.tsx", start: { line: 4, character: 16 }, end: { line: 7, character: 3 } }, { splices: [], freeVars: [] }, v => v.block({ path: "unsupported-multi-var.error.tsx", start: { line: 4, character: 19 }, end: { line: 7, character: 2 } }, [v.null({ path: "unsupported-multi-var.error.tsx", start: { line: 5, character: 3 }, end: { line: 5, character: 22 } }), v.return({ path: "unsupported-multi-var.error.tsx", start: { line: 6, character: 3 }, end: { line: 6, character: 12 } }, v.identifier({ path: "unsupported-multi-var.error.tsx", start: { line: 6, character: 10 }, end: { line: 6, character: 11 } }, "a"))]));
})();
print(script);
