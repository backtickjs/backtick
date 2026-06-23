import { cs, type Client } from "@backtick/core";
function add(lhs: Client<number>, rhs: Client<number>): Client<number> {
    return cs.lift(cs.lower(lhs) + cs.lower(rhs));
}
const script = cs.lift(cs.lower(add(cs.lift(1), cs.lift(2))));
export default script;
