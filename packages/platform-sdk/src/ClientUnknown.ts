import type { ClientValue } from "./ClientValue.js";

/**
 * A client value, or nothing. What an action answers with, where every other
 * position takes a value.
 */
export type ClientUnknown = ClientValue | void;
