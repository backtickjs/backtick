import { cs } from "@backtickjs/core";

export default cs.liftValue((() => {
    const __cs_message = cs.value("boom");
    try {
        throw __cs_message;
    }
    catch (__cs_error) {
        if (__cs_error === __cs_message) {
            return "caught boom";
        }
        return "caught something else";
    }
})());
