import { cs } from "@backtick/core";
import { print } from "../print.ts";

const obj = cs.lift({ a: 4 });
const script = cs.lift((() => {
    const __cs_obj = cs.lower(obj);
    return cs.lower(cs.lift(__cs_obj.a));
})());

print(script);
