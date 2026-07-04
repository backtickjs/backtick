import { cs } from "@backtickjs/core";
import { print } from "../print.ts";

const script = cs.lift((() => {
    const __cs_greeting = "Hello";
    return cs.lower(cs.lower(__cs_greeting.concat)(", ", "World").toUpperCase)();
})());

print(script);
