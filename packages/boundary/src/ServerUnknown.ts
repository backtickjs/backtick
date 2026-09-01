import type { Client } from "./Client.js";
import type { ServerValue } from "./ServerValue.js";

/**
 * A server value, or a script standing in for nothing.
 *
 * The mirror of `ClientUnknown`, and the arm each side adds is the same idea
 * said from its own side: where the client has `void`, the server has the
 * script that answers with it. A server never holds nothing — it holds what
 * will produce nothing, which is what an action is.
 */
export type ServerUnknown = ServerValue | Client<void>;
