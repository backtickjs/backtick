export { schema } from "./schema.js";

// Everything this schema declares and everything under it, which the generated
// file already gathered: a schema built on this one names this package and
// reaches the whole chain.
export type * from "./schema.generated.js";
