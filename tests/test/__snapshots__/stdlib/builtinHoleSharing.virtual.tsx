import { cs, state } from "@backtickjs/core";
import type { Client, State } from "@backtickjs/core";

const make = (f: Client<(n: number) => State<number>>) =>
  cs.lift((() => {
    return cs.const(cs.receiver((cs.splice((f)) satisfies typeof cs.ClientUnknown)(1)).read());
})());

const wrapped = cs.lift(cs.const((__cs_n: number) => (cs.splice((state)) satisfies typeof cs.ClientUnknown)(__cs_n + 10)));

const builtinHoleSharing = cs.lift((() => {
    return cs.const((cs.splice(make(state)) satisfies typeof cs.ClientUnknown) + (cs.splice(make(wrapped)) satisfies typeof cs.ClientUnknown));
})());
