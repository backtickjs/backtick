import { cs, type Client } from "@backtickjs/core";

// Handlers — action arrows — are values: an object carries them, and
// storing one is not calling it.
const beep: Client<void> = cs.lift((() => {
    let __cs_n = cs.let(0);
    __cs_n = cs.const(1);
})());

const onTap: Client<(id: number) => void> = cs.lift(cs.const((__cs_id: number) => {
    cs.statement(cs.splice((beep)));
}));

export default cs.lift((() => {
    const __cs_handlers = cs.const({ tap: cs.splice((onTap)), hold: cs.splice((onTap)) });
    return cs.const(__cs_handlers);
})());
