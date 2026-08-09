// A target writes its schema against this package and never against the
// library behind it, which is what keeps the choice of library ours to change
// — and lets `Type` be narrowed to what a generator can actually read.
export { Type } from "./Type.js";
export type { TSchema } from "typebox";

export { emitJsx } from "./emitJsx.js";
export type { Schema } from "./Schema.js";
