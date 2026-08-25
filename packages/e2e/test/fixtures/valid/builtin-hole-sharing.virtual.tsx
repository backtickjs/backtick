import { cs, state, type Client, type State } from "@backtickjs/core";

const make = (f: Client<(n: number) => State<number>>) =>
  cs.lift((() => {
    return cs.const(cs.receiver(cs.splice((f))(1)).read());
})());

const wrapped = cs.lift(cs.const((__cs_n: number) => cs.splice((state))(__cs_n + 10)));

export default cs.lift((() => {
    return cs.const(cs.splice(make(state)) + cs.splice(make(wrapped)));
})());
