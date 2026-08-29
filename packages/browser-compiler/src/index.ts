/**
 * Backtick's compiler, whole, in a browser.
 *
 * Two passes and a parser. The first is `@backtickjs/compiler`'s, so an example
 * compiled here is compiled exactly as an e2e fixture is; the second is what
 * this package adds, and it is only needed where there is no module loader to
 * hand the first pass to.
 *
 * The parser is a dependency rather than a file somebody publishes beside this,
 * so bundling it for a browser carries it along and the result needs nothing
 * from the network. There is no build here that makes that bundle: it is made
 * by whoever serves one, which is also who names it.
 *
 * What comes back is text. Nothing here evaluates it, so nothing here needs a
 * policy, a frame or an origin — that is the caller's half, and the caller is
 * also who decides what its imports resolve to.
 */
export { browserTranspile } from "./browserTranspile.js";
