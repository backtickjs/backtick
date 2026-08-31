import { cs } from "@backtickjs/core";

// A container ships verbatim, so an action inside one has no place — the
// splice rejects it.
const action = cs`{
  const x = 1;
}`;

export const listed = cs`{
  const list = ${[action]};
  return 1;
}`;

export const keyed = cs`{
  const map = ${{ press: action }};
  return 1;
}`;
