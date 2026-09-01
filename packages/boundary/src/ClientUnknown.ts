import type { ClientValue } from "./ClientValue.js";

/**
 * A client value, or nothing.
 *
 * The mirror of `ServerUnknown`, and the arm each side adds is the same idea
 * said from its own side: the client has `void` where the server has the
 * script that answers with it.
 */
export type ClientUnknown = ClientValue | void;
