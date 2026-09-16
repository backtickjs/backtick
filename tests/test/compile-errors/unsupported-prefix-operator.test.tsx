import { cs } from "@backtickjs/core";

// `!` and `-` are the prefix operators; the bitwise and update ones are not.
const script = cs`(n: number) => ~n`;
