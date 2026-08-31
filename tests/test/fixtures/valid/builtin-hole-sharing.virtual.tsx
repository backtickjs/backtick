import { cs, state, type Client, type State } from "@backtickjs/core";

const make = (f: Client<(n: number) => State<number>>) =>
  cs.lift((() => {
    return cs.const(cs.receiver((cs.splice((f)) satisfies import("@backtickjs/core").ClientUnknown)(1)).read());
})());

const wrapped = cs.lift(cs.const((__cs_n: number) => (cs.splice((state)) satisfies import("@backtickjs/core").ClientUnknown)(__cs_n + 10)));

export default cs.lift((() => {
    return cs.const((cs.splice(make(state)) satisfies import("@backtickjs/core").ClientUnknown) + (cs.splice(make(wrapped)) satisfies import("@backtickjs/core").ClientUnknown));
})());
