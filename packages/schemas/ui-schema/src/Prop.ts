import type { Client, ClientValue, Server } from "@backtickjs/language-schema";

/**
 * What a prop admits: what the server wrote, or a script standing in for it.
 *
 * `Server<T>` drops away where the server has no way to write a `T` — a
 * function is the case, since client behaviour is `cs`...` — so a handler prop
 * is left with the script arm alone.
 */
export type Prop<T extends ClientValue> = Server<T> | Client<T>;
