import { type Example, exampleOf } from "../Example.js";
import Pointer from "./Pointer.js";

export const POINTER: Example = await exampleOf(import.meta.url, {
  root: <Pointer />,
  files: ["Pointer.tsx"],
});
