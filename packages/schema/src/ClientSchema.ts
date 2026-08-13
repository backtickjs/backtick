import type { TElement } from "./types/Element.js";
import type { TSchema } from "./TSchema.js";

/**
 * What a target's client can do, and so what an app may ask of it.
 *
 * A client is whatever draws what an app composes — a browser, an iOS or
 * Android view tree, a display on a microcontroller — and each can do a
 * different set of things. This is that set, written down: the tags that
 * client knows and what each accepts. A tag it cannot draw is a tag no app
 * can write, and the app finds out where it is written rather than where it
 * runs.
 *
 * Said once, per target, and read by every generator: the TypeScript an app
 * writes against, the stubs a native client is written against, and whatever
 * else comes to need it. So nothing here is any one generator's — a name is a
 * name whichever language spells it, and `Prop<T>` and `Client<T>` are absent
 * because a client receives a prop already evaluated and has no use for them.
 */
export interface ClientSchema {
  /** Everything a `$ref` may name. */
  readonly declarations: Readonly<Record<string, TSchema>>;
  /** Every tag, and what it accepts. */
  readonly elements: Readonly<Record<string, TElement>>;
}
