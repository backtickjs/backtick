import { cs } from "@backtickjs/core";

// A runtime string splice inlines as itself — quotes, newlines, and
// backslashes intact.
const value = 'say "hi"\n\\done';

export default cs`${value}`;
