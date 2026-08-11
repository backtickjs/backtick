import type { Bundle } from "@backtickjs/core";

/**
 * One island: a bundle and the client that draws it.
 *
 *     `<main>${island(await bundle(<Home />), clientUrl)}</main>`
 *
 * Drawn into whatever holds it, at the back — so an island goes last in its
 * element, which is where `embed` and `page` put one. Several in one element
 * draw in document order; markup written after one ends up in front of it.
 *
 * `clientUrl` is asked for rather than assumed: a document served under a prefix
 * has a different one, and a wrong guess draws nothing.
 *
 * No inline JavaScript, so no hash and no nonce: the bundle is a data block that
 * no content policy checks, and the client is a same-origin file that
 * `default-src 'self'` already admits.
 */
export function island(bundle: Bundle, clientUrl: string): string {
  // `</script` ends the element wherever it stands. Only strings can hold a `<`,
  // and `<` is an escape JSON reads back itself.
  const escaped = JSON.stringify(bundle).replaceAll("<", "\\u003c");
  // No wrapper: an element here would be an element in every selector reaching
  // what was drawn. `defer` so the parser finishes the document first.
  return (
    `<script type="application/json">${escaped}</script>` +
    `<script defer src="${clientUrl}"></script>`
  );
}
