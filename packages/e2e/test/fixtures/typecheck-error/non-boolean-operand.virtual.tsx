import { cs } from "@backtickjs/core";

// `&&`/`||` operate on booleans and always yield one: the guard and default
// idioms that lean on truthiness (`count && flag`, `value || fallback`) are
// type errors on each non-boolean operand. Defaulting is `??`.
export default cs.value((__cs_count: number, __cs_flag: boolean) => {
    return (cs.condition(__cs_count) && __cs_count) && (cs.condition(__cs_flag) && __cs_flag) || (cs.condition("none") && "none");
});
