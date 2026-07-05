import { cs } from "@backtickjs/core";
import { print } from "../print.ts";
const script = (() => {
    return cs.create({ path: "unsupported-syntax.error.tsx", start: { line: 4, character: 16 }, end: { line: 4, character: 28 } }, { splices: [], freeVars: [] }, v => v.null({ path: "unsupported-syntax.error.tsx", start: { line: 4, character: 19 }, end: { line: 4, character: 27 } }));
})();
print(script);
