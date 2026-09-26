import { createTransformer } from "@backtickjs/tspatch-plugin";
import { transform } from "./transform.js";

// For a tsconfig's plugins: `{ "transform": "@backtickjs/solid-js/tspatch-plugin" }`.
export default createTransformer({ transform });
