import { cs } from "@backtickjs/core";
import type { Client } from "@backtickjs/core";

const Button = (props: { onA?: unknown; onB?: unknown }) => ({
  "@backtickjs": "ClientElement" as const,
  id: "Button",
  props,
});

// A polymorphic fragment whose splice captures the template's own binding,
// referenced from tree props: the hole's thunk ships in JSON position with
// `params`, so `base` threads from the entry's scope into the splice.
function offset(by: Client<number>): Client<(base: number) => number> {
  return cs`(base: number) => ${cs`base`} + $by`;
}

export default <Button onA={offset(cs`1`)} onB={offset(cs`2`)} />;
