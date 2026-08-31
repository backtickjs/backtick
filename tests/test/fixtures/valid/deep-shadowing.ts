import { cs, type Client } from "@backtickjs/core";

// `cs`base`` is written under the outer `base`, but is threaded through two host
// functions that each shadow `base` with their own binding. The captured value
// must reach the leaf untouched, so the threaded channel is renamed away from
// every `base` it passes through.
export default cs`{
  const base = 10;
  return ${outer(cs`base`)};
}`;

function outer(inner: Client<number>): Client<number> {
  return cs`{
    const base = 1;
    return base + ${middle(inner)};
  }`;
}

function middle(inner: Client<number>): Client<number> {
  return cs`{
    const base = 2;
    return base * $inner;
  }`;
}
