import { cs } from "@backtickjs/core";

export default cs.liftValue((() => {
    const __cs_greeting = cs.value("Hello");
    return cs.receiver(cs.receiver(__cs_greeting).concat(", ", "World")).toUpperCase();
})());
