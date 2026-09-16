import { cs } from "@backtickjs/core";

// An action only splices in statement position: any value-consuming splice
// fails right at the splice — a stored one, a returned one, even one
// assigned to an `unknown`-typed catch binding.
const action = cs`{
  const x = 1;
}`;

export const stored = cs`{
  // @ts-expect-error: Argument of type 'void' is not assignable to parameter of type 'ClientValue'.
  const captured = $action;
  return 1;
}`;

export const returned = cs`{
  // @ts-expect-error: Argument of type 'void' is not assignable to parameter of type 'ClientValue'.
  return $action;
}`;

export const assigned = cs`{
  try {
    return 1;
  } catch (e) {
    // @ts-expect-error: Argument of type 'void' is not assignable to parameter of type 'ClientValue'.
    e = $action;
    return 2;
  }
}`;
