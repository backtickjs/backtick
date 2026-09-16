import { cs } from "@backtickjs/core";

const methodCall = cs.lift((() => {
    const __cs_greeting = cs.const("Hello");
    return cs.const(cs.receiver(cs.receiver(__cs_greeting).concat(", ", "World")).toUpperCase());
})());
