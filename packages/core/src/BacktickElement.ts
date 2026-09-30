import type { Client } from "./Client.js";

/**
 * A drawing, as a host builds one from a tag or a script evaluates to one.
 * Opaque: what it is made of belongs to whichever side made it.
 */
export interface BacktickElement extends Client<BacktickElement> {}
