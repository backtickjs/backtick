import { cs } from "@backtickjs/core";
import { print } from "../print.ts";
const script = (() => {
    return cs.create(v => v.clientScript({ path: "unsupported-object-property.error.tsx", start: { line: 4, character: 16 }, end: { line: 4, character: 27 } }, { splices: {}, freeVars: ["a"] }, v.null({ path: "unsupported-object-property.error.tsx", start: { line: 4, character: 20 }, end: { line: 4, character: 25 } })));
})();
print(script);
