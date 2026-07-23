import { cs } from "@backtickjs/core";

// Typed code can't put an action in a container (see `Spliceable`), but an
// untyped caller can; the lowering backstop refuses to ship it.
const action = cs`{
  const x = 1;
}`;

export default cs`{
  const list = ${[action]};
  return 1;
}`;
