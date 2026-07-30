import { cs } from "@backtickjs/core";

// An object is reached by a string key, and the type has to admit one: this
// record says any string names a number, so a key computed at runtime is a read
// the typechecker can allow. It reads as `number | null` — a record says
// nothing about which keys it has — so the absent case is answered here.
const rates: { [currency: string]: number } = { usd: 3, eur: 4 };

export default cs.lift(cs.const((__cs_currency: string) => {
    const __cs_table = cs.const(cs.splice((rates)));
    const __cs_asked = cs.const(cs.index(__cs_table, __cs_currency) ?? 0);
    const __cs_usd = cs.const(cs.index(__cs_table, "usd") ?? 0);
    return cs.const(__cs_asked + __cs_usd);
}));
