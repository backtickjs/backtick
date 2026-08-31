import { cs } from "@backtickjs/core";

export default cs`{
  const x = 0;
  return ${cs`x`};
}`;
