import { cs, type Client } from "@backtickjs/core";

// Handlers — action arrows — are values: an object carries them, and
// storing one is not calling it.
const beep: Client<void> = cs`{
  let n = 0;
  n = 1;
}`;

const onTap: Client<(id: number) => void> = cs`(id: number) => {
  $beep;
}`;

export default cs`{
  const handlers = {
    tap: $onTap,
    hold: $onTap,
  };
  return handlers;
}`;
