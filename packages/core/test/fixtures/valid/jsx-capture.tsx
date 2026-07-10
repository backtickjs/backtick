import { cs } from "@backtickjs/core";
import type { Client, UIElement } from "@backtickjs/core/cs-runtime";

// A binding declared in an enclosing script and captured by a script inside a
// spliced tree threads through the tree's slot signature: the outer body
// instantiates the tree with `#t0(x)` and the tree wires the capture into the
// handler with `#slot`.
const script: Client<() => UIElement> = cs`() => {
  const x = 1;
  return ${(<button onClick={cs`() => x`} />)};
}`;
export default script;
