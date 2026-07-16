import { cs } from "@backtickjs/core";
// `cs`base`` is written under the outer `base`, but is threaded through two host
// functions that each shadow `base` with their own binding. The captured value
// must reach the leaf untouched, so the threaded channel is renamed away from
// every `base` it passes through.
export default cs.create([7, 16, 10, 3], { filePath: "deep-shadowing.ts", fileHash: "lvdvb433df17", splices: { $0splice0: outer(cs.create([9, 18, 9, 26], { filePath: "deep-shadowing.ts", fileHash: "lvdvb433df17", splices: {}, captures: ["base$lvdvb433df17$0"], declarations: [] }, v => v.identifier([9, 21, 9, 25], "base", "base$lvdvb433df17$0"))) }, captures: [], declarations: ["base$lvdvb433df17$0"] }, v => v.block([7, 19, 10, 2], [v.variableDeclaration([8, 3, 8, 19], "const", v.identifier([8, 9, 8, 13], "base", "base$lvdvb433df17$0"), v.number([8, 16, 8, 18], 10)), v.return([9, 3, 9, 29], v.splice([9, 10, 9, 28], "$0splice0"))]));
function outer(inner) {
    return cs.create([13, 10, 16, 5], { filePath: "deep-shadowing.ts", fileHash: "lvdvb433df17", splices: { $0splice0: middle(inner) }, captures: [], declarations: ["base$lvdvb433df17$1"] }, v => v.block([13, 13, 16, 4], [v.variableDeclaration([14, 5, 14, 20], "const", v.identifier([14, 11, 14, 15], "base", "base$lvdvb433df17$1"), v.number([14, 18, 14, 19], 1)), v.return([15, 5, 15, 36], v.binop([15, 12, 15, 35], v.identifier([15, 12, 15, 16], "base", "base$lvdvb433df17$1"), "+", v.splice([15, 19, 15, 35], "$0splice0")))]));
}
function middle(inner) {
    return cs.create([20, 10, 23, 5], { filePath: "deep-shadowing.ts", fileHash: "lvdvb433df17", splices: { $0splice0: inner }, captures: [], declarations: ["base$lvdvb433df17$2"] }, v => v.block([20, 13, 23, 4], [v.variableDeclaration([21, 5, 21, 20], "const", v.identifier([21, 11, 21, 15], "base", "base$lvdvb433df17$2"), v.number([21, 18, 21, 19], 2)), v.return([22, 5, 22, 28], v.binop([22, 12, 22, 27], v.identifier([22, 12, 22, 16], "base", "base$lvdvb433df17$2"), "*", v.splice([22, 19, 22, 27], "$0splice0")))]));
}
