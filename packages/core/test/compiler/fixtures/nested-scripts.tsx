import { cs } from "@backtick/core";

const script = cs`{
  const x = 0;
  return ${cs`x`};
}`;

export default script;
