import { cs } from "@backtickjs/core";
import { print } from "../print.ts";

const script = cs.lift((() => {
    let x;
    return __cs_x;
})());

print(script);
