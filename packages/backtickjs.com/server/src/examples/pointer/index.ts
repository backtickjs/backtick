import { type Example, fileOf } from "../Example.js";

/** A third, showing what a handler is now handed. */
export const POINTER: Example = {
  files: [await fileOf("pointer/Pointer.tsx")],
};
