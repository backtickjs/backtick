import { cs, Text } from "@backtickjs/core";
import type { Client, JSX } from "@backtickjs/core";
// A key is a value like a prop, so it captures like one. This element hoists
// into its own entry and its key is a script reading `x` from the enclosing
// script, so `x` has to appear in the entry's slot signature — the key is
// scanned for needs alongside the props, not just rendered.
const script: Client<() => JSX.Element> = cs`() => {
  const x = 1;
  return ${(<Text key={cs`x`} />)};
}`;
export default script;
