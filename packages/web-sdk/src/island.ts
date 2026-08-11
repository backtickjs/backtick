import type { Bundle } from "@backtickjs/core";

/**
 * One island: a bundle, the client that draws it, and the element it draws in.
 *
 * What a document holds as many of as it has bundles. One is what a page is,
 * which is what `page` writes; a document with more says so by placing them, and
 * they are drawn side by side without knowing about each other — separate state,
 * separate writes. The client is one file however many there are, asked for once
 * and answered from the cache after that.
 *
 * Drawn into whatever holds it, after what that already holds: a document says
 * where by putting it there, so there is no selector to name a place and no way
 * for the name and the markup to disagree.
 *
 *     `<main>${island(await bundle(<Home />), clientUrl)}</main>`
 *
 * An island holds no JavaScript of its own: the bundle is a data block, which no
 * content policy checks, and the client is a same-origin file that
 * `default-src 'self'` already admits. So a page needs no hash, no nonce and no
 * `unsafe-inline` — and the client, being the half that never changes with what
 * is drawn, is fetched once rather than carried by every page.
 *
 * `clientUrl` says where to ask for it, and is asked for rather than assumed:
 * `clientUrl` from this package is the answer for a document served from an
 * origin's root, and a document served under a prefix of somebody else's
 * choosing — a build written to a subdirectory, an app mounted under a path —
 * has a different one. Nothing here can tell which, and a wrong guess is a page
 * that draws nothing.
 */
export function island(bundle: Bundle, clientUrl: string): string {
  // A `</script` ends a script element wherever it stands, data block or not.
  // Only string values in `JSON.stringify` output can hold a `<`, and `<`
  // is an escape JSON reads the same way JavaScript does.
  const escaped = JSON.stringify(bundle).replaceAll("<", "\\u003c");
  // Nothing wraps this. An element around what is drawn is an element in every
  // selector that reaches it: `#main > .card` stops matching, `:first-child` is
  // the wrapper, and `> *` counts one thing where the app wrote three. So what
  // goes in the document is the two scripts and nothing else, and the client
  // takes even those out once it has read them — leaving what the app wrote, as
  // a direct child of what the app put it in.
  //
  // `defer`, so the document finishes parsing before anything is drawn. Without
  // it the parser stops at every island, draws the whole of it against a
  // half-built document, and only then goes on reading — which a page of
  // backtick's own barely notices, its island being the last thing in it, and a
  // page of somebody else's pays for once per island.
  //
  // Deferred scripts still say which one is running and still stand where they
  // were written, so nothing about drawing where it is put changes. They run in
  // the order the document holds them, and before `DOMContentLoaded`, so a page
  // waiting on that sees what was drawn.
  return (
    `<script type="application/json">${escaped}</script>` +
    `<script defer src="${clientUrl}"></script>`
  );
}
