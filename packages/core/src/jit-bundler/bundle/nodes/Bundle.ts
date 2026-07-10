import type { JsonExpr } from "./JsonExpr.js";

// The bundle's wire format, as plain data: what ships is exactly
// `JSON.stringify` of this. `functions` maps each label (`#fi`) to its source
// as an arrow `(params) => body`; `trees` maps each label (`#ti`) to a JSON
// value describing a JSX tree; `root` is a JSON expression naming the
// entrypoint. See `buildBundle` for the composition forms.
export interface Bundle {
  functions: Record<string, string>;
  trees: Record<string, JsonExpr>;
  root: JsonExpr;
}
