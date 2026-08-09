import { cs } from "@backtickjs/core";

// Storage a script declares for itself, rather than one a component owns and
// splices in. `state(...)` is a declaration and not a call of a name: each time
// the declaration is evaluated there is another cell, which is what lets a
// script build a row that carries its own.
async function Rows() {
  const build = cs.lift(cs.const((__cs_label: string) => {
    return cs.const({ label: cs.state(__cs_label) });
}));

  return (
    <span
      style={cs.lift(cs.const("font-size: 16px"))}
      onclick={cs.lift(cs.const(() => {
    const __cs_row = cs.const(cs.splice((build))("one"));
    cs.statement(cs.receiver(cs.receiver(__cs_row).label).write(cs.receiver(cs.receiver(__cs_row).label).read() + " !!!"));
}))}
    >
      {cs.lift(cs.const(cs.receiver(cs.receiver(cs.splice((build))("one")).label).read()))}
    </span>
  );
}

export default <Rows />;
