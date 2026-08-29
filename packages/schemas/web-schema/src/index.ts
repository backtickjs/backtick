// Passed along from the layer below, because a schema built on this one reaches
// for it here: a generated builtin is made the same way at every layer, and the
// layer above imports it from the layer it extends.
export { createBuiltin, isBuiltin, type Builtin } from "@backtickjs/ui-schema";

// The values a script splices, the same way the layer below exposes its own.
export * from "./builtins.generated.js";

export type * from "./declarations.generated.js";
