import type { Client } from "./Client.js";
import type { ClientValue } from "./ClientValue.js";

/**
 * One child or several, written the same way either way in JSX — and a script
 * in place of one of them.
 *
 * A script contributes one thing, or nothing — a branch draws nothing often
 * enough. What it may not contribute is many: that is `<For />`, because a
 * client handed a finished list cannot work out which member is which.
 *
 * A sibling of {@link Prop}: both say what a prop may hold once a script may
 * stand where a value would, and neither says what an element is. Which
 * elements exist is a target's business — the portable components in
 * `@backtickjs/core`, the tags in `@backtickjs/web-sdk` — and both reach for
 * this same type to describe what goes inside one.
 */
export type Children<T extends ClientValue> =
  | T
  | Client<T | null>
  | Children<T>[];
