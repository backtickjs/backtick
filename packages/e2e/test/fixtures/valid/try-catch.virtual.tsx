import { cs } from "@backtickjs/core";

export default cs.lift(cs.const((() => {
    const __cs_message = cs.const("boom");
    try {
        throw __cs_message;
    }
    catch (__cs_error) {
        if (__cs_error === __cs_message) {
            return "caught boom";
        }
        return "caught something else";
    }
})()));
