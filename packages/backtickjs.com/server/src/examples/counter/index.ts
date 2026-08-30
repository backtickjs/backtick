import { type Example, fileOf } from "../Example.js";

/** A second one, so the page can show that a playground is a thing it holds. */
export const COUNTER: Example = {
  files: [await fileOf("counter/Counter.tsx")],
};
