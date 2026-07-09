import { cs } from "@backtickjs/core";

const script = cs.lift((() => {
    const __cs_greeting = "Hello";
    return __cs_greeting.concat(", ", "World").toUpperCase();
})());
