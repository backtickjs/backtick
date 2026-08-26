import { cs, state, type Client } from "@backtickjs/core";

// A cell holding an enum, handed to a function whose parameter is that enum.
//
// The member is spliced as itself and the cell holds `Color` rather than
// `Color.Red`, so the other member is a value it takes. What a splice hands
// over keeps the width the host gave it: `cs.splice` reads it back unbound, and
// the binding it lands in decides the width the way TypeScript decides every
// other one — a member to its enum, as a `let` would.
enum Color {
  Red = 0,
  Blue = 1,
}

const label: Client<(c: Color) => string> = cs.lift(cs.const((__cs_c: Color) => {
    return cs.const(__cs_c === cs.splice(Color.Blue) satisfies import("@backtickjs/core").ClientUnknown ? "blue" : "red");
}));

async function Swatch() {
  return cs.lift((() => {
    const __cs_held = cs.const((cs.splice((state)) satisfies import("@backtickjs/core").ClientUnknown)(cs.splice(Color.Red) satisfies import("@backtickjs/core").ClientUnknown));
    return cs.const(<span onclick={cs.lift(() => cs.receiver(__cs_held).write(cs.splice(Color.Blue) satisfies import("@backtickjs/core").ClientUnknown))}>{cs.lift((cs.splice((label)) satisfies import("@backtickjs/core").ClientUnknown)(cs.receiver(__cs_held).read()))}</span>);
})());
}

export default <Swatch />;
