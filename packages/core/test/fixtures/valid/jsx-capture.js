import { cs } from "@backtickjs/core";
// A binding declared in an enclosing script and captured by a script inside a
// spliced tree threads through the tree's slot signature: the outer body
// instantiates the tree with `#t0(x)` and the tree wires the capture into the
// handler with `#slot`.
export default (() => {
    const $0splice0 = (<button onClick={(() => {
        return cs.create({ path: "jsx-capture.tsx", start: { line: 9, character: 30 }, end: { line: 9, character: 41 } }, "28seln", { splices: [], captures: ["x$28seln$0"], declarations: [] }, v => v.arrow({ path: "jsx-capture.tsx", start: { line: 9, character: 33 }, end: { line: 9, character: 40 } }, [], v.identifier({ path: "jsx-capture.tsx", start: { line: 9, character: 39 }, end: { line: 9, character: 40 } }, "x", "x$28seln$0")));
    })()}/>);
    return cs.create({ path: "jsx-capture.tsx", start: { line: 7, character: 16 }, end: { line: 10, character: 3 } }, "28seln", { splices: [$0splice0], captures: [], declarations: ["x$28seln$0"] }, v => v.arrow({ path: "jsx-capture.tsx", start: { line: 7, character: 19 }, end: { line: 10, character: 2 } }, [], v.block({ path: "jsx-capture.tsx", start: { line: 7, character: 25 }, end: { line: 10, character: 2 } }, [v.variableDeclaration({ path: "jsx-capture.tsx", start: { line: 8, character: 3 }, end: { line: 8, character: 15 } }, "const", v.identifier({ path: "jsx-capture.tsx", start: { line: 8, character: 9 }, end: { line: 8, character: 10 } }, "x", "x$28seln$0"), v.number({ path: "jsx-capture.tsx", start: { line: 8, character: 13 }, end: { line: 8, character: 14 } }, 1)), v.return({ path: "jsx-capture.tsx", start: { line: 9, character: 3 }, end: { line: 9, character: 48 } }, v.splice({ path: "jsx-capture.tsx", start: { line: 9, character: 10 }, end: { line: 9, character: 47 } }, 0))])));
})();
