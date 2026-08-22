import { cs } from "@backtickjs/core";

// A component tag written inside a client script. `Badge` is a name no scope in
// the script binds, so it splices as the host binding — but a splice is lowered
// as a value, and what a tag names is a component to run. Where a splice is
// used is what says which it is, and nothing reads that yet, so this stops at
// the refusal every spliced function gets.
async function Badge() {
  return <span>new</span>;
}

export default cs`<Badge />`;
