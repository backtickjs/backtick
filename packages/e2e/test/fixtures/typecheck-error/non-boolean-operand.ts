import { cs } from "@backtickjs/core";

// `&&`/`||` operate on booleans and always yield one: the guard and default
// idioms that lean on truthiness (`count && flag`, `value || fallback`) are
// type errors on each non-boolean operand. Defaulting is `??`.
export default cs`(count: number, flag: boolean) => {
  return (count && flag) || "none";
}`;
