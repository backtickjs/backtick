import { cs } from "@backtick/core";
const script = cs.lift((() => {
    const x = 0;
    return cs.lower(cs.lift((() => x)()));
})());
