import { cs } from "@backtickjs/core";
// Splices evaluate when the `cs` expression does, in metadata dictionary
// order: braced first, in span order, then unbraced. The `$count` read runs
// after the `${count++}` beside it, so `a` observes the increment even
// though it is spliced first.
let count = 0;
export default cs.create({ path: "splice-order.ts", start: { line: 9, character: 16 }, end: { line: 9, character: 50 } }, "1kaoji0", { splices: { $0splice0: count++, $count: count }, captures: [], declarations: [] }, v => v.object({ path: "splice-order.ts", start: { line: 9, character: 20 }, end: { line: 9, character: 48 } }, { a: v.splice({ path: "splice-order.ts", start: { line: 9, character: 25 }, end: { line: 9, character: 31 } }, "$count"), b: v.splice({ path: "splice-order.ts", start: { line: 9, character: 36 }, end: { line: 9, character: 46 } }, "$0splice0") }));
