import { cs } from "@backtickjs/core";
// Splices evaluate when the `cs` expression does, left to right in source
// order, like a real template literal's spans — braced and unbraced alike:
// the `$count` read sees 0 before `${++count}` bumps it to 1.
let count = 0;
export default cs.create({ path: "splice-order.ts", start: { line: 8, character: 16 }, end: { line: 8, character: 50 } }, "1hw5m8e", { splices: { count: count, $0splice0: ++count }, captures: [], declarations: [] }, v => v.object({ path: "splice-order.ts", start: { line: 8, character: 20 }, end: { line: 8, character: 48 } }, { a: v.splice({ path: "splice-order.ts", start: { line: 8, character: 25 }, end: { line: 8, character: 31 } }, "count"), b: v.splice({ path: "splice-order.ts", start: { line: 8, character: 36 }, end: { line: 8, character: 46 } }, "$0splice0") }));
