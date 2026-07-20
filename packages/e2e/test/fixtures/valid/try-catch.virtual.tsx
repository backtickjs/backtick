import { cs } from "@backtickjs/core";

export default cs.liftValue((() => {
    const __cs_message = "boom";
    try {
        throw __cs_message;
    }
    catch (__cs_error) {
        return "caught " + String(__cs_error);
    }
})());
