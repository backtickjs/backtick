import { cs, state, type Client } from "@backtickjs/core";

// A cell holding an enum, handed to a function whose parameter is that enum.
//
// The cell holds the member it was given — `Color.Red`, not `Color` — because a
// spliced value reaches `$state` through `cs.splice`, whose constraint keeps the
// literal. That is narrower than what a `let` would hold, and it is why writing
// a different member to this cell is an error: `state-enum-write` pins that.
enum Color {
  Red = 0,
  Blue = 1,
}

const label: Client<(c: Color) => string> = cs.lift(cs.const((__cs_c: Color) => {
    return cs.const(__cs_c === cs.splice(Color.Blue) ? "blue" : "red");
}));

async function Swatch() {
  return cs.lift((() => {
    const __cs_held = cs.const(cs.splice((state))(cs.splice(Color.Red)));
    return cs.const(<span>{cs.lift(cs.splice((label))(cs.receiver(__cs_held).read()))}</span>);
})());
}

export default <Swatch />;
