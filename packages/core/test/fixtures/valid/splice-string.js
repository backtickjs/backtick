import { cs } from "@backtickjs/core";
// A runtime string splice inlines as itself — quotes, newlines, and
// backslashes intact.
const value = 'say "hi"\n\\done';
export default cs.create({ path: "splice-string.ts", start: { line: 7, character: 16 }, end: { line: 7, character: 28 } }, "c951na", { splices: { $0splice0: value }, captures: [], declarations: [] }, v => v.splice({ path: "splice-string.ts", start: { line: 7, character: 19 }, end: { line: 7, character: 27 } }, "$0splice0"));
