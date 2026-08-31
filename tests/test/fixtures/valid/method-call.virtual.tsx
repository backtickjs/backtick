import { cs } from "@backtickjs/core";

export default cs.lift((() => {
    const __cs_greeting = cs.const("Hello");
    return cs.const(cs.receiver(cs.receiver(__cs_greeting).concat(", ", "World")).toUpperCase());
})());
