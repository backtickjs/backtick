import { type Example, exampleOf } from "../Example.js";
import Counter from "./Counter.js";

export const COUNTER: Example = await exampleOf(import.meta.url, {
  root: <Counter />,
  files: ["Counter.tsx"],
});
