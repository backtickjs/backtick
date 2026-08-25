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

const label: Client<(c: Color) => string> = cs.lift(cs.const((__cs_c: Color) => {
    return cs.const(__cs_c === cs.receiver(cs.splice((Color))).Blue ? "blue" : "red");
}));

async function Swatch() {
  return cs.lift((() => {
    const __cs_held = cs.const(cs.splice((state))(cs.receiver(cs.splice((Color))).Red));
    return cs.const(<span onclick={cs.lift(() => cs.receiver(__cs_held).write(cs.receiver(cs.splice((Color))).Blue))}>{cs.lift(cs.splice((label))(cs.receiver(__cs_held).read()))}</span>);
})());
}

export default <Swatch />;
