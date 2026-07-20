import { cs } from "@backtickjs/core";

// Comments in a client script are trivia: they survive formatting but are
// dropped from the virtual code and the bundle.
export default cs.value((() => {
    const __cs_count = 1;
    if (__cs_count === 1) {
        return "one";
    }
    return "many";
})());
