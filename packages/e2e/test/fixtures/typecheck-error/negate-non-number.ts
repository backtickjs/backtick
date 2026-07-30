import { cs } from "@backtickjs/core";

// `-` is arithmetic, so its operand is a number — TypeScript's own rule, and
// the reason this one needs no check of the language's own.
export default cs`(name: string) => -name`;
