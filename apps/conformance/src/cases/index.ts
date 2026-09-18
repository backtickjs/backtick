import type { Case } from "../Case.js";
import { controlFlow } from "./controlFlow.js";
import { expressions } from "./expressions.js";
import { objects } from "./objects.js";
import { stdlib } from "./stdlib.js";

const topics: Record<string, Case[]> = {
  expressions,
  "control flow": controlFlow,
  objects,
  stdlib,
};

/** Every case, named `<topic>: <case>`. */
export const cases: Case[] = Object.entries(topics).flatMap(([topic, list]) =>
  list.map((test) => ({ ...test, name: `${topic}: ${test.name}` })),
);
