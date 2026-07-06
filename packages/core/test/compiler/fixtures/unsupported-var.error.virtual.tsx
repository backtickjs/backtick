import { cs } from "@backtickjs/core";
import { print } from "../print.ts";

const script = cs.lift((() => {
    var x = 0;
    return __cs_x;
})());

print(script);
