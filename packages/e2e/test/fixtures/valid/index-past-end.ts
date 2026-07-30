import { cs } from "@backtickjs/core";

// Where the two rules part company, pinned so a client implementer can see it:
// `names[9]` types as `string`, because TypeScript's indexed access says the
// element type, and reads as null, because the runtime read is total. Nothing
// faults; the type simply doesn't mention the floor under it.
export default cs`{
  const names = ["zero", "one"];
  return names[9];
}`;
