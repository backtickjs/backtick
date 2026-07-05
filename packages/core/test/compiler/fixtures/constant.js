import { cs } from "@backtickjs/core";
import { print } from "../print.ts";
const script = (() => {
    return cs.create({ path: "constant.tsx", start: { line: 4, character: 16 }, end: { line: 4, character: 21 } }, { splices: [], freeVars: [] }, v => v.number({ path: "constant.tsx", start: { line: 4, character: 19 }, end: { line: 4, character: 20 } }, 1));
})();
print(script);
