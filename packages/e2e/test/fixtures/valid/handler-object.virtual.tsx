import { cs, type Client } from "@backtickjs/core";

// Handlers — action arrows — are values: an object carries them, and
// storing one is not calling it.
const beep: Client<void> = cs.liftAction((() => {
    let __cs_n = cs.widen(0);
    __cs_n = cs.value(1);
})());

const onTap: Client<(id: number) => void> = cs.liftValue((__cs_id: number) => {
    cs.statement(cs.spliceAction((beep)));
});

export default cs.liftValue((() => {
    const __cs_handlers = cs.value({ tap: cs.spliceValue((onTap)), hold: cs.spliceValue((onTap)) });
    return __cs_handlers;
})());
