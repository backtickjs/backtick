import { cs } from "@backtickjs/core";
export default (() => {
    const $0splice0 = [1, "two", true, null];
    const $0splice1 = { k: 3 };
    return cs.create({ path: "runtime-values.ts", start: { line: 3, character: 16 }, end: { line: 3, character: 75 } }, "179xq24", { splices: [$0splice0, $0splice1], captures: [], declarations: [] }, v => v.object({ path: "runtime-values.ts", start: { line: 3, character: 20 }, end: { line: 3, character: 73 } }, { list: v.splice({ path: "runtime-values.ts", start: { line: 3, character: 28 }, end: { line: 3, character: 53 } }, 0), obj: v.splice({ path: "runtime-values.ts", start: { line: 3, character: 60 }, end: { line: 3, character: 71 } }, 1) }));
})();
