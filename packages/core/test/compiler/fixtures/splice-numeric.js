import { cs } from "@backtick/core";
import { print } from "../print.ts";
const script = (() => {
    const $0splice0 = 1;
    return cs.create(v => v.clientScript({ path: "splice-numeric.tsx", start: { line: 4, character: 16 }, end: { line: 4, character: 24 } }, { splices: { $0splice0: $0splice0 }, freeVars: [] }, v.splice({ path: "splice-numeric.tsx", start: { line: 4, character: 19 }, end: { line: 4, character: 23 } }, "$0splice0", $0splice0)));
})();
print(script);
