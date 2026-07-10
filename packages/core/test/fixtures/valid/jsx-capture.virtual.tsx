import { cs } from "@backtickjs/core";
import type { Client, UIElement } from "@backtickjs/core/cs-runtime";

// A binding declared in an enclosing script and captured by a script inside a
// spliced tree threads through the tree's slot signature: the outer body
// instantiates the tree with `#t0(x)` and the tree wires the capture into the
// handler with `#slot`.
const script: Client<() => UIElement> = cs.lift(() => {
    const __cs_x = 1;
    return cs.lower((<button onClick={cs.lift(() => __cs_x)} />));
});
export default script;
