import { cs } from "@backtick/core";
const obj = cs.lift({ a: 4 });
const script = cs.lift((() => {
    const $0var_obj = cs.lower(obj);
    return cs.lower(cs.lift($0var_obj.a));
})());
export default script;
