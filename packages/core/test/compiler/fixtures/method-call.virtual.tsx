import { cs } from "@backtickjs/core";
import { print } from "../print.ts";

const script = cs.lift((() => {
    const __cs_greeting = "Hello";
    return cs.lower(cs.method(cs.lower(cs.method(__cs_greeting, "concat", [cs.lift(", "), cs.lift("World")])), "toUpperCase", []));
})());

print(script);
