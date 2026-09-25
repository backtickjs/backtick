import { cs } from "@backtickjs/core";

// A container ships verbatim, so an action inside one has no place — the
// splice rejects it.
const action = cs`{
  const x = 1;
}`;

export const listed = cs`{
  // @ts-expect-error: Type 'Client<void>' is not assignable to type 'Spliceable<ClientValue>'.
  const list = ${[action]};
  return 1;
}`;

export const keyed = cs`{
  // @ts-expect-error: Type '{ press: Client<void>; }' does not satisfy the expected type 'Spliceable'.
  const map = ${{ press: action }};
  return 1;
}`;
