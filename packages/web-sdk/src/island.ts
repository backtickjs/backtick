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
 * Drawn where it is put, so a document says where by placement: there is no
 * selector to name a place and no way for the name and the markup to disagree.
 *
 *     `<main>${island(await bundle(<Home />))}</main>`
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
  // A `<slot>`, which is `display: contents` in every browser's own stylesheet
  // and so draws no box of its own: what is inside it lays out as though it were
  // a child of whatever holds the island, and an app's grid or flex row counts
  // what the app wrote. A rule nobody has to ship — an element that needed a
  // stylesheet to disappear would need `style-src` to allow one.
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
    `<slot>` +
    `<script type="application/json">${escaped}</script>` +
    `<script defer src="${clientUrl}"></script>` +
    `</slot>`
  );
}
