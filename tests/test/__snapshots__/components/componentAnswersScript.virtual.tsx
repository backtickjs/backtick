import { cs, state } from "@backtickjs/core";

// A component whose whole body is client code answers with the script rather
// than a drawing the host made: it declares its own storage and draws from it,
// and there is nothing left for the host to build.
//
// Expanded in value position, which is what admits it: a script that draws
// answers with what it drew, where an action answers with nothing and would
// draw nothing.
async function Panel() {
  return cs.lift((() => {
    const __cs_n = cs.const((cs.splice((state)) satisfies typeof cs.ClientUnknown)(2));
    return cs.const(<em>{cs.lift(cs.receiver(__cs_n).read())}</em>);
})());
}

const componentAnswersScript = (
  <div>
    <Panel />
  </div>
);
