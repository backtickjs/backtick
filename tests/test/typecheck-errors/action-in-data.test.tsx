import { cs } from "@backtickjs/core";

// A container ships verbatim, so an action inside one has no place — the
// splice rejects it.
const action = cs`{
  const x = 1;
}`;

export const listed = cs`{
  // @ts-expect-error: Argument of type 'Client<void>[]' is not assignable to parameter of type 'ClientValue'.
  const list = ${[action]};
  return 1;
}`;

export const keyed = cs`{
  // @ts-expect-error: Argument of type '{ press: Client<void>; }' is not assignable to parameter of type 'ClientValue'.
  const map = ${{ press: action }};
  return 1;
}`;
