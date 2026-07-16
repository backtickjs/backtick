import { cs } from "@backtickjs/core";
// A host helper reused with different splices makes its script polymorphic:
// the holes can't be inlined, so every call site passes its splice as a
// thunk and the body evaluates `$0()` at the hole. The thunk is what keeps
// the hole as lazy as an inlined splice: `guard(broken)(false)` never
// reaches its hole, so the broken fragment must never evaluate — passed
// eagerly (by value instead of by thunk) it would throw before `flag` was
// even tested.
function guard(fragment) {
    return cs.create([11, 10, 16, 5], { filePath: "splice-laziness.ts", fileHash: "3msz3ctxqyyco", splices: { $0splice0: fragment }, captures: [], declarations: ["flag$3msz3ctxqyyco$0"] }, v => v.arrow([11, 13, 16, 4], [v.identifier([11, 14, 11, 18], "flag", "flag$3msz3ctxqyyco$0")], v.block([11, 32, 16, 4], [v.if([12, 5, 14, 6], v.identifier([12, 9, 12, 13], "flag", "flag$3msz3ctxqyyco$0"), v.block([12, 15, 14, 6], [v.return([13, 7, 13, 26], v.splice([13, 14, 13, 25], "$0splice0"))]), null), v.return([15, 5, 15, 22], v.string([15, 12, 15, 21], "skipped"))])));
}
const ok = cs.create([19, 12, 19, 27], { filePath: "splice-laziness.ts", fileHash: "3msz3ctxqyyco", splices: {}, captures: [], declarations: [] }, v => v.string([19, 15, 19, 26], "evaluated"));
const broken = cs.create([20, 16, 20, 73], { filePath: "splice-laziness.ts", fileHash: "3msz3ctxqyyco", splices: {}, captures: [], declarations: [] }, v => v.block([20, 19, 20, 72], [v.throw([20, 21, 20, 70], v.string([20, 27, 20, 69], "the guarded fragment must never evaluate"))]));
export default cs.create([22, 16, 25, 4], { filePath: "splice-laziness.ts", fileHash: "3msz3ctxqyyco", splices: { $0splice0: guard(ok), $0splice1: guard(broken) }, captures: [], declarations: [] }, v => v.object([22, 20, 25, 2], { taken: v.call([23, 10, 23, 28], v.splice([23, 10, 23, 22], "$0splice0"), [v.boolean([23, 23, 23, 27], true)]), skipped: v.call([24, 12, 24, 35], v.splice([24, 12, 24, 28], "$0splice1"), [v.boolean([24, 29, 24, 34], false)]) }));
