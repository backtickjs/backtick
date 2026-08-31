import { cs, state } from "@backtickjs/core";

// A component whose whole body is client code answers with the script rather
// than a drawing the host made: it declares its own storage and draws from it,
// and there is nothing left for the host to build.
//
// Expanded in value position, which is what admits it: a script that draws
// answers with what it drew, where an action answers with nothing and would
// draw nothing.
async function Panel() {
  return cs`{
    const n = $state(2);
    return <em>{n.read()}</em>;
  }`;
}

export default (
  <div>
    <Panel />
  </div>
);
