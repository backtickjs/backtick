import type { Prop } from "@backtickjs/cs-runtime";

// A loose passthrough for now: the interpreter decides what it understands and
// nothing here narrows it. Tighten once the supported properties are settled.
export type Style = { [property: string]: Prop<string | number> };
