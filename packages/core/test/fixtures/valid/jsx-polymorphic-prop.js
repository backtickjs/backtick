import { jsx as _jsx } from "@backtickjs/core/jsx-runtime";
import { cs } from "@backtickjs/core";
// One script body (one source location) instantiated with different splices —
// the JSX analogue of the `splice-sharing` fixture. The entry takes a thunk
// parameter, and each prop's `#call` passes its own splice as a `#thunk`.
function make(n) {
    return cs.create({ path: "jsx-polymorphic-prop.tsx", start: { line: 7, character: 10 }, end: { line: 7, character: 24 } }, "1wl0srn", { splices: { $0splice0: n }, captures: [], declarations: [] }, v => v.arrow({ path: "jsx-polymorphic-prop.tsx", start: { line: 7, character: 13 }, end: { line: 7, character: 23 } }, [], v.splice({ path: "jsx-polymorphic-prop.tsx", start: { line: 7, character: 19 }, end: { line: 7, character: 23 } }, "$0splice0")));
}
export default _jsx("button", { onA: make(1), onB: make(2) });
