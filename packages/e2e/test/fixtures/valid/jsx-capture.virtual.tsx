import { cs } from "@backtickjs/core";
import type { Client } from "@backtickjs/core";

// A binding declared in an enclosing script and captured by a script inside a
// spliced tree threads through the tree's slot signature: the outer body
// instantiates the tree with `#t0(x)` and the tree wires the capture into the
// handler with `#slot`.
const script: Client<() => JSX.Element> = cs.lift(() => {
    const __cs_x = 1;
    return cs.splice((<button onClick={cs.lift(() => __cs_x)} />));
});
export default script;
