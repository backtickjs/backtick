import { cs, state } from "@backtickjs/core";
import type { BacktickElement, Bundle } from "@backtickjs/core";

// A bundle a page does not have yet, and what stands in until it does.
//
// Both reads are where they stand, inside the drawing: that is what makes the
// condition follow the cell. Reading it once into a `const` would narrow the
// type and freeze the drawing — the script body runs once, so the loading state
// would never resolve.
export default cs`{
  const held = $state<Bundle<BacktickElement> | null>(null);

  return (
    <div>
      {held.read() === null ? (
        <span>loading…</span>
      ) : (
        <backtick bundle={held.read()} />
      )}
    </div>
  );
}`;
