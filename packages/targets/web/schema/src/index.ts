// Passed along from the layer below, because a schema built on this one reaches
// for it here: a generated builtin is made the same way at every layer, and the
// layer above imports it from the layer it extends.
export { createBuiltin, isBuiltin, type Builtin } from "@backtickjs/ui-schema";

// The values a script splices, the same way the layer below exposes its own.
export * from "./builtins.generated.js";

export type * from "./declarations.generated.js";

/**
 * What this target draws with, and what it hands a handler.
 *
 * Here rather than beside the JSX runtime next door: `jsx-runtime` is a name
 * TypeScript resolves for itself — `jsxImportSource` looks for `jsx`, `jsxs`
 * and `Fragment` at exactly that path — so it is a module written for a
 * compiler to find, not for anybody to import from. What a person writing a
 * component needs is a package name.
 *
 * The event names this declares are the DOM's on purpose, and that is the
 * reason they are exported above at all: a browser's `PointerEvent` is a
 * global, and a bare name in a script reaches the global. Importing one of
 * these shadows it, which is the difference between annotating a handler's
 * parameter and being told two types with one name are unrelated.
 */
export { Fragment } from "./jsx-runtime/index.js";
export type { FragmentProps, JSX } from "./jsx-runtime/index.js";
