import { cs, state } from "@backtickjs/core";

// A cell holds the enum member it was given rather than the enum, so the other
// member is not a value it takes. `cs.splice` is why: its constraint keeps the
// literal, where a member written in the script would widen the way a `let`
// does.
enum Color {
  Red = 0,
  Blue = 1,
}

export default cs.lift((() => {
    const __cs_held = cs.const(cs.splice((state))(cs.splice(Color.Red)));
    cs.statement(cs.receiver(__cs_held).write(cs.splice(Color.Blue)));
    return cs.const(1);
})());
