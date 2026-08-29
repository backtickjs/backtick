import ts from "typescript";
import type { Host } from "./compile.js";

/**
 * The parser, imported rather than fetched.
 *
 * It is a dependency of this package and bundled into the one script the build
 * emits, so in a browser there is nothing to load and nothing to wait for: by
 * the time the document has run, the compiler is whole. On a build it is the
 * same call, which is the point — a page that renders an example compiles it
 * against exactly what a reader editing that example will compile against.
 */
export function host(): Host {
  return { typescript: ts };
}
