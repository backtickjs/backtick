import { cs } from "@backtickjs/core";

// An action only splices in statement position: any value-consuming splice
// fails right at the splice — a stored one, a returned one, even one
// assigned to an `unknown`-typed catch binding.
const action = cs`{
  const x = 1;
}`;

export const stored = cs`{
  const captured = $action;
  return 1;
}`;

export const returned = cs`{
  return $action;
}`;

export const assigned = cs`{
  try {
    return 1;
  } catch (e) {
    e = $action;
    return 2;
  }
}`;
