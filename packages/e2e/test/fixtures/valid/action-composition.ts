import { cs, type Client } from "@backtickjs/core";

// An action — a block with no `return` — types `Client<void>` natively and
// composes as a block running it in statement position.
const effects: Client<void> = cs`{
  const x = 1;
}`;

const composed: Client<void> = cs`{
  $effects;
}`;

export default cs`{
  $composed;
}`;
