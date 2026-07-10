import { bundle, cs } from "@backtickjs/core";

const one = cs`1`;
const two = cs`2`;

// Compose nested client scripts with `${...}` splices.
const sum = cs`${one} + ${two}`;

// Bundle the composed client script into its portable payload and print it.
console.log(JSON.stringify(bundle(sum), null, 2));
