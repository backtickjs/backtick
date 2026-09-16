import { cs } from "@backtickjs/core";

// `&&`/`||` operate on booleans and always yield one: the guard and default
// idioms that lean on truthiness (`count && flag`, `value || fallback`) are
// type errors on each non-boolean operand. Defaulting is `??`.
export default cs.lift(cs.const((__cs_count: number, __cs_flag: boolean) => {
    // @ts-expect-error: Argument of type 'number' is not assignable to parameter of type 'boolean'.
    return cs.const((cs.condition(__cs_count) && __cs_count) && (cs.condition(__cs_flag) && __cs_flag) || (cs.condition("none") && "none"));
}));
