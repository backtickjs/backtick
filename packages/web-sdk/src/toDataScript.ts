import type { Bundle } from "@backtickjs/core";

/**
 * A bundle as a page carries it: data, not code.
 *
 * A `<script type="application/json">` is a data block — a browser never
 * executes one, and no content policy checks one. `data-backtick` says where it
 * goes, as a selector, and the client reads both on load. One of these per
 * thing a page draws, and one client however many there are.
 *
 * Here rather than written by each caller, because the attribute name and the
 * escape are this package's contract with its own client: a page that spelled
 * either differently would draw nothing, and say nothing about why.
 */
export function toDataScript(bundle: Bundle, into: string): string {
  // A `</script` ends a script element wherever it stands, data block or not.
  // Only string values in `JSON.stringify` output can hold a `<`, and `<`
  // is an escape JSON reads the same way JavaScript does.
  const escaped = JSON.stringify(bundle).replaceAll("<", "\\u003c");
  return (
    `<script type="application/json" data-backtick="${into}">` +
    `${escaped}</script>`
  );
}
