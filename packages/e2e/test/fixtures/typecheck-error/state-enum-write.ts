import { cs, state } from "@backtickjs/core";

// A cell holds the enum member it was given rather than the enum, so the other
// member is not a value it takes. `cs.splice` is why: its constraint keeps the
// literal, where a member written in the script would widen the way a `let`
// does.
enum Color {
  Red = 0,
  Blue = 1,
}

export default cs`{
  const held = $state(${Color.Red});
  held.write(${Color.Blue});
  return 1;
}`;
