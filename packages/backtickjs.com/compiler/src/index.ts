/**
 * The parser, and what it does with what somebody wrote.
 *
 * A package of its own because of what it weighs: three and a half megabytes,
 * against a client of twenty-eight kilobytes. A page that is only read should
 * never pay for it, so it is bundled apart and fetched when somebody types.
 */
export { browserTranspile } from "./browserTranspile.js";
