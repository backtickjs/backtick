import type { ClientUnknown } from "./ClientUnknown.js";
import type { ClientValue } from "./ClientValue.js";

// Method syntax checks parameters bivariantly
export type ClientFunction = {
  fn(...args: ClientValue[]): ClientUnknown;
}["fn"];
