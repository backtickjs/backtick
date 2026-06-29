import { cs } from "@backtick/core";
import { print } from "../print.ts";

const obj = cs.lift({ a: 4 });
const script = cs.lift((() => {
    const $0client_obj = cs.lower(obj);
    return cs.lower(cs.lift($0client_obj.a));
})());

print(script);
