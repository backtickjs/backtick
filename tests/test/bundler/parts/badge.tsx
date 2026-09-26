import { cs } from "@backtickjs/core";

// A component in a file of its own, for a script in another file to draw.
export async function Badge() {
  return cs`<b>{"badge"}</b>`;
}
