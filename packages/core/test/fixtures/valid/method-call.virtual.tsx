import { cs } from "@backtickjs/core";

export default cs.lift((() => {
    const __cs_greeting = "Hello";
    return cs.virtualize(cs.autobox(cs.virtualize(cs.autobox(__cs_greeting)).concat(", ", "World"))).toUpperCase();
})());
