import { cs, type Client } from "@backtickjs/core";

// A host helper reused with different splices makes its script polymorphic:
// the holes can't be inlined, so every call site passes its splice as a
// thunk and the body evaluates `$0()` at the hole. The thunk is what keeps
// the hole as lazy as an inlined splice: `guard(broken)(false)` never
// reaches its hole, so the broken fragment must never evaluate — passed
// eagerly (by value instead of by thunk) it would throw before `flag` was
// even tested.
function guard(fragment: Client<unknown>): Client<(flag: boolean) => unknown> {
  return cs`(flag: boolean) => {
    if (flag) {
      return ${fragment};
    }
    return "skipped";
  }`;
}

const ok = cs`JSON.parse("[1]")`;
const broken = cs`JSON.parse("{")`;

export default cs`({
  taken: ${guard(ok)}(true),
  skipped: ${guard(broken)}(false),
})`;
