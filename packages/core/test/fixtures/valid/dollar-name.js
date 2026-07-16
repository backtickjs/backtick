import { cs } from "@backtickjs/core";
// A `$` inside a name is ordinary JavaScript — only the leading sigil is
// reserved for splices — so a `$`-bearing binding survives mangling, its
// `<name>$<fileHash>$<n>` binding key still parses from the right, and the
// threaded capture's display name recovers `foo$` intact.
function add(lhs) {
    return cs.create([8, 10, 8, 24], { filePath: "dollar-name.ts", fileHash: "1rmu9y6", splices: { $0splice0: lhs }, captures: [], declarations: [] }, v => v.binop([8, 13, 8, 23], v.splice([8, 13, 8, 19], "$0splice0"), "+", v.number([8, 22, 8, 23], 2)));
}
export default cs.create([11, 16, 14, 3], { filePath: "dollar-name.ts", fileHash: "1rmu9y6", splices: { $0splice0: add(cs.create([13, 16, 13, 24], { filePath: "dollar-name.ts", fileHash: "1rmu9y6", splices: {}, captures: ["foo$$1rmu9y6$0"], declarations: [] }, v => v.identifier([13, 19, 13, 23], "foo$", "foo$$1rmu9y6$0"))) }, captures: [], declarations: ["foo$$1rmu9y6$0"] }, v => v.block([11, 19, 14, 2], [v.variableDeclaration([12, 3, 12, 18], "const", v.identifier([12, 9, 12, 13], "foo$", "foo$$1rmu9y6$0"), v.number([12, 16, 12, 17], 1)), v.return([13, 3, 13, 27], v.splice([13, 10, 13, 26], "$0splice0"))]));
