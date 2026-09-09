import { type Client, cs } from "@backtickjs/core";

// One script body (one source location) instantiated with different splices —
// the JSX analogue of the `splice-sharing` fixture. The entry takes a thunk
// parameter, and each `onPress`'s `#call` passes its own splice as a `#thunk`.
function make(n: number): Client<() => number> {
  return cs.lift(cs.const(() => cs.splice((n)) satisfies typeof cs.ClientUnknown));
}

export default (
  <div>
    <span onclick={make(1)} />
    <span onclick={make(2)} />
  </div>
);
