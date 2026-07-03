import { cs } from "@backtickjs/core";
import { print } from "../print.ts";

const script = cs.lift((() => {
    const __cs_x = 0;
    return cs.lower(cs.lift(__cs_x));
})());

print(script);
