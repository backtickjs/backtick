import { sha256, source } from "@backtickjs.com/client/bundle";

/**
 * The client, under a name carrying the hash of what is in it.
 *
 * Named here because the document has to ask for it by name, and a name
 * decided anywhere else is two places agreeing on one string. Nothing is ever
 * stale, so it may be cached for as long as anything is willing to.
 */
export const client = {
  name: `client-${sha256.slice(0, 16)}.js`,
  source,
};
