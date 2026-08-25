import { cs, state } from "@backtickjs/core";

// Splicing the member pins the cell to it. `${Color.Red}` reaches `$state`
// through `cs.splice`, whose constraint keeps the literal, so what the cell
// holds is `Color.Red` and the other member is not a value it takes.
//
// Splice the enum and read the member inside the script instead — `$Color.Red`,
// which `state-enum` writes — and the cell holds `Color`, which is what a write
// wants.
enum Color {
  Red = 0,
  Blue = 1,
}

// An action, so the write is the only thing under test: in a script that
// returns a value it would be a side effect as well, and that error would stand
// beside this one.
export default cs.lift((() => {
    const __cs_held = cs.const(cs.splice((state))(cs.splice(Color.Red)));
    cs.statement(cs.receiver(__cs_held).write(cs.splice(Color.Blue)));
})());
