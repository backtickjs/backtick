import { type Example, exampleOf } from "../Example.js";
import Wave from "./Wave.js";

export const WAVE: Example = await exampleOf(import.meta.url, {
  root: <Wave />,
  files: ["Wave.tsx"],
});
