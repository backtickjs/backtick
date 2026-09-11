import { cs } from "@backtickjs/core";

// A component tag naming a binding the script holds calls it, so what the
// binding holds has to be a function: `Tag` here is a number.
const held = cs`(Tag: number) => <Tag />`;
