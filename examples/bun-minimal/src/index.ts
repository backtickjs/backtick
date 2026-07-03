import { cs } from "@backtickjs/core";

const one = cs`1`;
const two = cs`2`;

// Compose nested client scripts with `${...}` splices.
const sum = cs`${one} + ${two}`;

export default sum;
