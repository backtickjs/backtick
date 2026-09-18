import type { Case } from "../Case.js";
import { controlFlow } from "./controlFlow.js";
import { expressions } from "./expressions.js";
import { objects } from "./objects.js";
import { stdlib } from "./stdlib.js";

/** Backtick's own cases, by topic. */
export const topics: Record<string, Case[]> = {
  expressions,
  "control-flow": controlFlow,
  objects,
  stdlib,
};
