import { cs, state, type Client } from "@backtickjs/core";

// A cell holding an enum, handed to a function whose parameter is that enum.
//
// The enum is spliced by name and read inside the script — `$Color.Red`, not
// `${Color.Red}`. Splicing the member pins the cell to that member: a spliced
// value reaches `$state` through `cs.splice`, whose constraint keeps the
// literal, so `Color.Red` is what the cell would hold and the other member
// would not be a value it takes (`state-enum-write` pins that). Read off the
// enum instead and the cell holds `Color`, which is what a write wants and what
// a function taking one accepts.
enum Color {
  Red = 0,
  Blue = 1,
}

const label: Client<(c: Color) => string> = cs`(c: Color) => {
  return c === $Color.Blue ? "blue" : "red";
}`;

async function Swatch() {
  return cs`{
    const held = $state($Color.Red);
    return (
      <span onclick={() => held.write($Color.Blue)}>{$label(held.read())}</span>
    );
  }`;
}

export default <Swatch />;
