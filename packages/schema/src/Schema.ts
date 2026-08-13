import type { TElement } from "./types/Element.js";
import type { TSchema } from "./TSchema.js";

/**
 * What a target draws, and what each element accepts.
 *
 * Said once, per target, and read by every generator: the TypeScript an app
 * writes against, the stubs a native client is written against, and whatever
 * else comes to need it. So nothing here is any one generator's — a name is a
 * name whichever language spells it, and `Prop<T>` and `Client<T>` are absent
 * because a client receives a prop already evaluated and has no use for them.
 */
export interface Schema {
  /** Named types the rest refers to by `$ref`. */
  readonly aliases: Readonly<Record<string, TSchema>>;
  /** Groups of properties, each with what it extends. */
  readonly interfaces: Readonly<Record<string, TSchema>>;
  /** Every tag, and what it accepts. */
  readonly elements: Readonly<Record<string, TElement>>;
}
