import { cs } from "@backtickjs/core";
import { print } from "../print.ts";

const script = cs.lift((() => {
    const a = 1, b = 2;
    return __cs_a;
})());

print(script);
