import { cs } from "@backtickjs/core";

export default cs.lift(cs.const((() => {
    const __cs_greeting = cs.const("Hello");
    return cs.receiver(cs.receiver(__cs_greeting).concat(", ", "World")).toUpperCase();
})()));
