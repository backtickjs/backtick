import { cs, type Client } from "@backtickjs/core";

function add(lhs: Client<number>, rhs: Client<number>): Client<number> {
  return cs`${lhs} + ${rhs}`;
}

export default cs`${add(cs`1`, cs`2`)}`;
