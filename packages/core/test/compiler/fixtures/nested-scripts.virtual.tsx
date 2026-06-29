import { cs } from "@backtick/core";
import { print } from "../print.ts";

const script = cs.lift((() => {
    const $0client_x = 0;
    return cs.lower(cs.lift($0client_x));
})());

print(script);
