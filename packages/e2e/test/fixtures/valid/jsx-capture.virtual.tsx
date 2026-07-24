import { cs } from "@backtickjs/core";
import type { Client, JSX } from "@backtickjs/core";

const Button = (props: { onClick?: unknown }) => ({
  "@backtickjs": "ClientElement" as const,
  id: "Button",
  props,
});

// A binding declared in an enclosing script and captured by a script inside a
// spliced tree threads through the tree's slot signature: the outer body
// instantiates the tree with `#t0(x)` and the tree wires the capture into the
// handler with `#slot`.
const script: Client<() => JSX.Element> = cs.lift(cs.const(() => {
    const __cs_x = cs.const(1);
    return cs.const(cs.splice((<Button onClick={cs.lift(cs.const(() => __cs_x))} />)));
}));
export default script;
