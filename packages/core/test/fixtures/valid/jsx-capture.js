import { jsx as _jsx } from "@backtickjs/core/jsx-runtime";
import { cs } from "@backtickjs/core";
// A binding declared in an enclosing script and captured by a script inside a
// spliced tree threads through the tree's slot signature: the outer body
// instantiates the tree with `#t0(x)` and the tree wires the capture into the
// handler with `#slot`.
const script = cs.create([8, 41, 11, 3], { filePath: "jsx-capture.tsx", fileHash: "262kdhhq7d7sh", splices: { $0splice0: (_jsx("button", { onClick: cs.create([10, 30, 10, 41], { filePath: "jsx-capture.tsx", fileHash: "262kdhhq7d7sh", splices: {}, captures: ["x$262kdhhq7d7sh$0"], declarations: [] }, v => v.arrow([10, 33, 10, 40], [], v.identifier([10, 39, 10, 40], "x", "x$262kdhhq7d7sh$0"))) })) }, captures: [], declarations: ["x$262kdhhq7d7sh$0"] }, v => v.arrow([8, 44, 11, 2], [], v.block([8, 50, 11, 2], [v.variableDeclaration([9, 3, 9, 15], "const", v.identifier([9, 9, 9, 10], "x", "x$262kdhhq7d7sh$0"), v.number([9, 13, 9, 14], 1)), v.return([10, 3, 10, 48], v.splice([10, 10, 10, 47], "$0splice0"))])));
export default script;
