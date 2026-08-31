import { cs } from "@backtickjs/core";

// A nullable parameter is not an optional argument: omitting it would put
// `undefined` in the function's type, so the caller passes `null`.
const greet = cs`(name?: string) => {
  return name?.concat("!");
}`;

export default cs`{
  return $greet();
}`;
