import { type Client, cs } from "@backtickjs/core";

const Button = (props: { onA?: unknown; onB?: unknown }) => ({
  "@backtickjs": "ClientElement" as const,
  id: "Button",
  props,
});

// One script body (one source location) instantiated with different splices —
// the JSX analogue of the `splice-sharing` fixture. The entry takes a thunk
// parameter, and each prop's `#call` passes its own splice as a `#thunk`.
function make(n: number): Client<() => number> {
  return cs`() => $n`;
}

export default <Button onA={make(1)} onB={make(2)} />;
