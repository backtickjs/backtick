import { cs } from "@backtickjs/core";
import { print } from "../print.ts";

const script = cs.lift((() => {
    const __cs_base = 10;
    return (__cs_one: number, __cs_two: number) => __cs_one + __cs_two + __cs_base;
})());

print(script);
