import { cs } from "@backtickjs/core";

// A property literally named `...`, in a literal a spread also runs through —
// which is the one shape where both are entries of the same node. The format
// tells them apart by the entry's first slot, and `...` is a name a property
// may have, so this is where the two could be confused.
export default cs`{
  const base = { a: 1 };
  return { ...base, "...": 2 };
}`;
