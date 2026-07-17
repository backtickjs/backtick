import { cs, type Client } from "@backtickjs/core";

export default cs`{
  const total = 1;
  return ${add(cs`total`, 100)};
}`;

function add(lhs: Client<number>, rhs: number): Client<number> {
  return cs`{
    let total = 0;
    total = total + $lhs;
    total = total + $rhs;
    return total;
  }`;
}
