import { cs } from "@backtickjs/core";

export default cs.lift((() => {
    const __cs_greeting = "Hello";
    return __cs_greeting.concat(", ", "World").toUpperCase();
})());
