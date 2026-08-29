import type { SiteBuiltins } from "@backtickjs.com/schema";

/**
 * What this site answers for, beside what the web does.
 *
 * Neither, yet. Both were answered from a frame on an origin of its own — the
 * only place a page saying `default-src 'self'` may evaluate anything — and
 * that frame has been taken out to be put back a piece at a time.
 *
 * `compile` is the half that could come back without one: transpiling is text
 * in and text out, and nothing about it needs `eval`. What it needs is a parser,
 * and the parser is three and a half megabytes, so it wants fetching when
 * somebody types rather than when the page loads.
 *
 * `evalAndBundle` is the half that cannot: running what somebody wrote is
 * `new Function`, and a content policy is per-document, so a document of its own
 * is what makes it possible at all.
 *
 * `SiteBuiltins` and not `Builtins`, which is every name in scope: a name added
 * to this site's schema stops this file compiling until it is answered.
 */
export const builtins: SiteBuiltins = {
  compile: () => {
    throw new Error("backtick: nothing here compiles yet");
  },
  evalAndBundle: () => {
    throw new Error("backtick: nothing here runs what was compiled yet");
  },
};
